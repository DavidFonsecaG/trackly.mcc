import { Link, useLocation } from "react-router-dom";
import { House, GalleryVerticalEnd, Moon, Sun } from "lucide-react";

function SidebarMenu() {
    const location = useLocation().pathname;

    const links = [
        {to: "/", icon: House},
        {to: "/tracker", icon: GalleryVerticalEnd},
    ];

    return (
        <div className="flex px-4 pb-4 h-full">
            <div className="flex flex-col h-full items-center justify-between">
                <div className="flex flex-col gap-3 w-10 items-center">
                    {links.map((item, index) => (
                        <Link key={index} to={item.to} className={`flex size-9 items-center justify-center rounded-lg ${location === item.to ? "bg-card shadow-sm" : "text-primary/50 hover:text-primary"}`}>
                            <item.icon className="h-4 w-4"/>
                        </Link>                        
                    ))}
                </div>
                <div className="flex group flex-col w-9 p-1 bg-card rounded-full items-center gap-1 cursor-pointer hover:shadow-sm">
                    <button className="flex size-7 rounded-full items-center justify-center text-primary/50 cursor-pointer group-hover:text-primary">
                        <Moon className="h-4 w-4" />
                    </button>
                    <button className="flex size-7 bg-background rounded-full items-center justify-center cursor-pointer group-hover:text-primary">
                        <Sun className="h-4 w-4" />
                    </button>
                </div> 
            </div>
        </div>
    )
};

export default SidebarMenu;