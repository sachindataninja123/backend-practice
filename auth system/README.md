# Node Auth System

A production-ready authentication system built with Node.js, Express, MongoDB, and JWT. Implements a secure access + refresh token flow with token blacklisting for true logout.

---

## Features

- JWT access token + refresh token flow
- Password hashing with bcrypt (pre-save hook)
- Refresh token stored in httpOnly cookie (XSS protection)
- Token blacklisting on logout (true stateless logout)
- Protected routes via auth middleware
- Environment variable validation on startup
- Consistent error handling across all routes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JSON Web Tokens (jsonwebtoken) |
| Hashing | bcryptjs |
| Cookies | cookie-parser |
| Config | dotenv |

---

## Project Structure

```
node-auth-system/
├── config/
│   └── config.js           # Environment variable validation & export
├── middleware/
│   └── isAuth.js           # JWT verification + blacklist check
├── model/
│   ├── user.model.js       # User schema with bcrypt pre-save hook
│   └── blacklist.model.js  # Token blacklist (auto-expires in 15min)
├── controllers/
│   └── auth.controller.js  # All auth logic
├── utils/
│   └── generateToken.js    # genAccessToken + genRefreshToken
├── routes/
│   └── auth.routes.js      # Route definitions
├── .env                    # Secret config (never commit)
├── .env.example            # Template for other developers
├── .gitignore
└── server.js               # Entry point
```

---

## API Endpoints

| Method | Route | Auth Required | Description |
|---|---|---|---|
| POST | `/api/auth/register` | ❌ | Register a new user |
| POST | `/api/auth/login` | ❌ | Login and receive tokens |
| GET | `/api/auth/profile` | ✅ | Get current user profile |
| POST | `/api/auth/refresh-token` | ❌ | Get a new access token |
| POST | `/api/auth/logout` | ✅ | Logout and invalidate tokens |

---

## Token Flow

```
POST /login
  └── Returns accessToken in response body     (expires: 15 min)
  └── Sets refreshToken in httpOnly cookie     (expires: 7 days)

Protected routes
  └── Send: Authorization: Bearer <accessToken>

Access token expires?
  └── POST /refresh-token
  └── Cookie sent automatically by browser
  └── Returns new accessToken

POST /logout
  └── Blacklists current accessToken in DB
  └── Clears refreshToken cookie
  └── Both tokens are now invalid ✓
```

---



### 1. Clone the repo

```bash
git clone https://github.com/your-username/node-auth-system.git
cd node-auth-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create your `.env` file

```bash
cp .env.example .env
```

Fill in your values:

```env
MONGO_URL=mongodb://localhost:27017/authdb
PORT=5000
JWT_SECRET=your_access_token_secret_here
JWT_REFRESH_SECRET=your_refresh_token_secret_here
```

> Use two **different** secrets for access and refresh tokens. If one is compromised, the other remains secure.

### 4. Start the server

```bash
# Development
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000`

---

## Usage Examples

### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "password": "secret123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "success": true,
  "user": {
    "_id": "...",
    "name": "Rahul Sharma",
    "email": "rahul@example.com"
  }
}
```

---

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "rahul@example.com",
  "password": "secret123"
}
```

**Response:**
```json
{
  "message": "User logged in successfully",
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "Rahul Sharma",
    "email": "rahul@example.com"
  }
}
```

> Refresh token is set automatically as an httpOnly cookie.

---

### Access Protected Route

```http
GET /api/auth/profile
Authorization: Bearer <accessToken>
```

**Response:**
```json
{
  "message": "User fetched successfully",
  "success": true,
  "user": {
    "_id": "...",
    "name": "Rahul Sharma",
    "email": "rahul@example.com"
  }
}
```

---

### Refresh Access Token

```http
POST /api/auth/refresh-token
```

> No body needed. The refresh token is read from the cookie automatically.

**Response:**
```json
{
  "message": "Access token refreshed",
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Logout

```http
POST /api/auth/logout
Authorization: Bearer <accessToken>
```

**Response:**
```json
{
  "message": "User logged out successfully",
  "success": true
}
```

---

## Security Decisions

**Why httpOnly cookie for refresh token?**
JavaScript cannot read httpOnly cookies, which protects the refresh token from XSS attacks.

**Why two different JWT secrets?**
If the access token secret is leaked, an attacker cannot forge refresh tokens, and vice versa.

**Why blacklist the access token on logout?**
JWT is stateless — clearing the cookie alone doesn't invalidate an access token. Blacklisting ensures the token is rejected immediately, even within its 15-minute window.

**Why does the blacklist auto-expire in 15 minutes?**
Access tokens live for 15 minutes maximum. Once expired, they're already invalid — no need to keep them in the blacklist. MongoDB TTL index handles the cleanup automatically.

**Why hash passwords in a pre-save hook instead of the controller?**
The model is responsible for its own data integrity. Hashing in the hook ensures passwords are always hashed regardless of which part of the code creates or updates a user.

---

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `MONGO_URL` | MongoDB connection string | ✅ |
| `PORT` | Port to run the server on | ✅ |
| `JWT_SECRET` | Secret for signing access tokens | ✅ |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens | ✅ |

---

## Error Responses

All errors follow this structure:

```json
{
  "message": "Description of what went wrong",
  "success": false
}
```

| Status Code | Meaning |
|---|---|
| 400 | Bad request (missing fields, user exists) |
| 401 | Unauthorized (invalid/expired/missing token) |
| 404 | User not found |
| 500 | Internal server error |

---

## .gitignore

Make sure your `.gitignore` includes:

```
node_modules/
.env
```

Never commit your `.env` file. Use `.env.example` with empty values instead.

---

## Author

Built as part of backend development practice. Part of the [backend-practice](https://github.com/your-username/backend-practice) repository.