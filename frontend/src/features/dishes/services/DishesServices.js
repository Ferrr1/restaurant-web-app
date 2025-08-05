import api from "../../../utils/api";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const addDish = (data) => api.post("/dishes", data);
export const updateDish = (id, data) => api.put(`/dishes/${id}`, data);
export const deleteDish = (id) => api.delete(`/dishes/${id}`);
export const getDishes = () => api.get("/dishes");
// Categories
export const getCategories = () => api.get("/categories");
export const addCategory = (data) => api.post("/categories", data);
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);
