import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { Navigate } from 'react-router-dom';

const RoleBasedRoutes = ({children, requiredRole}) => {  // This route is accessible to both employee and admin
    const { user, loading } = useAuth();

    if (loading){
        return <div>Loading...</div>
    }

    if (!user) {
        return <Navigate to='/login' replace />;
    }

    if (!requiredRole.includes(user.role)){  // If the required role is not in user.role then we will navigate the user to the unauthorized
        return <Navigate to='/unauthorized' replace />
    }

    return children;

}

export default RoleBasedRoutes;