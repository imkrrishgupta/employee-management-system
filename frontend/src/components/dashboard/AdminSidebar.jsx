import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaCogs } from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
        
        <div className='h-12 flex items-center justify-center'>
            <h3 className='font-serif text-2xl text-centre'>Employee MS</h3>
        </div>

        <div>
            
            <NavLink to='/admin-dashboard' className={({isActive}) => `${isActive ? "bg-[#373A8F]" : " "} flex items-center space-x-4 py-2.5 px-4 rounded-lg`} end>
                <FaTachometerAlt />
                <span>Dashboard</span>
            </NavLink>

            <NavLink to='/admin-dashboard' className='flex items-center space-x-4 py-2.5 px-4 rounded-lg'>
                <FaUser />
                <span>Employees</span>
            </NavLink>

            <NavLink to='/admin-dashboard/departments' className={({isActive}) => `${isActive ? "bg-[#373A8F]" : " "} flex items-center space-x-4 py-2.5 px-4 rounded-lg`}>
                <FaBuilding />
                <span>Departments</span>
            </NavLink>

            <NavLink to='/admin-dashboard' className='flex items-center space-x-4 py-2.5 px-4 rounded-lg'>
                <FaCalendarAlt />
                <span>Leaves</span>
            </NavLink>

            <NavLink to='/admin-dashboard' className='flex items-center space-x-4 py-2.5 px-4 rounded-lg'>
                <FaMoneyBillWave />
                <span>Salary</span>
            </NavLink>

            <NavLink to='/admin-dashboard' className='flex items-center space-x-4 py-2.5 px-4 rounded-lg'>
                <FaCogs />
                <span>Settings</span>
            </NavLink>

        </div>

    </div>
  )
}

export default AdminSidebar;