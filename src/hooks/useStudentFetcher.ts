import api from "../api/axios";
import { type Student } from "../types";

export const useStudentFetcher = () => {
    const fetchStudents = async (): Promise<Student[]> => {
        const res = await api.get("/student/list");
        return res.data;
    };
    return { fetchStudents };
};