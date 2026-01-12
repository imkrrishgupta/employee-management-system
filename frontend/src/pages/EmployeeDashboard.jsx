import React from 'react'
import EmployeeSidebar from '../components/dashboard/employee/EmployeeSidebar.jsx';
import Navbar from '../components/dashboard/Navbar.jsx';
import { Outlet } from 'react-router-dom';

const EmployeeDashboard = () => {
  return (
    <div className='flex'>
      <EmployeeSidebar />
      <div className='flex-1 ml-64 bg-gray-200 h-screen'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default EmployeeDashboard;