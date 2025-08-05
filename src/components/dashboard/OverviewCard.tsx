import Card from "../ui/Card";
import CardTitle from "../ui/CardTitle";
import MainStats from "./MainStats";
import RecentStudents from "./RecentStudents";

interface OverviewCardTypes {
    stats: { status: string; amount: number; change: boolean; percentage: string; }[];
    students: { name: string; color: string; }[];
    active: string;
    setActive: (arg: string) => void;
}

const OverviewCard: React.FC<OverviewCardTypes> = ({
    stats,
    students,
    active,
    setActive,
}) => {
    return (
        <Card>
            <CardTitle title="Overview" />
            <MainStats
                stats={stats}
                active={active}
                setActive={setActive}                
            />
            <RecentStudents 
                students={students}
            />
        </Card>
    )
};

export default OverviewCard;