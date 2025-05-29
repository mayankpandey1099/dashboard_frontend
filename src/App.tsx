import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAppSelector } from "./redux/hook";
import Auth from "./features/auth/Auth";

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
        <Route path="/" element={<Navigate to="/sign-in" />} />
      </Routes>
    </Router>
  );
}

export default App;
