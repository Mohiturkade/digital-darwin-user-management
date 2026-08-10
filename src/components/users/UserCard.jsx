const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
          {user.firstName?.charAt(0)}
          {user.lastName?.charAt(0)}
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">
            {user.firstName} {user.lastName}
          </h3>

          <p className="text-sm text-gray-500">
            {user.email}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <p className="text-xs text-gray-400">
            Age
          </p>

          <p className="text-sm font-medium text-gray-700">
            {user.age}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400">
            Gender
          </p>

          <p className="text-sm font-medium text-gray-700 capitalize">
            {user.gender}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(user)}
          className="flex-1 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm font-medium"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(user)}
          className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;