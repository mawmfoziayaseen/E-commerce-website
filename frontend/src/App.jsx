import { Routes, Route, useLocation } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DashboardLayout from "./pages/Admin/DashboardLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Users from "./pages/Admin/Users";
import Products from "./pages/Admin/Products";
import Orders from "./pages/Admin/Orders";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Contract from "./pages/Contract";
import Profile from "./pages/Profile";
import Categories from "./pages/Admin/Categories";
import UpdateCategory from "./pages/Admin/UpdateCategory";
import AddProduct from "./pages/Admin/AddProduct";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import ProductDetails from "./pages/ProductDetails";

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  return (
    <>
      {!isAdmin && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:productId" element={<ProductDetails/>} />
        <Route path="/contact" element={<Contract />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Admin Routes */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/update/:slug" element={<UpdateCategory />} />
          <Route
            path="products/update/:productId"
            element={<UpdateProduct />}
          />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
