import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AvatarButton from "./ui/AvatarButton";
import { Settings } from "lucide-react";

function Header() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
        
    return (
      <header className="flex z-100 h-16 p-4 w-full items-center sticky top-0 bg-background">
        <div className="flex w-full items-center justify-end">
          <div className="flex gap-3">
            <Link to="/settings" className="flex size-9 rounded-full bg-card items-center justify-center text-primary/50 text-sm hover:text-primary hover:shadow-sm">
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
