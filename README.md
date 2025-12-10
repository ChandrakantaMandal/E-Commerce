# 🛒 E-Commerce Platform

A robust, full-featured E-Commerce application built with the modern MERN stack (MongoDB, Express.js, React, Node.js). This platform provides a seamless shopping experience for users and a powerful dashboard for administrators to manage products, orders, and content.

## ✨ Key Features

### � User/Shopper Features
*   **Authentication & Security**: Secure User Registration and Login using JWT (JSON Web Tokens) with HttpOnly cookies for enhanced security.
*   **Product Discovery**:
    *   Dynamic Homepage with feature sliders and category highlights.
    *   Advanced Product Filtering (Category, Brand, Price Range).
    *   Sorting options (Price: Low to High, High to Low, etc.).
    *   Real-time Search functionality.
*   **Shopping Experience**:
    *   **Product Details**: Comprehensive product views with images, descriptions, pricing, and stock status.
    *   **Reviews System**: Verified purchase reviews allowing users to rate and comment on products they've bought.
    *   **Shopping Cart**: persistent cart management (add, update quantities, remove items).
    *   **Checkout Flow**: Seamless checkout integrated with address management.
*   **Order Management**:
    *   Order history dashboard.
    *   Detailed order views with status tracking (Pending, Processing, Shipped, Delivered).

### �️ Admin Dashboard
*   **Analytics**: Visual dashboard displaying total sales, order counts, and other key metrics.
*   **Product Management**:
    *   Create, Read, Update, Delete (CRUD) operations for products.
    *   Image upload capability via Cloudinary integration.
*   **Order Control**:
    *   View all customer orders.
    *   Update order statuses (e.g., mark as Shipped or Delivered).
*   **Feature Management**:
    *   Control homepage hero images dynamically.
    *   Upload and manage banner images directly from the dashboard.

## 🏗️ Technical Architecture

### Frontend (Client)
*   **Framework**: [React.js](https://reactjs.org/) (Vite)
*   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) for efficient global state handling (Auth, Cart, Products, Orders).
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) for responsive design.
*   **UI Components**: [ShadCN UI](https://ui.shadcn.com/) based on Radix UI for accessible and customizable components.
*   **Routing**: React Router DOM.
*   **Notifications**: Sonner for toast notifications.

### Backend (Server)
*   **Runtime**: [Node.js](https://nodejs.org/)
*   **Framework**: [Express.js](https://expressjs.com/) for RESTful API architecture.
*   **Database**: [MongoDB](https://www.mongodb.com/) with Mongoose ODM for data modeling.
*   **Image Storage**: [Cloudinary](https://cloudinary.com/) API for optimized image hosting.
*   **Authentication**: JWT (JSON Web Tokens) & BCrypt for password hashing.
*   **Payment Gateway**: PayPal API integration.

## 📂 Project Structure

```
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── assets/         # Static assets (images, icons)
│   │   ├── components/     # Reusable UI components (Admin & Shop views)
│   │   ├── pages/          # Main route pages (Home, Auth, Admin, etc.)
│   │   ├── store/          # Redux slices and store configuration
│   │   └── lib/            # Utility functions
│
├── server/                 # Backend Node.js Application
│   ├── controllers/        # Logic for route handlers (Auth, Products, Orders)
│   ├── models/             # Mongoose schemas (User, Product, Order, Review)
│   ├── routes/             # API route definitions
│   ├── helpers/            # Helper utilities (Cloudinary, PayPal)
│   └── db/                 # Database connection logic
```

## ⚡ Getting Started

Follow these steps to set up the project locally.

### Prerequisites
*   Node.js (v14 or higher)
*   MongoDB (Local or Atlas URL)
*   Cloudinary Account (for images)
*   PayPal Developer Account (for payments)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ecommerce-project.git
cd ecommerce-project
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory with the following credentials:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<your-db-url>
CLIENT_BASE_URL=http://localhost:5173
JWT_SECRET=your_super_secret_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the client directory, and install dependencies:
```bash
cd client
npm install
```

Start the frontend development server:
```bash
npm run dev
```

### 4. Access the App
Open your browser and navigate to `http://localhost:5173`.

## 📡 API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **Auth** | | |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user & set cookie |
| **Products** | | |
| GET | `/api/shop/products` | Get filtered products |
| GET | `/api/shop/products/get/:id` | Get single product details |
| **Orders** | | |
| POST | `/api/shop/order/create` | Create a new order |
| GET | `/api/shop/order/list/:userId` | Get user order history |
| **Admin** | | |
| POST | `/api/admin/products/add` | Add new product |
| PUT | `/api/admin/order/update/:id` | Update order status |

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request for review.

## 📄 License
This project is licensed under the MIT License.
