import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProgressBar from "./ui/ProgressBar";
import formatDate from "../utils/formatDate";
import ApplicationTypeBadge from "./ui/ApplicationTypeBadge";
import { ChevronsUpDown, ChevronRight } from "lucide-react";

function StudentList() {    
    const [open, setOpen] = useState(false);

    const {
        students,
        setSelectedStudent,
        searchTerm,
        updateSearchTearm,
    } = useAppContext();

    const filteredStudents = students.filter((student) => {
        if (searchTerm === "All Terms") return students
        return student.term === searchTerm;
    });

    const terms = ["All Terms", ...new Set(students.map(student => student.term))];

    return (
        <div className="flex pr-4 w-full overflow-y-scroll ">
            <div className="flex flex-col w-full">
                <div className="p-6 flex items-center justify-between bg-card rounded-t-3xl">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-semibold">Applications</h2>
                    </div>
                    <div className="flex gap-2">                        
                        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 bg-white dark:bg-gray-900">
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
                        <div className="relative inline-block text-left text-xs">
                            <div>
                                <button type="button" className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-full bg-primary px-4 py-2 text-white hover:bg-primary/90 cursor-pointer" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={() => (setOpen(!open))}>
                                    <span className="w-19">{searchTerm}</span>
                                    <svg className="-mr-1 size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>

                            {open && <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-card shadow-lg focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" aria-hidden={!open}>
                                {terms.map((term, index) => (
                                    <div 
                                        key={index} 
                                        className="block px-4 py-2 cursor-pointer hover:bg-background hover:first:rounded-t-lg hover:last:rounded-b-lg" role="menuitem" 
                                        id="menu-item-0"
                                        onClick={() => {updateSearchTearm(term); setOpen(!open)}}
                                    >{term}</div>
                                ))}
                            </div>}
                        </div>
                    </div>
                </div>

                <div className="w-full text-sm text-start bg-card rounded-b-3xl pb-6">
                    <table className="w-full text-left dark:text-gray-400">
                        <thead className="dark:text-gray-400">
                            <tr>
                                <th scope="col" className="pl-6 pr-4 py-4 font-medium leading-none border-y cursor-pointer hover:text-primary/70">
                                    <p className="flex items-center gap-3">
                                        Type
                                        {<ChevronsUpDown className="w-3.5 h-3.5" />}
                                    </p>
                                </th>
                                <th scope="col" className="px-4 py-4 font-medium leading-none border-y cursor-pointer hover:text-primary/70">
                                    <p className="flex items-center gap-3">
                                        Student
                                        {<ChevronsUpDown className="w-3.5 h-3.5" />}
                                    </p>
                                </th>
                                <th scope="col" className="px-4 py-4 font-medium leading-none border-y cursor-pointer hover:text-primary/70">
                                    <p className="flex items-center gap-3">
                                        Program
                                        {<ChevronsUpDown className="w-3.5 h-3.5" />}
                                    </p>
                                </th>
                                <th scope="col" className="px-4 py-4 font-medium leading-none border-y cursor-pointer hover:text-primary/70">
                                    <p className="flex items-center gap-3">
                                        Status
                                        {<ChevronsUpDown className="w-3.5 h-3.5" />}
                                    </p>
                                </th>
                                <th scope="col" className="px-4 py-4 font-medium leading-none border-y cursor-pointer hover:text-primary/70">
                                    <p className="flex items-center gap-3">
                                        Last Updated
                                        {<ChevronsUpDown className="w-3.5 h-3.5" />}
                                    </p>
                                </th>
                                <th scope="col" className="px-4 pl-4 pr-6 border-y">
                                    <span className="sr-only">View</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-xs text-primary/50">
                            {filteredStudents.map((student, index) => (
                                <tr 
                                    key={index}
                                    onClick={() => setSelectedStudent(student)} 
                                    className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 transition-colors cursor-pointer dark:hover:bg-gray-600">
                                    <td className="pl-6 pr-4 py-2">
                                        <ApplicationTypeBadge type={student.applicationType} />
                                    </td>
                                    <th scope="row" className="px-4 py-2 whitespace-nowrap dark:text-white">
                                        <div>
                                            <p className="text-primary font-semibold">{student.name}</p>
                                            <p className="font-normal">{student.email}</p>
                                        </div>  
                                    </th>
                                    <td className="px-4 py-2">
                                        <div>
                                            <p className="text-primary">{student.schedule}</p>
                                            <p>{student.program}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 w-80">
                                        <ProgressBar studentId={student.id} />
                                    </td>
                                    <td className="px-4 py-2">{formatDate(student.lastUpdated)}</td>
                                    <td className="px-4 pl-4 pr-6 items-end"><span>{<ChevronRight className="w-4 h-4"/>}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default StudentList;
