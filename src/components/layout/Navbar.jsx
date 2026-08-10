import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  const firstName = user?.firstName || "User";
  const lastName = user?.lastName || "";

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6">

      {/* Page title */}

      <div>
        <h2 className="font-semibold text-gray-800">
          User Management
        </h2>

        <p className="hidden sm:block text-xs text-gray-500">
          Manage your users efficiently
        </p>
      </div>

      {/* User */}

      <div className="flex items-center gap-3">

        <div className="hidden sm:block text-right">
          <p className="text-sm font-semibold text-gray-700">
            {firstName} {lastName}
          </p>

          <p className="text-xs text-gray-500">
            Administrator
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
          {firstName.charAt(0).toUpperCase()}
        </div>

      </div>
    </header>
  );
};

export default Navbar;
