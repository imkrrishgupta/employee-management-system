import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const RouteRedirect = () => {
  const { user, loading } = useAuth();
  
  if (loading){
    return (<div>Loading...</div>)
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/admin-dashboard" replace />;
  }

  if (user.role === "employee") {
    return <Navigate to="/employee-dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default RouteRedirect;