import { Outlet } from "react-router-dom"
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header"

function App() {
  return (
    <AppProvider>
      <div className="flex flex-col h-screen w-full items-center bg-background">
        <Header />
        <main className="flex flex-col w-full h-full items-center justify-center overflow-hidden">
          <Outlet />
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
