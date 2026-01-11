import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../../api/axios.js';

function ViewEmployee() {
    const { _id } = useParams();
    const [employee, setEmployee] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);

    const API = api;

    useEffect(() => {
        const fetchEmployee = async () => {
            setEmpLoading(true);
    
            try {
                const response = await API.get(`/employees/${_id}`);
    
                if (response.data.success){
                    setEmployee(response.data.data.employee);
                }
    
            } catch (error) {
                if (error.response && !error.response.data.success){
                    alert(error.response.data.error);
                }
    
            } finally{
                setEmpLoading(false);

            }
        }

        fetchEmployee();
    }, []);

  return (
    <>
    
        {empLoading ? <div>Loading...</div> :
            
            <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>

                <h2 className='text-2xl font-bold mb-8 text-center'>
                    Employee Details
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            
                    <div>
                        <img 
                            src={employee.userId?.avatar}
                            className='rounded-full border w-72'
                        />
                    </div>

                    <div>

                        <div className='flex space-x-3 mb-5'>
                            <p className='text-lg font-bold'>Name:</p>
                            <p className='font-medium'>{employee.userId?.name}</p>
                        </div>

                        <div className='flex space-x-3 mb-5'>
                            <p className='text-lg font-bold'>Employee Id:</p>
                            <p className='font-medium'>{employee.employeeId}</p>
                        </div>

                        <div className='flex space-x-3 mb-5'>
                            <p className='text-lg font-bold'>Date of Birth:</p>
                            <p className='font-medium'>{new Date(employee.dob).toLocaleDateString("en-IN")}</p>
                        </div>

                        <div className='flex space-x-3 mb-5'>
                            <p className='text-lg font-bold'>Gender:</p>
                            <p className='font-medium'>{employee.gender}</p>
                        </div>

                        <div className='flex space-x-3 mb-5'>
                            <p className='text-lg font-bold'>Department:</p>
                            <p className='font-medium'>{employee.department?.dep_name}</p>
                        </div>

                        <div className='flex space-x-3 mb-5'>
                            <p className='text-lg font-bold'>Designation:</p>
                            <p className='font-medium'>{employee.designation}</p>
                        </div>

                        <div className='flex space-x-3 mb-5'>
                            <p className='text-lg font-bold'>Marital Status:</p>
                            <p className='font-medium'>{employee.maritalStatus}</p>
                        </div>

                    </div>

                </div>

            </div>
        }

    </>

  )
}

export default ViewEmployee;