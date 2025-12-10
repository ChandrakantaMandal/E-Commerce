
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardStats } from "@/store/admin/dashboard-slice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, ShoppingBag, ShoppingBasket, Archive } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function AdminDashboard() {
  const dispatch = useDispatch();
  const { dashboardData, isLoading } = useSelector(
    (state) => state.adminDashboard
  );

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  const {
    totalProducts = 0,
    totalOrders = 0,
    totalRevenue = 0,
    totalStock = 0,
    orderStatusDistribution = [],
    productList = [],
    paymentMethodDistribution = [],
  } = dashboardData || {};

  const barChartData = orderStatusDistribution.map((item) => ({
    status: item._id,
    count: item.count,
  }));

  const pieChartData = paymentMethodDistribution.map((item) => ({
    name: item._id,
    value: item.count,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <div className="flex flex-col gap-4">
      {/* Row 1: Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <ShoppingBasket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStock}</div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pl-2 flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Product List (Full Width) */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Product Stock Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Sale Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productList && productList.length > 0 ? (
                productList.map((product) => (
                  <TableRow
                    key={product._id}
                    className={product.totalStock < 10 ? "bg-red-100" : ""}
                  >
                    <TableCell className="font-medium">{product.title}</TableCell>
                    <TableCell
                      className={product.totalStock < 10 ? "text-red-600 font-bold" : ""}
                    >
                      {product.totalStock} {product.totalStock < 10 ? "(Low)" : ""}
                    </TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>${product.salePrice}</TableCell>
                  </TableRow>
                ))
              ) : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;