import { Link, useLocation } from "react-router-dom";
import { House, GalleryVerticalEnd, Moon, Sun, Settings } from "lucide-react";

function SidebarMenu() {
    const location = useLocation().pathname;

    const links = [
        {name: "Dashboard", to: "/", icon: House},
        {name: "Tracker", to: "/tracker", icon: GalleryVerticalEnd},
        {name: "Settings", to: "/settings", icon: Settings},
    ];

    return (
        <div className="flex lg:px-4 lg:pb-4 h-full w-full">
            <div className="flex flex-col h-full w-full lg:items-center justify-between">
                <div className="flex flex-col gap-1 lg:gap-3 lg:w-10 lg:items-center">
                    {links.map((item, index) => (
                        <Link key={index} to={item.to} className={`flex px-3 h-12 lg:p-0 items-center lg:size-9 lg:justify-center rounded-lg ${location === item.to ? "bg-card shadow-sm" : "text-primary/50 hover:text-primary"}`}>
                            <item.icon className="h-4 w-4 mr-3 lg:m-0"/>
                            <span className="text-sm font-medium lg:hidden">{item.name}</span>
                        </Link>                        
                    ))}
                </div>
                <div className="flex group flex-col w-10 p-1 bg-card rounded-full items-center gap-1 cursor-pointer hover:shadow-sm">
                    <button className="flex size-8 rounded-full items-center justify-center text-primary/50 cursor-pointer group-hover:text-primary">
                        <Moon className="h-4 w-4" />
                    </button>
                    <button className="flex size-8 bg-background rounded-full items-center justify-center cursor-pointer group-hover:text-primary">
                        <Sun className="h-4 w-4" />
                    </button>
                </div> 
            </div>
        </div>
    )
};

export default SidebarMenu;