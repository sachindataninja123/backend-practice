# Express RBAC — Role Based Access Control API

A REST API built with Node.js and Express that implements Role Based Access Control (RBAC) on a blog post system. Users are assigned roles (admin, editor, viewer) that determine what actions they can perform.

---

## Features

- JWT authentication (access + refresh token flow)
- Three roles — admin, editor, viewer
- Role-based route protection via custom middleware
- Blog post CRUD with ownership check for editors
- Admin can assign roles to any user
- Password hashing with bcrypt (pre-save hook)
- Refresh token stored in httpOnly cookie
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
express-rbac/
├── config/
│   └── config.js              # Env variable validation & export
├── middleware/
│   ├── isAuth.js              # JWT verification middleware /  # Role checking middleware     
├── models/
│   ├── user.model.js          # User schema with role field
│   ├── post.model.js          # Post schema with author reference
│   └── blacklist.model.js     # Token blacklist (auto-expires)
├── controllers/
│   ├── auth.controller.js     # Register, login, logout, assign role
│   └── post.controller.js     # CRUD operations for blog posts
├── routes/
│   ├── auth.routes.js         # Auth route definitions
│   └── post.routes.js         # Post route definitions
├── utils/
│   └── generateToken.js       # genAccessToken + genRefreshToken
├── src/
│   └── app.js                 # Express app setup
├── .env                       # Secret config (never commit)
├── .env.example               # Template for other developers
├── .gitignore
└── server.js                  # Entry point
```

---

## Roles & Permissions

| Action | Viewer | Editor | Admin |
|---|---|---|---|
| GET /post/posts | ✅ | ✅ | ✅ |
| GET /post/posts/:id | ✅ | ✅ | ✅ |
| POST /post/create | ❌ | ✅ | ✅ |
| PUT /post/update/:id | ❌ | ✅ own posts only | ✅ any post |
| DELETE /post/delete/:id | ❌ | ❌ | ✅ |

---

## API Endpoints

### Auth Routes

| Method | Route | Auth | Role | Description |
|---|---|---|---|---|
| POST | `/api/auth/register` | ❌ | — | Register (default role: viewer) |
| POST | `/api/auth/login` | ❌ | — | Login and receive tokens |
| GET | `/api/auth/profile` | ✅ | any | Get current user profile |
| POST | `/api/auth/refresh-token` | ❌ | — | Get new access token |
| POST | `/api/auth/logout` | ✅ | any | Logout and invalidate tokens |

### Post Routes

| Method | Route | Auth | Role | Description |
|---|---|---|---|---|
| GET | `/api/post/posts` | ✅ | any | Get all posts |
| GET | `/api/post/posts/:id` | ✅ | any | Get post by ID |
| POST | `/api/post/create` | ✅ | editor, admin | Create a new post |
| PUT | `/api/post/update/:id` | ✅ | editor (own), admin | Update a post |
| DELETE | `/api/post/delete/:id` | ✅ | admin | Delete a post |

---

## How RBAC Works

### Two middleware layers on every protected route

```
Request
  ↓
isAuth          → verifies JWT access token from Authorization header
  ↓
authorizeRole   → checks if req.user.role is in the allowed roles list
  ↓
Controller      → runs only if both middleware pass
```

### authorizeRole middleware

```js
const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

```

### Editor ownership check

Editors can only update their own posts. Admins can update any post:

```js
if (req.user.role === "editor" &&
    post.author.toString() !== req.user._id.toString()) {
  return res.status(403).json({ message: "You can only edit your own posts" });
}
```

### 401 vs 403

```
401 Unauthorized → user is not logged in (isAuth handles this)
403 Forbidden    → user is logged in but lacks permission (authorizeRole handles this)
```

---

## Setup & Installation

### 1. Clone the repo

```bash
git clone https://github.com/sachindataninja123/backend-practice.git
cd RBAC auth system
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
MONGO_URL=mongodb://localhost:27017/rbacdb
PORT=5000
JWT_SECRET=your_access_token_secret_here
JWT_REFRESH_SECRET=your_refresh_token_secret_here
```

### 4. Start the server

```bash
# Development
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000`

---

## Testing in Postman

### Step 1 — Register 3 users

```http
POST /api/auth/register
Content-Type: application/json

{ "name": "Admin User",   "email": "admin@gmail.com",  "password": "admin123" }
{ "name": "Editor User",  "email": "editor@gmail.com", "password": "editor123" }
{ "name": "Viewer User",  "email": "viewer@gmail.com", "password": "viewer123" }
```

### Step 2 — Set admin role manually in MongoDB

All users start as `viewer`. Promote one to admin directly in MongoDB Compass or shell:

```js
db.users.updateOne(
  { email: "admin@gmail.com" },
  { $set: { role: "admin" } }
)
```

### Step 3 — Login as admin and assign editor role

```http
POST /api/auth/login
{ "email": "admin@gmail.com", "password": "admin123" }
```

Copy `accessToken` from response, then:

```http
PATCH /api/auth/assign-role
Authorization: Bearer <adminAccessToken>

{ "userId": "<editor user _id>", "role": "editor" }
```

### Step 4 — Test post routes

```http
POST /api/posts
Authorization: Bearer <editorAccessToken>

{ "title": "My First Post", "content": "Hello world" }
```

Try the same request with a viewer token — you should get `403 Forbidden`.

---

## Usage Examples

### Create a post (editor/admin)

```json
POST /api/posts
Authorization: Bearer <token>

{
  "title": "My Blog Post",
  "content": "This is the content of my post"
}
```

**Response:**
```json
{
  "message": "Post created successfully",
  "success": true,
  "post": {
    "_id": "...",
    "title": "My Blog Post",
    "content": "This is the content of my post",
    "author": "...",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Assign role (admin only)

```json
PATCH /api/auth/assign-role
Authorization: Bearer <adminToken>

{
  "userId": "664abc...",
  "role": "editor"
}
```

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
| 400 | Bad request (missing fields) |
| 401 | Unauthorized (invalid or missing token) |
| 403 | Forbidden (insufficient role permissions) |
| 404 | Resource not found |
| 500 | Internal server error |

---

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `MONGO_URL` | MongoDB connection string | ✅ |
| `PORT` | Port to run the server | ✅ |
| `JWT_SECRET` | Secret for signing access tokens | ✅ |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens | ✅ |

---

## .gitignore

```
node_modules/
.env
```

Never commit your `.env` file. Use `.env.example` with empty values instead.

---

## Author

Built as part of backend development practice. Part of the [backend-practice](https://github.com/your-username/backend-practice) repository.