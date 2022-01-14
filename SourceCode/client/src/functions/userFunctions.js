import axios from "../utils/axios";

export const loginUser = ({ email, password }) =>
  axios.post("/auth/login", { email, password });
export const registerUser = ({ username, email, password }) =>
  axios.post("/auth/register", { username, email, password });

export const updateUser = (id, formData) =>
  axios.put(`/users/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
