import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import {
  registerUser,
  updateUser,
  deleteUser,
  blockUser,
  unblockUser,
} from "./fetch_helper";
import { logout } from "../auth/authSlice";
import { setActiveUsers } from "./dashboardSlice";
import { socketService } from "../../utils/socket";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { activeUsers } = useAppSelector((state) => state.dashboard);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "player" as "admin" | "player",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState("");

  if (!isAuthenticated) {
    window.location.href = "/sign-in";
    return null;
  }

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (editId) {
        const response = await updateUser(editId, formData);
        if (response.data.status === 200) {
          dispatch(
            setActiveUsers(
              activeUsers.map((user: any) =>
                user.id === editId ? response.data.data! : user
              )
            )
          );
          setEditId(null);
        } else {
          setError(response.data.message);
        }
      } else {
        const response = await registerUser(formData);
        if (response.data.status !== 201) {
          setError(response.data.message);
        }
      }
      setFormData({ username: "", email: "", password: "", role: "player" });
    } catch (err: any) {
      setError(err.message || "Operation failed");
    }
  };

  const handleEdit = (user: any) => {
    setEditId(user._id);
    setFormData({
      username: user.username,
      email: user.email,
      password: "",
      role: user.role,
    });
  };

  const handleDelete = async (id: string) => {
    setError("");
    try {
      const response = await deleteUser(id);
      if (response.data.status === 200) {
        dispatch(setActiveUsers(activeUsers.filter((user: any) => user._id !== id)));
      } else {
        setError(response.data.message);
      }
    } catch (err: any) {
      setError(err.message || "Delete failed");
    }
  };

  const handleBlock = async (id: string) => {
    setError("");
    try {
      const response = await blockUser(id);
      if (response.data.status === 200) {
        dispatch(
          setActiveUsers(
            activeUsers.map((user: any) =>
              user._id === id ? { ...user, isBlocked: true } : user
            )
          )
        );
      } else {
        setError(response.data.message);
      }
    } catch (err: any) {
      setError(err.message || "Block failed");
    }
  };

  const handleUnblock = async (id: string) => {
    setError("");
    try {
      const response = await unblockUser(id);
      if (response.data.status === 200) {
        dispatch(
          setActiveUsers(
            activeUsers.map((user: any) =>
              user._id === id ? { ...user, isBlocked: false } : user
            )
          )
        );
      } else {
        setError(response.data.message);
      }
    } catch (err: any) {
      setError(err.message || "Unblock failed");
    }
  }; 
  useEffect(() => {
  }, [activeUsers]);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
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
        <div className="bg-white p-6 rounded shadow-md mb-6">
          <h3 className="text-xl font-bold mb-4">
            {editId ? "Edit User" : "Create User"}
          </h3>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleCreateOrUpdate}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700">Role</label>
                <select
                  className="w-full p-2 border rounded"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value as "admin" | "player",
                    })
                  }
                >
                  <option value="player">Player</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              {editId ? "Update" : "Create"}
            </button>
          </form>
        </div>
        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-bold mb-4">Active Users</h3>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2">Username</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Banana Count</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeUsers.map((userData: any) => (
                <tr key={userData._id}>
                  <td className="p-2">{userData.username}</td>
                  <td className="p-2">{userData.email}</td>
                  <td className="p-2">{userData.bananaCount}</td>
                  <td className="p-2">
                    {userData.isActive ? "Active" : "Inactive"}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleEdit(userData)}
                      className="bg-yellow-500 text-white p-1 rounded mr-2 hover:bg-yellow-600"
                      disabled={userData._id === user?.id}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(userData._id)}
                      className={`p-1 rounded mr-2 text-white ${
                        userData._id === user?.id
                          ? "bg-red-300 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                      disabled={userData._id === user?.id}
                    >
                      Delete
                    </button>
                    {userData.isBlocked ? (
                      <button
                        onClick={() => handleUnblock(userData._id)}
                        className="bg-green-500 text-white p-1 rounded hover:bg-green-600"
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBlock(userData._id)}
                        className={`p-1 rounded text-white ${
                          userData._id === user?.id
                            ? "bg-orange-300 cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-600"
                        }`}
                        disabled={userData._id === user?.id}
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
