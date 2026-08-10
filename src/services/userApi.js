import { api } from "./api";

export const userApi = {
  getUsers: (limit = 10, skip = 0) => {
    return api.get("/users", {
      params: {
        limit,
        skip,
      },
    });
  },

  searchUsers: (query) => {
    return api.get("/users/search", {
      params: {
        q: query,
      },
    });
  },

  addUser: (userData) => {
    return api.post("/users/add", userData);
  },

  updateUser: (id, userData) => {
    return api.put(`/users/${id}`, userData);
  },

  deleteUser: (id) => {
    return api.delete(`/users/${id}`);
  },
};