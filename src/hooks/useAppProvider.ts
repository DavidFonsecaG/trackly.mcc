import { useEffect, useState } from "react";
import type { Student, StudentDocument } from "../types";

export type AppActions = {
  listStudents: () => Promise<Student[]>;
  listStudentDocumentsById: (ids: string[]) => Promise<StudentDocument[]>;
  createStudent: (payload: Partial<Student>) => Promise<Student>;
  createStudentDocuments: (studentId: string, payload: Partial<StudentDocument>) => Promise<StudentDocument>;
  updateStudentOnServer: (student: Student) => Promise<Student>;
  updateStudentDocuments: (studentId: string, payload: StudentDocument) => Promise<StudentDocument>;
  deleteStudent: (studentId: string) => Promise<Student>;
  deleteStudentDocument: (studentId: string) => Promise<StudentDocument>;
};

export const useAppProvider = (actions: AppActions) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [studentDocuments, setStudentDocuments] = useState<StudentDocument[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [addStudent, setAddStudent] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem("Filter") || "All Terms");
  const [notification, setNotification] = useState<string | null>(null);
  const [deleted, setDeleted] = useState<{ deletedStudent: Student; deletedStudentDocument: StudentDocument } | null>(null);

  const setStudent = async (newStudent: Partial<Student>, newStudentDocument: Partial<StudentDocument>) => {
    try {
      const createdStudent = await actions.createStudent(newStudent);
      setStudents((prev) => [...prev, createdStudent]);

      const createdStudentDocument = await actions.createStudentDocuments(createdStudent.id, newStudentDocument);
      setStudentDocuments((prev) => [...prev, createdStudentDocument]);
    } catch (err: any) {
      console.error("Failed to create student and documents:", err?.response?.data?.message || err?.message || err);
    }
  };

  const updateStudent = async (editedStudent: Student, editedStudentDocuments: StudentDocument) => {
    try {
      const updatedStudent = await actions.updateStudentOnServer(editedStudent);
      setStudents((prev) => prev.map((s) => (s.id === editedStudent.id ? updatedStudent : s)));

      const updatedStudentDoc = await actions.updateStudentDocuments(editedStudent.id, editedStudentDocuments);
      setStudentDocuments((prev) => prev.map((d) => (d.studentId === editedStudent.id ? updatedStudentDoc : d)));
    } catch (err: any) {
      console.error("Failed to update student and documents:", err?.response?.data?.message || err?.message || err);
    }
  };

  const removeStudent = async (studentId: string) => {
    try {
      const deletedStudent = await actions.deleteStudent(studentId);
      setStudents((prev) => prev.filter((s) => s.id !== studentId));

      const deletedStudentDocument = await actions.deleteStudentDocument(studentId);
      setStudentDocuments((prev) => prev.filter((d) => d.studentId !== studentId));

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
      setStudentDocuments((prev) => prev.map((d) => (d.studentId === studentId ? updatedStudentDoc : d)));
    } catch (err: any) {
      console.error("Failed to sync student documents:", err?.response?.data?.message || err?.message || err);
    }
  };

  // Persists a student's documents AND recomputes the application's
  // complete/incomplete status from those documents (leaving a cancelled
  // application untouched). Used by the documents matrix, which edits
  // students that aren't the currently-selected one.
  const saveStudentDocuments = async (studentId: string) => {
    try {
      const doc = studentDocuments.find((d) => d.studentId === studentId);
      if (!doc) return;

      const updatedStudentDoc = await actions.updateStudentDocuments(studentId, doc);
      setStudentDocuments((prev) => prev.map((d) => (d.studentId === studentId ? updatedStudentDoc : d)));

      const student = students.find((s) => s.id === studentId);
      if (student && student.status !== "cancelled") {
        const requiredDocs = doc.documents.filter((d) => d.required);
        const submittedRequiredDocs = requiredDocs.filter((d) => d.submitted);
        const status: Student["status"] =
          requiredDocs.length > 0 && submittedRequiredDocs.length === requiredDocs.length
            ? "complete"
            : "incomplete";

        if (status !== student.status) {
          const updatedStudent = { ...student, status, lastUpdated: new Date().toISOString() };
          setStudents((prev) => prev.map((s) => (s.id === studentId ? updatedStudent : s)));
          await actions.updateStudentOnServer(updatedStudent);
        }
      }
    } catch (err: any) {
      console.error("Failed to save student documents:", err?.response?.data?.message || err?.message || err);
    }
  };

  // Sets an application-level status (e.g. cancelling / reactivating) and
  // persists it.
  const setApplicationStatus = async (studentId: string, status: Student["status"]) => {
    try {
      const student = students.find((s) => s.id === studentId);
      if (!student) return;

      const updatedStudent = { ...student, status, lastUpdated: new Date().toISOString() };
      setStudents((prev) => prev.map((s) => (s.id === studentId ? updatedStudent : s)));
      if (selectedStudent?.id === studentId) setSelectedStudent(updatedStudent);

      await actions.updateStudentOnServer(updatedStudent);
    } catch (err: any) {
      console.error("Failed to update application status:", err?.response?.data?.message || err?.message || err);
    }
  };

  const getStudentDocuments = (studentId: string) => studentDocuments.find((d) => d.studentId === studentId)?.documents;

  const updateDocumentStatus = (studentId: string, documentId: string, submitted: boolean | null, required = true, notes?: string) => {
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

  const updateSearchTerm = (term: string) => setSearchTerm(term);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const s = await actions.listStudents();
        if (!mounted) return;
        setStudents(s);

        const docs = await actions.listStudentDocumentsById(s.map((st) => st.id));
        if (!mounted) return;
        setStudentDocuments(docs);
      } catch (err: any) {
        console.error("Failed to fetch students/documents:", err?.response?.data?.message || err?.message || err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [actions]);

  useEffect(() => {
    if (!selectedStudent) return;
    if (selectedStudent.status === "cancelled") return;

    const updatedDocs = studentDocuments.find((doc) => doc.studentId === selectedStudent.id)?.documents || [];
    const requiredDocs = updatedDocs.filter((doc) => doc.required);
    const submittedRequiredDocs = requiredDocs.filter((doc) => doc.submitted);

    let status: "incomplete" | "complete" | "submitted" = "incomplete";
    if (submittedRequiredDocs.length === requiredDocs.length) status = "complete";

    if (status !== selectedStudent.status) {
      const updatedStudent = { ...selectedStudent, status, lastUpdated: new Date().toISOString() };
      setSelectedStudent(updatedStudent);
      setStudents((prev) => prev.map((s) => (s.id === selectedStudent.id ? updatedStudent : s)));
    }
  }, [studentDocuments, selectedStudent]);

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
    saveStudentDocuments,
    setApplicationStatus,
    removeStudent,
    notification,
    setNotification,
    deleted,
    setDeleted,
    syncStudentWithServer,
  } as const;
};