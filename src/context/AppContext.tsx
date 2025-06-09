import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Student, StudentDocument, Document } from "../types";
import { useAuth } from "./AuthContext";
import { useStudentFetcher } from "../hooks/useStudentFetcher";
import { useStudentActions } from "../hooks/useStudentActions";

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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { fetchStudents, fetchStudentDocuments } = useStudentFetcher();
  const { createStudent, createStudentDocuments } = useStudentActions();

  const [students, setStudents] = useState<Student[]>([]);
  const [studentDocuments, setStudentDocuments] = useState<StudentDocument[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem("Filter") || "All Terms");

  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  const updateDocumentStatus = (
    studentId: string,
    documentId: string,
    submitted: boolean,
    notes?: string
  ) => {
    setStudentDocuments((prevDocs) => {
      return prevDocs.map((studentDoc) => {
        if (studentDoc.studentId === studentId) {
          return {
            ...studentDoc,
            documents: studentDoc.documents.map((doc) => {
              if (doc.id === documentId) {
                return {
                  ...doc,
                  submitted,
                  submissionDate: submitted
                    ? new Date().toISOString()
                    : undefined,
                  notes: notes !== undefined ? notes : doc.notes,
                };
              }
              return doc;
            }),
          };
        }
        return studentDoc;
      });
    });

    setStudents((prevStudents) => {
      return prevStudents.map((student) => {
        if (student.id === studentId) {
          const updatedStudentDocs = studentDocuments.find(
            (sd) => sd.studentId === studentId
          );

          if (updatedStudentDocs) {
            const requiredDocs = updatedStudentDocs.documents.filter(
              (doc) => doc.required
            );
            const submittedRequiredDocs = requiredDocs.filter(
              (doc) => doc.submitted
            );

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
          }
        }
        return student;
      });
    });
  };

  const getStudentDocuments = (studentId: string) => {
    return studentDocuments.find((doc) => doc.studentId === studentId)
      ?.documents;
  };

  const setStudent = async (newStudent: Partial<Student>, newStudentDocument: Partial<StudentDocument>) => {
    try {
      const createdStudent = await createStudent(newStudent);
      setStudents((prevStudents) => [...prevStudents, createdStudent]);

      const createdStudentDocument = await createStudentDocuments(createdStudent.id, newStudentDocument);
      setStudentDocuments((prevDocs) => [...prevDocs, createdStudentDocument]);
      console.log(studentDocuments)

    } catch (err: any) {
      console.error("Failed to create student and documents:", err.response?.data?.message || err.message);
    }
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
