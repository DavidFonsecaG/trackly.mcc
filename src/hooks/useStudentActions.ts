import { studentService } from "../services/studentService";

export const useStudentActions = () => {
    return {
        listStudents: studentService.list,
        createStudent: studentService.create,
        deleteStudent: studentService.delete,
        updateStudentOnServer: studentService.update
    };
};
