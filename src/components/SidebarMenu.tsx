import { Link, useLocation } from "react-router-dom";
import { House, GalleryVerticalEnd, Moon, Sun } from "lucide-react";

function SidebarMenu() {
    const location = useLocation().pathname;

    const links = [
        {to: "/", icon: House},
        {to: "/tracker", icon: GalleryVerticalEnd},
    ];

    return (
        <div className="flex flex-col p-4 h-full">
            <div className="flex mb-4 items-center">
                <Link to="/" className="flex size-10 rounded-full bg-primary items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-card" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                </Link>
            </div>
            <div className="flex flex-col h-full items-center justify-between">
                <div className="flex flex-col gap-3">
                    {links.map((item, index) => (
                        <Link key={index} to={item.to} className={`flex size-9 items-center justify-center rounded-lg ${location === item.to ? "bg-card shadow-sm" : "text-primary/50 hover:text-primary"}`}>
                            <item.icon className="h-4 w-4"/>
                        </Link>                        
                    ))}
                </div>
                <div className="flex flex-col w-9 p-1 bg-card rounded-full items-center gap-1 cursor-pointer hover:shadow-sm">
                    <button className="flex size-7 rounded-full items-center justify-center text-primary/50">
                        <Moon className="h-4 w-4" />
                    </button>
                    <button className="flex size-7 bg-background rounded-full items-center justify-center">
                        <Sun className="h-4 w-4" />
                    </button>
                </div> 
            </div>
        </div>
    )
};

export default SidebarMenu;