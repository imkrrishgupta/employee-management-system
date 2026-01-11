import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import api from '../../api/axios.js';
import DataTable from 'react-data-table-component';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelpers.jsx';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const API = api;

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
  
      try {
        const response = await API.get("/employees");
  
        if (response.data.success){
          let sno = 1;
  
          const data = await response.data.data.employees.map((emp) => (
            {
              _id: emp._id,
              sno: sno++,
              dep_name: emp.department.dep_name,
              name: emp.userId.name,
              dob: new Date(emp.dob).toLocaleDateString("en-IN"),  // Doing this as the dob coming in frontend is of string type so we will pass this as an object then convert it into string type and in indian format
              avatar: emp.userId.avatar,
              action: (<EmployeeButtons _id={emp._id} />)
            }
          ))

          setEmployees(data);
          setFilteredEmployees(data);

        }
  
      } catch (error) {
        if (error.response && !error.response.data.success){
          alert(error.response.data.error);
        }
  
      } finally {
        setEmpLoading(false);

      }
    }
      
    fetchEmployees();
  }, [])

  const filterEmployees = (e) => {
    const records = employees.filter((emp) => emp.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredEmployees(records);
  }

  return (
    <>
      {empLoading ? <div>Loading...</div> : 
        
        <div className='p-5'>
      
          <div className='text-center'>
            <h3 className='text-2xl font-bold m-2'>Manage Employees</h3>
          </div>

          <div className='flex justify-between items-center m-4'>
          
            <input 
              type="text" 
              placeholder='Search By Name' 
              onChange={filterEmployees}
              className='px-4 py-0.5 border rounded text-gray-800' 
            />

            <Link to="/admin-dashboard/add-employee" className='px-4 py-1 bg-[#6C63FF] hover:bg-[#5A52E0] rounded-lg text-white'>Add new Employee</Link>
          
          </div>

          <div className='mt-5'>
            <DataTable 
              columns={columns} 
              data={filteredEmployees}
              pagination
            />
          </div>
          
        </div>
      
      }
    </>
  )
}

export default EmployeeList;