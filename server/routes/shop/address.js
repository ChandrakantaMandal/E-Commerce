import express from "express";
import {
  deleteAddress,
  editAddress,
  addAddress,
  fetchAllAddress,
} from "../../controllers/shop/address.js";

const router = express.Router();

router.post("/add", addAddress);
router.get("/get/:userId", fetchAllAddress);
router.put("/update/:userId/:addressId", editAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);
export default router;
