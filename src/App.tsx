import { Outlet } from "react-router-dom"
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header"
import SidebarMenu from "./components/SidebarMenu";

function App() {
  return (
    <AppProvider>
      <div className="flex h-screen w-full bg-background overflow-hidden">
        <div className="h-full">
          <SidebarMenu />
        </div>
        <div className="flex flex-col w-full h-full">
          <Header />
          <main className="flex-1 overflow-y-scroll [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/50 [&::-webkit-scrollbar-track]:bg-background">
            <Outlet />
          </main>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
