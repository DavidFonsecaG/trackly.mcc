import { type RefObject } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { User } from "../../types";
import Card from "../ui/Card";
import CardTitle from "../ui/CardTitle";

interface ScrolMenuTypes {
 menuItems: {title: string, subtitle: string, icon: LucideIcon, ref: RefObject<HTMLDivElement | null>}[];
 user?: User | null;
};

const ScrollMenu: React.FC<ScrolMenuTypes> = ({
 menuItems,
 user,
}) => {
    
    function handleScrollTo(ref: RefObject<HTMLDivElement | null>) {
        ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
        });
    };

    return (
        <Card className={"sticky top-0"}>
            <CardTitle title="Settings" />
            <div className="pt-3">
                <div className="flex flex-col gap-1">
                    {menuItems.map((item, idx) => (
                        <button
                            key={idx} 
                            onClick={() => handleScrollTo(item.ref)}
                            className="group flex items-center p-3 cursor-pointer rounded-2xl hover:bg-background/20 hover:inset-ring-[1.5px] hover:inset-ring-gray-100"
                        >
                            {user && user!.name === item.title 
                                ? <img src="avatar.jpg" alt={item.title} className="rounded-full size-11" />  
                                :    <div className={`flex justify-center items-center size-11 rounded-full bg-background text-primary/50`}>
                                        <item.icon className="w-5 h-5"/>
                                    </div>}
                            <div className="pl-4 text-start">
                                <div className="text-sm text-primary font-semibold">{item.title}</div>
                                <div className="text-xs text-primary/50 font-normal">{item.subtitle}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </Card>
    )
};

export default ScrollMenu;