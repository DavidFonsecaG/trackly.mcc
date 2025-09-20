import { createContext, useContext, type ReactNode } from "react";
import type { Student, StudentDocument, Document } from "../types";
import { useAuth } from "./AuthContext";
import { useAppProvider } from "../hooks/useAppProvider";
import { useDemoAppProvider } from "../hooks/useDemoAppProvider";

interface AppContextType {
  students: Student[];
  studentDocuments: StudentDocument[];
  searchTerm: string;
  updateSearchTerm: (term: string) => void;
  selectedStudent: Student | null;
  setSelectedStudent: (student: Student | null) => void;
  editStudent: Student | null;
  setEditStudent: (student: Student | null) => void;
  addStudent: boolean;
  setAddStudent: (arg: boolean) => void;
  updateDocumentStatus: (studentId: string, documentId: string, submitted: boolean | null, required: boolean, notes?: string) => void;
  getStudentDocuments: (studentId: string) => Document[] | undefined;
  setStudent: (student: Partial<Student>, studentDocument: Partial<StudentDocument>) => void;
  updateStudent: (editedStudent: Student, editedStudentDocuments: StudentDocument) => void;
  updateStudentDocs: (studentId: string) => void;
  removeStudent: (studentId: string) => void;
  notification: string | null;
  setNotification: (message: string | null) => void;
  deleted: {deletedStudent: Student, deletedStudentDocument: StudentDocument} | null;
  setDeleted: (deleted: {deletedStudent: Student, deletedStudentDocument: StudentDocument} | null ) => void;
  syncStudentWithServer: (studentId: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const app = user ? useAppProvider() : useDemoAppProvider();
    return <AppContext.Provider value={app}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    };
    return context;
};