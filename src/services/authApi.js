import { api } from "./api";

export const authApi = {
  login: (username, password) => {
    console.log("authApi.login called");

    return api.post("/login", {
      username,
      password,
    });
  },
};