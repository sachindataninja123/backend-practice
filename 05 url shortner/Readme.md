# 🔗 URL Shortener

A full-stack URL shortener web app that converts long URLs into clean, shareable short links with custom alias support.

---

## 🚀 Features

- 🔗 **Shorten URLs** — Convert any long URL into a short, shareable link
- ✏️ **Custom Alias** — Choose your own custom slug instead of a random one
- 🔁 **Redirect** — Short links instantly redirect to the original URL
- 🖥️ **Clean UI** — Simple frontend to create and manage short links

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- React Router DOM

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- Nanoid (for generating short codes)

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```

### 2. Setup the backend
```bash
cd server
npm install
```

Create a `.env` file in the `/server` directory:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:8000
```

Start the server:
```bash
npm run dev
```

### 3. Setup the frontend
```bash
cd client
npm install
npm run dev
```

---

## 🔄 How It Works

```
User enters a long URL + optional custom alias
  → POST /url/shorten
  → Server checks if alias is already taken
  → Saves { originalUrl, shortCode } to MongoDB
  → Returns the short URL

User visits the short URL
  → GET /:shortCode
  → Server looks up shortCode in MongoDB
  → Redirects to originalUrl (301/302)
```

---

## 📡 API Endpoints

### URL
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/url/shorten` | Create a short URL |
| GET | `/:shortCode` | Redirect to original URL |
| GET | `/url/all` | Get all shortened URLs |

### Request Body — `POST /url/shorten`
```json
{
  "originalUrl": "https://www.example.com/some/very/long/url",
  "customAlias": "my-link"
}
```

### Response
```json
{
  "success": true,
  "shortUrl": "http://localhost:8000/my-link",
  "originalUrl": "https://www.example.com/some/very/long/url"
}
```

---

## 🗄️ MongoDB Schema

```javascript
// Url.js
{
  originalUrl: { type: String, required: true },
  shortCode:   { type: String, required: true, unique: true },
  createdAt:   { type: Date, default: Date.now }
}
```

---

## 🔒 Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 8000) |
| `MONGO_URI` | MongoDB connection string |
| `BASE_URL` | Base URL used to build short links |

---

## 📜 License

MIT License — feel free to use and modify this project.

---

> Built with ❤️ as a full-stack URL shortener project.