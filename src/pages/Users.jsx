import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { userApi } from "../services/userApi";
import Modal from "../components/common/Modal";
import UserForm from "../components/users/UserForm";

const Users = () => {
  // =========================
  // State
  // =========================

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("list");

  const [page, setPage] = useState(1);
  const limit = 10;

  const [totalUsers, setTotalUsers] = useState(0);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // =========================
  // Fetch Users
  // =========================

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const skip = (page - 1) * limit;

      const response = await userApi.getUsers(
        limit,
        skip
      );

      setUsers(response?.data?.users || []);
      setTotalUsers(response?.data?.total || 0);
    } catch (error) {
      console.error("Fetch users error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Initial + Pagination
  // =========================

  useEffect(() => {
    if (!search.trim()) {
      fetchUsers();
    }
  }, [page]);

  // =========================
  // Search Input
  // =========================

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  // =========================
  // Debounced Search
  // =========================

  useEffect(() => {
    const query = search.trim();

    // Empty search -> normal users
    if (!query) {
      fetchUsers();
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setSearchLoading(true);

        const response =
          await userApi.searchUsers(query);

        setUsers(response?.data?.users || []);

        setTotalUsers(
          response?.data?.total ||
            response?.data?.users?.length ||
            0
        );
      } catch (error) {
        console.error(
          "Search users error:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Failed to search users"
        );

        // Keep existing users visible
      } finally {
        setSearchLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // =========================
  // Add User
  // =========================

  const handleAdd = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  // =========================
  // Edit User
  // =========================

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // =========================
  // Close Modal
  // =========================

  const handleCloseModal = () => {
    if (formLoading) return;

    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // =========================
  // Add / Edit User
  // =========================

  const handleSubmitUser = async (userData) => {
    try {
      setFormLoading(true);

      // EDIT
      if (selectedUser) {
        const response =
          await userApi.updateUser(
            selectedUser.id,
            userData
          );

        const updatedUser = {
          ...selectedUser,
          ...response.data,
        };

        setUsers((previousUsers) =>
          previousUsers.map((user) =>
            user.id === selectedUser.id
              ? updatedUser
              : user
          )
        );

        toast.success(
          "User updated successfully"
        );
      }

      // ADD
      else {
        const response =
          await userApi.addUser(userData);

        const newUser = response.data;

        setUsers((previousUsers) => [
          newUser,
          ...previousUsers,
        ]);

        setTotalUsers(
          (previousTotal) =>
            previousTotal + 1
        );

        toast.success(
          "User added successfully"
        );
      }

      setIsModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error(
        "Save user error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to save user"
      );
    } finally {
      setFormLoading(false);
    }
  };

  // =========================
  // Delete User
  // =========================

  const handleDelete = async (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.firstName} ${user.lastName}?`
    );

    if (!confirmed) return;

    try {
      await userApi.deleteUser(user.id);

      // Remove from UI immediately
      setUsers((previousUsers) =>
        previousUsers.filter(
          (item) => item.id !== user.id
        )
      );

      setTotalUsers(
        (previousTotal) =>
          Math.max(previousTotal - 1, 0)
      );

      toast.success(
        "User deleted successfully"
      );
    } catch (error) {
      console.error(
        "Delete user error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to delete user"
      );
    }
  };

  // =========================
  // Pagination
  // =========================

  const totalPages = Math.ceil(
    totalUsers / limit
  );

  const handlePrevious = () => {
    if (page > 1) {
      setPage((previous) => previous - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((previous) => previous + 1);
    }
  };

  // =========================
  // Initial Loading
  // =========================

  if (loading && users.length === 0) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-5">

          <div className="h-8 w-56 bg-gray-200 rounded" />

          <div className="h-12 w-full bg-gray-200 rounded" />

          <div className="h-64 w-full bg-gray-200 rounded-xl" />

        </div>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="p-4 sm:p-6">

      {/* =========================
          Header
      ========================== */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            User Directory
          </h1>

          <p className="mt-1 text-gray-500">
            Manage users and their information
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="w-full md:w-auto px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          + Add User
        </button>

      </div>

      {/* =========================
          Search + View
      ========================== */}

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between mb-6">

        {/* Search */}

        <div className="relative w-full lg:max-w-md">

          <input
            type="text"
            value={search}
            onChange={(e) =>
              handleSearch(e.target.value)
            }
            placeholder="Search users by name or email..."
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          {searchLoading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">

              <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />

            </div>
          )}

        </div>

        {/* View Toggle */}

        <div className="flex border border-gray-300 rounded-lg overflow-hidden w-fit">

          <button
            type="button"
            onClick={() =>
              setViewMode("list")
            }
            className={`px-5 py-2 ${
              viewMode === "list"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            List
          </button>

          <button
            type="button"
            onClick={() =>
              setViewMode("grid")
            }
            className={`px-5 py-2 ${
              viewMode === "grid"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Grid
          </button>

        </div>

      </div>

      {/* =========================
          Empty State
      ========================== */}

      {users.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">

          <div className="text-5xl mb-4">
            👥
          </div>

          <h2 className="text-xl font-semibold text-gray-800">
            No users found
          </h2>

          <p className="mt-2 text-gray-500">
            Try another search or add a new user.
          </p>

        </div>
      ) : viewMode === "list" ? (

        /* =========================
           LIST VIEW
        ========================== */

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50 border-b">

                <tr>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    User
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Age
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Gender
                  </th>

                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y">

                {users.map((user) => (

                  <tr
                    key={user.id}
                    className="hover:bg-gray-50"
                  >

                    {/* User */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <img
                          src={
                            user.image ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              `${user.firstName} ${user.lastName}`
                            )}`
                          }
                          alt={`${user.firstName} ${user.lastName}`}
                          className="w-10 h-10 rounded-full object-cover"
                        />

                        <div>

                          <p className="font-semibold text-gray-800">
                            {user.firstName}{" "}
                            {user.lastName}
                          </p>

                          <p className="text-sm text-gray-500">
                            #{user.id}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Email */}

                    <td className="px-6 py-4 text-gray-600">
                      {user.email}
                    </td>

                    {/* Age */}

                    <td className="px-6 py-4 text-gray-600">
                      {user.age}
                    </td>

                    {/* Gender */}

                    <td className="px-6 py-4 text-gray-600 capitalize">
                      {user.gender}
                    </td>

                    {/* Actions */}

                    <td className="px-6 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(user)
                          }
                          className="px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(user)
                          }
                          className="px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      ) : (

        /* =========================
           GRID VIEW
        ========================== */

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

          {users.map((user) => (

            <div
              key={user.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >

              {/* User */}

              <div className="flex items-center gap-4">

                <img
                  src={
                    user.image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      `${user.firstName} ${user.lastName}`
                    )}`
                  }
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div className="min-w-0">

                  <h3 className="font-semibold text-gray-800 truncate">
                    {user.firstName}{" "}
                    {user.lastName}
                  </h3>

                  <p className="text-sm text-gray-500">
                    User #{user.id}
                  </p>

                </div>

              </div>

              {/* Details */}

              <div className="mt-5 space-y-3">

                <div>

                  <p className="text-xs text-gray-400 uppercase">
                    Email
                  </p>

                  <p className="text-sm text-gray-700 break-all">
                    {user.email}
                  </p>

                </div>

                <div className="flex gap-8">

                  <div>

                    <p className="text-xs text-gray-400 uppercase">
                      Age
                    </p>

                    <p className="text-sm text-gray-700">
                      {user.age}
                    </p>

                  </div>

                  <div>

                    <p className="text-xs text-gray-400 uppercase">
                      Gender
                    </p>

                    <p className="text-sm text-gray-700 capitalize">
                      {user.gender}
                    </p>

                  </div>

                </div>

              </div>

              {/* Actions */}

              <div className="flex gap-2 mt-5 pt-4 border-t">

                <button
                  type="button"
                  onClick={() =>
                    handleEdit(user)
                  }
                  className="flex-1 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 font-medium"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(user)
                  }
                  className="flex-1 px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 font-medium"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* =========================
          Pagination
      ========================== */}

      {!search.trim() && totalPages > 1 && (

        <div className="flex items-center justify-between mt-6">

          <p className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">

            <button
              type="button"
              onClick={handlePrevious}
              disabled={page === 1}
              className="px-4 py-2 border rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={page === totalPages}
              className="px-4 py-2 border rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>

          </div>

        </div>

      )}

      {/* =========================
          Add / Edit Modal
      ========================== */}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          selectedUser
            ? "Edit User"
            : "Add New User"
        }
      >

        <UserForm
          user={selectedUser}
          onSubmit={handleSubmitUser}
          onCancel={handleCloseModal}
          loading={formLoading}
        />

      </Modal>

    </div>
  );
};

export default Users;
