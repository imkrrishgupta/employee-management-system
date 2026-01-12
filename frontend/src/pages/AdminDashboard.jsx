import React from 'react'
import { useAuth } from '../context/AuthContext'
import AdminSidebar from '../components/dashboard/admin/AdminSidebar.jsx'
import Navbar from '../components/dashboard/Navbar.jsx'
import AdminSummary from '../components/dashboard/admin/AdminSummary.jsx'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  const { user } = useAuth()

  return (
    <div className='flex'>
      <AdminSidebar />
      <div className='flex-1 ml-64 bg-gray-200 h-screen'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard;