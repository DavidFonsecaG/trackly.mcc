import apiClient from "./apiClient";
import { type StudentDocument } from "../types";

export const documentService = {
    listByIds: async (ids: string[]): Promise<StudentDocument[]> => {
        const res = await apiClient.post("/document/list", ids);
        return res.data;
    },

    create: async (studentId: string, doc: Partial<StudentDocument>): Promise<StudentDocument> => {
        const res = await apiClient.post("document/create", { studentId, studentDocument: doc});
        return res.data;
    },

    update: async (studentId: string, doc: Partial<StudentDocument>): Promise<StudentDocument> => {
        const res = await apiClient.post("/document/update", { studentId, studentDocument: doc});
        return res.data;
    },

    delete: async (studentId: string): Promise<StudentDocument> => {
        const res = await apiClient.delete(`/document/delete/${studentId}`);
        return res.data;
    },
};