import { useEffect, useRef, useState } from "react";
import { Check, Minus, X, Plus, File } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import formatDate from "../utils/formatDate";
import ProgressBar from "./ui/ProgressBar";
import type { Document } from "../types";
import ApplicationTypeBadge from "./ui/ApplicationTypeBadge";
import Tooltip from "./ui/Tooltip";

const StudentDetail: React.FC = () => {
    
    const { selectedStudent, setSelectedStudent, getStudentDocuments, updateDocumentStatus, updateStudentDocs } = useAppContext();
    if (!selectedStudent) return null;

    const documents = getStudentDocuments(selectedStudent?.id) || [];

    const [tooltip, setTooltip] = useState<{ docId: string; x: number; y: number } | null>(null);


    const handleToggleSubmitted = (doc: Document) => {
        updateDocumentStatus(
            selectedStudent.id,
            doc.id,
            !doc.submitted,
            doc.required,
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
            {/* <div className="w-lg p-6 bg-card rounded-3xl shadow-2xl" ref={cardRef}>
                <div className="text-xs flex flex-col gap-6">
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                            <ApplicationTypeBadge type={selectedStudent?.applicationType}/>
                            <button 
                                className="flex size-4 rounded-md items-center justify-center cursor-pointer hover:text-primary/50"
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
                                    {doc.submitted == null ? <Minus className="w-2 h-2 text-primary/50" strokeWidth="4"/> : ""}
                                </button>
                                <div>
                                    <p 
                                        className={`cursor-pointer relative ${doc.submitted == null ? "text-primary/50" : ""}`} 
                                        onClick={() => {handleToggleSubmitted(doc)}}
                                        onContextMenu={(e) => {e.preventDefault(); setTooltip({docId: doc.id, x: e.clientX, y: e.clientY})}}
                                    >{doc.name}</p>
                                    {!doc.notes 
                                        ? <p className="text-primary/50">{doc.submitted ? `${formatDate(doc.submissionDate)}` : 'No submission date'}</p>
                                        : <input className="border py-1 px-3 rounded-md font-light text-[.65rem] text-primary/70" value={doc.notes}/>
                                    }
                                </div>
                            </div>
                        ))}
                        {tooltip && (
                            <Tooltip
                                x={tooltip.x}
                                y={tooltip.y}
                                onWaive={() => updateDocumentStatus(selectedStudent.id, tooltip.docId, null, false, "")}
                                onClose={() => setTooltip(null)}
                            />
                        )}
                    </div>
                </div>
            </div> */}
            <div className="w-lg md:w-3xl max-h-full bg-card rounded-3xl shadow-2xl" ref={cardRef}>
                <div className="flex flex-col p-6 text-xs gap-6">
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <div className="size-18 rounded-md bg-blue-300"></div>
                            <div className="flex flex-col ml-2">
                                <ApplicationTypeBadge type={selectedStudent?.applicationType}/>
                                <p className="text-base font-medium">{selectedStudent?.name}</p>
                                <p className="text-primary/50">{selectedStudent?.program}</p>
                            </div>
                        </div>
                        <div className="flex items-top">
                            <button 
                            className="flex size-4 rounded-md items-center justify-center cursor-pointer hover:text-primary/50"
                            onClick={handleBackClick}
                            >{<X className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    <ProgressBar studentId={selectedStudent.id} />
                </div>
                <div className="pb-6 rounded-b-3xl h-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 max-h-100 overflow-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/50 [&::-webkit-scrollbar-track]:bg-background">
                        {documents.map((doc, index) => (
                            <div 
                                key={index} 
                                className="group flex p-3 border border-gray-200 rounded-2xl gap-2 text-[.65rem] cursor-pointer hover:bg-gray-50/70 hover:ring hover:ring-gray-100"
                                onClick={() => {handleToggleSubmitted(doc)}}
                                onContextMenu={(e) => {e.preventDefault(); setTooltip({docId: doc.id, x: e.clientX, y: e.clientY})}}
                            >
                                <div className="flex w-full gap-3">
                                    <div className="flex items-center">
                                        <div
                                            className={`flex items-center justify-center size-4 rounded-sm ${doc.submitted ? 'bg-primary text-white' : 'border border-primary/20'}`}
                                        >
                                            {doc.submitted && <Check className="w-2 h-2" strokeWidth="4"/>}
                                            {doc.submitted == null ? <Minus className="w-2 h-2 text-primary/30" strokeWidth="4"/> : ""}
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="flex items-center justify-center bg-primary/5 text-primary/50 size-9 rounded-lg">
                                            <File className="w-4 h-4"/>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full justify-center">
                                        <div className="flex justify-between">
                                                <p className={`relative text-xs ${doc.submitted == null ? "text-primary/50" : ""}`}>{doc.name}</p>
                                                <p className="text-primary/50 text-end">{doc.submitted ? `${formatDate(doc.submissionDate)}` : 'No submission date'}</p>
                                        </div>
                                        <div className="max-w-fit text-primary/70">
                                            {!doc.notes
                                            ? <p className="flex items-center gap-1 opacity-0 text-primary/50 hover:text-primary group-hover:opacity-100 transition-opacity duration-200"><Plus className="w-3 h-3"/>Add note</p>
                                            : <input className="min-w-full font-light focus:outline-none" value={doc.notes}/>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {tooltip && (
                            <Tooltip
                                x={tooltip.x}
                                y={tooltip.y}
                                onWaive={() => updateDocumentStatus(selectedStudent.id, tooltip.docId, null, false, "")}
                                onClose={() => setTooltip(null)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDetail