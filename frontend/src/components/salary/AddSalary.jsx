import React, { useEffect, useState } from 'react'
import { fetchDepartments, getEmployees } from '../../utils/EmployeeHelpers.jsx';
import api from '../../api/axios.js';
import { useNavigate } from 'react-router-dom';

const AddSalary = () => {
    const [salary, setSalary] = useState({
        employeeId: null,
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        payDate: null
    });
    const [departments, setDepartments] = useState(null);
    const [employees, setEmployees] = useState([]);

    const API = api;

    const navigate = useNavigate();

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        }
    
        getDepartments();
    }, []);

    const handleDepartment = async (e) => {
        const emps = await getEmployees(e.target.value);
        setEmployees(emps);

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post("/salary/add", salary);

            if (response.data.success){
                navigate("/admin-dashboard/employees", { replace: true });
            }

        } catch (error) {
            if (error.response && !error.response.data.success){
                alert(error.response.data.message);
            }
        }

    }
 
  return (

    <>

    {salary && departments ? (
        <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-6'>Add Salary</h2>

            <form onSubmit={handleSubmit}>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                    {/* Department */}

                    <div>

                        <label htmlFor="department" className='block text-sm font-medium text-gray-800'>
                            Department
                        </label>

                        <select 
                            name="department" 
                            id="department"
                            onChange={handleDepartment}
                            className='mt-1 p-2 block w-full border rounded-md'
                            required
                        >
                            <option value="">Select Department</option>
                            {departments.map(dep => (
                                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                            ))}
                        </select>

                    </div>

                    {/* Employee */}

                    <div>

                        <label htmlFor="employee" className='block text-sm font-medium text-gray-800'>
                            Employee
                        </label>

                        <select 
                            name="employeeId" 
                            id="employee"
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border rounded-md'
                            required
                        >
                            <option value="">Select Employee</option>
                            {employees.map(emp => (
                                <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                            ))}
                        </select>

                    </div>

                    {/* Basic Salary */}

                    <div>

                        <label htmlFor="basicSalary" className='block text-sm font-medium text-gray-800'>
                            Basic Salary
                        </label>

                        <input 
                            type="number" 
                            name="basicSalary" 
                            id="basicSalary" 
                            placeholder='Basic Salary'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border rounded-md'
                            required
                        />

                    </div>

                    {/* Allowances */}

                    <div>

                        <label htmlFor="allowances" className='block text-sm font-medium text-gray-800'>
                            Allowances
                        </label>

                        <input 
                            type="number" 
                            name='allowances'
                            id='allowances'
                            placeholder='allowances'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border rounded-md'
                            required
                        />

                    </div>

                    {/* Deductions */}

                    <div>

                        <label htmlFor="deductions" className='block text-sm font-medium text-gray-800'>
                            Deductions
                        </label>

                        <input 
                            type="number" 
                            name='deductions'
                            id='deductions'
                            placeholder='Deductions'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border rounded-md'
                            required
                        />

                    </div>

                    {/* Pay Date */}

                    <div>

                        <label htmlFor='payDate' className='block text-sm font-medium text-gray-800'>
                            Pay Date
                        </label>

                        <input 
                            type="date" 
                            name="payDate" 
                            id="payDate" 
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border rounded-md'
                            required
                        />

                    </div>

                </div>

                <button
                    type='submit'
                    className='w-full mt-6 bg-[#6C63FF] hover:bg-[#5A52E0] text-white font-bold py-2 px-4 rounded'
                >
                    Add Salary
                </button>

            </form>

        </div> 

        ) : <div>Loading...</div>
    }
    
    </>
  )
}

export default AddSalary;