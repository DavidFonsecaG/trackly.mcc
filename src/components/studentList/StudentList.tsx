import { useAppContext } from "../../context/AppContext";
import type { Student } from "../../types";
import { useState } from "react";
import ListHeader from "./ListHeader";
import MobileTable from "./MobileTable";
import DesktopTable from "./DesktopTable";
import Card from "../ui/Card";

const StudentList = () => {    

    const {
        students,
        setSelectedStudent,
        setEditStudent,
        setAddStudent,
        searchTerm,
        updateSearchTerm,
        removeStudent,
    } = useAppContext();

    const [sortConfig, setSortConfig] = useState<{ key: keyof Student; direction: "asc" | "desc"}>({key: "applicationType", direction: "asc"});
    const terms = ["All Terms", ...new Set(students.map(student => student.term))];

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

    const handleRowClick = (student: Student) => {
        setSelectedStudent(student);
    };

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

    const handleDelete = (studentId: string) => {
        removeStudent(studentId);
    };

    return (
        <div className="flex w-full">
            <Card>
                <ListHeader
                    searchTerm={searchTerm}
                    terms={terms}
                    updateSearchTerm={updateSearchTerm}
                    setAddStudent={setAddStudent}
                />

                <div className="flex w-full text-sm text-start bg-card rounded-b-3xl pt-3 md:pb-6">
                    <div className="md:hidden w-full text-left dark:text-gray-400">
                        <MobileTable 
                            filteredStudents={filteredStudents}
                            handleRowClick={handleRowClick}
                            setAddStudent={setAddStudent}
                        />
                    </div>
                    <div className="hidden md:flex w-full">
                        <DesktopTable
                            filteredStudents={filteredStudents}
                            handleRowClick={handleRowClick}
                            setAddStudent={setAddStudent}
                            handleSort={handleSort}
                            handleDelete={handleDelete}
                            setEditStudent={setEditStudent} 
                        />
                    </div>
                </div>
            </Card>
        </div>
    )
};

export default StudentList;
