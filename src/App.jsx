import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";

const App = () => {
  return (
   
    <Routes>

      {/* Public */}

      <Route
        path="/login"
        element={<Login />}
      />

      {/* Protected */}

      <Route element={<ProtectedRoute />}>

        <Route
          element={<DashboardLayout />}
        >

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/users"
            element={<Users />}
          />

        </Route>

      </Route>

      {/* Default */}

      <Route
        path="/"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

      {/* 404 */}

      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

    </Routes>
  );
};

export default App;