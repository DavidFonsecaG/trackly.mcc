import { useEffect, useState, useCallback } from "react";
import type { Student, StudentDocument } from "../types";
import { listStudents, createStudent, updateStudentOnServer, deleteStudent } from "../services/studentService";
import { listStudentDocumentsById, createStudentDocuments, updateStudentDocuments, deleteStudentDocument } from "../services/documentService";

type AppActions = {
  listStudents: () => Promise<Student[]>;
  listStudentDocumentsById: (ids: string[]) => Promise<StudentDocument[]>;
  createStudent: (payload: Partial<Student>) => Promise<Student>;
  createStudentDocuments: (studentId: string, payload: Partial<StudentDocument>) => Promise<StudentDocument>;
  updateStudentOnServer: (student: Student) => Promise<Student>;
  updateStudentDocuments: (studentId: string, payload: StudentDocument) => Promise<StudentDocument>;
  deleteStudent: (studentId: string) => Promise<Student>;
  deleteStudentDocument: (studentId: string) => Promise<StudentDocument>;
};

export const useBaseAppProvider = (actions: AppActions) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [studentDocuments, setStudentDocuments] = useState<StudentDocument[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [addStudent, setAddStudent] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem("Filter") || "All Terms");
  const [notification, setNotification] = useState<string | null>(null);
  const [deleted, setDeleted] = useState<{ deletedStudent: Student; deletedStudentDocument: StudentDocument } | null>(null);

  const fetchInitial = useCallback(async () => {
    try {
      const s = await actions.listStudents();
      setStudents(s);
      const docs = await actions.listStudentDocumentsById(s.map((st) => st.id));
      setStudentDocuments(docs);
    } catch (err: any) {
      console.error("Failed to fetch students/documents:", err?.response?.data?.message || err?.message || err);
    }
  }, []);

  const setStudent = async (newStudent: Partial<Student>, newStudentDocument: Partial<StudentDocument>) => {
    try {
      const createdStudent = await actions.createStudent(newStudent);
      setStudents((prevStudents) => [...prevStudents, createdStudent]);

      const createdStudentDocument = await actions.createStudentDocuments(createdStudent.id, newStudentDocument);
      setStudentDocuments((prevDocs) => [...prevDocs, createdStudentDocument]);
    } catch (err: any) {
      console.error("Failed to create student and documents:", err?.response?.data?.message || err?.message || err);
    }
  };

  const updateStudent = async (editedStudent: Student, editedStudentDocuments: StudentDocument) => {
    try {
      const updatedStudent = await actions.updateStudentOnServer(editedStudent);
      setStudents((prevStudents) => prevStudents.map((student) => (student.id === editedStudent.id ? updatedStudent : student)));

      const updatedStudentDoc = await actions.updateStudentDocuments(editedStudent.id, editedStudentDocuments);
      setStudentDocuments((prevDocs) => prevDocs.map((d) => (d.studentId === editedStudent.id ? updatedStudentDoc : d)));
    } catch (err: any) {
      console.error("Failed to update student and documents:", err?.response?.data?.message || err?.message || err);
    }
  };

  const removeStudent = async (studentId: string) => {
    try {
      const deletedStudent = await actions.deleteStudent(studentId);
      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));

      const deletedStudentDocument = await actions.deleteStudentDocument(studentId);
      setStudentDocuments((prevDocs) => prevDocs.filter((studentDoc) => studentDoc.studentId !== studentId));

      setDeleted({ deletedStudent, deletedStudentDocument });
      setNotification("Student deleted");
    } catch (err: any) {
      console.error("Failed to delete student and documents:", err?.response?.data?.message || err?.message || err);
    }
  };

  const syncStudentWithServer = async (studentId: string) => {
    try {
      const localStudent = students.find((s) => s.id === studentId);
      if (!localStudent) return;
      await actions.updateStudentOnServer(localStudent);
    } catch (err: any) {
      console.error("Failed to sync student:", err?.response?.data?.message || err?.message || err);
    }
  };

  const updateStudentDocs = async (studentId: string) => {
    try {
      const doc = studentDocuments.find((doc) => doc.studentId === studentId);
      if (!doc) return;

      const updatedStudentDoc = await actions.updateStudentDocuments(studentId, doc);
      setStudentDocuments((prevDocs) => prevDocs.map((d) => (d.studentId === studentId ? updatedStudentDoc : d)));
    } catch (err: any) {
      console.error("Failed to sync student documents:", err?.response?.data?.message || err?.message || err);
    }
  };

  const getStudentDocuments = (studentId: string) => {
    return studentDocuments.find((doc) => doc.studentId === studentId)?.documents;
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

      setStudents((prevStudents) => prevStudents.map((s) => (s.id === selectedStudent.id ? updatedStudent : s)));
    }
  }, [studentDocuments, selectedStudent]);

  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  return {
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
    syncStudentWithServer,
  } as const;
};

export const useAppProvider = () => {
  const actions = {
    listStudents: () => listStudents(),
    listStudentDocumentsById: (ids: string[]) => listStudentDocumentsById(ids),
    createStudent: (payload: Partial<Student>) => createStudent(payload),
    createStudentDocuments: (studentId: string, payload: Partial<StudentDocument>) => createStudentDocuments(studentId, payload),
    updateStudentOnServer: (student: Student) => updateStudentOnServer(student),
    updateStudentDocuments: (studentId: string, payload: StudentDocument) => updateStudentDocuments(studentId, payload),
    deleteStudent: (studentId: string) => deleteStudent(studentId),
    deleteStudentDocument: (studentId: string) => deleteStudentDocument(studentId),
  };

  return useBaseAppProvider(actions);
};