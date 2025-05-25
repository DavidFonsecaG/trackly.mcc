import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
    const { user } = useAuth();
    
    return !user 
        ? <Navigate to="/login"/>
        : <Outlet />
};

export default PrivateRoute;