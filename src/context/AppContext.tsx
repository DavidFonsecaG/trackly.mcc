import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Student, StudentDocument, Document } from "../types";
import { useAuth } from "./AuthContext";
import { useStudentFetcher } from "../hooks/useStudentFetcher";
import { useStudentActions } from "../hooks/useStudentActions";
import { useDocumentActions } from "../hooks/useDocumentActions";

interface AppContextType {
  students: Student[];
  studentDocuments: StudentDocument[];
  searchTerm: string;
  updateSearchTerm: (term: string) => void;
  selectedStudent: Student | null;
  setSelectedStudent: (student: Student | null) => void;
  updateDocumentStatus: (
    studentId: string,
    documentId: string,
    submitted: boolean,
    notes?: string
  ) => void;
  getStudentDocuments: (studentId: string) => Document[] | undefined;
  setStudent: (student: Partial<Student>, studentDocument: Partial<StudentDocument>) => void;
  updateStudentDocs: (studentId: string) => void;
  removeStudent: (studentId: string) => void;
  notification: string | null;
  setNotification: (message: string | null) => void;
  deleted: {deletedStudent: Student, deletedStudentDocument: StudentDocument} | null;
  setDeleted: (deleted: {deletedStudent: Student, deletedStudentDocument: StudentDocument} | null ) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { fetchStudents, fetchStudentDocuments } = useStudentFetcher();
  const { createStudent, deleteStudent } = useStudentActions();
  const { createStudentDocuments, updateStudentDocuments, deleteStudentDocument } = useDocumentActions();

  const [students, setStudents] = useState<Student[]>([]);
  const [studentDocuments, setStudentDocuments] = useState<StudentDocument[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem("Filter") || "All Terms");
  const [notification, setNotification] = useState<string | null>(null);
  const [deleted, setDeleted] = useState<{deletedStudent: Student, deletedStudentDocument: StudentDocument} | null>(null);

  const setStudent = async (newStudent: Partial<Student>, newStudentDocument: Partial<StudentDocument>) => {
    try {
      const createdStudent = await createStudent(newStudent);
      setStudents((prevStudents) => [...prevStudents, createdStudent]);

      const createdStudentDocument = await createStudentDocuments(createdStudent.id, newStudentDocument);
      setStudentDocuments((prevDocs) => [...prevDocs, createdStudentDocument]);

    } catch (err: any) {
      console.error("Failed to create student and documents:", err.response?.data?.message || err.message);
    }
  };

  const removeStudent = async (studentId: string) => {
    try {
      const deletedStudent = await deleteStudent(studentId);
      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));

      const deletedStudentDocument = await deleteStudentDocument(studentId);
      setStudentDocuments((prevDocs) => prevDocs.filter((studentDoc) => studentDoc.studentId !== studentId));
      setDeleted({deletedStudent, deletedStudentDocument});
      setNotification("Student deleted");
    } catch (err: any) {
      console.log("Failed to delete student and documents:", err.response?.data?.message || err.message);
    }
  };

  const getStudentDocuments = (studentId: string) => {
    return studentDocuments.find((doc) => doc.studentId === studentId)
      ?.documents;
  };

  const updateStudentDocs = async (studentId: string) => {
    try {
      const doc = studentDocuments.find((doc) => doc.studentId === studentId);
      if (!doc) return;

      const updatedStudentDoc = await updateStudentDocuments(studentId, doc);

      setStudentDocuments((prevDocs) =>
        prevDocs.map((d) => (d.studentId === studentId ? updatedStudentDoc : d))
      );
    } catch (err: any) {
      console.error("Failed to sync student documents:", err.response?.data?.message || err.message);
    }
  };

  const updateDocumentStatus = (studentId: string, documentId: string, submitted: boolean, notes?: string) => {
    setStudentDocuments((prevDocs) =>
      prevDocs.map((studentDoc) =>
        studentDoc.studentId === studentId
          ? {
              ...studentDoc,
              documents: studentDoc.documents.map((doc) =>
                doc.id === documentId
                  ? {
                      ...doc,
                      submitted,
                      submissionDate: submitted ? new Date().toISOString() : undefined,
                      notes: notes !== undefined ? notes : doc.notes,
                    }
                  : doc
              ),
            }
          : studentDoc
      )
    );

    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.id !== studentId) return student;

        const updatedDocs = studentDocuments.find((sd) => sd.studentId === studentId)?.documents ?? [];

        const requiredDocs = updatedDocs.filter((doc) => doc.required);
        const submittedRequiredDocs = requiredDocs.filter((doc) => doc.submitted);

        let status: "complete" | "incomplete" | "pending" = "incomplete";
        if (submittedRequiredDocs.length === requiredDocs.length) {
          status = "complete";
        } else if (submittedRequiredDocs.length > 0) {
          status = "pending";
        }

        return {
          ...student,
          status,
          lastUpdated: new Date().toISOString(),
        };
      })
    );
  };

  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    if (user) {
      fetchStudents()
        .then((students) => {
          setStudents(students);
          return fetchStudentDocuments(students.map(s => s.id));
        })
        .then(setStudentDocuments)
        .catch((err: any) => 
          console.error("Failed to fecth students", err.response?.data?.message || err.message)
        );
    } else {
      setStudents([]);
      setStudentDocuments([]);
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        students,
        searchTerm,
        updateSearchTerm,
        studentDocuments,
        selectedStudent,
        setSelectedStudent,
        updateDocumentStatus,
        getStudentDocuments,
        setStudent,
        updateStudentDocs,
        removeStudent,
        notification,
        setNotification,
        deleted,
        setDeleted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
