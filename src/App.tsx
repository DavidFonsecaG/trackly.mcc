import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Router"

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <Routes />
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
