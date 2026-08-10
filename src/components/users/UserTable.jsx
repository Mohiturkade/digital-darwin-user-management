const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
              Name
            </th>

            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
              Email
            </th>

            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
              Age
            </th>

            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
              Gender
            </th>

            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4">
                <div className="font-medium text-gray-800">
                  {user.firstName} {user.lastName}
                </div>
              </td>

              <td className="px-6 py-4 text-gray-600">
                {user.email}
              </td>

              <td className="px-6 py-4 text-gray-600">
                {user.age}
              </td>

              <td className="px-6 py-4 capitalize text-gray-600">
                {user.gender}
              </td>

              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="px-3 py-1.5 text-sm rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(user)}
                    className="px-3 py-1.5 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
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
  );
};

export default UserTable;