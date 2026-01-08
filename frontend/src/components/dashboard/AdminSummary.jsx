import React from 'react'
import SummaryCard from './SummaryCard.jsx';
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa';

const AdminSummary = () => {
  return (
    <div className='p-6'>
        <h3 className='text-2xl font-bold'>Dashboard Overview</h3>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
            <SummaryCard icon={<FaUsers />} text="Total Employees" number={15} bgColor="bg-linear-to-b from-indigo-200 to-indigo-500" />
            <SummaryCard icon={<FaBuilding />} text="Total Departments" number={5} bgColor="bg-linear-to-b from-yellow-200 to-yellow-500" />
            <SummaryCard icon={<FaMoneyBillWave />} text="Monthly Salary" number="₹200000" bgColor="bg-linear-to-b from-red-200 to-red-500" />
        </div>

        <div className='mt-12'>
            <h4 className='text-center text-2xl font-bold'>Leave Details</h4>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                <SummaryCard icon={<FaFileAlt />} text="Leave Applied" number={5} bgColor="bg-linear-to-b from-indigo-200 to-indigo-500" />
                <SummaryCard icon={<FaCheckCircle />} text="Leave Approved" number={2} bgColor="bg-linear-to-b from-green-200 to-green-500" />
                <SummaryCard icon={<FaHourglassHalf />} text="Leave Pending" number={4} bgColor="bg-linear-to-b from-yellow-200 to-yellow-500" />
                <SummaryCard icon={<FaTimesCircle />} text="Leave Rejected" number={1} bgColor="bg-linear-to-b from-red-200 to-red-500" />
            </div>
            
        </div>

    </div>
  )
}

export default AdminSummary;