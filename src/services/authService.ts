import apiClient from "./apiClient";
import type { User } from "../types";

export const loginUser = async (email: string, password: string): Promise<User> => {
    const res = await apiClient.post("/auth/login", { email, password });
    return res.data;
};

export const logoutUser = async (): Promise<void> => {
    await apiClient.post("/auth/logout");
};

export const signupUser = async (name: string, email: string, password: string): Promise<User> => {
    const res = await apiClient.post("/auth/register", { name, email, password });
    return res.data;
};

export const fetchCurrentUser = async (): Promise<User> => {
    const res = await apiClient.get("/auth/me");
    return res.data;
};

export const updateUserPassword = async (password: string, newPassword: string): Promise<string> => {
    const res = await apiClient.post("/auth/update", { password, newPassword });
    return res.data.message;
};