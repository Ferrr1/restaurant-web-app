import api from "../../../utils/api";

export const getTables = () => api.get("/tables");
export const addTable = (data) => api.post("/tables", data);
export const deleteTable = (id) => api.delete(`/tables/${id}`);
export const updateTable = (id, data) => api.put(`/tables/${id}`, data);

export const getCustomers = () => api.get("/customers");
export const addCustomer = (data) => api.post("/customers", data);
export const deleteCustomer = (id) => api.delete(`/customers/${id}`);
export const updateCustomer = (id, data) => api.put(`/customers/${id}`, data);
