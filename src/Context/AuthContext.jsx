import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { authApi } from "../services/authApi";

export const AuthContext = createContext(null);

const IDLE_TIMEOUT = 60 * 60 * 1000; // 1 hour

const AuthContextProvider = ({ children }) => {
  // --------------------------------
  // USER
  // --------------------------------

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    try {
      return storedUser
        ? JSON.parse(storedUser)
        : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  // --------------------------------
  // TOKEN
  // --------------------------------

  const [token, setToken] = useState(() => {
    return localStorage.getItem("accessToken");
  });

  // --------------------------------
  // LOADING
  // --------------------------------

  const [isLoading, setIsLoading] = useState(false);

  // --------------------------------
  // LAST ACTIVITY
  // --------------------------------

  const lastActivityRef = useRef(
    Number(
      localStorage.getItem("lastActivity") ||
        Date.now()
    )
  );

  // --------------------------------
  // AUTH STATUS
  // --------------------------------

  const isAuthenticated = Boolean(token);

  // --------------------------------
  // LOGOUT
  // --------------------------------

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("lastActivity");

    setToken(null);
    setUser(null);
  }, []);

  // --------------------------------
  // LOGIN
  // --------------------------------

  const login = async (username, password) => {
    setIsLoading(true);

    try {
      const response = await authApi.login(
        username,
        password
      );

      const {
        accessToken,
        ...userData
      } = response.data;

      // Store authentication data

      localStorage.setItem(
        "accessToken",
        accessToken
      );

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      // Reset idle timer

      const now = Date.now();

      lastActivityRef.current = now;

      localStorage.setItem(
        "lastActivity",
        now.toString()
      );

      setToken(accessToken);
      setUser(userData);

      return response.data;
    } finally {
      setIsLoading(false);
    }
  };

  // --------------------------------
  // USER ACTIVITY
  // --------------------------------

  const handleActivity = useCallback(() => {
    if (!isAuthenticated) {
      return;
    }

    const now = Date.now();

    const inactiveTime =
      now - lastActivityRef.current;

    // User exceeded idle timeout

    if (inactiveTime >= IDLE_TIMEOUT) {
      console.log(
        "Idle timeout reached. Logging out."
      );

      logout();

      window.location.href = "/login";

      return;
    }

    // Update activity time

    lastActivityRef.current = now;
  }, [isAuthenticated, logout]);

  // --------------------------------
  // LISTEN FOR USER ACTIVITY
  // --------------------------------

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const events = [
      "mousemove",
      "keydown",
      "click",
      "scroll",
      "touchstart",
    ];

    events.forEach((event) => {
      window.addEventListener(
        event,
        handleActivity
      );
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(
          event,
          handleActivity
        );
      });
    };
  }, [
    isAuthenticated,
    handleActivity,
  ]);

  // --------------------------------
  // IDLE CHECK
  // --------------------------------

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();

      const inactiveTime =
        now - lastActivityRef.current;

      if (inactiveTime >= IDLE_TIMEOUT) {
        console.log(
          "User automatically logged out due to inactivity."
        );

        logout();

        window.location.href = "/login";
      }
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [isAuthenticated, logout]);

  // --------------------------------
  // RESTORE AUTH STATE
  // --------------------------------

  useEffect(() => {
    const storedToken =
      localStorage.getItem("accessToken");

    const storedUser =
      localStorage.getItem("user");

    const storedActivity =
      localStorage.getItem("lastActivity");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
        setUser(null);
      }
    }

    if (storedActivity) {
      lastActivityRef.current =
        Number(storedActivity);
    }
  }, []);

  // --------------------------------
  // CONTEXT VALUE
  // --------------------------------

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;