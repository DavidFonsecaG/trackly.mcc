import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { type StudentDocument, type Student } from "../../types";
import ApplicationTypeBadge from "./ApplicationTypeBadge";
import { useAppContext } from "../../context/AppContext";
import { useTrackerConfig } from "../../context/TrackerConfigContext";
import DropdownInput from "./DropdownInput";

const AddStudentDialog = () => {
    const { addStudent, setAddStudent, setStudent } = useAppContext();
    const { config } = useTrackerConfig();
    if (!addStudent) return null;

    const { applicationTypes, terms, programs, schedules } = config;

    const initialState: Partial<Student> = {
        name: "",
        email: "",
        applicationType: "",
        term: "",
        program: "",
        schedule: "",
        status: "incomplete",
        lastUpdated: new Date().toISOString(),
    };
    const [newStudent, setNewStudent] = useState<Partial<Student>>(initialState);
    const [appType, setAppType] = useState<string | null>(null);
    const [studentDocuments, setStudentDocuments] = useState<Partial<StudentDocument> | null>(null);
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
        setNewStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    const handleSelectAppType = (typeId: string) => {
        const type = applicationTypes.find((t) => t.id === typeId);
        if (!type) return;

        setAppType(typeId);
        setNewStudent((prev) => ({ ...prev, applicationType: typeId }));
        setStudentDocuments({
            documents: type.documents.map((name, index) => ({
                id: `d${index + 1}`,
                name,
                required: true,
                submitted: false,
            }))
        });
    };

    const handleSubmit = () => {
        const newErrors = {
            name: !newStudent.name,
            email: !newStudent.email || !isValidEmail(newStudent.email),
            program: !newStudent.program,
            schedule: !newStudent.schedule,
            term: !newStudent.term,
            applicationType: !appType,
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(Boolean);
        if (hasErrors) return;

        if (!studentDocuments) return;

        setStudent(newStudent, studentDocuments);
        setAddStudent(false);
    };

    const handleClose = () => {
        setAddStudent(false)
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
        if (!open) {
            setNewStudent(initialState);
            setAppType(null);
            setStudentDocuments(null);
        };
    }, [open]);

    return (
        <div 
            className="z-100 flex items-center justify-center fixed inset-0 w-full h-full p-3 top-0 bg-primary/20"
            role="dialog"
            aria-modal="true"
            aria-label="Student Details"
        >
            <div className="w-md p-5 bg-card rounded-3xl shadow-2xl" ref={cardAddRef}>
                <div className="text-xs flex flex-col gap-5">
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
                                <label className="block font-medium leading-none">Type</label>
                                <div className={`flex flex-wrap rounded-lg px-3 py-2 gap-1.5 border-[1.5px] ${
                                    errors.applicationType 
                                        ? "border-red-300 hover:border-red-500" 
                                        : "border-neutral-200/60 hover:border-neutral-300"
                                    }`}>
                                    {applicationTypes.map((type) => (
                                        <button
                                            key={type.id}
                                            className={`flex rounded-md items-center cursor-pointer ${appType === type.id ? "outline-2 outline-offset-1 outline-primary" : "hover:outline-2 hover:outline-offset-1"}`}
                                            type="button"
                                            onClick={() => handleSelectAppType(type.id)}
                                        >
                                            <ApplicationTypeBadge type={type.id} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block font-medium leading-none">Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Name"
                                    value={newStudent.name}
                                    onChange={handleInputChange}
                                    required
                                    autoComplete="off"
                                    className={`block w-full rounded-lg px-4 h-9 bg-card border-[1.5px] placeholder:font-normal placeholder:text-primary/50 ${
                                        errors.name 
                                        ? "border-red-300 hover:border-red-500 focus:border-red-500" 
                                        : "border-neutral-200/60 hover:border-neutral-300 focus:border-neutral-300"
                                    }`}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block font-medium leading-none">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="example@trackly.com"
                                    value={newStudent.email}
                                    onChange={handleInputChange}
                                    required
                                    autoComplete="off"
                                    className={`block w-full rounded-lg px-4 h-9 bg-card border-[1.5px] placeholder:font-normal placeholder:text-primary/50 ${
                                        errors.email 
                                        ? "border-red-300 hover:border-red-500 focus:border-red-500" 
                                        : "border-neutral-200/60 hover:border-neutral-300 focus:border-neutral-300"
                                    }`}
                                />
                            </div>
                            <DropdownInput 
                                label="Program"
                                options={programs}
                                value={newStudent.program || ""}
                                onSelect={(val) => setNewStudent((prev) => ({ ...prev, program: val }))}
                                error={errors.program}
                            />
                            <DropdownInput 
                                label="Schedule"
                                options={schedules}
                                value={newStudent.schedule || ""}
                                onSelect={(val) => setNewStudent((prev) => ({ ...prev, schedule: val }))}
                                error={errors.schedule}
                            />
                            <DropdownInput 
                                label="Term"
                                options={terms}
                                value={newStudent.term || ""}
                                onSelect={(val) => setNewStudent((prev) => ({ ...prev, term: val }))}
                                error={errors.term}
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex w-20 justify-center rounded-full bg-card border-[1.5px] border-red-200 py-1 px-3 text-red-500 leading-6 hover:shadow-sm cursor-pointer"
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