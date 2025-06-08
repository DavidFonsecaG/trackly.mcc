import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AvatarButton from "./ui/AvatarButton";
import { Settings, AlignJustify } from "lucide-react";

function Header() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
        
    return (
      <header className="flex z-100 p-4 w-full items-center sticky top-0 bg-background">
        <div className="flex w-full items-center justify-between md:justify-end">
          <div className="flex md:hidden gap-3">
            <div className="flex items-center">
              <Link to="/" className="flex size-10 rounded-full bg-primary items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-card" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              </Link>
            </div>
            <div className="flex flex-col p-2.5 rounded-full size-10 bg-card items-center justify-center cursor-pointer text-primary/50 text-sm hover:text-primary hover:shadow-sm">
              <AlignJustify />
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/settings" className="flex size-10 rounded-full bg-card items-center justify-center text-primary/50 text-sm hover:text-primary hover:shadow-sm">
              <Settings className="w-4 h-4" />
            </Link>
            {user 
              ? <AvatarButton user={user!} handleLogout={handleLogout} /> 
              : <Link to="/login" className="flex py-2 px-5 items-center rounded-full bg-card text-xs cursor-pointer font-medium text-primary hover:shadow-sm hover:text-blue-500">Log In</Link>}
          </div>
        </div>
      </header>
    )
  }

export default Header;
