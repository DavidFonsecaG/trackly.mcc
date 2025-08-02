import type { Student } from "../../types";
import ApplicationTypeBadge from "../ui/ApplicationTypeBadge";
import ProgressBar from "../ui/ProgressBar";

interface MobileTableTypes {
    filteredStudents: Student[];
    handleRowClick: (student: Student) => void;
    setAddStudent: (arg: boolean) => void;
}

const MobileTable: React.FC<MobileTableTypes> = ({
    filteredStudents,
    handleRowClick,
    setAddStudent,
}) => {
    return (
        <div className="flex flex-col text-xs text-primary/50 gap-2">
            {filteredStudents.map((student, index) => (
                <div 
                    key={index}
                    onClick={() => handleRowClick(student)} 
                    className="flex flex-col p-3 rounded-2xl gap-2 hover:bg-background/30 hover:inset-ring-[1.5px] hover:inset-ring-gray-100 cursor-pointer dark:bg-gray-800 dark:border-gray-700 transition-colors dark:hover:bg-gray-600">
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-2">
                            <div>
                                <ApplicationTypeBadge type={student.applicationType} />
                            </div>
                            <div className=" whitespace-nowrap dark:text-white">
                                <p className="text-primary font-semibold">{student.name}</p>
                                <p className="font-normal">{student.email}</p>
                            </div>
                        </div>
                        <div className="flex items-end text-end">
                            <div>
                                <p className="text-primary">{student.schedule}</p>
                                <p>{student.program}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <ProgressBar studentId={student.id} />
                    </div>
                </div>
            ))}
            <div
                onClick={() => (setAddStudent(true))} 
                className="flex p-3 h-24 text-base rounded-2xl justify-center items-center ring ring-gray-100 hover:bg-gray-50/70 hover:ring-gray-200 cursor-pointer dark:bg-gray-800 dark:border-gray-700 transition-colors dark:hover:bg-gray-600">
                +
            </div>
        </div>
    )
};

export default MobileTable;