# 🛍️ ShopSphere

> A modern full-stack e-commerce platform built with **React, Node.js, Express and MongoDB**.

🔗 **Live Website:** https://shop-sphere-frontend-nine.vercel.app/  
🔗 **Backend API:** https://shopsphere-backend-asl3.onrender.com/

---

## ✨ Overview

**ShopSphere** is a full-stack e-commerce application designed with a modern, Amazon-inspired shopping experience.

Users can browse products, search and filter products, view detailed product information, manage their cart, place orders, manage their profile and submit product reviews.

The project also includes an **Admin Dashboard** for managing products, orders and users.

---

## 🚀 Live Demo

### Frontend
https://shop-sphere-frontend-nine.vercel.app/

### Backend API
https://shopsphere-backend-asl3.onrender.com/

### API Health Check
https://shopsphere-backend-asl3.onrender.com/api/health

---

## 🧰 Tech Stack

### Frontend
- React 18
- React Router DOM
- Axios
- Lucide React
- Vite
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Cookie Parser
- CORS
- Morgan

### Deployment
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## ⭐ Main Features

### 🛒 Shopping
- Browse all products
- Category-based product browsing
- Product search
- Product filtering
- Price filtering
- Customer-rating filtering
- Product sorting
- Discount sorting
- Pagination
- Product details page
- Product image gallery
- Add to cart
- Buy Now flow
- Quantity management
- Stock availability

### 👤 User Features
- User registration
- User login
- JWT-based authentication
- User profile
- Address management
- Order history
- Secure logout
- Protected routes

### ⭐ Reviews
- Product ratings
- Customer reviews
- Review submission
- Review deletion

### 🔐 Admin Features
- Admin dashboard
- Product management
- Add products
- Edit products
- Delete products
- Order management
- User management
- User role management

### 🎨 UI/UX
- Responsive design
- Amazon-inspired navigation
- Category navigation
- Search bar
- Product cards
- Loading skeletons
- Mobile navigation
- Responsive filters
- Promotional sections
- Trust/service sections
- Modern product image handling

---

## 📂 Project Structure

```text
ShopSphere/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── admin/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── seed/
    ├── utils/
    ├── server.js
    ├── package.json
    └── .env.example
```

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd ShopSphere
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd backend
npm install
```

---

## 🔑 Environment Variables

### Frontend

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

For the deployed frontend, use your deployed backend API URL:

```env
VITE_API_URL=https://shopsphere-backend-asl3.onrender.com/api
```

### Backend

Create:

```text
backend/.env
```

Configure your MongoDB connection and authentication settings according to `backend/.env.example`.

**Never commit real passwords, JWT secrets or other credentials to GitHub.**

---

## ▶️ Run Locally

### Start Backend

```bash
cd backend
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### Start Frontend

In another terminal:

```bash
cd frontend
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🗄️ Database & Product Seeding

The backend includes a product seed script.

To seed products:

```bash
cd backend
npm run seed
```

To remove seeded products:

```bash
npm run seed:destroy
```

---

## 🔌 API Routes

The backend provides REST APIs for:

```text
/api/auth
/api/products
/api/orders
/api/reviews
/api/users
```

Health endpoint:

```text
/api/health
```

Example product request:

```text
GET /api/products
```

Example category request:

```text
GET /api/products?category=Fashion
```

---

## 🛡️ Security

The application includes:

- Password hashing with bcryptjs
- JWT authentication
- Protected user routes
- Admin authorization
- HTTP-only authentication cookies
- CORS configuration
- Environment-based secrets

---

## 📱 Responsive Experience

ShopSphere is designed to work across:

- 💻 Desktop
- 💻 Laptop
- 📱 Mobile
- 📲 Tablet

The navigation, filters, product grids and shopping experience adapt to different screen sizes.

---

## 🖼️ Product Images

Product image handling supports:

- Backend-provided product images
- Content-specific image selection
- Product/category relevant image pools
- Image fallbacks
- Product image galleries
- Reduced repetition across product cards
- Image error fallback handling

---

## 🌐 Deployment

### Frontend — Vercel

The React/Vite frontend is deployed on Vercel:

https://shop-sphere-frontend-nine.vercel.app/

### Backend — Render

The Express API is deployed on Render:

https://shopsphere-backend-asl3.onrender.com/

### Database — MongoDB Atlas

Product, user, order and review data are stored in MongoDB through Mongoose.

---

## 🧪 Build

To create a production frontend build:

```bash
cd frontend
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🎯 Project Highlights

ShopSphere demonstrates a complete full-stack development workflow:

**React UI → REST API → Express Backend → MongoDB Database**

It includes authentication, authorization, product management, cart functionality, orders, reviews, filtering, search, responsive UI and an admin dashboard.

---

## 👩‍💻 Author

**ShopSphere — Full-Stack E-Commerce Project**

Built as a practical full-stack web development project using the MERN-style architecture.

---

## 📄 License

This project is intended for educational and portfolio purposes.
