import { Link } from "react-router-dom";
import Card from "../ui/Card";
import { formatSlug } from "../../utils/formatSlug";
import capitalizeString from "../../utils/capitalizeString";

interface TotalAppsCardTypes {
    apps: [string, number][];
};

const TotalAppsCard: React.FC<TotalAppsCardTypes> = ({
    apps,
}) => {
    return (
        <Card>
            <div className="flex items-center p-3">
                <h2 className="md:text-lg font-semibold">Total Applications</h2>
            </div>
            <div className="pt-3">
                <div className="flex flex-col gap-1">
                    {apps.map(([type, amount], idx) => (
                        <Link
                            key={idx} 
                            to={`/tracker?params=${formatSlug(type)}`}
                            className="group flex items-center p-3 cursor-pointer rounded-2xl hover:bg-background/30 hover:inset-ring-[1.5px] hover:inset-ring-gray-100"
                        >
                            <img src={`images/${type}.jpg`} className={`flex justify-center items-center size-8 rounded-full`} />
                            <div className="z-2 grow max-w-56.5 px-5 line-clamp-2 max-2xl:px-3 max-lg:pl-5">{capitalizeString(type)}</div>
                            <div className="z-2 flex flex-col items-end shrink-0 ml-auto text-right">
                                <span className="mb-1">{amount}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Card>
    )
};

export default TotalAppsCard;