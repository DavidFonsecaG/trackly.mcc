import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types";
import {
    loginUser,
    logoutUser,
    signupUser,
    fetchCurrentUser,
    updateUserPassword
} from "../services/authService";


export const useAuthProvider = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            const userData = await loginUser(email, password);
            setUser(userData);
            navigate("/");
        } catch (err: any) {
            console.error("Login failed:", err.response?.data?.message || err.message );
        } finally {
            setLoading(false);
        }
    };
    
    const logout = async () => {
        try {
            await logoutUser();
            setUser(null);
            navigate("/login");
        } catch (err: any) {
            console.error("Logout failed:", err.response?.data?.message || err.message);
        }
    };

    const signup = async (name: string, email: string, password: string) => {
        try {
        const userData = await signupUser(name, email, password);
        setUser(userData);
        navigate("/");
        } catch (err: any) {
        console.error("Signup failed:", err.response?.data?.message || err.message);
        }
    };

    const fetchUser = async () => {
        try {
        const userData = await fetchCurrentUser();
        setUser(userData);
        } catch {
        setUser(null);
        } finally {
        setLoading(false);
        }
    };

    const updateUser = async (password: string, newPassword: string) => {
        try {
        return await updateUserPassword(password, newPassword);
        } catch (err: any) {
        if (err.response?.status === 401) {
            return "Invalid credentials. Please check your password.";
        }
        console.error("Failed to update user:", err.response?.data?.message || err.message);
        return "Not able to update!";
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return { user, loading, login, logout, signup, updateUser };
};