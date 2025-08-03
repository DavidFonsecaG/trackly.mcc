import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { requiredDocumentsByType, type StudentDocument, type Student } from "../../types";
import ApplicationTypeBadge from "./ApplicationTypeBadge";
import { useAppContext } from "../../context/AppContext";
import DropdownInput from "./DropdownInput";
import displayInitials from "../../utils/displayInitials";
import createColor from "../../utils/createColor";

const EditStudentDialog = () => {
    const { editStudent, setEditStudent, updateStudent, getStudentDocuments } = useAppContext();
    if (!editStudent) return null;

    const terms = ["Fall 2025", "Winter 2026", "Spring 2026"];
    const programs = ["English as a Second Language", "Professional English", "English for Academic Purposes", "English for Healthcare", "AAS in Business", "AAS in Marketing", "AAS in Accounting", "AAS in Information Technology"];
    const schedules = ["4 Day - Morning", "2 Day - Morning", "3 Day - Evening"];

    const initialState: Student = {
        id: editStudent.id,
        name: editStudent.name,
        email: editStudent.email,
        applicationType: editStudent.applicationType,
        term: editStudent.term,
        program: editStudent.program,
        schedule: editStudent.schedule,
        status: editStudent.status,
        lastUpdated: new Date().toISOString(),
    };
    const initialStateDocuments: StudentDocument = {
        studentId: editStudent.id,
        documents: getStudentDocuments(editStudent.id)!,
    };
    
    const [editedStudent, setEditedStudent] = useState<Student>(initialState);
    const [appType, setAppType] = useState<string | undefined | null>(editedStudent.applicationType || null);
    const [studentDocuments, setStudentDocuments] = useState<StudentDocument | null>(initialStateDocuments || null);
    const [editedStudentDocuments, setEditedStudentDocuments] = useState<StudentDocument | null>(studentDocuments || null);
    const [errors, setErrors] = useState({
        name: false,
        email: false,
        program: false,
        schedule: false,
        term: false,
        applicationType: false,
    });

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    const handleSelectAppType = (type: keyof typeof requiredDocumentsByType) => {
        if (appType == type) return;

        setAppType(type);
        setEditedStudent((prev) => ({ ...prev, applicationType: type }));
        setEditedStudentDocuments((prevDoc) => (
            {
                ...prevDoc!,
                documents: requiredDocumentsByType[type].map((name, index) => {
                    const existing = studentDocuments!.documents.find((doc) => doc.name === name);
                    if (existing) return existing;
                    return {
                        id: `d${index + 1}`,
                        name,
                        required: true,
                        submitted: false,    
                    };
                }),
            }
        ));
    };

    const handleSubmit = () => {
        const newErrors = {
            name: !editedStudent.name,
            email: !editedStudent.email || !isValidEmail(editedStudent.email),
            program: !editedStudent.program,
            schedule: !editedStudent.schedule,
            term: !editedStudent.term,
            applicationType: !appType,
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(Boolean);
        if (hasErrors) return;

        if (!editedStudentDocuments) return;

        updateStudent(editedStudent, editedStudentDocuments);
        setEditStudent(null);
    };

    const handleClose = () => {
        setEditStudent(null)
    };

    let cardAddRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let handler = (e: MouseEvent) => {
            if(cardAddRef.current && !cardAddRef.current.contains(e.target as Node)){
                handleClose();
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    useEffect(() => {
        if (!editedStudent) {
            setEditedStudent(initialState);
            setAppType(null);
            setStudentDocuments(null);
        };
    }, [editedStudent]);

    return (
        <div 
            className="z-100 flex items-center justify-center fixed inset-0 w-full h-full p-3 top-0 bg-primary/20"
            role="dialog"
            aria-modal="true"
            aria-label="Edit Student Info"
        >
            <div className="w-lg md:w-3xl max-h-full bg-card rounded-3xl shadow-2xl" ref={cardAddRef}>
                <div className="flex flex-col p-6 text-xs gap-7">
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <div className={`flex items-center justify-center text-white text-2xl size-18 rounded-full bg-radial-[at_25%_25%] ${createColor(editStudent?.name)}`}>{displayInitials(editStudent?.name)}</div>
                            <div className="flex flex-col ml-2">
                                <ApplicationTypeBadge type={editStudent?.applicationType}/>
                                <p className="text-base font-medium">{editStudent?.name}</p>
                                <p className="text-primary/50">{editStudent?.program}</p>
                            </div>
                        </div>
                        <div className="flex items-top">
                            <button 
                            className="flex size-4 rounded-md items-center justify-center cursor-pointer hover:text-primary/50"
                            onClick={handleClose}
                            >{<X className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    <span className="text-lg font-semibold">Edit Student</span>
                </div>
                <div className="pb-6 rounded-b-3xl h-full">
                    <div className="px-6 py-1 max-h-100 overflow-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/50 [&::-webkit-scrollbar-track]:bg-background">
                        <form className="text-xs flex flex-col h-full gap-6">
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="block font-medium leading-none">Type</label>
                                    <div className="flex flex-wrap rounded-lg px-3 py-2 gap-1.5 border">
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
                                        value={editedStudent.name}
                                        onChange={handleInputChange}
                                        required
                                        autoComplete="off"
                                        className={`block w-full rounded-lg px-4 h-9 bg-card border placeholder:font-normal placeholder:text-primary/50 ${errors.name ? "border-red-300" : ""}`}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block font-medium leading-none">Email</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="example@trackly.com"
                                            value={editedStudent.email}
                                            onChange={handleInputChange}
                                            required
                                            autoComplete="off"
                                            className={`block w-full rounded-lg px-4 h-9 bg-card border placeholder:font-normal placeholder:text-primary/50 ${errors.email ? "border-red-300" : ""}`}
                                        />
                                    </div>
                                    <DropdownInput 
                                        label="Program"
                                        options={programs}
                                        value={editedStudent.program || ""}
                                        onSelect={(val) => setEditedStudent((prev) => ({ ...prev, program: val }))}
                                        error={errors.program}
                                    />
                                    <DropdownInput 
                                        label="Schedule"
                                        options={schedules}
                                        value={editedStudent.schedule || ""}
                                        onSelect={(val) => setEditedStudent((prev) => ({ ...prev, schedule: val }))}
                                        error={errors.schedule}
                                    />
                                    <DropdownInput 
                                        label="Term"
                                        options={terms}
                                        value={editedStudent.term || ""}
                                        onSelect={(val) => setEditedStudent((prev) => ({ ...prev, term: val }))}
                                        error={errors.term}
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
        </div>
    );
};

export default EditStudentDialog;