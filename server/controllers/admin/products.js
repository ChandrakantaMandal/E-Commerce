import Product from "../../model/Product.js";
import { imageUploadUtils } from "../../helpers/cloudinary.js";

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = `data:${req.file.mimetype};base64,${b64}`;
    const result = await imageUploadUtils(url);

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error uploading image",
    });
  }
};

//add product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newlyCreateProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newlyCreateProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreateProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error to add product",
    });
  }
};

//Fetch All Products
const fetchAllProducts = async (req, res) => {
  try {
    const listOfProduct = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProduct,
    });
  } catch (error) {
    console.error("Error in fetchAllProducts:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
    });
  }
};

//Edit product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const findProduct = await Product.findById(id);
    if (!findProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price || findProduct.price;
    findProduct.salePrice = salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error to edit product",
    });
  }
};

//Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product delete succesfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error to delete product",
    });
  }
};

export {
  handleImageUpload,
  deleteProduct,
  addProduct,
  editProduct,
  fetchAllProducts,
};
