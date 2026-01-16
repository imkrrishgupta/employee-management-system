import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axios.js';
import { useAuth } from '../../../context/AuthContext.jsx';

const AdminSettings = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const API = api;

    const [settings, setSettings] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;

        setSettings({...settings, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (settings.newPassword.trim() !== settings.confirmPassword.trim()){
            setError("New Password and Confirm Password do not match.");

        } else if(settings.newPassword.trim() === settings.oldPassword.trim()){
            setError("Old and new password cannot be same");

        } else {
            try {
                const response = await API.put("/settings/change-password", settings);

                if (response.data.success){
                    setError("");
                    navigate("/admin-dashboard", { replace: true });
                }

            } catch (error) {
                if (error.response && !(error.response.data.success)){
                    setError(error.response.data.message);
                } else{
                    setError("Server error");
                }

            }
        }

    }

  return (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>

        <h2 className='text-2xl font-bold mb-6'>Change Password</h2>

        {error && (
          <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
            
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/70 backdrop-blur-md px-4 py-3 shadow-sm">
            
              {/*Icon*/}
            
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100">
                <svg
                className="h-5 w-5 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                >
              
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
                />
              
                </svg>
              </div>
            
              {/*Text*/}
              
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-700">
                  Password changing failed
                </p>
              
                <p className="text-sm text-red-600 leading-relaxed">
                  {error}
                </p>
              
              </div>
            </div>
          
          </div>
        )}

        <form onSubmit={handleSubmit}>

            {/* Department Name */}

            <div>
                
                <label 
                    htmlFor="oldPassword"
                    id='oldPassword'
                    name='oldPassword'
                    className='text-sm font-medium text-gray-800'
                >
                    Old Password
                </label>

                <input 
                    type="password" 
                    name="oldPassword" 
                    id="oldPassword" 
                    className='mt-1 w-full p-2 border rounded-md'
                    onChange={handleChange}
                    required
                />

            </div>

            <div>

                <label 
                    htmlFor="newPassword"
                    name='newPassword'
                    id='newPassword'
                    className='text-sm font-medium text-gray-800'
                >
                    New Password
                </label>

                <input 
                    type="password" 
                    name="newPassword" 
                    id="newPassword" 
                    className='mt-1 w-full p-2 border rounded-md'
                    onChange={handleChange}
                    required
                />

            </div>

            <div>

                <label 
                    htmlFor="confirmPassword"
                    name='confirmPassword'
                    id='confirmPassword'
                    className='text-sm font-medium text-gray-800'
                >
                    Confirm Password
                </label>

                <input 
                    type="password" 
                    name="confirmPassword" 
                    id="confirmPassword" 
                    className='mt-1 w-full p-2 border rounded-md'
                    onChange={handleChange}
                    required
                />

            </div>
            

            <button
                type='submit'
                className='w-full mt-6 bg-[#6C63FF] hover:bg-[#5A52E0] text-white font-bold py-2 px-4 rounded'
            >
                Change Password
            </button>

        </form>

    </div>
  )
}

export default AdminSettings;