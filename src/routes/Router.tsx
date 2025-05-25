import Layout from "../pages/Layout";
// import PrivateRoute from "./PrivateRoute";
import TrackerPage from "../pages/TrackerPage";
import LoginPage from "../pages/LoginPage";
import { Route, Routes as RouterRoutes } from "react-router-dom";

function Routes() {
    return(
        <RouterRoutes>
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/" element={<PrivateRoute/>}>
                <Route element={<Layout/>}>
                    <Route index element={<TrackerPage/>} />
                </Route>
            </Route> */}
            <Route path="/" element={<Layout/>}>
                <Route index element={<TrackerPage/>} />
                <Route path="/settings" element={<div>Settings Page</div>} />
            </Route>
        </RouterRoutes>
    );
};

export default Routes;