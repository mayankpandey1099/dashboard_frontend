import { useAppSelector } from "../../redux/hook";
import { Link } from "react-router-dom";

const Ranks = () => {
  const { ranking } = useAppSelector((state) => state.ranks);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Player Rankings</h2>
          <Link
            to="/player"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </Link>
        </div>
        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-bold mb-4">Leaderboard</h3>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2">Rank</th>
                <th className="text-left p-2">Username</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Banana Count</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((user, index) => (
                <tr key={user.id}>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{user.username}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.bananaCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Ranks;
