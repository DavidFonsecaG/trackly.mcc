import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TrackerConfigProvider } from "./context/TrackerConfigContext";
import { AppProvider } from "./context/AppContext";
import Router from "./routes/Router"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TrackerConfigProvider>
          <AppProvider>
            <Router />
          </AppProvider>
        </TrackerConfigProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
