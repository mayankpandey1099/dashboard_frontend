import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { socketService } from "../../utils/socket";
import { logout } from "../auth/authSlice";
import { Link } from "react-router-dom";

const Player = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { bananaCount } = useAppSelector((state) => state.player);
  const { isConnected } = useAppSelector((state) => state.socket);
  const dispatch = useAppDispatch();

  const handleBananaClick = () => {
    socketService.emitBananaClick();
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Player Dashboard</h2>
          <div>
            <Link
              to="/ranks"
              className="bg-blue-500 text-white p-2 rounded mr-2 hover:bg-blue-600"
            >
              View Rankings
            </Link>
            <button
              onClick={() => {
                socketService.disconnect();
                dispatch(logout());
              }}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="bg-white p-6 rounded shadow-md text-center">
          <h3 className="text-xl font-bold mb-4">Welcome, {user?.username}!</h3>
          <p className="text-lg mb-4">
            Your Banana Count:{" "}
            <span className="font-bold">{bananaCount ?? "Loading..."}</span>
          </p>
          <p className="text-sm mb-4">
            Socket Status:{" "}
            <span className={isConnected ? "text-green-500" : "text-red-500"}>
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </p>
          <button
            onClick={handleBananaClick}
            className={`bg-yellow-500 text-black p-4 rounded-full text-xl font-bold ${
              isConnected
                ? "hover:bg-yellow-600"
                : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isConnected}
          >
            🍌 Click the Banana!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
