import type { Student, StudentDocument } from "../types";
import { dummyStudents, dummyStudentDocuments } from "./data/dummy";

export const demoActions = () => {
    let students = [...dummyStudents];
    let documents = [...dummyStudentDocuments];

    const newId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    return {
        listStudents: async () => [...students],

        listStudentDocumentsById: async (ids: string[]) => documents.filter((d) => ids.includes(d.studentId)).map((d) => ({ ...d })),

        createStudent: async (payload: Partial<Student>) => {
            const newStudent: Student = {
                id: payload.id ?? newId(),
                name: payload.name ?? "Demo Student",
                email: payload.email ?? "demo@example.com",
                status: payload.status ?? "incomplete",
                lastUpdated: payload.lastUpdated ?? new Date().toISOString(),
                ...(payload as object),
            } as Student;
            students = [...students, newStudent];
            return { ...newStudent };
        },

        createStudentDocuments: async (studentId: string, payload: Partial<StudentDocument>) => {
            const newDoc: StudentDocument = {
                id: newId(),
                studentId,
                documents: payload.documents ?? [],
                ...(payload as object),
            } as StudentDocument;
            documents = [...documents, newDoc];
            return { ...newDoc };
        },

        updateStudentOnServer: async (student: Student) => {
            students = students.map((s) => (s.id === student.id ? { ...student } : s));
            return { ...student };
        },

        updateStudentDocuments: async (studentId: string, payload: StudentDocument) => {
            documents = documents.map((d) => (d.studentId === studentId ? { ...payload } : d));
            return { ...payload };
        },

        deleteStudent: async (studentId: string) => {
            const found = students.find((s) => s.id === studentId);
            students = students.filter((s) => s.id !== studentId);
            return found ? { ...found } : ({} as Student);
        },

        deleteStudentDocument: async (studentId: string) => {
            const found = documents.find((d) => d.studentId === studentId);
            documents = documents.filter((d) => d.studentId !== studentId);
            return found ? { ...found } : ({} as StudentDocument);
        },
    };
};