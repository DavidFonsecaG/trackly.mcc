import { useAppContext } from "../context/AppContext";
import ProgressBar from "./ProgressBar";
import formatDate from "../utils/formatDate";

function TableCard() {
    const {
        students,
        setSelectedStudent,
    } = useAppContext();

    const ApplicationTypeBadge: React.FC<{ type: string }> = ({ type }) => {
        const colors = {
            abroad: 'bg-purple-50 text-purple-700',
            COS: 'bg-blue-50 text-blue-700',
            'transfer-in': 'bg-teal-50 text-teal-700',
            domestic: 'bg-orange-50 text-orange-700',
            reinstatement: 'bg-pink-50 text-pink-700',
        };

        const displayText = type.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');

        return (
            <span className={`px-2 py-1 rounded-full text-[0.6rem] ${colors[type as keyof typeof colors]}`}>
            {displayText}
            </span>
        );
    };

    const chevron = <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    const chevronUpDown = <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path></svg>

    return (
        <div className="flex pr-4 w-full">
            <div className="bg-card rounded-3xl w-full">
                <div className="p-6 flex items-center justify-between bg-card rounded-3xl">
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
                                <input type="text" id="table-search-users" className="text-xs block p-2 ps-10 border rounded-full w-80 bg-background dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search"/>
                            </div>
                        </div>
                        <div className="flex border rounded-full py-2 px-4 text-xs bg-primary text-card items-center gap-1">
                            Filter
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                    </div>
                </div>

                <div className="w-full text-sm text-start">
                    <table className="w-full text-left dark:text-gray-400 ">
                        <thead className="dark:text-gray-400">
                            <tr>
                                <th scope="col" className="pl-6 pr-4 py-4 font-medium leading-none border-y cursor-pointer hover:text-primary/70">
                                    <p className="flex items-center gap-3">
                                        Type
                                        {chevronUpDown}
                                    </p>
                                </th>
                                <th scope="col" className="px-4 py-4 font-medium leading-none border-y cursor-pointer hover:text-primary/70">
                                    <p className="flex items-center gap-3">
                                        Student
                                        {chevronUpDown}
                                    </p>
                                </th>
                                <th scope="col" className="px-4 py-4 font-medium leading-none border-y cursor-pointer hover:text-primary/70">
                                    <p className="flex items-center gap-3">
                                        Program
                                        {chevronUpDown}
                                    </p>
                                </th>
                                <th scope="col" className="px-4 py-4 font-medium leading-none border-y cursor-pointer hover:text-primary/70">
                                    <p className="flex items-center gap-3">
                                        Status
                                        {chevronUpDown}
                                    </p>
                                </th>
                                <th scope="col" className="px-4 py-4 font-medium leading-none border-y cursor-pointer hover:text-primary/70">
                                    <p className="flex items-center gap-3">
                                        Last Updated
                                        {chevronUpDown}
                                    </p>
                                </th>
                                <th scope="col" className="px-4 pl-4 pr-6 border-y">
                                    <span className="sr-only">View</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-xs text-primary/50">
                            {students.map((student, index) => (
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
                                        <ProgressBar studentId={student.id} status={student.status}/>
                                    </td>
                                    <td className="px-4 py-2">{formatDate(student.lastUpdated)}</td>
                                    <td className="px-4 pl-4 pr-6 items-end"><span>{chevron}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default TableCard;
