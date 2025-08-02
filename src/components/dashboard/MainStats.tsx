import { ArrowDown, ArrowUp, User, UserCheck } from "lucide-react";

interface MainStatsTypes {
    stats: {type: string, amount: string, change: boolean, percentage: string; }[];
};

const MainStats: React.FC<MainStatsTypes> = ({
    stats,
}) => {
    return (
        <div className="flex w-full text-sm text-start pt-3 md:pb-6">
            <div className="flex rounded-4xl p-1.5 bg-background/30 w-full inset-ring-[1.5px] inset-ring-gray-100">
                {stats.map((stat, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col w-1/2 rounded-3xl p-6 cursor-pointer bg-card shadow-sm">
                        <div className="flex gap-3 mb-2 items-center text-base/none font-semibold">
                            {stat.type !== "Completed" ? <User className="size-5"/> : <UserCheck className="size-5"/>}
                            <span>{stat.type}</span>
                        </div>
                        <div className="flex items-center gap-4 max-md:flex-col max-md:items-stretch max-md:gap-1">
                            <span className="text-6xl/tight font-medium">{stat.amount}</span>
                            <div>
                                <div 
                                    className={`inline-flex items-center gap-1 px-1.5 rounded-lg h-7 border-[1.5px] ${stat.change 
                                        ? "text-green-400 bg-green-400/10 border-green-400"
                                        : "text-red-400 bg-red-400/10 border-red-400"
                                    }`}
                                >
                                    {stat.change ? <ArrowUp className="inline-flex size-4"/> : <ArrowDown className="inline-flex size-4"/>}
                                    {stat.percentage}
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