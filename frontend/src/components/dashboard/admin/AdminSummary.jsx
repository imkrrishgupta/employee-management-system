import React, { useEffect, useState } from 'react'
import SummaryCard from './SummaryCard.jsx';
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa';
import api from "../../../api/axios.js";

const AdminSummary = () => {
    const [summary, setSummary] = useState(null);

    const API = api;

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await API.get("/dashboard/summary");

                setSummary(response);

            } catch (error) {
                console.log(error);
            }
        }

        fetchSummary();
    }, []);

    if (!summary){
        return (<div>Loading...</div>)
    }

  return (
    <div className='p-6'>
        <h3 className='text-2xl font-bold'>Dashboard Overview</h3>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
            
            <SummaryCard 
                icon={<FaUsers />} 
                text="Total Employees" 
                number={summary.data.data.summary.totalEmployees} 
                bgColor="bg-linear-to-b from-indigo-200 to-indigo-500" 
            />

            <SummaryCard 
                icon={<FaBuilding />} 
                text="Total Departments" 
                number={summary.data.data.summary.totalDepartments} 
                bgColor="bg-linear-to-b from-amber-200 to-amber-500" 
            />

            <SummaryCard 
                icon={<FaMoneyBillWave />} 
                text="Total Monthly Salary" 
                number={`₹ ${summary.data.data.summary.totalSalary}`}
                bgColor="bg-linear-to-b from-red-200 to-red-500" 
            />

        </div>

        <div className='mt-12'>
            <h4 className='text-center text-2xl font-bold'>Leave Details</h4>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                
                <SummaryCard 
                    icon={<FaFileAlt />} 
                    text="Leave Applied" 
                    number={summary.data.data.summary.leaveSummary.appliedFor} 
                    bgColor="bg-linear-to-b from-indigo-200 to-indigo-500" 
                />
                
                <SummaryCard 
                    icon={<FaCheckCircle />} 
                    text="Leave Approved" 
                    number={summary.data.data.summary.leaveSummary.approved} 
                    bgColor="bg-linear-to-b from-green-200 to-green-500" 
                />
                
                <SummaryCard 
                    icon={<FaHourglassHalf />} 
                    text="Leave Pending" 
                    number={summary.data.data.summary.leaveSummary.pending} 
                    bgColor="bg-linear-to-b from-amber-200 to-amber-500" 
                />
                
                <SummaryCard 
                    icon={<FaTimesCircle />} 
                    text="Leave Rejected" 
                    number={summary.data.data.summary.leaveSummary.rejected} 
                    bgColor="bg-linear-to-b from-red-200 to-red-500" 
                />
            
            </div>
            
        </div>

    </div>
  )
}

export default AdminSummary;