import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import RoleBasedRoutes from "./utils/RoleBasedRoutes.jsx";
import AdminSummary from "./components/dashboard/AdminSummary.jsx";
import DepartmentList from "./components/departments/DepartmentList.jsx";

function App() {

  return (
    <Routes>
      
      <Route path="/" element={<Navigate to="/admin-dashboard" />} />  {/* Main website */}
      <Route path="/login" element={<Login />} />  {/* Login page */}

      {/* Admin dashboard */}
      
      <Route 
        path="/admin-dashboard" 
        element={
          <RoleBasedRoutes requiredRole={["admin"]}>
            <AdminDashboard />
          </RoleBasedRoutes>
        } 
      >
        <Route index element={<AdminSummary />} />
        <Route path="/admin-dashboard/departments" element={<DepartmentList />} />

      </Route>
        
      <Route path="/employee-dashboard" element={<EmployeeDashboard />} />  {/* Employee dashboard */}
    
    </Routes>
  )
}

export default App