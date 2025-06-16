import api from "../api/axios";
import { type Student } from "../types";

export const useStudentActions = () => {
    const createStudent = async (student: Partial<Student>): Promise<Student> => {
        const res = await api.post("/student/create", {student})
        return res.data;
    };

    const deleteStudent = async (studentId: string): Promise<Student> => {
        const res = await api.delete(`/student/delete/${studentId}`);
        return res.data;
    };

    return { createStudent, deleteStudent };
};
