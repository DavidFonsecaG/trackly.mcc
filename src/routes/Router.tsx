import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import App from "../App";
import TrackerPage from "../pages/TrackerPage";
import LoginPage from "../pages/LoginPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <PrivateRoute>
                <App/>
            </PrivateRoute>
        ),
        children: [
            { index: true, element: <TrackerPage />}
        ]
    },
    {
        path: "/login",
        element: (
            <PublicRoute>
                <LoginPage/>
            </PublicRoute>
        ),
    }
]);