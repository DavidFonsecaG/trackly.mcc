import { useAppContext } from "../context/AppContext";
import { ChevronsUpDown, ChevronRight } from "lucide-react";
import formatDate from "../utils/formatDate";
import ProgressBar from "./ui/ProgressBar";
import FilterButton from "./ui/FilterButton";
import ApplicationTypeBadge from "./ui/ApplicationTypeBadge";

function StudentList() {    

    const {
        students,
        setSelectedStudent,
        searchTerm,
        updateSearchTerm,
    } = useAppContext();

    const filteredStudents = students.filter((student) => {
        if (searchTerm === "All Terms") return students
        return student.term === searchTerm;
    });

    const terms = ["All Terms", ...new Set(students.map(student => student.term))];

    return (
        <div className="flex w-full ">
            <div className="flex flex-col min-w-full shadow-sm rounded-3xl">
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
                        <FilterButton 
                            terms={terms} 
                            searchTerm={searchTerm} 
                            updateSearchTerm={updateSearchTerm} 
                        />
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
