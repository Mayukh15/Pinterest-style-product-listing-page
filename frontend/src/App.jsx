import { useState, useEffect, useRef, useCallback } from "react";

function LazyImage({ src, alt, className }) {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: "100px" },
    );
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`img-wrapper ${className || ""}`}>
      {!loaded && <div className="skeleton-img" />}
      {inView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }}
        />
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="card skeleton-card">
      <div
        className="skeleton-img"
        style={{ height: `${180 + Math.random() * 120}px` }}
      />
      <div className="card-body">
        <div className="skeleton-line" style={{ width: "80%" }} />
        <div className="skeleton-line" style={{ width: "40%", marginTop: 6 }} />
      </div>
    </div>
  );
}

function ProductCard({ product, index }) {
  const heights = [180, 220, 200, 260, 190, 240, 210, 250];
  const imgHeight = heights[index % heights.length];

  return (
    <div className="card" style={{ animationDelay: `${(index % 10) * 60}ms` }}>
      <div className="card-img-wrap" style={{ height: imgHeight }}>
        <LazyImage src={product.image} alt={product.title} />
        <div className="card-overlay">
          <button className="btn-save">♡ Save</button>
        </div>
        <span className="category-badge">{product.category}</span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{product.title}</h3>
        <p className="card-price">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [hasMore, setHasMore] = useState(false);
  const LIMIT = 10;
  const API = "http://localhost:4000";

  //Debounced searching
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  // Fetch categories
  useEffect(() => {
    fetch(`${API}/api/categories`)
      .then((r) => r.json())
      .then((d) => setCategories(d.categories))
      .catch(() => {});
  }, []);

  // Initial / filter load
  const fetchProducts = useCallback(
    async (pg, append = false) => {
      append ? setLoadingMore(true) : setLoading(true);
      setError(null);
      try {
        const url = `${API}/api/products?page=${pg}&limit=${LIMIT}&search=${encodeURIComponent(debouncedSearch)}&category=${encodeURIComponent(category)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        setProducts((prev) =>
          append ? [...prev, ...data.products] : data.products,
        );
        setPage(data.currentPage);
        setTotalPages(data.totalPages);
        setTotalProducts(data.totalProducts);
        setHasMore(data.hasMore);
      } catch (e) {
        setError(
          e.message || "Failed to fetch products. ",
        );
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [debouncedSearch, category],
  );

  useEffect(() => {
    setPage(1);
    fetchProducts(1, false);
  }, [debouncedSearch, category]);

  const handleLoadMore = () => fetchProducts(page + 1, true);

  const handlePageNav = (p) => {
    setPage(p);
    fetchProducts(p, false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">✦</span>
            <span className="logo-text">Pinstyle</span>
          </div>
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              className="search-input"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch("")}>
                ×
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="filter-bar">
        <div className="filter-inner">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      {!loading && !error && (
        <div className="stats-bar">
          <span>{totalProducts} products found</span>
          {debouncedSearch && (
            <span className="search-tag">"{debouncedSearch}"</span>
          )}
        </div>
      )}

      {/* Main Content */}
      <main className="main">
        {error && (
          <div className="error-card">
            <div className="error-icon">⚠</div>
            <h3>Something went wrong</h3>
            <p>{error}</p>
            <button
              className="btn-retry"
              onClick={() => fetchProducts(1, false)}
            >
              Try Again
            </button>
          </div>
        )}

        {loading && (
          <div className="masonry-grid">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">◎</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or filter</p>
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="masonry-grid">
            {products.map((product, i) => (
              <ProductCard
                key={`${product.id}-${i}`}
                product={product}
                index={i}
              />
            ))}
            {loadingMore &&
              Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={`sk-${i}`} />
              ))}
          </div>
        )}

        {/* Load More Button  */}
        {!loading && !error && hasMore && (
          <div className="load-more-wrap">
            <button
              className={`btn-load-more ${loadingMore ? "loading" : ""}`}
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? <span className="spinner" /> : "Load More"}
            </button>
          </div>
        )}

        {/* logic to implement the pagination*/}
        {!loading && !error && totalPages > 1 && (
          <div className="pagination">
            <button
              className="page-btn"
              disabled={page === 1}
              onClick={() => handlePageNav(page - 1)}
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2,
              )
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "..." ? (
                  <span key={`dots-${i}`} className="page-dots">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    className={`page-btn ${p === page ? "active" : ""}`}
                    onClick={() => handlePageNav(p)}
                  >
                    {p}
                  </button>
                ),
              )}
            <button
              className="page-btn"
              disabled={page === totalPages}
              onClick={() => handlePageNav(page + 1)}
            >
              →
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Made with ✦ by Pinstyle · {totalProducts} beautiful products</p>
      </footer>
    </div>
  );
}
