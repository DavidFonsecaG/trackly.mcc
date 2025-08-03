import { Link } from "react-router-dom";
import displayInitials from "../../utils/displayInitials";
import { ArrowRight } from "lucide-react";

interface RecentStudentsTypes {
 students: { name: string; color: string; }[];
};

const RecentStudents: React.FC<RecentStudentsTypes> = ({
    students,
}) => {
    return (
        <div className="p-5 max-lg:px-3 max-lg:py-4">
            <div className="mb-6">
                <div className="flex items-center gap-3 ">
                    <div className="text-[1.125rem] font-medium tracking-[-0.01em]">10 new students today!</div>
                </div>
                <div className="text-sm text-primary/50">Send a welcome message to all new students.</div>
            </div>
            <div className="flex text-sm text-primary/60 font-medium max-md:overflow-auto max-md:-mx-6 max-md:px-6 max-md:scrollbar-none">
                {students.map(({name, color}, idx) => (
                    <div
                        key={idx}
                        className="flex-1 px-1 py-8 text-center max-3xl:nth-[n+6]:hidden max-[1349px]:nth-[n+5]:hidden max-md:shrink-0 max-md:flex-auto max-md:w-30 max-md:!block">
                        <div className="flex justify-center">
                            <div className={`flex items-center justify-center size-16 rounded-full bg-radial-[at_25%_25%] ${color}`}>
                                <span className="text-primary">{displayInitials(name)}</span>
                            </div>
                        </div>
                        <div className="mt-4 text-button text-t-secondary max-md:truncate">{name.split(" ")[0]}</div>
                    </div>
                ))}
                <div className="flex-1 px-2 py-8 text-center max-md:shrink-0 max-md:flex-auto max-md:w-30">
                    <Link className="group inline-flex flex-col justify-center items-center hover:text-primary" to="/tracker">
                        <div className="flex justify-center items-center size-16 rounded-full ring-[1.5px] ring-gray-100 transition-colors group-hover:ring-primary/30 group-hover:shadow-md">
                            <ArrowRight className="w-4 h-4"/>
                        </div>
                        <div className="mt-4 text-button text-t-secondary transition-colors group-hover:text-t-primary">View all</div>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default RecentStudents;