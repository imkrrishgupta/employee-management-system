import React from 'react'
import { useAuth } from '../../context/AuthContext.jsx';

const Navbar = () => {
    const { user, logout } = useAuth();

  return (
    <div className='flex items-center justify-between h-12 bg-gray-300 px-5'>
        
        <p className="text-lg font-semibold text-gray-800">Welcome {user.name}</p>

        <button 
          className='text-white px-4 py-1 bg-red-500 hover:bg-red-600 rounded-lg'
          onClick={logout}
        >
          Logout
        </button>

    </div>
  )
}

export default Navbar;