import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            </Link>
            {user 
              ? <button onClick={handleLogout} className="size-9 rounded-full bg-[url(avatar.jpg)] bg-cover cursor-pointer hover:ring hover:ring-blue-500"></button> 
              : <Link to="/login" className="flex py-2 px-5 items-center rounded-full bg-card text-xs cursor-pointer font-medium text-primary/50 hover:shadow-sm hover:text-primary">Log In</Link>}
          </div>
        </div>
      </header>
    )
  }

export default Header;
