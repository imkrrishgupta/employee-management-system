import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";

function App() {

  return (
    <Routes>
      
      <Route path="/" element={<Navigate to="/login" />} />  {/* Main website */}
      <Route path="/login" element={<Login />} />  {/* Login page */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />  {/* Admin dashboard */}
      <Route path="/employee-dashboard" element={<EmployeeDashboard />} />  {/* Employee dashboard */}
    
    </Routes>
  )
}

export default App