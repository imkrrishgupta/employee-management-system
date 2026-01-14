import React, { useState, useEffect } from 'react'
import api from '../../api/axios.js';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { useAuth } from '../../context/AuthContext.jsx';

const LeaveList = () => {
    const { user } = useAuth();
    
    const [leaves, setLeaves] = useState([]);
    const [leaveLoading, setLeaveLoading] = useState(false);
    const [filteredLeaves, setFilteredLeaves] = useState([]);

    const API = api;

    const columns = [
        {
            name: "S.No.",
            selector: (row) => row.sno,
            width: "80px",
            center: true
        },
        {
            name: "Leave Type",
            selector: (row) => row.leaveType,
            sortable: true,
            center: true
        },
        {
            name: "From Date",
            selector: (row) => row.fromDate,
            sortable: true,
            center: true
        },
        {
            name: "To Date",
            selector: (row) => row.toDate,
            sortable: true,
            center: true
        },
        {
            name: "Reason",
            selector: (row) => row.reason,
            center: true
        },
        {
            name: "Applied Date",
            selector: (row) => row.applied,
            center: true
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
            center: true,
            cell: (row) => (
                <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                    row.status === "Approved"
                    ? "bg-green-500"
                    : row.status === "Rejected"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                    }`}
                >
                    {row.status}
                </span>

            )
        }
    ];

    useEffect(() => {
        const fetchLeaves = async () => {
            setLeaveLoading(true);

        try {
            const response = await API.get(`/leaves/${user._id}`);

            if (response.data.success) {
                let sno = 1;

                const data = response.data.data.leaves.map((leave) => ({
                    _id: leave._id,
                    sno: sno++,
                    leaveType: leave.leaveType,
                    fromDate: new Date(leave.startDate).toLocaleDateString("en-IN"),
                    toDate: new Date(leave.endDate).toLocaleDateString("en-IN"),
                    reason: leave.reason,
                    applied: new Date(leave.createdAt).toLocaleDateString("en-IN"),
                    status: leave.status
                }));

                setLeaves(data);
                setFilteredLeaves(data);

            }

        } catch (error) {
            if (error.response && !error.response.data.success) {
            alert(error.response.data.error);

            }
        } finally {
            setLeaveLoading(false);
        }

    };

        fetchLeaves();
    }, []);

    const filterLeaves = (e) => {
        const value = e.target.value.toLowerCase();

        const records = leaves.filter((leave) =>
            leave.status?.toLowerCase().includes(value)
        );

        setFilteredLeaves(records);
    };


    return (
        <>
            {leaveLoading ? <div>Loading...</div> : 

                <div className='p-5'>

                    <div className='text-center'>
                        <h3 className='text-2xl font-bold m-2'>Manage Leaves</h3>
                    </div>

                    <div className='flex justify-between items-center m-4'>
          
                        <input 
                            type="text" 
                            placeholder='Search By Status' 
                            onChange={filterLeaves}
                            className='px-4 py-0.5 border rounded text-gray-800' 
                        />

                        <Link to="/employee-dashboard/leaves/add-leave" className='px-4 py-1 bg-[#6C63FF] hover:bg-[#5A52E0] rounded-lg text-white'>Add new Leave</Link>
          
                    </div>

                    <DataTable
                        columns={columns}
                        data={filteredLeaves}
                        pagination
                    />

                </div>

            }
        </>
    )

}

export default LeaveList;