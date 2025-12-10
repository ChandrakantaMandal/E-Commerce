import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth/auth.js";
import adminProductRoutes from "./routes/admin/products.js";
import shopProductRoutes from "./routes/shop/products.js";
import shopCartRoutes from "./routes/shop/cart.js";
import shopAddressRoutes from "./routes/shop/address.js";
import shopOrderRoutes from "./routes/shop/order-routes.js";
import adminOrderRoutes from "./routes/admin/order-routes.js";
import adminDashboardRoutes from "./routes/admin/dashboard-routes.js";
import adminFeatureRoutes from "./routes/admin/feature-routes.js";
import shopSearchRouter from "./routes/shop/search-routes.js";
import shopReviewRouter from "./routes/shop/review-routes.js";

import connectToDB from "./db/conectToDB.js";

dotenv.config();
connectToDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/shop/products", shopProductRoutes);
app.use("/api/shop/cart", shopCartRoutes);
app.use("/api/shop/address", shopAddressRoutes);
app.use("/api/shop/order", shopOrderRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/admin/feature", adminFeatureRoutes);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.listen(PORT, () => {});
