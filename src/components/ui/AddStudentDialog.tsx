import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { requiredDocumentsByType, type StudentDocument, type Student } from "../../types";
import ApplicationTypeBadge from "./ApplicationTypeBadge";
import { useAppContext } from "../../context/AppContext";

interface AddStudentDialogProps{
    setOpen: (open: boolean) => void,
};

const AddStudentDialog = ({setOpen}: AddStudentDialogProps) => {
    const { students, setStudent, setStudentDocument } = useAppContext();
    const initialState: Student = {
        id: `${students.length + 1}`,
        name: "",
        email: "",
        applicationId: "",
        applicationType: "abroad",
        term: "",
        program: "English as a Second Language",
        schedule: "4 Day - Morning",
        status: "incomplete",
        lastUpdated: new Date().toISOString(),
    };
    const [newStudent, setNewStudent] = useState<Student>(initialState);
    const [appType, setAppType] = useState<keyof typeof requiredDocumentsByType | null>(null);
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
        setNewStudent((prev) => ({ ...prev, applicationType: type }));
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

    const handleSubmit = () => {
        if (!appType || !newStudent.name || !newStudent.email || !newStudent.program || !newStudent.term || !studentDocuments){
            alert("Please complete all required fields!");
            return;
        };

        setStudent(newStudent);
        setStudentDocument(studentDocuments);
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false)
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

    useEffect(() => {
        if (!open) {
            setNewStudent(initialState);
            setAppType(null);
            setStudentDocuments(null);
        };
    }, [open]);

    return (
        <div 
            className="z-100 flex items-center justify-center fixed inset-0 w-full h-full top-0 bg-primary/20"
            role="dialog"
            aria-modal="true"
            aria-label="Student Details"
        >
            <div className="w-md p-6 bg-card rounded-3xl shadow-2xl" ref={cardAddRef}>
                <div className="text-xs flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">New Application</span>
                        <button 
                            className="flex size-7 rounded-md items-center justify-center cursor-pointer hover:text-primary/50"
                            onClick={handleClose}
                            >{<X className="w-4 h-4" />}
                        </button>
                    </div>
                    <form className="flex flex-col h-full gap-6">
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label htmlFor="appType" className="block font-medium leading-none">Type</label>
                                <div className="flex flex-wrap rounded-md py-1 gap-2">
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
                            <div className="space-y-2">
                                <label htmlFor="name" className="block font-medium leading-none">Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Name"
                                    value={newStudent.name}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full rounded-lg px-4 h-9 bg-card border placeholder:font-normal placeholder:text-primary/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="block font-medium leading-none">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="example@trackly.com"
                                    value={newStudent.email}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full rounded-lg px-4 h-9 bg-card border placeholder:font-normal placeholder:text-primary/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="program" className="block font-medium leading-none">Program</label>
                                <input
                                    id="program"
                                    name="program"
                                    type="text"
                                    placeholder="Select a program"
                                    value={newStudent.program}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full rounded-lg px-4 h-9 bg-card border placeholder:font-normal placeholder:text-primary/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="term" className="block font-medium leading-none">Term</label>
                                <input
                                    id="term"
                                    name="term"
                                    type="text"
                                    placeholder="Select a term"
                                    value={newStudent.term}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full rounded-lg px-4 h-9 bg-card border placeholder:font-normal placeholder:text-primary/50"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex w-20 justify-center rounded-full bg-card border border-red-200 py-1 px-3 text-red-500 leading-6 hover:shadow-sm cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="flex w-20 justify-center rounded-full bg-primary py-1 px-3 leading-6 text-white hover:shadow-sm cursor-pointer"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddStudentDialog;