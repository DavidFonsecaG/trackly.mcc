import { useAppContext } from "../context/AppContext";
import { ChevronsUpDown, Trash2 } from "lucide-react";
import formatDate from "../utils/formatDate";
import ProgressBar from "./ui/ProgressBar";
import FilterButton from "./ui/FilterButton";
import ApplicationTypeBadge from "./ui/ApplicationTypeBadge";
import AddButton from "./ui/AddButton";
import type { Student } from "../types";
import { useState } from "react";


const StudentList = () => {    

    const {
        students,
        setSelectedStudent,
        searchTerm,
        updateSearchTerm,
        removeStudent,
    } = useAppContext();

    const [sortConfig, setSortConfig] = useState<{ key: keyof Student; direction: "asc" | "desc"} | null>(null);

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

    const handleDelete = (e: React.MouseEvent, studentId: string) => {
        e.stopPropagation();
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
                        <div className="hidden lg:flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 bg-white dark:bg-gray-900">
                            <label  className="sr-only">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-3 h-3 text-primary/50 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="text" id="table-search-users" className="text-xs/5 block p-2 ps-10 border rounded-full w-80 bg-background dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search"/>
                            </div>
                        </div>
                        <FilterButton 
                            terms={terms} 
                            searchTerm={searchTerm} 
                            updateSearchTerm={updateSearchTerm} 
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
                        <table className="w-full text-left dark:text-gray-400">
                            <thead className="dark:text-gray-400">
                                <tr className="text-xs text-primary/50">
                                    <th scope="col" className="pl-4 py-4 font-medium leading-none border-b cursor-pointer hover:text-primary" onClick={() => handleSort("applicationType")}>
                                        <p className="flex items-center gap-3">
                                            Type
                                            {<ChevronsUpDown className="w-3.5 h-3.5" />}
                                        </p>
                                    </th>
                                    <th scope="col" className="pl-4 py-4 font-medium leading-none border-b cursor-pointer hover:text-primary" onClick={() => handleSort("name")}>
                                        <p className="flex items-center gap-3">
                                            Student
                                            {<ChevronsUpDown className="w-3.5 h-3.5" />}
                                        </p>
                                    </th>
                                    <th scope="col" className="pl-4 py-4 font-medium leading-none border-b cursor-pointer hover:text-primary" onClick={() => handleSort("program")}>
                                        <p className="flex items-center gap-3">
                                            Program
                                            {<ChevronsUpDown className="w-3.5 h-3.5" />}
                                        </p>
                                    </th>
                                    <th scope="col" className="pl-4 py-4 font-medium leading-none border-b cursor-pointer hover:text-primary" onClick={() => handleSort("status")}>
                                        <p className="flex items-center gap-3">
                                            Status
                                            {<ChevronsUpDown className="w-3.5 h-3.5" />}
                                        </p>
                                    </th>
                                    <th scope="col" className="hidden lg:table-cell pl-4 py-4 font-medium leading-none border-b cursor-pointer hover:text-primary" onClick={() => handleSort("lastUpdated")}>
                                        <p className="flex items-center gap-3">
                                            Last Updated
                                            {<ChevronsUpDown className="w-3.5 h-3.5" />}
                                        </p>
                                    </th>
                                    <th scope="col" className="hidden lg:table-cell px-4 py-4 border-b">
                                        <span className="sr-only">Options</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-xs text-primary/50">
                                {filteredStudents.map((student, index) => (
                                    <tr 
                                        key={index}
                                        onClick={() => handleRowClick(student)}
                                        className="group border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 transition-colors cursor-pointer dark:hover:bg-gray-600">
                                        <td className="pl-4 py-2">
                                            <ApplicationTypeBadge type={student.applicationType} />
                                        </td>
                                        <th scope="row" className="pl-4 py-2 whitespace-nowrap dark:text-white">
                                            <div>
                                                <p className="text-primary font-semibold">{student.name}</p>
                                                <p className="font-normal">{student.email}</p>
                                            </div>  
                                        </th>
                                        <td className="pl-4 py-2">
                                            <div>
                                                <p className="text-primary">{student.schedule}</p>
                                                <p>{student.program}</p>
                                            </div>
                                        </td>
                                        <td className="pl-4 py-2 md:w-50 lg:w-70 xl:w-100">
                                            <ProgressBar studentId={student.id} />
                                        </td>
                                        <td className="hidden lg:table-cell pl-4 py-2">{formatDate(student.lastUpdated)}</td>
                                        <td className="hidden lg:table-cell px-4 py-2 w-4 items-end">
                                            <span
                                                onClick={(e) => { handleDelete(e, student.id) }}
                                                className="flex justify-center opacity-0  text-zinc-400 hover:text-red-400 group-hover:opacity-100 transition-opacity duration-200">
                                                <Trash2 className="w-4 h-4 action-button"/>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default StudentList;
