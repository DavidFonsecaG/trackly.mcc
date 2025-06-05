import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import { BrowserRouter } from "react-router-dom";
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
