import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { username, password } = formData;

//     if (!username.trim() || !password.trim()) {
//       toast.error("Username and password are required");
//       return;
//     }

//     try {
//       setLoading(true);

//       await login(username, password);

//       toast.success("Login successful");
//       navigate("/users");
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message || "Invalid username or password"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("SIGN IN CLICKED");

  const { username, password } = formData;

  console.log("Form data:", username, password);

  if (!username.trim() || !password.trim()) {
    toast.error("Username and password are required");
    return;
  }

  try {
    setLoading(true);

    console.log("Calling login function...");

    const result = await login(username, password);

    console.log("Login response:", result);

    toast.success("Login successful");

    console.log("Navigating to users...");

    navigate("/users");
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    toast.error(
      error?.response?.data?.message || "Invalid username or password"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            User Management
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to manage users
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>

            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              autoComplete="username"
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              autoComplete="current-password"
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700">
            Demo credentials
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Username: emilys
          </p>

          <p className="text-sm text-gray-500">
            Password: emilyspass
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
