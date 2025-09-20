import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import Router from "./routes/Router"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Router />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
