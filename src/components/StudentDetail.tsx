import { useEffect, useRef, useState } from "react";
import { Check, Minus, X, Plus, File } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import formatDate from "../utils/formatDate";
import ProgressBar from "./ui/ProgressBar";
import type { Document } from "../types";
import ApplicationTypeBadge from "./ui/ApplicationTypeBadge";
import Tooltip from "./ui/Tooltip";

const StudentDetail: React.FC = () => {
    
    const { selectedStudent, setSelectedStudent, getStudentDocuments, updateDocumentStatus, updateStudentDocs, syncStudentWithServer } = useAppContext();
    if (!selectedStudent) return null;

    const documents = getStudentDocuments(selectedStudent?.id) || [];

    const [editedNotes, setEditedNotes] = useState<Record<string, string>>({});
    const [tooltip, setTooltip] = useState<{ docId: string; x: number; y: number } | null>(null);

    const handleToggleSubmitted = (doc: Document) => {
        updateDocumentStatus(
            selectedStudent.id,
            doc.id,
            !doc.submitted,
            true,
            doc.notes,
        );
    };

    const handleBackClick = () => {
        updateStudentDocs(selectedStudent.id);
        syncStudentWithServer(selectedStudent.id);
        setSelectedStudent(null);
    };
    
    const handleAddNote = (doc: Document) => {
        setEditedNotes((prev) => ({ ...prev, [doc.id]: doc.notes || ""}));
    };

    const handleNoteChange = (docId: string, value: string) => {
        setEditedNotes((prev) => ({...prev, [docId]: value}));
    };

    const handleNoteSave = (doc: Document) => {
        const note = editedNotes[doc.id]
        updateDocumentStatus(selectedStudent.id, doc.id, doc.submitted, doc.required, note);
        setEditedNotes((prev) => {
            const {[doc.id]: removed, ...rest} = prev;
            return rest;
        });
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
    }, [documents, selectedStudent]);

    const displayInitials = (name: string) => {
        return name.split(" ").map(word => word.charAt(0).toUpperCase()).join("")
    };

    return (
        <div 
            className="z-100 flex items-center justify-center fixed inset-0 w-full h-full p-3 top-0 bg-primary/20"
            role="dialog"
            aria-modal="true"
            aria-label="Student Details" 
            aria-hidden={!selectedStudent}
        >
            <div className="w-lg md:w-3xl max-h-full bg-card rounded-3xl shadow-2xl" ref={cardRef}>
                <div className="flex flex-col p-6 text-xs gap-7">
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <div className="flex items-center justify-center text-white text-2xl size-18 rounded-md bg-blue-300">{displayInitials(selectedStudent?.name)}</div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 py-1 max-h-100 overflow-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/50 [&::-webkit-scrollbar-track]:bg-background">
                        {documents.map((doc, index) => (
                            <div 
                                key={index} 
                                onClick={() => {handleToggleSubmitted(doc)}}
                                onContextMenu={(e) => {e.preventDefault(); setTooltip({docId: doc.id, x: e.clientX, y: e.clientY})}}
                                className={`flex p-3 border rounded-2xl gap-2 text-[.65rem] cursor-pointer ${doc.submitted !== null ? (doc.submitted ? "group hover:bg-gray-50/70 hover:ring hover:ring-gray-100" : "group bg-pink-300/5 text-pink-700 border-pink-700/15 hover:bg-pink-400/5 hover:ring hover:ring-pink-700/15") : "bg-gray-100 border-gray-200"}`}
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
                                        <div className="flex items-center justify-center bg-current/10 size-9 rounded-lg text-current/50">
                                            <File className="w-4 h-4"/>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full justify-center">
                                        <div className="flex justify-between">
                                                <p className={`relative text-xs ${doc.submitted == null && "text-primary/50"}`}>{doc.name}</p>
                                                <p className="text-primary/50 text-end">{doc.submitted ? `${formatDate(doc.submissionDate)}` : 'No submission date'}</p>
                                        </div>
                                        <div className="text-primary/70">
                                            {editedNotes[doc.id] !== undefined
                                            ? (<div className="flex w-full gap-1">
                                                    <input 
                                                        className="font-light border rounded-sm px-2 bg-card focus:outline-none"
                                                        type="text" 
                                                        value={editedNotes[doc.id]}
                                                        onClick={(e) => e.stopPropagation()}
                                                        onChange={(e) => handleNoteChange(doc.id, e.target.value)}
                                                        onBlur={() => handleNoteSave(doc)}/>
                                                    <button
                                                        onClick={(e) => {e.stopPropagation(); handleNoteSave(doc)}}
                                                        className="bg-primary rounded-full text-[.6rem] text-white h-4 px-2 cursor-pointer">Save</button>
                                                </div>)
                                            : doc.notes 
                                                ? (<p
                                                    onClick={(e) => {e.stopPropagation(); handleAddNote(doc)}}
                                                    className="flex w-fit text-primary/50 hover:text-primary cursor-text">
                                                    {doc.notes}
                                                   </p>)
                                                : (<p
                                                    onClick={(e) => {e.stopPropagation(); handleAddNote(doc)}}
                                                    className="flex items-center w-fit gap-1 opacity-0 text-primary/50 hover:text-primary group-hover:opacity-100 transition-opacity duration-200">
                                                    <Plus className="w-3 h-3"/>
                                                    Add note
                                                   </p>)
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