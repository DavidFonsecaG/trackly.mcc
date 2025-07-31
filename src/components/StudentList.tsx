import { useAppContext } from "../context/AppContext";
import { EllipsisVertical } from "lucide-react";
import formatDate from "../utils/formatDate";
import ProgressBar from "./ui/ProgressBar";
import DropdownButton from "./ui/DropdownButton";
import ApplicationTypeBadge from "./ui/ApplicationTypeBadge";
import AddButton from "./ui/AddButton";
import type { Student } from "../types";
import { useState } from "react";
import Tooltip from "./ui/Tooltip";
import SearchBar from "./ui/SearchBar";

const StudentList = () => {    

    const {
        students,
        setSelectedStudent,
        setEditStudent,
        searchTerm,
        updateSearchTerm,
        removeStudent,
    } = useAppContext();

    const [sortConfig, setSortConfig] = useState<{ key: keyof Student; direction: "asc" | "desc"}>({key: "applicationType", direction: "asc"});
    const [tooltip, setTooltip] = useState<{ student: Student; x: number; y: number } | null>(null);

    const filteredStudents = students
    .filter((student) => {
        if (searchTerm === "All Terms") return true;
        return student.term === searchTerm;
    })
    .sort((a, b) => {
        if (!sortConfig) return 0;

        const { key, direction } = sortConfig;
        let aValue = a[key];
        let bValue = b[key];

        // if (key === "lastUpdated") {
        //     aValue = new Date(aValue);
        //     bValue = new Date(bValue);
        // }

        if (aValue! < bValue!) return direction === "asc" ? -1 : 1;
        if (aValue! > bValue!) return direction === "asc" ? 1 : -1;
        return 0;
    });

    const handleSort = (key: keyof Student) => {
        setSortConfig((prev) => {
            if (prev?.key === key) {
                return {
                    key,
                    direction: prev.direction === "asc" ? "desc" : "asc",
                };
            } else {
                return { key, direction: "asc"};
            }
        });
    };

    const terms = ["All Terms", ...new Set(students.map(student => student.term))];

    const handleRowClick = (student: Student) => {
        setSelectedStudent(student);
    };

    const handleDelete = (studentId: string) => {
        removeStudent(studentId);
    };

    return (
        <div className="flex w-full">
            <div className="flex flex-col min-w-full p-3 shadow-sm bg-card rounded-3xl">
                <div className="p-3 flex items-center justify-between rounded-t-3xl">
                    <div className="flex flex-col gap-1">
                        <h2 className="md:text-xl font-semibold">Applications</h2>
                    </div>
                    <div className="flex gap-2">
                        <SearchBar />                        
                        <DropdownButton
                            activeOption={searchTerm}
                            options={terms}
                            action={updateSearchTerm}
                            saveLocalStorage={true}
                            nameLocalStorage="Filter"
                        />
                        <AddButton />
                    </div>
                </div>

                <div className="flex w-full text-sm text-start bg-card rounded-b-3xl pt-3 md:pb-6">
                    <div className="md:hidden w-full text-left dark:text-gray-400">
                        <div className="flex flex-col text-xs text-primary/50 gap-2">
                            {filteredStudents.map((student, index) => (
                                <div 
                                    key={index}
                                    onClick={() => handleRowClick(student)} 
                                    className="flex flex-col p-3 rounded-2xl gap-2 hover:bg-gray-50/70 hover:ring hover:ring-gray-100 cursor-pointer dark:bg-gray-800 dark:border-gray-700 transition-colors dark:hover:bg-gray-600">
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
                        </div>
                    </div>
                    <div className="hidden md:flex w-full">
                        <table className="w-full text-left table-auto dark:text-gray-400">
                            <thead className="dark:text-gray-400">
                                <tr className="text-xs text-primary/50">
                                    <th scope="col" className="pl-4 py-4 font-normal leading-none border-b-[1.5px] border-b-neutral-200/60 cursor-pointer hover:text-primary" onClick={() => handleSort("applicationType")}>
                                        <p className="flex items-center gap-3">Type</p>
                                    </th>
                                    <th scope="col" className="pl-4 py-4 font-normal leading-none border-b-[1.5px] border-b-neutral-200/60 cursor-pointer hover:text-primary" onClick={() => handleSort("name")}>
                                        <p className="flex items-center gap-3">Student</p>
                                    </th>
                                    <th scope="col" className="pl-4 py-4 font-normal leading-none border-b-[1.5px] border-b-neutral-200/60 cursor-pointer hover:text-primary" onClick={() => handleSort("program")}>
                                        <p className="flex items-center gap-3">Program</p>
                                    </th>
                                    {/* <th scope="col" className="px-4 py-4 font-normal leading-none border-b-[1.5px] border-b-neutral-200/60 cursor-pointer hover:text-primary" onClick={() => handleSort("status")}>
                                        <p className="flex items-center gap-3">Status</p>
                                    </th> */}
                                    <th scope="col" className="px-4 py-4 font-normal leading-none border-b-[1.5px] border-b-neutral-200/60 cursor-pointer hover:text-primary" onClick={() => handleSort("status")}>
                                        <p className="flex items-center gap-3">Status</p>
                                    </th>
                                    <th scope="col" className="hidden lg:table-cell pl-4 py-4 font-normal leading-none border-b-[1.5px] border-b-neutral-200/60 cursor-pointer hover:text-primary" onClick={() => handleSort("lastUpdated")}>
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
                                        {/* <td className="pl-4 py-4">
                                            <StatusBadgeDropdown activeOption={student.status} options={["incomplete", "complete", "submitted"]} action={(option: string)=>console.log(option)}/>
                                        </td> */}
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
                            </tbody>
                        </table>
                        {tooltip && (
                            <Tooltip
                                x={tooltip.x}
                                y={tooltip.y}
                                actions={{
                                    Edit: () => setEditStudent(tooltip.student),
                                    Delete: () => handleDelete(tooltip.student.id),
                                }}
                                onClose={() => setTooltip(null)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default StudentList;
