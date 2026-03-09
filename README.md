# Pinstyle — Pinterest-Style Product Listing

A full-stack product listing app built with **React** (frontend) and **Node.js + Express** (backend).

---

##  Features

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



![image alt](https://github.com/Mayukh15/Pinterest-style-product-listing-page/blob/main/Screenshot%202026-03-09%20103644.png?raw=true)
