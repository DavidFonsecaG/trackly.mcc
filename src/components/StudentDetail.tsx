import { useEffect, useRef } from "react";
import { Check, X } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import formatDate from "../utils/formatDate";
import ProgressBar from "./ui/ProgressBar";
import type { Document } from "../types";
import ApplicationTypeBadge from "./ui/ApplicationTypeBadge";

const StudentDetail: React.FC = () => {
    
    const { selectedStudent, setSelectedStudent, getStudentDocuments, updateDocumentStatus, updateStudentDocs } = useAppContext();
    if (!selectedStudent) return null;

    const documents = getStudentDocuments(selectedStudent?.id) || [];

    const handleToggleSubmitted = (doc: Document) => {
        updateDocumentStatus(
            selectedStudent.id,
            doc.id,
            !doc.submitted,
            doc.notes,
        );
    };

    const handleBackClick = () => {
        updateStudentDocs(selectedStudent.id);
        setSelectedStudent(null);
    };

    let cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let handler = (e: MouseEvent) => {
            if(cardRef.current && !cardRef.current.contains(e.target as Node)) {
                handleBackClick();
            }
        };
        document.addEventListener("mousedown", handler);
        return() => {
            document.removeEventListener("mousedown", handler);
        };
    }, [documents]);

    return (
        <div 
            className="z-100 flex items-center justify-center fixed inset-0 w-full h-full p-3 top-0 bg-primary/20"
            role="dialog"
            aria-modal="true"
            aria-label="Student Details" 
            aria-hidden={!selectedStudent}
        >
            <div className="w-lg p-6 bg-card rounded-3xl shadow-2xl" ref={cardRef}>
                <div className="text-xs flex flex-col gap-6">
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                            <ApplicationTypeBadge type={selectedStudent?.applicationType}/>
                            <button 
                                className="flex size-7 rounded-md items-center justify-center cursor-pointer hover:text-primary/50"
                                onClick={handleBackClick}
                                >{<X className="w-4 h-4" />}
                            </button>
                        </div>
                        <p className="text-base font-medium">{selectedStudent?.name}</p>
                        <p className="text-primary/50">{selectedStudent?.program}</p>
                    </div>
                    <div>
                        <ProgressBar studentId={selectedStudent.id} />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
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
                                    {/* <input className="font-light text-[.65rem] text-primary/70" value={doc.notes}/> */}
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