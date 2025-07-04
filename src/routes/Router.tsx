import Layout from "../pages/Layout";
import DashboardPage from "../pages/DashboardPage";
import TrackerPage from "../pages/TrackerPage";
import SettingsPage from "../pages/SettingsPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/ui/Loader";

function Router() {
	return(
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/login/loading" element={<Loader />}/>
			<Route path="/signup" element={<SignupPage />} />
			<Route path="/" element={<Layout />}>
				<Route index element={<DashboardPage />} />
				<Route path="/tracker" element={<TrackerPage />} />
				<Route path="/settings" element={<SettingsPage />} />
				<Route path="/profile" element={<div>Profile Page</div>} />
			</Route>
		</Routes>
	);
};

export default Router;