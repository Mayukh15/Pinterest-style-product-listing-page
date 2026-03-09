const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Static product data with real Unsplash images
const PRODUCTS = [
  { id: 1, title: "Minimalist Ceramic Vase", price: 49.99, category: "Home", image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&q=80" },
  { id: 2, title: "Leather Crossbody Bag", price: 129.00, category: "Fashion", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80" },
  { id: 3, title: "Wooden Desk Lamp", price: 89.50, category: "Home", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80" },
  { id: 4, title: "Vintage Sunglasses", price: 65.00, category: "Fashion", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80" },
  { id: 5, title: "Succulent Plant Set", price: 34.99, category: "Plants", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&q=80" },
  { id: 6, title: "Linen Throw Blanket", price: 75.00, category: "Home", image: "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=400&q=80" },
  { id: 7, title: "Artisan Coffee Mug", price: 28.00, category: "Kitchen", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80" },
  { id: 8, title: "Silk Scarf", price: 95.00, category: "Fashion", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80" },
  { id: 9, title: "Wooden Jewelry Box", price: 55.00, category: "Home",image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80" },
  { id: 10, title: "Terracotta Pot", price: 22.99, category: "Plants", image: "https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=400&q=80" },
  { id: 11, title: "Straw Tote Bag", price: 45.00, category: "Fashion", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80" },
  { id: 12, title: "Marble Candle Holder", price: 39.00, category: "Home", image: "https://images.unsplash.com/photo-1602532305019-3dbbd482dae9?w=400&q=80" },
  { id: 13, title: "Rattan Side Table", price: 149.00, category: "Furniture", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
  { id: 14, title: "Gold Hoop Earrings", price: 32.00, category: "Jewelry", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80" },
  { id: 15, title: "Linen Tote Bag", price: 29.99, category: "Fashion", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80" },
  { id: 16, title: "Beeswax Candle Set", price: 42.00, category: "Home", image: "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=400&q=80" },
  { id: 17, title: "Woven Cushion Cover", price: 25.00, category: "Home", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80" },
  { id: 18, title: "Monstera Plant", price: 59.99, category: "Plants", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&q=80" },
  { id: 19, title: "Denim Jacket", price: 119.00, category: "Fashion", image: "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=400&q=80" },
  { id: 20, title: " Rolleiflex TLR (Twin Lens Reflex) Camera", price: 58.00, category: "Accessories",image: "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=400&q=80"},
  { id: 21, title: "Boho Dreamcatcher", price: 19.99, category: "Home", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
  { id: 22, title: "Raffia Sun Hat", price: 38.00, category: "Fashion", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&q=80" },
  { id: 23, title: "Essential Oil Diffuser", price: 67.00, category: "Wellness", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80" },
  { id: 24, title: "Vintage Leather Journal", price: 31.00, category: "Stationery", image: "https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?w=400&q=80" },
  { id: 25, title: "Knit Sweater", price: 89.00, category: "Fashion", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&q=80" },
  { id: 26, title: "Bamboo Cutting Board", price: 36.00, category: "Kitchen", image: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=400&q=80" },
  { id: 27, title: "Crystal Pendant Necklace", price: 48.00, category: "Jewelry", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80" },
  { id: 28, title: "Jute Rug 4x6", price: 175.00, category: "Home", image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&q=80" },
  { id: 29, title: "Pressed Flower Frame", price: 44.00, category: "Art", image: "https://images.unsplash.com/photo-1490750967868-88df5691cc5c?w=400&q=80" },
  { id: 30, title: "Elegant Wine Glass Pair", price: 62.00, category: "Kitchen", image: "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?w=400&q=80" },
  { id: 31, title: "Lemon Verbena Soap", price: 12.99, category: "Wellness", image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400&q=80" },
  { id: 32, title: "Vintage Mirror", price: 225.00, category: "Furniture", image: "https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?w=400&q=80" },
  { id: 33, title: "Floral Tray", price: 27.00, category: "Home", image: "https://images.unsplash.com/photo-1609082830682-0e8f2ae5c1b1?w=400&q=80" },
  { id: 34, title: "Satin Sleep Mask", price: 18.00, category: "Wellness", image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&q=80" },
  { id: 35, title: "Handwoven Basket", price: 52.00, category: "Home", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80" },
  { id: 36, title: "Boho Ankle Boots", price: 139.00, category: "Fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
  { id: 37, title: "Macadamia Body Oil", price: 33.00, category: "Wellness", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80" },
  { id: 38, title: "Rubber Plant", price: 88.00, category: "Plants", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&q=80" },
  { id: 39, title: "Classic Seiko Diver's Watch", price: 14.99, category: "Accessories", image: "https://images.unsplash.com/photo-1596516109370-29001ec8ec36?w=400&q=80" },
  { id: 40, title: "Printed Silk Top", price: 105.00, category: "Fashion", image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&q=80" },
];

// GET /api/products
app.get('/api/products', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search?.toLowerCase() || '';
  const category = req.query.category || '';

  let filtered = PRODUCTS;

  if (search) {
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search)
    );
  }

  if (category && category !== 'All') {
    filtered = filtered.filter(p => p.category === category);
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const products = filtered.slice(start, start + limit);

  res.json({
    products,
    currentPage: page,
    totalPages,
    totalProducts: total,
    hasMore: page < totalPages,
  });
});

// GET /api/categories
app.get('/api/categories', (req, res) => {
  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];
  res.json({ categories });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
