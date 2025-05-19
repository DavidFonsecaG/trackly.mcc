import { Outlet } from "react-router-dom"
import Header from "./components/Header"

function App() {

  return (
    <div className="flex flex-col h-screen w-full items-center bg-background">
      <Header />
      <main className="flex flex-col w-full h-full items-center justify-center overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default App
