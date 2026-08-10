import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
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

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:block">

        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-blue-600">
            User Management
          </h1>
        </div>

        <nav className="p-4 space-y-2">

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}

        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1">

        {/* Top Navbar */}
        <header className="h-16 bg-white border-b flex items-center px-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Dashboard
          </h2>
        </header>

        <Outlet />

      </main>

    </div>
  );
};

export default DashboardLayout;