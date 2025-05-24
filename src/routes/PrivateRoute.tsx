import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const isAuthenticated = true;
    
    return !isAuthenticated 
        ? <Navigate to="/login"/>
        : children
};

export default PrivateRoute;