import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import RoleBasedRoutes from "./utils/RoleBasedRoutes.jsx";
import AdminSummary from "./components/dashboard/AdminSummary.jsx";
import DepartmentList from "./components/departments/DepartmentList.jsx";
import AddDepartment from "./components/departments/AddDepartment.jsx";
import EditDepartment from "./components/departments/EditDepartment.jsx";
import EmployeeList from "./components/employees/EmployeeList.jsx";
import AddEmployee from "./components/employees/AddEmployee.jsx";
import ViewEmployee from "./components/employees/ViewEmployee.jsx";
import EditEmployee from "./components/employees/EditEmployee.jsx";

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
        <Route path="/admin-dashboard/add-department" element={<AddDepartment />} />
        <Route path="/admin-dashboard/departments/:_id" element={<EditDepartment />} />
        
        <Route path="/admin-dashboard/employees" element={<EmployeeList />} />
        <Route path="/admin-dashboard/add-employee" element={<AddEmployee />} />
        <Route path="/admin-dashboard/employees/:_id" element={<ViewEmployee />} />
        <Route path="/admin-dashboard/employees/edit/:_id" element={<EditEmployee />} />

      </Route>
        
      <Route path="/employee-dashboard" element={<EmployeeDashboard />} />  {/* Employee dashboard */}
    
    </Routes>
  )
}

export default App