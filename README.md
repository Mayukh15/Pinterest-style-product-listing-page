# Pinstyle — Pinterest-Style Product Listing

A full-stack product listing app built with **React** (frontend) and **Node.js + Express** (backend).

---

## ✦ Features

| Feature | Implementation |
|---|---|
| Pinterest-style masonry grid | CSS `columns` property — responsive 2–5 columns |
| Pagination | Backend page/limit params; page nav buttons |
| Load More | Appends next page to existing list without refresh |
| Lazy Loading | `IntersectionObserver` — images load only when in viewport |
| Skeleton Loader | Shimmer cards shown during API requests |
| Error Handling | Friendly error card with retry button |
| Search | Debounced live search (350ms) across title & category |
| Category Filter | Filter pills — All / Home / Fashion / Plants / etc. |
| Hover Effects | Save button overlay + image scale + card lift |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+

### 1. Start the Backend

```bash
cd backend
npm install
npm start
# → Server running on http://localhost:4000
```

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
# → App running on http://localhost:3000
```

### 3. Demo (no backend required)

Open `demo.html` directly in a browser. Uses a built-in mock API that simulates real network latency.

---

## 📡 API Reference

### `GET /api/products`

**Query Parameters:**

| Param | Type | Default | Description |
|---|---|---|---|
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Products per page |
| `search` | string | "" | Search query |
| `category` | string | "" | Category filter |

**Response:**
```json
{
  "products": [
    {
      "id": 1,
      "title": "Minimalist Ceramic Vase",
      "price": 49.99,
      "category": "Home",
      "image": "https://..."
    }
  ],
  "currentPage": 1,
  "totalPages": 4,
  "totalProducts": 40,
  "hasMore": true
}
```

### `GET /api/categories`

```json
{
  "categories": ["All", "Home", "Fashion", "Plants", "Kitchen", ...]
}
```

---

## 🗂 Project Structure

```
pinterest-app/
├── backend/
│   ├── server.js        # Express API with 40 products
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx      # Main React component
│   │   ├── App.css      # All styles
│   │   └── main.jsx     # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── demo.html            # Standalone demo (no backend needed)
└── README.md
```

---

## 🧠 Technical Decisions

**Masonry Layout**: Used CSS `columns` instead of JavaScript-based masonry (e.g. Masonry.js) to avoid layout thrashing. Pure CSS — performant and responsive.

**Lazy Loading**: Native `IntersectionObserver` API with a `100px` root margin so images preload just before they enter the viewport.

**Debounced Search**: 350ms debounce on search input to avoid hammering the API on every keystroke.

**Skeleton Loaders**: Varying heights in skeleton cards match the real card variance, preventing layout shift when content loads.

**Load More + Pagination**: Both implemented simultaneously. Load More appends data; pagination replaces and scrolls to top.
