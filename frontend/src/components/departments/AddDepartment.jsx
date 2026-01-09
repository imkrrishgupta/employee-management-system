import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../api/axios.js";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDepartment({...department, [name]: value.trim()});
  }

  const API = api;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // pass my data to server side to add a new record to the database

    try {
      const response = await API.post("/departments/add", department);

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
      <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-6'>Add New Department</h2>

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
              placeholder='Description'
              className='mt-1 p-2 block w-full border rounded-md'
            />

          </div>

          <button
            type='submit'
            className='w-full mt-6 bg-[#6C63FF] hover:bg-[#5A52E0] text-white font-bold py-2 px-4 rounded'
          >
            Add Department
          </button>

        </form>

      </div>
  )
}

export default AddDepartment;