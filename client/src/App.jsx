import React, { lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice/index.js";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import ShoppinhCheckOut from "./pages/shopping-view/checkout.jsx";

const AuthLayout = lazy(() => import("@/components/auth/layout.jsx"));
const AdminLayout = lazy(() => import("@/components/admin-view/layout.jsx"));
const ShoppingLayout = lazy(() =>
  import("@/components/shopping-view/layout.jsx")
);

const CheckAuth = lazy(() => import("@/components/common/check-auth.jsx"));

const AuthRegister = lazy(() => import("./pages/auth/register.jsx"));
const AuthLogin = lazy(() => import("./pages/auth/login.jsx"));

const AdminDashboard = lazy(() => import("./pages/admin-view/dashboard.jsx"));
const AdminFeatures = lazy(() => import("./pages/admin-view/features.jsx"));
const AdminOrders = lazy(() => import("./pages/admin-view/orders.jsx"));
const AdminProducts = lazy(() => import("./pages/admin-view/products.jsx"));

const ShoppinhHome = lazy(() => import("./pages/shopping-view/home.jsx"));
const ShoppinhListing = lazy(() => import("./pages/shopping-view/listing.jsx"));
const ShoppinhAccount = lazy(() => import("./pages/shopping-view/account.jsx"));
const SearchProducts = lazy(() => import("./pages/shopping-view/search.jsx"));
const PaymentSuccessPage = lazy(() => import("./pages/shopping-view/payment-success.jsx"));

const PublicLayout = lazy(() =>
  import("@/components/shopping-view/public-layout.jsx")
);

const UnauthPage = lazy(() => import("./pages/unauth-page/index.jsx"));

const Error404 = lazy(() => import("./pages/not-found/index.jsx"));

const App = () => {
  const { isAuthenticated, user, isLoding } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoding) {
    return <Skeleton className="h-[200px] w-[100px] rounded-full" />;
  }
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common components */}
      <Routes>
        {/* public root: home only, no user/cart */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<ShoppinhHome />} />
        </Route>

        {/* auth routes */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* admin routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        {/* shopping routes */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppinhHome />} />
          <Route path="listing" element={<ShoppinhListing />} />
          <Route path="account" element={<ShoppinhAccount />} />
          <Route path="checkout" element={<ShoppinhCheckOut/>} />
          <Route path="payment-success" element={<PaymentSuccessPage/>} />
          <Route path="search" element={<SearchProducts/>} />
        </Route>

        <Route path="/unauth-page" element={<UnauthPage />} />

        {/* 404 page */}
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
