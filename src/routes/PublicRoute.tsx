import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

const PublicRoute = () => {
    const { user } = useAuth();
    
    return user 
        ? <Navigate to="/"/>
        : <Outlet />
};

export default PublicRoute;