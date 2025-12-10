import Order from "../../model/Order.js";
import Cart from "../../model/Cart.js";
import Product from "../../model/Product.js";

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId,
    } = req.body;

    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
    });

    await newlyCreatedOrder.save();

    await Cart.findByIdAndDelete(cartId);

    res.status(201).json({
      success: true,
      orderId: newlyCreatedOrder._id,
      message: "Order created successfully",
    });
  } catch (e) {

    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {

    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {

    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

export { createOrder, getAllOrdersByUser, getOrderDetails };
