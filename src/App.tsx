import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./features/dashboard/Dashboard";
import Player from "./features/player/Player";
import Ranks from "./features/ranks/Ranks";
import ProtectedRoute from "./utils/protectedRoutes";
import Auth from "./features/auth/Auth";
import SocketInitializer from "./utils/socketIntializer";

function App() {
  return (
    <Router>
      <SocketInitializer />
      <Routes>
        <Route path="/sign-in" element={<Auth />} />
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<Dashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["player"]} />}>
          <Route path="/player" element={<Player />} />
          <Route path="/ranks" element={<Ranks />} />
        </Route>
        <Route path="/" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
