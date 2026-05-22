import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./components/layout/nav/Menu";
import Footer from "./components/layout/footer/Footer";
import Contact from "./components/layout/contactus/Contact";
import Shop from "./pages/Shop";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import PageNotFound from "./pages/notfound/PageNotFound";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminRoute from "./components/routes/AdminRoute";
import AdminCategory from "./pages/admin/Category";
import AdminProduct from "./pages/admin/Product";
import Profile from "./pages/profile/Profile";
import UserProfile from "./pages/user/Profile";
import Order from "./pages/user/Order";
import AdminProducts from "./pages/admin/Products";
import AdminProductUpdate from "./pages/admin/ProductUpdate";
import Search from "./pages/Search";
import ProductView from "./pages/ProductView";
import CategoryProduct from "./pages/CategoryProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminOrders from "./pages/admin/Orders";

const App = () => {
  return (
    <BrowserRouter>
     <Toaster position="top-center" />
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductView/>} />
        <Route path="/cart" element={<Cart/>} />
  
        <Route path="/category/:slug" element={<CategoryProduct />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/orders" element={<Order />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/category" element={<AdminCategory />} />
          <Route path="admin/product" element={<AdminProduct />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route
            path="admin/product/update/:slug"
            element={<AdminProductUpdate />}
          />
          <Route path="admin/orders" element={<AdminOrders />} />

        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
