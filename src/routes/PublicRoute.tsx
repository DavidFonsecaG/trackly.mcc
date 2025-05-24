import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: ReactNode}) => {
    const isAuthenticated = true;

    return isAuthenticated
        ? <Navigate to="/" />
        : children
};

export default PublicRoute;