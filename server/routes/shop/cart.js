import express from "express";
import {
  deleteCartItem,
  addToCart,
  fetchCartItems,
  updateCartItemQty,
} from "../../controllers/shop/cart.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItemQty);
router.delete("/:userId/:productId", deleteCartItem);
export default router;
