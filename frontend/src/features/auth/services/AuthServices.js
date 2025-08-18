import api from "../../../utils/api.js";

export const login = (data) => api.post("/auth/login", data);
export const getUserData = () => api.get("/auth/user");

export const register = (data) => api.post("/auth/register", data);

export const logout = () => api.post("/auth/logout");
