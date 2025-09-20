import { useRef } from "react";
import type { Student, StudentDocument } from "../types";
import { dummyStudents, dummyStudentDocuments } from "../data/dummy";
import { useBaseAppProvider } from "./useAppProvider";

const newId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

export const useDemoAppProvider = () => {
  const studentsRef = useRef<Student[]>(dummyStudents.map((s) => ({ ...s })));
  const documentsRef = useRef<StudentDocument[]>(dummyStudentDocuments.map((d) => ({ ...d })));

  const actions = {
    listStudents: async (): Promise<Student[]> => {
      return [...studentsRef.current];
    },

    listStudentDocumentsById: async (ids: string[]): Promise<StudentDocument[]> => {
      return documentsRef.current.filter((d) => ids.includes(d.studentId)).map((d) => ({ ...d }));
    },

    createStudent: async (payload: Partial<Student>): Promise<Student> => {
      const newStudent: Student = {
        id: payload.id ?? newId(),
        name: payload.name ?? "Demo Student",
        email: payload.email ?? "demo@example.com",
        status: payload.status ?? "incomplete",
        lastUpdated: payload.lastUpdated ?? new Date().toISOString(),
        ...(payload as object),
      } as Student;

      studentsRef.current = [...studentsRef.current, newStudent];
      return { ...newStudent };
    },

    createStudentDocuments: async (studentId: string, payload: Partial<StudentDocument>): Promise<StudentDocument> => {
      const newDoc: StudentDocument = {
        id: payload.studentId ?? newId(),
        studentId,
        documents: payload.documents ?? [],
        ...(payload as object),
      } as StudentDocument;

      documentsRef.current = [...documentsRef.current, newDoc];
      return { ...newDoc };
    },

    updateStudentOnServer: async (student: Student): Promise<Student> => {
      studentsRef.current = studentsRef.current.map((s) => (s.id === student.id ? { ...student } : s));
      return { ...student };
    },

    updateStudentDocuments: async (studentId: string, payload: StudentDocument): Promise<StudentDocument> => {
      documentsRef.current = documentsRef.current.map((d) => (d.studentId === studentId ? { ...payload } : d));
      return { ...payload };
    },

    deleteStudent: async (studentId: string): Promise<Student> => {
      const found = studentsRef.current.find((s) => s.id === studentId);
      studentsRef.current = studentsRef.current.filter((s) => s.id !== studentId);
      return found ? { ...found } : ({} as Student);
    },

    deleteStudentDocument: async (studentId: string): Promise<StudentDocument> => {
      const found = documentsRef.current.find((d) => d.studentId === studentId);
      documentsRef.current = documentsRef.current.filter((d) => d.studentId !== studentId);
      return found ? { ...found } : ({} as StudentDocument);
    },
  };

  return useBaseAppProvider(actions);
};