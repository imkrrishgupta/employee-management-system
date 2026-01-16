import React, { useEffect, useState } from 'react'
import api from '../../api/axios.js'
import { columns, LeaveButtons } from '../../utils/LeaveHelpers.jsx';
import DataTable from 'react-data-table-component';

const ViewLeave = () => {
    const [leaves, setLeaves] = useState(null)
    const [filteredLeaves, setFilteredLeaves] = useState(null);
    const [loading, setLoading] = useState(true);

    const API = api;

    const fetchLeaves = async () => {
        try {
            const response = await API.get("/leaves");

            if (response.data.success){
                let sno = 1;
                
                const data = await response.data.data.leaves.map((leave) => ({
                    _id: leave._id,
                    sno: sno++,
                    employeeId: leave.employeeId.employeeId,
                    avatar: leave.employeeId.userId.avatar,
                    name: leave.employeeId.userId.name,
                    department: leave.employeeId.department.dep_name,
                    days: Math.ceil(
                        (new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)) + 1,
                    status: leave.status,
                    action: <LeaveButtons _id={leave._id} /> 
                }))

                setLeaves(data);
                setFilteredLeaves(data);

            }

        } catch (error) {
            if (error.response && !error.response.data.success){
                alert(error.response.data.error);
            }
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchLeaves();
    }, [])

    const filterByInput = async (e) => {
        const data = leaves.filter((leave) => leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()));

        setFilteredLeaves(data);
    }

    const filterByButton = async (status) => {
        const data = leaves.filter((leave) => leave.status.toLowerCase().includes(status.toLowerCase()));

        setFilteredLeaves(data);

    }


  return (
    <>
        {loading ? <div>Loading...</div> : 
            
            <div>

                <div className='p-5'>

                    <div className='text-center'>
                        <h3 className='text-2xl font-bold m-2'>Manage Leaves</h3>
                    </div>

                    <div className='flex justify-between items-center m-4'>
          
                        <input 
                            type="text" 
                            placeholder='Search By Emp Id' 
                            onChange={filterByInput}
                            className='px-4 py-0.5 border rounded text-gray-800' 
                        />

                        <div className='space-x-3'>
                            <button className='px-4 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-md' onClick={() => filterByButton("Pending")}>Pending</button>
                            <button className='px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md' onClick={() => filterByButton("Rejected")}>Rejected</button>
                            <button className='px-2 py-1 bg-[#6C63FF] hover:bg-[#5A52E0] text-white rounded-md' onClick={() => filterByButton("Approved")}>Approved</button>
                        </div>

                    </div>

                    <div className='mt-5'>
                        <DataTable 
                            columns={columns} 
                            data={filteredLeaves}
                            pagination
                        />
                    </div>

                </div>

            </div>

        }

    </>

  )
}

export default ViewLeave;