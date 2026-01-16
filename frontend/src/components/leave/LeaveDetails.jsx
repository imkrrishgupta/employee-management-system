import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios.js';

function LeaveDetails() {
  const { _id } = useParams();
  const [leave, setLeave] = useState([]);

  const API = api;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
    
      try {

        const response = await API.get(`/leaves/details/${_id}`);
    
        if (response.data.success){
          setLeave(response.data.data.leave);
        }
    
        } catch (error) {
          if (error.response && !error.response.data.success){
            alert(error.response.data.error);
          }
        }

      }

    fetchLeave();
  }, []);

  const changeStatus = async (_id, status) => {
    try {

      const response = await API.put(`/leaves/${_id}`, { status });
    
      if (response.data.success){
        navigate("/admin-dashboard/leaves");
      }
    
    } catch (error) {
      if (error.response && !error.response.data.success){
        alert(error.response.data.error);
      }
    }

  }

  return (
    <>
            
        <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
          
          <h2 className='text-2xl font-bold mb-8 text-center'>
            Leave Details
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            
            <div>
              <img 
                src={leave?.employeeId?.userId?.avatar}
                className='rounded-full border w-72'
              />
            </div>

            <div>

              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Name:</p>
                <p className='font-medium'>{leave?.employeeId?.userId?.name}</p>
              </div>

              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Employee Id:</p>
                <p className='font-medium'>{leave.employeeId?.employeeId}</p>
              </div>

              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Leave Type:</p>
                <p className='font-medium'>{leave.leaveType}</p>
              </div>

              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Reason:</p>
                <p className='font-medium'>{leave.reason}</p>
              </div>

              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Department:</p>
                <p className='font-medium'>{leave?.employeeId?.department?.dep_name}</p>
              </div>

              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Designation:</p>
                <p className='font-medium'>{leave?.employeeId?.designation}</p>
              </div>

              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Start Date:</p>
                <p className='font-medium'>{new Date(leave.startDate).toLocaleDateString("en-IN")}</p>
              </div>

              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>End Date:</p>
                <p className='font-medium'>{new Date(leave.endDate).toLocaleDateString("en-IN")}</p>
              </div>

              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>
                  {leave.status === "Pending" ? "Action:" : "Status:"}
                </p>
                  {leave.status === "Pending" ? (
                    <div className='flex space-x-2'>
                      
                      <button 
                        className='px-4 py-1 bg-[#6C63FF] hover:bg-[#5A52E0] text-white rounded-md'
                        onClick={() => changeStatus(leave._id, "Approved")}
                      >
                        Approve
                      </button>
                      
                      <button 
                        className='px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md' 
                        onClick={() => changeStatus(leave._id, "Rejected")}
                      >
                        Reject
                      </button>

                    </div>
                  ) : 
                <p className='font-medium'>{leave.status}</p>
                }
              </div>

            </div>

          </div>

        </div>

    </>

  )
}

export default LeaveDetails;