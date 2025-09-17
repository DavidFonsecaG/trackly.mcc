import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Student, StudentDocument, Document } from "../types";
import { useAuth } from "./AuthContext";
import { useStudentActions } from "../hooks/useStudentActions";
import { useDocumentActions } from "../hooks/useDocumentActions";
import { dummyStudents, dummyStudentDocuments } from "../data/dummy";

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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const { listStudents, createStudent, deleteStudent, updateStudentOnServer } = useStudentActions();
  const { listStudentDocumentsById, createStudentDocuments, updateStudentDocuments, deleteStudentDocument } = useDocumentActions();

  const [students, setStudents] = useState<Student[]>([]);
  const [studentDocuments, setStudentDocuments] = useState<StudentDocument[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [addStudent, setAddStudent] = useState<boolean>(false);
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

  const updateStudent = async (editedStudent: Student, editedStudentDocuments: StudentDocument) => {
    try {
      const updatedStudent = await updateStudentOnServer(editedStudent);
      setStudents((prevStudents) => prevStudents.map((student) => (student.id === editedStudent.id ? updatedStudent : student)));
      const updatedStudentDoc = await updateStudentDocuments(editedStudent.id, editedStudentDocuments);
      setStudentDocuments((prevDocs) => prevDocs.map((d) => (d.studentId === editedStudent.id ? updatedStudentDoc : d)));
    } catch (err: any) {
      console.error("Failed to updated student and documents:", err.response?.data?.message || err.message);
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

  const syncStudentWithServer = async (studentId: string) => {
    try {
      const localStudent = students.find((s) => s.id === studentId);
      if (!localStudent) return;

      await updateStudentOnServer(localStudent);

    } catch (err: any) {
      console.error("Failed to sync student:", err.response?.data?.message || err.message);
    }
  };

  const updateStudentDocs = async (studentId: string) => {
    try {
      const doc = studentDocuments.find((doc) => doc.studentId === studentId);
      if (!doc) return;

      const updatedStudentDoc = await updateStudentDocuments(studentId, doc);
      setStudentDocuments((prevDocs) => prevDocs.map((d) => (d.studentId === studentId ? updatedStudentDoc : d)));

    } catch (err: any) {
      console.error("Failed to sync student documents:", err.response?.data?.message || err.message);
    }
  };

  const getStudentDocuments = (studentId: string) => {
    return studentDocuments.find((doc) => doc.studentId === studentId)
      ?.documents;
  };

  const updateDocumentStatus = (
    studentId: string,
    documentId: string,
    submitted: boolean | null,
    required: boolean = true,
    notes?: string
  ) => {
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
                      required,
                      submissionDate: submitted ? new Date().toISOString() : undefined,
                      notes: notes !== undefined ? notes : doc.notes,
                    }
                  : doc
              ),
            }
          : studentDoc
      )
    );
  };

  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    if (!selectedStudent) return;

    const updatedDocs = studentDocuments.find((doc) => doc.studentId === selectedStudent.id)?.documents || [];
    const requiredDocs = updatedDocs.filter((doc) => doc.required);
    const submittedRequiredDocs = requiredDocs.filter((doc) => doc.submitted);

    let status: "incomplete" | "complete" | "submitted" = "incomplete";
    if (submittedRequiredDocs.length === requiredDocs.length) status = "complete";

    if (status !== selectedStudent.status) {
      const updatedStudent = {
        ...selectedStudent,
        status,
        lastUpdated: new Date().toISOString(),
      };

      setSelectedStudent(updatedStudent);

      setStudents((prevStudents) =>
        prevStudents.map((s) =>
          s.id === selectedStudent.id ? updatedStudent : s
        )
      );
    }
  }, [studentDocuments, selectedStudent]);

  useEffect(() => {
    if (loading) return;
    if (user) {
      listStudents()
      .then((students) => {
        setStudents(students);
        return listStudentDocumentsById(students.map(s => s.id));
      })
      .then(setStudentDocuments)
      .catch((err: any) => console.error("Failed to fecth students", err.response?.data?.message || err.message));
    } else {
      setStudents(dummyStudents);
      setStudentDocuments(dummyStudentDocuments);
    }
  }, [user, loading]);

  return (
    <AppContext.Provider
      value={{
        students,
        searchTerm,
        updateSearchTerm,
        studentDocuments,
        selectedStudent,
        setSelectedStudent,
        editStudent,
        setEditStudent,
        addStudent,
        setAddStudent,
        updateDocumentStatus,
        getStudentDocuments,
        setStudent,
        updateStudent,
        updateStudentDocs,
        removeStudent,
        notification,
        setNotification,
        deleted,
        setDeleted,
        syncStudentWithServer
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
