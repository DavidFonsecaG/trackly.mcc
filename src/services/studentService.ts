import apiClient from "./apiClient";
import { type Student } from "../types";

export const studentService = {
    list: async (): Promise<Student[]> => {
        const res = await apiClient.get("/student/list");
        return res.data;
    },

    create: async (student: Partial<Student>): Promise<Student> => {
        const res = await apiClient.post("/student/create", { student });
        return res.data;
    },

    update: async (student: Student): Promise<Student> => {
        const res = await apiClient.post("/student/update", { student });
        return res.data;
    },

    delete: async (id: string): Promise<Student> => {
        const res = await apiClient.delete(`/student/delete/${id}`);
        return res.data;
    },
    
};