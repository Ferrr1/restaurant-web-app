import { axiosWrapper } from "../../../utils/axiosWrapper";

export const login = (data) => axiosWrapper.post("/auth/login", data);
export const getUserData = () => axiosWrapper.get("/auth/user");

export const register = (data) => axiosWrapper.post("/auth/register", data);

export const logout = () => axiosWrapper.post("/auth/logout");
