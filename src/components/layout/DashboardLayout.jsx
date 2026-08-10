import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 min-w-0">

        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6">

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="md:hidden mr-4 text-gray-600 hover:text-gray-900"
            aria-label="Open menu"
          >
            ☰
          </button>

          <h2 className="text-lg font-semibold text-gray-800">
            Dashboard
          </h2>

        </header>

        {/* Page Content */}
        <main>
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;