import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Navigate to="/login" />} />  {/* Main website */}
        <Route path="/login" element={<Login />} />  {/* Login page */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />  {/* Admin dashboard */}

      </Routes>
    </BrowserRouter>
  )
}

export default App