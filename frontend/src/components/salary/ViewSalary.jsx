import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../../api/axios.js';
import DataTable from 'react-data-table-component';

const ViewSalary = () => {
    const [salaries, setSalaries] = useState(null);
    const [filteredSalaries, setFilteredSalaries] = useState(null);

    const { _id } = useParams();

    const API = api;

    let sno = 1;

    const fetchSalaries = async () => {
        try {
            const response = await API.get(`/salary/${_id}`);

            if (response.data.success){
                setSalaries(response.data.data.salary);
                setFilteredSalaries(response.data.data.salary);
            }
            
        } catch (error) {
            if (error.response && !error.response.data.success){
                alert(error.response.data.error);
            }

        }
    }

    useEffect(() => {
        fetchSalaries();
    }, []);

   const filterSalaries = (e) => {
        const q = e.target.value.toLowerCase();

        const filteredRecords = salaries.filter((salary) =>
            salary.employeeId?.userId?.name?.toLowerCase().includes(q)
        );

        setFilteredSalaries(filteredRecords);
    };


    const columns = [
        {
            name: "S.No.",
            selector: () => sno++,
            width: "80px",
            center: true
        },
        {
            name: "Employee Name",
            cell: row => (
                <div className="flex items-center gap-2">
                    <img
                        src={row.employeeId?.userId?.avatar}    
                        alt="avatar"
                        className="w-8 h-8 rounded-full"
                    />
                    <span>{row.employeeId?.userId?.name}</span>
                </div>
            )
        },
        {
            name: "Basic Salary",
            selector: row => row.basicSalary,
            sortable: true
        },
        {
            name: "Allowances",
            selector: row => row.allowances
        },
        {
            name: "Deductions",
            selector: row => row.deductions
        },
        {
            name: "Net Salary",
            selector: row => row.netSalary,
            sortable: true
        },
        {
            name: "Pay Date",
            selector: row => new Date(row.payDate).toLocaleDateString("en-IN"),
        }
    ];

  return (
    <>
        {filteredSalaries === null ? (
            <div className="p-5">Loading...</div>
        ) : (
            <div className='p-5'>

                <div className='text-center'>
                    <h2 className='text-2xl font-bold'>Salary History</h2>
                </div>

                <div className='flex justify-end my-3'>
                    <input 
                        type='text'
                        placeholder='Search by Emp Name'
                        className='border px-2 rounded-md py-0.5'
                        onChange={filterSalaries}
                    />
                </div>

                <DataTable
                    columns={columns}
                    data={filteredSalaries}
                    pagination
                />

            </div>
        )}
    </>
  )
}

export default ViewSalary;