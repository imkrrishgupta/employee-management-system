import React from 'react'
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext.jsx';

const EmployeeSummaryCard = () => {
    const { user } = useAuth();

  return (
    <div className='rounded-lg flex bg-white m-8 shadow-lg'>
        <div className={`text-3xl flex justify-center items-center bg-linear-to-b from-indigo-200 to-indigo-500 text-white px-4 rounded p-6`}>
            <FaUser />
        </div>

        <div className='pl-4 py-1'>
            <p className='text-lg font-semibold'>Welcome Back</p>
            <p className='text-xl font-bold'>{user.name}</p>
        </div>
    </div>
  )
}

export default EmployeeSummaryCard;