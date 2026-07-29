# backend-practice

My backend development practice projects built with Node.js, Express, MongoDB, Authentication, REST APIs and more.

---

## Projects

| # | Project | Description |
|---|---|---|
| 01 | [Auth System](#01-auth-system) | JWT-based authentication with protected routes |
| 02 | [RBAC Auth System](#02-rbac-auth-system) | Role-based access control with multiple user roles |
| 03 | [Chess](#03-chess) | Chess game with backend logic |
| 04 | [Noteskeeper](#04-noteskeeper) | Notes app with protected CRUD routes |
| 05 | [URL Shortner](#05-url-shortner) | Full-stack URL shortener with frontend integration |
| 05 | [Pinterest Clone](#06-Pinterest-Clone) | Full-stack Pinterest with frontend integration 
| [EJS Practice](#EJS-Practice) | Ejs practice with dummy data and different files

---

## 01 Auth System

A foundational authentication system using JWT tokens and secure password hashing.

**Features**
- User registration and login
- JWT token generation and verification
- Protected routes with auth middleware
- Password hashing with bcrypt

**Tech:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

---

## 02 RBAC Auth System

Extends the basic auth system with Role-Based Access Control — different users have different permissions.

**Features**
- Multiple user roles (e.g. admin, user, moderator)
- Role-based middleware for route protection
- Permission checks per endpoint

**Tech:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

---

## 03 Chess
|
A chess game with backend logic for move validation and game state management.

**Features**
- Chess game logic on the server
- Move validation
- Game state tracking

**Tech:** Node.js, Express, Socket.IO

---

## 04 Noteskeeper

A notes management app with authentication and protected CRUD operations.

**Features**
- Create, read, update, delete notes
- User-specific notes (each user sees only their own)
- Protected routes — login required

**Tech:** Node.js, Express, MongoDB, Mongoose, JWT

---

## 05 URL Shortner

A full-stack URL shortener — paste a long URL, get a short one. Frontend integrated with backend.

**Features**
- Shorten any URL to a compact link
- Redirect from short URL to original
- Click tracking
- Frontend UI integrated with backend API

**Tech:** Node.js, Express, MongoDB, Mongoose, EJS / HTML

---

## 06 Pinterest Clone

A full-stack Pinterest-inspired image sharing platform with secure authentication, post management, and save functionality.


**Features**
- Authentication — Register and login with JWT-based auth
- Access & Refresh Tokens — Silent token refresh on expiry, no forced logouts
- Upload Posts — Share images with title and description
- Delete Posts — Remove your own posts
- Save Posts — Bookmark posts from other users
- User Profile — View your posts and saved collection

**Tech:** Node.js , Express, MongoDB, Mongoose, React, Context API

## Getting Started

Each project lives in its own folder. To run any project:

```bash
# Navigate to the project folder
cd 01\ auth\ system

# Install dependencies
npm install

# Add a .env file with your config (see below)

# Start the server
npm start
```

### Common Environment Variables

Most projects use some combination of these:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

---

## Tech Stack

- **Runtime** — Node.js
- **Framework** — Express.js
- **Database** — MongoDB + Mongoose
- **Auth** — JWT + bcrypt
- **Real-time** — Socket.IO (Chess)
- **Templating** — EJS

---

## Author

**Sachin Kushwaha** — [sachindataninja123](https://github.com/sachindataninja123)

