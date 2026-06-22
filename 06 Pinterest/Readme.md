# 📌 Pinterest Clone

A full-stack Pinterest-inspired image sharing platform with secure authentication, post management, and save functionality.

---

## 🚀 Features

- 🔐 **Authentication** — Register and login with JWT-based auth
- 🔄 **Access & Refresh Tokens** — Silent token refresh on expiry, no forced logouts
- 🖼️ **Upload Posts** — Share images with title and description
- 🗑️ **Delete Posts** — Remove your own posts
- 🔖 **Save Posts** — Bookmark posts from other users
- 👤 **User Profile** — View your posts and saved collection

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios (with interceptors for auto token refresh)
- React Router DOM

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT (Access Token + Refresh Token)
- Bcrypt
- Cookie-parser (for httpOnly refresh token cookie)

---

## 📁 Project Structure

```
client/
├── src/
│   ├── api.js              # Axios instance with interceptors
│   ├── services/
│   │   ├── userService.js  # Auth, profile, saved posts
│   │   └── postService.js  # CRUD for posts
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Home.jsx
│   │   ├── Profile.jsx
│   │   └── SavedPosts.jsx
│   └── components/

server/
├── controllers/
│   ├── userController.js
│   └── postController.js
├── routes/
│   ├── userRouter.js
│   └── postRouter.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   └── Post.js
└── server.js
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/pinterest-clone.git
cd pinterest-clone
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
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLIENT_URL=http://localhost:5173
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

## 🔐 Authentication Flow

This project uses a dual-token strategy for secure, seamless authentication:

```
Login
  → Server returns accessToken (short-lived, 15min)
  → Server sets refreshToken in httpOnly cookie (7 days)

Every API request
  → Axios interceptor attaches accessToken from localStorage

AccessToken expires (401 response)
  → Interceptor calls GET /user/refreshToken automatically
  → Server reads httpOnly cookie, issues new accessToken
  → Failed request is retried transparently

Logout
  → accessToken cleared from localStorage
  → refreshToken cookie cleared on server
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/user/register` | Register new user | No |
| POST | `/user/login` | Login and get tokens | No |
| GET | `/user/refreshToken` | Refresh access token | Cookie |
| GET | `/user/logout` | Logout user | Yes |

### User
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/user/profile` | Get current user | Yes |
| GET | `/user/saved-posts` | Get saved posts | Yes |

### Posts
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/post/create` | Upload a new post | Yes |
| GET | `/post/all` | Get all posts | No |
| GET | `/post/mypost` | Get my posts | Yes |
| GET | `/post/:id` | Get single post | No |
| POST | `/post/save/:postId` | Save / unsave a post | Yes |
| DELETE | `/post/delete/:postId` | Delete a post | Yes |

---

## 🔒 Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 8000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_ACCESS_SECRET` | Secret for signing access tokens |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens |
| `CLIENT_URL` | Frontend URL for CORS |

---

## 📜 License

MIT License — feel free to use and modify this project.

---

> Built with ❤️ as a Pinterest-inspired full-stack project.