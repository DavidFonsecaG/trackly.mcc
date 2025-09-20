import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Student, StudentDocument, Document } from "../types";
import { useAuth } from "./AuthContext";
import { useAppProvider } from "../hooks/useAppProvider";
import { listStudents, createStudent, updateStudentOnServer, deleteStudent } from "../services/studentService";
import { listStudentDocumentsById, createStudentDocuments, updateStudentDocuments, deleteStudentDocument } from "../services/documentService";
import { demoActions } from "../demo/demoActions";


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

    const actions = useMemo(() => {
        if (user) {
            return {
                listStudents: () => listStudents(),
                listStudentDocumentsById: (ids: string[]) => listStudentDocumentsById(ids),
                createStudent: (payload: Partial<Student>) => createStudent(payload),
                createStudentDocuments: (studentId: string, payload: Partial<StudentDocument>) => createStudentDocuments(studentId, payload),
                updateStudentOnServer: (student: Student) => updateStudentOnServer(student),
                updateStudentDocuments: (studentId: string, payload: StudentDocument) => updateStudentDocuments(studentId, payload),
                deleteStudent: (studentId: string) => deleteStudent(studentId),
                deleteStudentDocument: (studentId: string) => deleteStudentDocument(studentId),
            };
        }
        return demoActions();
    }, [user]);
    
    const app = useAppProvider(actions);

    return <AppContext.Provider value={app}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    };
    return context;
};