import api from "../../../utils/api";

export const getTables = () => api.get("/tables");
export const addTable = (data) => api.post("/tables", data);
export const deleteTable = (id) => api.delete(`/tables/${id}`);
export const updateTable = (id, data) => api.put(`/tables/${id}`, data);
