import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelpers.jsx';
import api from '../../api/axios.js';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({});

    const API = api;

    const navigate = useNavigate();

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        }

        getDepartments();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "avatar"){
            setFormData((prev) => ({...prev, [name]: files[0]}));
        } else{
            setFormData((prev) => ({...prev, [name]: value}))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formDataObject = new FormData();
        
        Object.keys(formData).forEach((key) => {
            formDataObject.append(key, formData[key])
        })

        // pass my data to server side to add a new record to the database

        try {
            const response = await API.post("/employees/add", formDataObject);

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
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-6'>Add New Employee</h2>

        <form onSubmit={handleSubmit}>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                {/* Name */}

                <div>

                    <label htmlFor="name" className='block text-sm font-medium text-gray-800'>
                        Name
                    </label>

                    <input 
                        type="text" 
                        name='name'
                        id='name'
                        placeholder='Insert Name'
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border rounded-md'
                        required
                    />

                </div>

                {/* Email */}

                <div>

                    <label htmlFor="email" className='block text-sm font-medium text-gray-800'>
                        Email
                    </label>

                    <input 
                        type='text'
                        name='email'
                        id='email'
                        placeholder='Insert Email'
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border rounded-md'
                        required
                    />
                    
                </div>

                {/* Employee ID */}

                <div>

                    <label htmlFor="employeeId" className='block text-sm font-medium text-gray-800'>
                        Employee ID
                    </label>

                    <input 
                        type="text" 
                        name='employeeId'
                        id='employeeId'
                        placeholder='Employee ID'
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border rounded-md'
                        required
                    />

                </div>

                {/* Date of Birth */}

                <div>

                    <label htmlFor='dob' className='block text-sm font-medium text-gray-800'>
                        Date of Birth
                    </label>

                    <input 
                        type="date" 
                        name="dob" 
                        id="dob" 
                        placeholder='DOB'
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border rounded-md'
                        required
                    />

                </div>

                {/* Gender */}

                <div>

                    <label htmlFor='gender' className='block text-sm font-medium text-gray-800'>
                        Gender
                    </label>

                    <select 
                        name='gender'
                        id='gender'
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border rounded-md'
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>

                </div>

                {/* Marital Status */}

                <div>

                    <label htmlFor="maritalStatus" className='block text-sm font-medium text-gray-800'>
                        Marital Status
                    </label>

                    <select
                        name='maritalStatus'
                        id='maritalStatus'
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border rounded-md'
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                    </select>

                </div>

                {/* Designation */}

                <div>

                    <label htmlFor="designation" className='block text-sm font-medium text-gray-800'>
                        Designation
                    </label>

                    <input 
                        type="text" 
                        name="designation" 
                        id="designation" 
                        placeholder='Designation'
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border rounded-md'
                        required
                    />

                </div>

                {/* Department */}

                <div>

                    <label htmlFor="department" className='block text-sm font-medium text-gray-800'>
                        Department
                    </label>

                    <select 
                        name="department" 
                        id="department"
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border rounded-md'
                        required
                    >
                        <option value="">Select Department</option>
                        {departments.map(dep => (
                            <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                        ))}
                    </select>

                </div>

                {/* Salary */}

                <div>

                    <label htmlFor="salary" className='block text-sm font-medium text-gray-800'>
                        Salary
                    </label>

                    <input 
                        type="number" 
                        name='salary'
                        id='salary'
                        placeholder='Salary'
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border rounded-md'
                        required
                    />

                </div>

                {/* Password */}

                <div>

                    <label htmlFor="password" className='block text-sm font-medium text-gray-800'>
                        Password
                    </label>

                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder='Enter Passsword'
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border rounded-md'
                        required
                    />

                </div>

                {/* Role */}

                <div>

                    <label htmlFor="role" className='block text-sm font-medium text-gray-800'>
                        Role
                    </label>

                    <select 
                        name="role" 
                        id="role"
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border rounded-md'
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                    </select>

                </div>

                {/* Image Upload */}

                <div>

                    <label htmlFor="avatar" className='block text-sm font-medium text-gray-800'>
                        Upload Image
                    </label>

                    <input 
                        type="file" 
                        name="avatar" 
                        id="avatar" 
                        placeholder='Upload Image'
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border rounded-md'
                        accept='image/*'
                    />

                </div>

            </div>

            <button
                type='submit'
                className='w-full mt-6 bg-[#6C63FF] hover:bg-[#5A52E0] text-white font-bold py-2 px-4 rounded'
            >
                Add Employee
            </button>

        </form>

    </div>
  )
}

export default AddEmployee;