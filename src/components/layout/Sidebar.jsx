import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

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

    onClose?.();
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
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
          transition-transform duration-300
        `}
      >
        {/* Header */}
        <div className="h-20 px-5 border-b flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-lg font-bold text-blue-600">
              User Management
            </h1>

            <p className="text-xs text-gray-400">
              Admin Portal
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="md:hidden text-gray-500 hover:text-gray-800 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <p className="px-3 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Menu
          </p>

          <div className="space-y-2">
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
                  transition-all
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

                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Bottom User Section */}
        <div className="flex-shrink-0 border-t border-gray-200 p-4 bg-white">
          
          {/* User */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
              {user?.firstName?.charAt(0)?.toUpperCase() || "A"}
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {user?.firstName
                  ? `${user.firstName} ${user.lastName || ""}`
                  : "Administrator"}
              </p>

              <p className="text-xs text-gray-500 truncate">
                {user?.email || "Administrator"}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              px-4
              py-3
              rounded-lg
              bg-red-50
              border
              border-red-200
              text-red-600
              font-semibold
              hover:bg-red-600
              hover:text-white
              hover:border-red-600
              transition-all
              duration-200
            "
          >
            <span className="text-lg">
              ↪
            </span>

            <span>
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
