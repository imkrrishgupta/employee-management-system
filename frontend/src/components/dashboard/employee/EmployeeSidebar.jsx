import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { FaTachometerAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaCogs } from "react-icons/fa";
import { useAuth } from '../../../context/AuthContext.jsx';

const EmployeeSidebar = () => {
    const { user } = useAuth();

  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
        
            <div className='h-12 flex items-center justify-center border-b border-gray-600'>
                <h3 className='font-serif text-2xl text-centre'>Employee MS</h3>
            </div>

            <div>
            
                <NavLink to='/employee-dashboard' className={({isActive}) => `${isActive ? "bg-[#373A8F]" : " "} flex items-center space-x-4 py-2.5 px-4 rounded-lg`} end>
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to={`/employee-dashboard/profile/${user._id}`} className={({isActive}) => `${isActive ? "bg-[#373A8F]" : " "} flex items-center space-x-4 py-2.5 px-4 rounded-lg`}>
                    <FaUser />
                    <span>My Profile</span>
                </NavLink>

                <NavLink to='/employee-dashboard/leaves' className={({isActive}) => `${isActive ? "bg-[#373A8F]" : " "} flex items-center space-x-4 py-2.5 px-4 rounded-lg`}>
                    <FaBuilding />
                    <span>Leaves</span>
                </NavLink>

                <NavLink to={`/employee-dashboard/salary/${user._id}`} className={({isActive}) => `${isActive ? "bg-[#373A8F]" : " "} flex items-center space-x-4 py-2.5 px-4 rounded-lg`}>
                    <FaCalendarAlt />
                    <span>Salary</span>
                </NavLink>

                <NavLink to='/employee-dashboard/settings' className={({isActive}) => `${isActive ? "bg-[#373A8F]" : " "} flex items-center space-x-4 py-2.5 px-4 rounded-lg`}>
                    <FaCogs />
                    <span>Settings</span>
                </NavLink>

            </div>
            
    </div>
  )
}

export default EmployeeSidebar;