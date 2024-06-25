import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer } from 'react-toastify';
import  LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DashboardLayout from "./pages/Admin/DashboardLayout.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/dashboard" element={<DashboardLayout />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  );
};

export default App;
