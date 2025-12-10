import express from "express";
import {
  handleImageUpload,
  addProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "../../controllers/admin/products.js";
import { upload } from "../../helpers/cloudinary.js";

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.delete("/delete/:id", deleteProduct);
router.post("/edit/:id", editProduct);
router.get("/get", fetchAllProducts);
export default router;
