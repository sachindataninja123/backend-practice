# Notes App

A full-stack Notes Application built using the MERN Stack.  
Users can create, manage, update, and delete notes with secure JWT authentication.

---

## 🚀 Features

- User Authentication (Register/Login/Logout)
- JWT Token Authentication
- Protected Routes
- Create Notes
- Edit Notes
- Delete Notes
- View Notes History
- My Profile Page
- Responsive Navbar
- Context API State Management
- Toast Notifications
- Fully Responsive UI

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Toastify
- Context API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

## 📂 Folder Structure

```bash
project/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── App.jsx
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js

🔐 Environment Variables
Create a .env file inside backend folder.

PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key