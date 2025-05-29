import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { login } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { socketService } from "../../utils/socket";

const Auth = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (isAuthenticated && user) {
    navigate(user.role === "admin" ? "/admin" : "/player");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const result = await dispatch(login(formData)).unwrap();
      const token = localStorage.getItem("token");
      if (token) {
        console.log("Initiating socket connection with token");
        socketService.connect(token);
      } else {
        console.error("No token found after login");
        setError("Login succeeded, but no token was found");
      }
      navigate(result.role === "admin" ? "/admin" : "/player");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
