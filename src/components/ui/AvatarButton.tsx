import { useEffect, useRef, useState } from "react";
import type { User } from '../../types';
import { Link } from "react-router-dom";
import { LogOut, User as UserIcon } from "lucide-react";

interface AvatarButtonTypes{
    handleLogout: () => void;
    user: User
};

const AvatarButton: React.FC<AvatarButtonTypes> = ({
    handleLogout, 
    user
}) => {

    const [open, setOpen] = useState(false);

    let menuRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let handler = (e: MouseEvent) => {
            if(menuRef.current && !menuRef.current.contains(e.target as Node)){
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return() => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    return (
        <div className="relative h-10 text-xs" ref={menuRef}>
            <button onClick={() => (setOpen(!open))}
            id="avatar-button" aria-expanded="true" aria-haspopup="true" className="size-10 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-500 overflow-auto">
                <img src={user.picture} alt={user.name} className="rounded-full size-10" />
            </button>
            {open && 
                <div className="absolute right-0 min-w-56 p-1.5 origin-bottom-right rounded-xl bg-card border shadow-lg text-primary focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" aria-hidden={!open}>
                    <div className="flex flex-col px-4 py-2 mb-2 rounded-lg border">
                        <span className="text-primary">{user.name}</span>
                        <span>{user.email}</span>
                    </div>
                    <Link  
                        className="flex px-4 py-2 rounded-lg items-center gap-2 leading-none cursor-pointer hover:bg-background" role="menuitem" 
                        id="menu-item-0"
                        to="/settings"
                    ><UserIcon className="w-4 h-4"/>Edit Profile</Link>
                    <div  
                        className="flex px-4 py-2 rounded-lg gap-2 cursor-pointer hover:bg-background" role="menuitem" 
                        id="menu-item-1"
                        onClick={handleLogout}
                    ><LogOut className="w-4 h-4"/>Log Out</div>
                </div>
            }
        </div>
    );
};

export default AvatarButton;