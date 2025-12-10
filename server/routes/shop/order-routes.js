import express from "express";

import {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
} from "../../controllers/shop/order-controller.js";
import { authMiddleware } from "../../controllers/auth/auth.js";

const router = express.Router();

router.post("/create", authMiddleware, createOrder);
router.get("/list/:userId", authMiddleware, getAllOrdersByUser);
router.get("/details/:id", authMiddleware, getOrderDetails);

export default router;
