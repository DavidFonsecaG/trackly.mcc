import apiClient from "./apiClient";
import { type Student } from "../types";

export const listStudents = async (): Promise<Student[]> => {
    const res = await apiClient.get("/student/list");
    return res.data;
};

export const createStudent = async (student: Partial<Student>): Promise<Student> => {
    const res = await apiClient.post("/student/create", { student });
    return res.data;
};

export const updateStudentOnServer = async (student: Student): Promise<Student> => {
    const res = await apiClient.post("/student/update", { student });
    return res.data;
};

export const deleteStudent = async (id: string): Promise<Student> => {
    const res = await apiClient.delete(`/student/delete/${id}`);
    return res.data;
};