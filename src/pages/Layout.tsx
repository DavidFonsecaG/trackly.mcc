import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Banner from "../components/ui/Banner";
import Loader from "../components/ui/Loader";
import Header from "../components/layout/Header";
import SidebarMenu from "../components/layout/SidebarMenu";

function Layout() {
    const { user, loading } = useAuth();
    const [ showLoader, setShowLoader] = useState(true);
    const [ open, setOpen ] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (!user) {
            const timeout = setTimeout(() => {
                setOpen(true);;
            }, 100);
            return () => clearTimeout(timeout);
        } else {
            setOpen(false);
        }
    }, [user]);

    useEffect(() => {
        if (!loading) {
            let timeout = setTimeout(() => {
                setShowLoader(false);
            }, 800);
            return () => clearTimeout(timeout);
        }
    }, [loading]);

    if (showLoader) {
        return <Loader />
    };
        
    return (
        <div className="relative flex flex-col h-dvh w-full bg-background">
            <div className="sticky top-0 z-100">
                {open && <Banner text={"You're in demo mode"} action={handleClose}/>}
                <Header />
            </div>
            <div className="flex flex-1 overflow-hidden">
                <div className="hidden lg:flex h-full">
                    <SidebarMenu />
                </div>
                <div className="flex flex-col w-full h-full">
                    <main className="h-full w-full overflow-y-scroll [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/50 [&::-webkit-scrollbar-track]:bg-background">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
  };

export default Layout;