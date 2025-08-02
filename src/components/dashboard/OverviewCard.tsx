import Card from "../ui/Card";
import MainStats from "./MainStats";
import RecentStudents from "./RecentStudents";

interface OverviewCardTypes {
    stats: {type: string, amount: string, change: boolean, percentage: string; }[];
    students: { first: string; last: string; color: string; }[];
}

const OverviewCard: React.FC<OverviewCardTypes> = ({
    stats,
    students,
}) => {
    return (
        <Card>
            <div className="flex items-center p-3">
                <h2 className="md:text-lg font-semibold">Overview</h2>  
            </div>
            <MainStats
                stats={stats}
            />
            <RecentStudents 
                students={students}
            />
        </Card>
    )
};

export default OverviewCard;