import { useAppContext } from "../context/AppContext";
import ProgressBar from "./ui/ProgressBar";
import formatDate from "../utils/formatDate";
import type { Document } from "../types";
import { Check, X } from "lucide-react";

const StudentDetail: React.FC = () => {
    
    const { selectedStudent, setSelectedStudent, getStudentDocuments, updateDocumentStatus } = useAppContext();
    if (!selectedStudent) return null;

    const documents = getStudentDocuments(selectedStudent?.id) || [];

    const handleBackClick = () => {
        setSelectedStudent(null);
    };

    const handleToggleSubmitted = (doc: Document) => {
        updateDocumentStatus(
            selectedStudent.id,
            doc.id,
            !doc.submitted,
            doc.notes,
        )
    };

    return (
        <div 
            className="z-90 flex items-center justify-center fixed w-full h-full top-0 bg-primary/20"
            role="dialog"
            aria-modal="true"
            aria-label="Student Details" 
            aria-hidden={!selectedStudent}
        >
            <div className="w-lg px-6 py-6 bg-card rounded-3xl shadow-2xl">
                <div className="text-xs flex flex-col gap-6">
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                            <p className="px-2 py-1 rounded-md text-[0.6rem] border">{selectedStudent?.applicationType}</p>
                            <button 
                                className="flex size-7 rounded-md items-center justify-center cursor-pointer hover:text-primary/50"
                                onClick={handleBackClick}
                                >{<X className="w-4 h-4" />}</button>
                        </div>
                        <p className="text-base font-medium">{selectedStudent?.name}</p>
                        <p className="text-primary/50">{selectedStudent?.program}</p>
                    </div>
                    <div>
                        <ProgressBar studentId={selectedStudent.id} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {documents.map((doc, index) => (
                            <div key={index} className="flex gap-1.5">
                                <button
                                    onClick={() => {handleToggleSubmitted(doc)}} 
                                    className={`flex items-center justify-center w-4 h-4 rounded-sm cursor-pointer ${doc.submitted ? 'bg-primary text-white' : 'border border-primary/20'}`}
                                >
                                    {doc.submitted && <Check className="w-2 h-2" strokeWidth="4"/>}
                                </button>
                                <div>
                                    <p className="cursor-pointer" onClick={() => {handleToggleSubmitted(doc)}}>{doc.name}</p>
                                    <p className="text-primary/50">{doc.submitted ? `Submitted on ${formatDate(doc.submissionDate)}` : 'No submission date'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDetail