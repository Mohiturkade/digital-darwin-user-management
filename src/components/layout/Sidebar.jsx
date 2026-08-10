
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "📊",
    },
    {
      name: "Users",
      path: "/users",
      icon: "👥",
    },
  ];

  const handleLogout = () => {
    logout();

    toast.success("Logged out successfully");

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static
          top-0 left-0
          z-50
          h-screen
          w-64
          bg-white
          border-r border-gray-200
          flex flex-col
          transition-transform duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Logo / Header */}
        <div className="h-16 px-5 border-b flex items-center justify-between">

          <div>
            <h1 className="text-lg font-bold text-blue-600">
              User Management
            </h1>

            <p className="text-xs text-gray-400">
              Admin Portal
            </p>
          </div>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onClose}
            className="md:hidden text-gray-500 hover:text-gray-800 text-xl"
            aria-label="Close sidebar"
          >
            ✕
          </button>

        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">

          <p className="px-3 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Menu
          </p>

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                px-4 py-3
                rounded-lg
                font-medium
                transition-colors
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }
                `
              }
            >
              <span className="text-lg">
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>
            </NavLink>
          ))}

        </nav>

        {/* User / Logout */}
        <div className="p-4 border-t">

          <div className="flex items-center gap-3 mb-4">

            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
              {user?.firstName?.charAt(0)?.toUpperCase() ||
                "A"}
            </div>

            <div className="min-w-0">

              <p className="text-sm font-semibold text-gray-800 truncate">
                {user?.firstName
                  ? `${user.firstName} ${
                      user.lastName || ""
                    }`
                  : "Administrator"}
              </p>

              <p className="text-xs text-gray-500 truncate">
                {user?.email || "Administrator"}
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition"
          >
            <span>↪</span>
            <span className="font-medium">
              Logout
            </span>
          </button>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;
