
import Order from "../../model/Order.js";
import Product from "../../model/Product.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const productList = await Product.find({});

    const totalRevenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue =
      totalRevenueResult.length > 0 ? totalRevenueResult[0].totalRevenue : 0;

    const orderStatusDistribution = await Order.aggregate([
      {
        $group: {
          _id: "$orderStatus",
          count: { $sum: 1 },
        },
      },
    ]);

    const paymentMethodDistribution = await Order.aggregate([
      {
        $group: {
          _id: "$paymentMethod",
          count: { $sum: 1 },
        },
      },
    ]);

    const totalStockResult = await Product.aggregate([
      {
        $group: {
            _id: null,
            totalStock: { $sum: "$totalStock" }
        }
      }
    ])

    const totalStock = totalStockResult.length > 0 ? totalStockResult[0].totalStock : 0;


    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalOrders,
        totalRevenue,
        totalStock,
        orderStatusDistribution,
        productList,
        paymentMethodDistribution,
      },
    });
  } catch (e) {

    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};
