import { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import type { Student } from "../../types";
import ApplicationTypeBadge from "../ui/ApplicationTypeBadge";
import ProgressBar from "../ui/ProgressBar";
import formatDate from "../../utils/formatDate";
import Tooltip from "../ui/Tooltip";

interface DesktopTableTypes {
    filteredStudents: Student[];
    handleRowClick: (student: Student) => void;
    setAddStudent: (arg: boolean) => void;
    handleSort: (column: keyof Student) => void;
    handleDelete: (studentId: string) => void;
    setEditStudent: (student: Student) => void;
}

const DesktopTable: React.FC<DesktopTableTypes> = ({
    filteredStudents,
    handleRowClick,
    setAddStudent,
    handleSort,
    handleDelete,
    setEditStudent,
}) => {

    const [tooltip, setTooltip] = useState<{ student: Student; x: number; y: number } | null>(null);

    return (
        <>
            <table className="w-full text-left table-auto dark:text-gray-400">
                <thead className="dark:text-gray-400">
                    <tr className="text-xs text-primary/50">
                        <th scope="col" onClick={() => handleSort("applicationType")} className="pl-4 py-4 font-normal leading-none border-b-[1.5px] border-b-neutral-200/60 cursor-pointer hover:text-primary">
                            <p className="flex items-center gap-3">Type</p>
                        </th>
                        <th scope="col" onClick={() => handleSort("name")} className="pl-4 py-4 font-normal leading-none border-b-[1.5px] border-b-neutral-200/60 cursor-pointer hover:text-primary">
                            <p className="flex items-center gap-3">Student</p>
                        </th>
                        <th scope="col" onClick={() => handleSort("program")} className="pl-4 py-4 font-normal leading-none border-b-[1.5px] border-b-neutral-200/60 cursor-pointer hover:text-primary">
                            <p className="flex items-center gap-3">Program</p>
                        </th>
                        <th scope="col" onClick={() => handleSort("status")} className="px-4 py-4 font-normal leading-none border-b-[1.5px] border-b-neutral-200/60 cursor-pointer hover:text-primary">
                            <p className="flex items-center gap-3">Status</p>
                        </th>
                        <th scope="col" onClick={() => handleSort("lastUpdated")} className="hidden lg:table-cell pl-4 py-4 font-normal leading-none border-b-[1.5px] border-b-neutral-200/60 cursor-pointer hover:text-primary">
                            <p className="flex items-center gap-3">Last Updated</p>
                        </th>
                        <th scope="col" className="hidden lg:table-cell px-4 py-4 border-b-[1.5px] border-b-neutral-200/60">
                            <span className="sr-only">Options</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="text-xs text-primary/50">
                    {filteredStudents.map((student, index) => (
                        <tr 
                            key={index}
                            onClick={() => handleRowClick(student)}
                            className="group border-b-[1.5px] border-b-neutral-200/60 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 transition-colors cursor-pointer dark:hover:bg-gray-600">
                            <td className="pl-4 py-4">
                                <ApplicationTypeBadge type={student.applicationType} />
                            </td>
                            <th scope="row" className="pl-4 py-4 whitespace-nowrap dark:text-white">
                                <div>
                                    <p className="text-sm text-primary font-semibold">{student.name}</p>
                                    <p className="font-normal">{student.email}</p>
                                </div>  
                            </th>
                            <td className="pl-4 py-4">
                                <div>
                                    <p className="text-primary">{student.schedule}</p>
                                    <p>{student.program}</p>
                                </div>
                            </td>
                            <td className="px-4 py-4 md:w-50 lg:w-70 xl:w-100">
                                <ProgressBar studentId={student.id} />
                            </td>
                            <td className="hidden text-primary lg:table-cell pl-4 py-4">{formatDate(student.lastUpdated)}</td>
                            <td className="hidden lg:table-cell px-4 py-4 w-4 items-end">
                                <span
                                    onClick={(e) => {e.preventDefault(); e.stopPropagation(); setTooltip({student, x: e.clientX, y: e.clientY})}}
                                    className="flex justify-center rounded-full size-6 items-center opacity-0 text-primary/50 hover:text-primary hover:bg-gray-200 group-hover:opacity-100 transition-opacity duration-200">
                                    <EllipsisVertical className="w-4 h-4 action-button"/>
                                </span>
                            </td>
                        </tr>
                    ))}
                    <tr
                        onClick={() => (setAddStudent(true))} 
                        className="h-17 text-md cursor-pointer border-b-[1.5px] border-b-neutral-200/60 hover:bg-gray-50 hover:text-primary">
                            <td colSpan={6} className="text-lg text-center py-4">+</td>
                    </tr>                             
                </tbody>
            </table>
            {tooltip && (
                <Tooltip
                    x={tooltip?.x}
                    y={tooltip?.y}
                    actions={{
                        Edit: () => setEditStudent(tooltip.student),
                        Delete: () => handleDelete(tooltip.student.id),
                    }}
                    onClose={() => setTooltip(null)}
                />
            )}
        </>
    )
};

export default DesktopTable;