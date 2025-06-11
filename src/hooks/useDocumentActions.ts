import api from "../api/axios";
import { type StudentDocument } from "../types";

export const useDocumentActions = () => {
    
    const createStudentDocuments = async (studentId: string, studentDocument: Partial<StudentDocument>): Promise<StudentDocument> => {
        const res = await api.post("/document/create", {studentId, studentDocument})
        return res.data;
    };

    const updateStudentDocuments = async (studentId: string, studentDocument: StudentDocument): Promise<StudentDocument> => {
        const res = await api.post("/document/update", {studentId, studentDocument})
        return res.data;
    }

    return { createStudentDocuments, updateStudentDocuments };
};
