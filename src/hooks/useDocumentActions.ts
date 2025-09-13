import { documentService } from "../services/documentService";

export const useDocumentActions = () => {
    return {
        listStudentDocumentsById: documentService.listByIds,
        createStudentDocuments: documentService.create,
        updateStudentDocuments: documentService.update,
        deleteStudentDocument: documentService.delete
    };
};
