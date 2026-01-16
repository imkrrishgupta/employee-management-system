import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../api/axios.js";
import { useNavigate } from "react-router-dom";

const AddLeave = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const API = api;

    const [leave, setLeave] = useState({
        userId: user._id,
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: ""
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
        setLeave((prev) => ({...prev, [name]: value}))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post("/leaves/add", leave);

            if (response.data.success){
                navigate(`/employee-dashboard/leaves/${user._id}`, { replace: true });
            }

        } catch (error) {
            if (error.response && !error.response.data.success){
                alert(error.response.data.message);
            }
        }

    }

  return (
    
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>

      <form onSubmit={handleSubmit}>
        
        <div className="flex flex-col space-y-4">

          <div>
            
            <label
              className="block text-sm font-medium text-gray-800"
              htmlFor="leaveType"
            >
              Leave Type
            </label>

            <select
              name="leaveType"
              id="leaveType"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            >
              <option value="">Select Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            
            </select>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* From Date */}

            <div>
              
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="startDate"
              >
                From Date
              </label>

              <input
                type="date"
                name="startDate"
                id="startDate"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border rounded-md"
                required
              />

            </div>

            {/* To Date */}

            <div>

              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="endDate"
              >
                To Date
              </label>

              <input
                type="date"
                name="endDate"
                id="endDate"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border rounded-md"
                required
              />

            </div>

          </div>

          {/* Reason */}

          <div className="block">
            
            <label
              htmlFor="reaason"
              className="block text-sm font-medium text-gray-800"
            >
              Reason
            </label>

            <textarea
              name="reason"
              id="reason"
              onChange={handleChange}
              className="w-full border"
            />
          
          </div>
        
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-[#6C63FF] hover:bg-[#5A52E0] text-white font-bold py-2 px-4 rounded-lg"
        >
          Add Leave
        </button>
      
      </form>
    
    </div>

  );
};

export default AddLeave;