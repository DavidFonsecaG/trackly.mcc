import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import OverviewCard from "./OverviewCard";
import TotalAppsCard from "./TotalAppsCard";
import createColor from "../../utils/createColor";

function Dashboard() {

    const { students } = useAppContext();
    
    const stats = Object.entries(
        students.reduce<Record<string, number>>((acc, student) => {
            const status = student.status;
            if (!status) return acc;
            
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {})
    ).map(([status, amount]) => ({
        status,
        amount,
        change: true,
        percentage: "23%",
    }));

    const [ active, setActive ] = useState<string>("incomplete");

    const recentStudents = students
        .filter((student) => student.status === active)
        .map((student) => ({
                name: student.name,
                color: createColor(student.name),
            }));    
            
    const totalApps = Object.entries(
        students.reduce<Record<string, number>>((acc, student) => {
            const type = student.applicationType;
            if (!type) return acc;

            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {})
    );

    return (
        <div className="flex w-full gap-4">
            <div className="w-full">
                <OverviewCard
                    stats={stats}
                    students={recentStudents}
                    active={active}
                    setActive={setActive}
                />
            </div>

            <div className="w-md">
                <TotalAppsCard 
                    apps={totalApps}
                />
            </div>
        </div>
    );
};

export default Dashboard;