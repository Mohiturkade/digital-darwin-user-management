import axios from "axios";

export const api = axios.create({
  baseURL: "https://dummyjson.com/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token only when one exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    // Don't attach token to login request
    if (
      token &&
      !config.url?.includes("/login")
    ) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Global response handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(
      "API Error:",
      error.response?.data || error.message
    );

    return Promise.reject(error);
  }
);