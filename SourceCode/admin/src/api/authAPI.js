import API from "./baseURL";

export const loginAPI = ({ email, password }) =>
  API.post("/auth/login", { email, password });

export const updateAPI = (id, formData) =>
  API.put(`/users/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
