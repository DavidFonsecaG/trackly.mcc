import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import TrackerPage from "../pages/TrackerPage";
import LoginPage from "../pages/LoginPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            { index: true, element: <TrackerPage />}
        ]
    },
        {
        path: "/login",
        element: <LoginPage/>,
    }
]);