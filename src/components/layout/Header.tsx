import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AvatarButton from "../ui/AvatarButton";
import { Settings, AlignJustify, X } from "lucide-react";
import SidebarMenu from "./SidebarMenu";

function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const location = useLocation().pathname;

  const handleLogout = () => {
    logout();
  };
        
    return (
      <header className="flex p-4 w-full items-center bg-background">
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-3">
            <div className="flex items-center">
              <Link to="/" className="flex size-10 rounded-full bg-primary items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-card" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              </Link>
            </div>
            <div className="lg:hidden">
              <div
                onClick={() => setMenuOpen(true)} 
                className="flex flex-col p-2.5 rounded-full size-10 bg-card items-center justify-center cursor-pointer text-primary/50 text-sm hover:text-primary hover:shadow-sm">
                <AlignJustify />
              </div>
              {menuOpen &&
                <div
                  onClick={() => setMenuOpen(false)} 
                  className="z-40 flex fixed inset-0 w-full h-full top-0 bg-primary/20"
                />
              }
              <div className={`fixed top-0 left-0 h-dvh w-3xs md:w-2xs p-4 bg-background rounded-r-3xl shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex flex-col h-full">
                  <div className="flex justify-between">
                    <Link to="/" className="flex size-10 rounded-full bg-primary items-center justify-center mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-card" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                    </Link>
                    <div
                      onClick={() => setMenuOpen(false)} 
                      className="flex flex-col p-2.5 rounded-full size-10 bg-card items-center justify-center cursor-pointer text-primary/50 text-sm hover:text-primary hover:shadow-sm">
                      <X />
                    </div>
                  </div>
                  <div className="flex flex-1">
                    <SidebarMenu/>
                  </div>
                </div>
              </div>              
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/settings" className={`flex size-10 rounded-full bg-card items-center justify-center text-sm ${location === "/settings" ? "shadow-sm" : "text-primary/50 hover:text-primary hover:shadow-sm"}`}>
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
