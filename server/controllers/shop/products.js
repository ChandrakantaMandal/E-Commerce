import Product from "../../model/Product.js";

const getFilterProducts = async (req, res) => {
  try {
    const { category = "", brand = "", price = "price-lowtohigh" } = req.query;
    const query = {};
    if (category && category.length > 0) {
      query.category = { $in: category.split(",") };
    }
    if (brand && brand.length > 0) {
      query.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (price) {
      case "price-lowtohigh":
        sort = { price: 1 };
        break;
      case "price-hightolow":
        sort = { price: -1 };
        break;
      case "title-atoz":
        sort = { title: 1 };
        break;
      case "title-ztoa":
        sort = { title: -1 };
        break;
      default:
        sort = { price: 1 };
        break;
    }

    const products = await Product.find(query).sort(sort);
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error in getFilterProducts:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error to fetch product details",
    });
  }
};

export { getFilterProducts, getProductDetails };
