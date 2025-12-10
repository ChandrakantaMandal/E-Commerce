import Order from "../../model/Order.js";
import Product from "../../model/Product.js";
import ProductReview from "../../model/Review.js";

export const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    let order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
    });

    if (!order) {
      const product = await Product.findById(productId);
      
      if(product){
        order = await Order.findOne({
            userId,
            "cartItems.title": product.title
        });
      }
    }

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase product to review it.",
      });
    }

    const checkExistingReview = await ProductReview.findOne({
      productId,
      userId,
    });

    if (checkExistingReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product!",
      });
    }

    const newReview = new ProductReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();

    const reviews = await ProductReview.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewsLength;

    await Product.findByIdAndUpdate(productId, { averageReview });

    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (e) {

    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ProductReview.find({ productId });
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (e) {

    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};
