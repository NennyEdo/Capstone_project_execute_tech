import api from "../utils/api";

export const registerUser = async (userData) => {
  return api.post("/api/user/register", userData);
};

export const loginUser = async (loginData) => {
  return api.post("/api/user/login", loginData);
};
