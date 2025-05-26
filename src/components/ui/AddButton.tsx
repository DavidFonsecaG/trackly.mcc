import { useEffect, useRef, useState } from "react";
import { Plus, Check, X } from "lucide-react";
import { requiredDocumentsByType, type StudentDocument, type Student, type Document } from "../../types";
import ApplicationTypeBadge from "./ApplicationTypeBadge";
import formatDate from "../../utils/formatDate";
import ProgressBar from "../ui/ProgressBar";
import { useAppContext } from "../../context/AppContext";

const AddButton: React.FC = () => {
    const { students } = useAppContext();
    const [open, setOpen] = useState(false);
    const [appType, setAppType] = useState<keyof typeof requiredDocumentsByType | null>(null);
    const [newStudent, setNewStudent] = useState<Student>({
        id: `${students.length + 1}`,
        name: "",
        email: "",
        applicationId: "",
        applicationType: "abroad",
        term: "Fall 2025",
        program: "English as a Second Language",
        schedule: "4 Day - Morning",
        status: "incomplete",
        lastUpdated: new Date().toISOString(),
    });
    const [studentDocuments, setStudentDocuments] = useState<StudentDocument | null>(null);    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    const handleSelectAppType = (type: keyof typeof requiredDocumentsByType) => {
        setAppType(type);
        setStudentDocuments({
            studentId: newStudent.id,
            documents: requiredDocumentsByType[type].map((name, index) => ({
                id: `d${index + 1}`,
                name,
                required: true,
                submitted: false,
            }))
        });
    };

    const handleToggleSubmitted = (document: Document) => {
        setStudentDocuments((prevDocs) => {
            if (prevDocs?.studentId === newStudent.id) {
                return {
                    ...prevDocs,
                    documents: prevDocs.documents.map((doc) => {
                        if (doc.id === document.id) {
                            return {
                                ...doc,
                                submitted: !document.submitted,
                                submissionDate: !document.submitted ? new Date().toISOString() : undefined,
                                notes: document.notes !== undefined ? document.notes : doc.notes,
                            };
                        }
                        return doc;
                    }),
                };
            }
            return prevDocs;
        });
    };

    const handleSubmit = () => {
        console.log("Student data to submit:", newStudent);
        console.log("Documents to submit:", studentDocuments);
    };

    let cardAddRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let handler = (e: MouseEvent) => {
            if(cardAddRef.current && !cardAddRef.current.contains(e.target as Node)){
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    return (
        <div className="text-left text-xs">
            <div ref={cardAddRef}>
                <button 
                    type="button" 
                    className="inline-flex size-9 items-center justify-center rounded-full bg-primary text-white text-lg cursor-pointer hover:bg-primary/90 hover:shadow-sm"
                    onClick={() => setOpen(!open)}
                >
                    <Plus className="w-4 h-4"/>
                </button>

                {open && 
                    <div 
                        className="z-100 flex items-center justify-center fixed inset-0 w-full h-full top-0 bg-primary/20"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Student Details"
                    >
                        <div className="w-3xl h-126 p-2 bg-card rounded-3xl shadow-2xl" ref={cardAddRef}>
                            <form className="flex h-full">
                                <div className="w-2/5 h-full px-4 py-6 bg-background rounded-2xl space-y-6 text-xs">
                                    <div><span className="text-lg font-bold">Add Student</span></div>
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <label htmlFor="name" className="block font-medium leading-none">Name</label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="Name"
                                                value={newStudent.name}
                                                onChange={handleInputChange}
                                                required
                                                className="block w-full rounded-md p-2 bg-card border placeholder:font-normal placeholder:text-primary/50"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label htmlFor="email" className="block font-medium leading-none">Email</label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="example@trackly.com"
                                                value={newStudent.email}
                                                onChange={handleInputChange}
                                                required
                                                className="block w-full rounded-md p-2 bg-card border placeholder:font-normal placeholder:text-primary/50"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label htmlFor="program" className="block font-medium leading-none">Program</label>
                                            <input
                                                id="program"
                                                name="program"
                                                type="text"
                                                placeholder="Select a program"
                                                value={newStudent.program}
                                                onChange={handleInputChange}
                                                required
                                                className="block w-full rounded-md p-2 bg-card border placeholder:font-normal placeholder:text-primary/50"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label htmlFor="term" className="block font-medium leading-none">Term</label>
                                            <input
                                                id="term"
                                                name="term"
                                                type="text"
                                                placeholder="Select a term"
                                                value={newStudent.term}
                                                onChange={handleInputChange}
                                                required
                                                className="block w-full rounded-md p-2 bg-card border placeholder:font-normal placeholder:text-primary/50"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label htmlFor="appType" className="block font-medium leading-none">Application Type</label>
                                            <div className="flex flex-wrap rounded-md py-1 space-x-2 space-y-2">
                                                {Object.keys(requiredDocumentsByType).map((type) => (
                                                    <button 
                                                        key={type}
                                                        className={`flex rounded-md items-center cursor-pointer ${appType === type ? "outline-2 outline-offset-1 outline-primary" : "hover:outline-2 hover:outline-offset-1"}`}
                                                        type="button"
                                                        onClick={() => handleSelectAppType(type as keyof typeof requiredDocumentsByType)}
                                                    >
                                                        <ApplicationTypeBadge type={type as keyof typeof requiredDocumentsByType} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col w-3/5 p-4 pl-6 justify-between">
                                    {appType === null
                                        ? <div className="flex w-full h-full text-xl font-semibold items-center justify-center">Select an application type</div> 
                                        : <>
                                            <div className="text-xs flex flex-col gap-6">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center justify-between">
                                                        <ApplicationTypeBadge type={appType} />
                                                        <button 
                                                            className="flex size-7 rounded-md items-center justify-center cursor-pointer hover:text-primary/50"
                                                            onClick={() => {setAppType(null); setOpen(!open)}}
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <p className="text-base font-medium">{newStudent.name}</p>
                                                    <p className="text-primary/50">{newStudent.program}</p>
                                                </div>
                                                <ProgressBar studentId={newStudent.id} />
                                                <div className="grid grid-cols-2 gap-4">
                                                    {studentDocuments?.documents.map((doc, index) => (
                                                        <div key={index} className="flex gap-1.5">
                                                            <button
                                                                onClick={() => {handleToggleSubmitted(doc)}}
                                                                type="button"
                                                                className={`flex items-center justify-center w-4 h-4 rounded-sm cursor-pointer ${doc.submitted ? 'bg-primary text-white' : 'border border-primary/20'}`}
                                                            >
                                                                {doc.submitted && <Check className="w-2 h-2" strokeWidth="4" />}
                                                            </button>
                                                            <div>
                                                                <p className="cursor-pointer" onClick={() => {handleToggleSubmitted(doc)}}>{doc.name}</p>
                                                                <p className="text-primary/50">{doc.submitted ? `Submitted on ${formatDate(doc.submissionDate)}` : 'No submission date'}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setOpen(false)}
                                                    className="flex w-20 justify-center rounded-md bg-card border border-red-500 py-1 px-3 text-red-500 font-semibold leading-6 hover:shadow-sm"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleSubmit}
                                                    className="flex w-20 justify-center rounded-md bg-primary py-1 px-3 font-semibold leading-6 text-white hover:shadow-sm"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default AddButton;
