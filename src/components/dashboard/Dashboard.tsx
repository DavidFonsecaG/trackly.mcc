import OverviewCard from "./OverviewCard";
import TotalAppsCard from "./TotalAppsCard";

const stats = [
    {"type": "In Progress", "amount": "23", "change": false, "percentage": "36%"},
    {"type": "Completed", "amount": "23", "change": true, "percentage": "36%"},
];
const students = [
    {"first": "Gladyce", "last": "Williams", "color": "from-purple-200 to-purple-300"}, 
    {"first": "John", "last": "Smith", "color": "from-yellow-200 to-yellow-300"}, 
    {"first": "David", "last": "Fonseca", "color": "from-emerald-200 to-emerald-300"}, 
    {"first": "Mark", "last": "Mudder", "color": "from-cyan-200 to-cyan-300"}
];
const apps = [
    {"type": "Abroad", "amount": 4, "url": "1"},
    {"type": "Transfer In", "amount": 4, "url": "2"},
    {"type": "Change Of Status", "amount": 4, "url": "3"},
    {"type": "COEL", "amount": 4, "url": "4"},
    {"type": "Domestic", "amount": 4, "url": "5"},
    {"type": "Reinstatement", "amount": 4, "url": "6"},
    {"type": "Abroad approved", "amount": 4, "url": "7"},
    {"type": "COS approved", "amount": 4, "url": "8"}
];

function Dashboard() {
    return (
        <div className="flex w-full gap-4">
            <div className="w-full">
                <OverviewCard
                    stats={stats}
                    students={students}
                />
            </div>

            <div className="w-md">
                <TotalAppsCard 
                    apps={apps}
                />
            </div>
        </div>
    );
};

export default Dashboard;