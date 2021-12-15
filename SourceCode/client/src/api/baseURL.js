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
export default API;
