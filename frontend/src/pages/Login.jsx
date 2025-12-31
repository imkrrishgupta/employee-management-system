import { useState } from 'react'
import { useEffect } from 'react';
import api from '../api/axios.js';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState(null);

  const API = api;

  useEffect(() => {
    if (email.length > 0 && password.length > 0){
      setButtonDisabled(false);
    } else{
      setButtonDisabled(true);
    }
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault();  // It will prevent the default submission of the form

    // Now, we will call `api` and send our data to server side to verify the user credentials

    try {
      const response = await API.post("/users/login", {email, password});

      if (response.data.success){
        alert("Successfully login");
      }
      
    } catch (error) {
      if (error.response && !(error.response.data.success)){
        setError(error.response.data.message);
      } else{
        setError("Server error");
      }
    }

  }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-linear-to-b from-[#5B4DCC] to-[#5B4DCC]/20'>
      
      <h2 className='font-serif mb-8 text-3xl font-medium text-white'>
        Employee Management System
      </h2>
      
      <div className='w-96 bg-white rounded-xl shadow-2xl p-8'>
        
        <h2 className='text-2xl font-bold mb-6 text-gray-900 ml-30'>
          Login
        </h2>

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
                  Login failed
                </p>
              
                <p className="text-sm text-red-600 leading-relaxed">
                  {error}
                </p>
              
              </div>
            </div>
          
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          
          <div className='mb-5'>
            
            <label htmlFor="email" className='block mb-1 text-sm font-medium text-gray-700'>
              Email
            </label>
            
            <input 
            type="email" 
            id="email"
            autoComplete='email'
            placeholder='Enter Email' 
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            onChange={(e) => {
              setEmail(e.target.value)
              setError(null)
            }}
            />

          </div>

          <div className='mb-5'>
            
            <label htmlFor="password" className='block mb-1 text-sm font-medium text-gray-700'>
              Password
            </label>

            <input 
            type="password" 
            id="password"
            autoComplete='current-password'
            placeholder='Enter Password'
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            onChange={(e) => {
              setPassword(e.target.value)
              setError(null)
            }}
            />

          </div>

          <div className='mb-6 flex items-center justify-between text-sm'>

            <label className='flex items-center gap-2 text-gray-600'>
              <input 
              disabled={buttonDisabled}
              type="checkbox" 
              className='rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 disabled:cursor-not-allowed'
              />
              <span className='rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'>Remember me</span>
            </label>

            <a href="#" className='text-indigo-600 hover:underline'>
              Forgot password?
            </a>

          </div>

          <div className='mb-4'>

            <button 
            disabled={buttonDisabled}
            type="submit"
            className='w-full py-2 text-white font-semibold rounded-md bg-linear-to-r from-indigo-600 to-purple-500 hover:opacity-80 transition disabled:cursor-not-allowed'
            >
              Login
            </button>

          </div>

        </form>

      </div>
      
    </div>
  )
}

export default Login;