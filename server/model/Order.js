import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: String,
  cartId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: String,
      quantity: Number,
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  orderStatus: {
    type: String,
    default: "pending",
  },
  paymentMethod: {
    type: String,
    default: "COD",
  },
  paymentStatus: {
    type: String,
    default: "pending",
  },
  totalAmount: Number,
  orderDate: Date,
  orderUpdateDate: Date,
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
