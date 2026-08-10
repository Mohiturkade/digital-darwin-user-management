import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { userApi } from "../services/userApi";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await userApi.getUsers(100, 0);

      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Dashboard error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =========================
  // Analytics
  // =========================

  const analytics = useMemo(() => {
    const total = users.length;

    const male = users.filter(
      (user) => user.gender === "male"
    ).length;

    const female = users.filter(
      (user) => user.gender === "female"
    ).length;

    const other = users.filter(
      (user) =>
        user.gender !== "male" &&
        user.gender !== "female"
    ).length;

    const averageAge =
      total > 0
        ? Math.round(
            users.reduce(
              (sum, user) =>
                sum + Number(user.age || 0),
              0
            ) / total
          )
        : 0;

    return {
      total,
      male,
      female,
      other,
      averageAge,
    };
  }, [users]);

  // =========================
  // Age Groups
  // =========================

  const ageGroups = useMemo(() => {
    return {
      under18: users.filter(
        (user) => user.age < 18
      ).length,

      eighteenTo30: users.filter(
        (user) =>
          user.age >= 18 &&
          user.age <= 30
      ).length,

      thirtyOneTo50: users.filter(
        (user) =>
          user.age >= 31 &&
          user.age <= 50
      ).length,

      above50: users.filter(
        (user) => user.age > 50
      ).length,
    };
  }, [users]);

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <div className="p-6">

        <div className="animate-pulse space-y-6">

          <div className="h-8 w-64 bg-gray-200 rounded" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {[1, 2, 3, 4].map(
              (item) => (
                <div
                  key={item}
                  className="h-32 bg-gray-200 rounded-xl"
                />
              )
            )}

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="h-80 bg-gray-200 rounded-xl" />

            <div className="h-80 bg-gray-200 rounded-xl" />

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">

      {/* =========================
          Header
      ========================== */}

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="mt-1 text-gray-500">
          Overview of your user management system
        </p>
      </div>

      {/* =========================
          Analytics Cards
      ========================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* Total Users */}

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Users
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                {analytics.total}
              </h2>

              <p className="mt-2 text-sm text-green-600">
                Active directory
              </p>

            </div>

            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-2xl">
              👥
            </div>

          </div>

        </div>

        {/* Male Users */}

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Male Users
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                {analytics.male}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {analytics.total
                  ? Math.round(
                      (analytics.male /
                        analytics.total) *
                        100
                    )
                  : 0}
                % of users
              </p>

            </div>

            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-100 text-2xl">
              👨
            </div>

          </div>

        </div>

        {/* Female Users */}

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Female Users
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                {analytics.female}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {analytics.total
                  ? Math.round(
                      (analytics.female /
                        analytics.total) *
                        100
                    )
                  : 0}
                % of users
              </p>

            </div>

            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-pink-100 text-2xl">
              👩
            </div>

          </div>

        </div>

        {/* Average Age */}

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Average Age
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                {analytics.averageAge}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Years
              </p>

            </div>

            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-100 text-2xl">
              🎂
            </div>

          </div>

        </div>

      </div>

      {/* =========================
          Analytics Sections
      ========================== */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Gender Analytics */}

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-gray-800">
            Gender Distribution
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            User distribution by gender
          </p>

          <div className="mt-8 space-y-6">

            {/* Male */}

            <div>

              <div className="flex justify-between mb-2">

                <span className="text-sm font-medium text-gray-700">
                  Male
                </span>

                <span className="text-sm text-gray-500">
                  {analytics.male}
                </span>

              </div>

              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">

                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{
                    width: `${
                      analytics.total
                        ? (analytics.male /
                            analytics.total) *
                          100
                        : 0
                    }%`,
                  }}
                />

              </div>

            </div>

            {/* Female */}

            <div>

              <div className="flex justify-between mb-2">

                <span className="text-sm font-medium text-gray-700">
                  Female
                </span>

                <span className="text-sm text-gray-500">
                  {analytics.female}
                </span>

              </div>

              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">

                <div
                  className="h-full bg-pink-500 rounded-full transition-all"
                  style={{
                    width: `${
                      analytics.total
                        ? (analytics.female /
                            analytics.total) *
                          100
                        : 0
                    }%`,
                  }}
                />

              </div>

            </div>

            {/* Other */}

            <div>

              <div className="flex justify-between mb-2">

                <span className="text-sm font-medium text-gray-700">
                  Other
                </span>

                <span className="text-sm text-gray-500">
                  {analytics.other}
                </span>

              </div>

              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">

                <div
                  className="h-full bg-purple-500 rounded-full transition-all"
                  style={{
                    width: `${
                      analytics.total
                        ? (analytics.other /
                            analytics.total) *
                          100
                        : 0
                    }%`,
                  }}
                />

              </div>

            </div>

          </div>

        </div>

        {/* Age Analytics */}

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-gray-800">
            Age Distribution
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Users grouped by age
          </p>

          <div className="mt-8 space-y-5">

            <AgeBar
              label="Under 18"
              value={ageGroups.under18}
              total={analytics.total}
            />

            <AgeBar
              label="18 - 30"
              value={ageGroups.eighteenTo30}
              total={analytics.total}
            />

            <AgeBar
              label="31 - 50"
              value={ageGroups.thirtyOneTo50}
              total={analytics.total}
            />

            <AgeBar
              label="Above 50"
              value={ageGroups.above50}
              total={analytics.total}
            />

          </div>

        </div>

      </div>

      {/* =========================
          Recent Users
      ========================== */}

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">

        <div className="p-6 border-b">

          <h2 className="text-lg font-semibold text-gray-800">
            Users
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Recently loaded users
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

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

              </tr>

            </thead>

            <tbody className="divide-y">

              {users
                .slice(0, 5)
                .map((user) => (

                  <tr
                    key={user.id}
                    className="hover:bg-gray-50"
                  >

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <img
                          src={
                            user.image ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              `${user.firstName} ${user.lastName}`
                            )}`
                          }
                          alt=""
                          className="w-9 h-9 rounded-full"
                        />

                        <span className="font-medium text-gray-800">
                          {user.firstName}{" "}
                          {user.lastName}
                        </span>

                      </div>

                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.age}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                      {user.gender}
                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

// =========================
// Age Bar Component
// =========================

const AgeBar = ({
  label,
  value,
  total,
}) => {
  const percentage =
    total > 0
      ? Math.round((value / total) * 100)
      : 0;

  return (
    <div>

      <div className="flex justify-between mb-2">

        <span className="text-sm font-medium text-gray-700">
          {label}
        </span>

        <span className="text-sm text-gray-500">
          {value} ({percentage}%)
        </span>

      </div>

      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">

        <div
          className="h-full bg-blue-600 rounded-full transition-all"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
};

export default Dashboard;