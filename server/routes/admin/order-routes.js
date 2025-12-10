import express from "express";

import {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "../../controllers/admin/order-controller.js";
import { authMiddleware } from "../../controllers/auth/auth.js";

const router = express.Router();

router.get("/get", authMiddleware, getAllOrdersOfAllUsers);
router.get("/details/:id", authMiddleware, getOrderDetailsForAdmin);
router.put("/update/:id", authMiddleware, updateOrderStatus);

export default router;
