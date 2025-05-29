import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from "./features/auth/Auth";
import Dashboard from "./features/dashboard/Dashboard";
import { useAppSelector } from "./redux/hook";

function App() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route
          path="/sign-in"
          element={
            !isAuthenticated ? (
              <Auth />
            ) : (
              <Navigate to={user?.role === "admin" ? "/admin" : "/player"} />
            )
          }
        />
        <Route
          path="/admin"
          element={
            isAuthenticated && user?.role === "admin" ? (
              <Dashboard />
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route path="/" element={<Navigate to="/sign-in" />} />
      </Routes>
    </Router>
  );
}

export default App;
