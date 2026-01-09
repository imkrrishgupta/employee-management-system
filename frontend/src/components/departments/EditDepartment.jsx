import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios.js';

const EditDepartment = () => {
    const { _id } = useParams();
    const [department, setDepartment] = useState([]);
    const [depLoading, setDepLoading] = useState(false);

    const navigate = useNavigate();

    const API = api;

    useEffect(() => {
        const fetchDepartments = async () => {
            setDepLoading(true);
    
            try {
                const response = await API.get(`/departments/${_id}`);
    
                if (response.data.success){
                    setDepartment(response.data.data.department);
                }
    
            } catch (error) {
                if (error.response && !error.response.data.success){
                    alert(error.response.data.error);
                }
    
            } finally {
                setDepLoading(false);
    
            }
        }
        fetchDepartments();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDepartment({...department, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await API.put(`/departments/${_id}`, department);

            if (response.data.success){
                navigate("/admin-dashboard/departments", { replace: true });
            }

        } catch (error) {
            if (error.response && !error.response.data.success){
                alert(error.response.data.message);
            }
        }

    }

  return (

    <>
        {depLoading ? <div>Loading...</div> : 
        
            <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
                <h2 className='text-2xl font-bold mb-6'>Edit Department</h2>

                <form onSubmit={handleSubmit}>
          
                    <div>
            
                        <label 
                            htmlFor='dep_name'
                            className='text-sm font-medium text-gray-800'
                        >
                            Department Name
                        </label>
            
                        <input 
                            type="text" 
                            placeholder='Enter Dept. Name' 
                            onChange={handleChange}
                            value={department.dep_name}
                            id='dep_name' 
                            name='dep_name'
                            className='mt-1 w-full p-2 border rounded-md' 
                            required
                        />
          
                    </div>

                    <div className='mt-3'>
            
                        <label 
                            htmlFor='description'
                            className='block text-sm font-medium text-gray-800 mt-8'
                        >
                            Description
                        </label>
            
                        <textarea 
                            name='description' 
                            id='description' 
                            rows='4' 
                            onChange={handleChange}
                            value={department.description}
                            placeholder='Description'
                            className='mt-1 p-2 block w-full border rounded-md'
                        />

                    </div>

                    <button
                        type='submit'
                        className='w-full mt-6 bg-[#6C63FF] hover:bg-[#5A52E0] text-white font-bold py-2 px-4 rounded'
                    >
                        Edit Department
                    </button>

                </form>

            </div>
        }
    </>

  )
}

export default EditDepartment;