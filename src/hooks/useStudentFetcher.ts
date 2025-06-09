import api from "../api/axios";
import { type Student, type StudentDocument } from "../types";

export const useStudentFetcher = () => {
    const fetchStudents = async (): Promise<Student[]> => {
        const res = await api.get("/student/list");
        return res.data;
    };

    const fetchStudentDocuments = async (ids: string[]): Promise<StudentDocument[]> => {
        const res = await api.post("/document/list", ids);
        return res.data
    };

    return { fetchStudents, fetchStudentDocuments };
};