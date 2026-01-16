import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import RoleBasedRoutes from "./utils/RoleBasedRoutes.jsx";
import AdminSummary from "./components/dashboard/admin/AdminSummary.jsx";
import DepartmentList from "./components/departments/DepartmentList.jsx";
import AddDepartment from "./components/departments/AddDepartment.jsx";
import EditDepartment from "./components/departments/EditDepartment.jsx";
import EmployeeList from "./components/employees/EmployeeList.jsx";
import AddEmployee from "./components/employees/AddEmployee.jsx";
import ViewEmployee from "./components/employees/ViewEmployee.jsx";
import EditEmployee from "./components/employees/EditEmployee.jsx";
import AddSalary from "./components/salary/AddSalary.jsx";
import ViewSalary from "./components/salary/ViewSalary.jsx";
import EmployeeSummaryCard from "./components/dashboard/employee/EmployeeSummaryCard.jsx";
import LeaveList from "./components/leave/LeaveList.jsx";
import AddLeave from "./components/leave/AddLeave.jsx";
import EmployeeSettings from "./components/dashboard/employee/EmployeeSettings.jsx";
import RouteRedirect from "./utils/RouteRedirect.jsx";
import ViewLeave from "./components/leave/ViewLeave.jsx";
import LeaveDetails from "./components/leave/LeaveDetails.jsx";
import AdminSettings from "./components/dashboard/admin/AdminSettings.jsx";

function App() {

  return (
    <Routes>
      
      <Route path="/" element={<RouteRedirect />} />  {/* Main website */}
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
        <Route path="/admin-dashboard/employees/salary/:_id" element={<ViewSalary />} />

        <Route path="/admin-dashboard/salary/add" element={<AddSalary />} />

        <Route path="/admin-dashboard/leaves" element={<ViewLeave />} />
        <Route path="/admin-dashboard/leaves/:_id" element={<LeaveDetails />} />
        <Route path="/admin-dashboard/employees/leaves/:_id" element={<LeaveList />} />

        <Route path="/admin-dashboard/settings" element={<AdminSettings />} />

      </Route>
        
      {/* Employee dashboard */}

      <Route 
        path="/employee-dashboard" 
        element={
          <RoleBasedRoutes requiredRole={["employee"]}>
            <EmployeeDashboard />
          </RoleBasedRoutes>
        } 
      >

        <Route index element={<EmployeeSummaryCard />} />
        <Route path="/employee-dashboard/profile/:_id" element={<ViewEmployee />} />
        <Route path="/employee-dashboard/leaves/:_id" element={<LeaveList />} />
        <Route path="/employee-dashboard/leaves/add-leave" element={<AddLeave />} />
        <Route path="/employee-dashboard/salary/:_id" element={<ViewSalary />} />
        <Route path="/employee-dashboard/settings" element={<EmployeeSettings />} />

      </Route>
    
    </Routes>
  )
}

export default App;