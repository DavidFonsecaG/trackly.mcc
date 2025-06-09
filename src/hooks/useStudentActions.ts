import api from "../api/axios";
import { type Student, type StudentDocument } from "../types";

export const useStudentActions = () => {
    const createStudent = async (student: Partial<Student>): Promise<Student> => {
        const res = await api.post("/student/create", {student})
        return res.data;
    };
    
    const createStudentDocuments = async (studentId: string, studentDocument: Partial<StudentDocument>): Promise<StudentDocument> => {
        const res = await api.post("/document/create", {studentId, studentDocument})
        return res.data;
    };

    return { createStudent, createStudentDocuments };
};
