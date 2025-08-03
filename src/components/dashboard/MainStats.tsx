import { ArrowDown, ArrowUp, User, UserCheck } from "lucide-react";

interface MainStatsTypes {
    stats: { status: string; amount: number; change: boolean; percentage: string; }[];
    active: string;
    setActive: (arg: string) => void;    
};

const MainStats: React.FC<MainStatsTypes> = ({
    stats,
    active,
    setActive,
}) => {
    return (
        <div className="flex w-full text-sm text-start pt-3 md:pb-6">
            <div className="flex rounded-4xl p-1.5 bg-background/30 w-full inset-ring-[1.5px] inset-ring-gray-100">
                {stats.map(({status, amount, change, percentage}, idx) => (
                    <div
                        key={idx}
                        onClick={() => setActive(status)}
                        className={`flex flex-col w-1/2 rounded-3xl p-6 cursor-pointer ${active == status && "bg-card shadow-sm"}`}>
                        <div className={`flex gap-3 mb-2 items-center text-base/none font-semibold ${active !== status && "text-primary/50"}`}>
                            {status !== "Completed" ? <User className="size-5"/> : <UserCheck className="size-5"/>}
                            <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                        </div>
                        <div className="flex items-center gap-4 max-md:flex-col max-md:items-stretch max-md:gap-1">
                            <span className="text-6xl/tight font-medium">{amount}</span>
                            <div>
                                <div 
                                    className={`inline-flex items-center gap-1 px-1.5 rounded-lg h-7 border-[1.5px] ${change 
                                        ? "text-green-400 bg-green-400/10 border-green-400"
                                        : "text-red-400 bg-red-400/10 border-red-400"
                                    }`}
                                >
                                    {change ? <ArrowUp className="inline-flex size-4"/> : <ArrowDown className="inline-flex size-4"/>}
                                    {percentage}
                                </div>
                                <div className="mt-1 text-primary/50 max-md:text-caption">vs last month</div>
                            </div>
                        </div>
                    </div>
                ))}
                {/* <div className="flex flex-col w-1/2 rounded-3xl p-6 cursor-pointer ">
                    <div className="flex gap-3 mb-2 items-center text-base/none font-semibold text-primary/50">
                        <UserCheck className="size-5"/>
                        <span>Completed</span>
                    </div>
                    <div className="flex items-center gap-4 max-md:flex-col max-md:items-stretch max-md:gap-1">
                        <span className="text-6xl/tight font-medium">0</span>
                        <div>
                            <div className="inline-flex items-center gap-1 px-1.5 rounded-lg h-7 text-red-400 bg-red-400/10 border-[1.5px] border-red-400">
                                <ArrowDown className="inline-flex size-4"/>
                                36.8%
                            </div>
                            <div className="mt-1 text-primary/50 max-md:text-caption">vs last month</div></div>
                    </div>
                </div> */}
            </div>
        </div>
    )
};

export default MainStats;