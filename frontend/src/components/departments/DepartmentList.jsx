import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelpers.jsx';
import api from "../../api/axios.js";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const API = api;

  const onDepartmentDelete = async (_id) => {
    const data = departments.filter((dep) => dep._id !== _id);
    
    setDepartments(data);

  }

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);

      try {
        const response = await API.get("/departments");

        if (response.data.success){
          let sno = 1;

          const data = await response.data.data.departments.map((dep) => (
            {
              _id: dep._id,
              sno: sno++,
              dep_name: dep.dep_name,
              action: (<DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />)
            }
          ))

          setDepartments(data);
          setFilteredDepartments(data);

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
  }, [])

  const filterDepartments = (e) => {
    const records = departments.filter((dep) => dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredDepartments(records);
  }

  return (
    
    <>
      {depLoading ? <div>Loading....</div> : 
      
        <div className='p-5'>
      
          <div className='text-center'>
            <h3 className='text-2xl font-bold m-2'>Manage Departments</h3>
          </div>

          <div className='flex justify-between items-center m-4'>
          
            <input 
              type="text" 
              placeholder='Search By Dept. Name' 
              className='px-4 py-0.5 border rounded text-gray-800' 
              onChange={filterDepartments} 
            />

            <Link to="/admin-dashboard/add-department" className='px-4 py-1 bg-[#6C63FF] hover:bg-[#5A52E0] rounded-lg text-white'>Add new Department</Link>
          
          </div>

          <div className='mt-5'>
            <DataTable 
              columns={columns}
              data={filteredDepartments}
              pagination
            />
          </div>

        </div>

      }
    </>
    
  )
}

export default DepartmentList;