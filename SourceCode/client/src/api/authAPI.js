import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("userInfo")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("userInfo")).accessToken
    }`;
  }
  return req;
});

export const loginAPI = ({ email, password }) =>
  API.post("/auth/login", { email, password });
export const registerAPI = ({ username, email, password }) =>
  API.post("/auth/register", { username, email, password });

export const updateAPI = (id, formData) =>
  API.put(`/users/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// export const login = createAsyncThunk(
//   "auth/login",
//   async ({ email, password }) => {
//     const { data } = await API.post("/auth/login", { email, password });
//     console.log("login-api", data);
//     return data;
//   }
// );

// export const register = createAsyncThunk(
//   "auth/register",
//   async ({ username, email, password }) => {
//     const { data } = await API.post("/auth/register", {
//       username,
//       email,
//       password,
//     });
//     console.log("register-api", data);
//     return data;
//   }
// );
