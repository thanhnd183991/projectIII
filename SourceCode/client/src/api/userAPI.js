import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "./baseURL";

export const updateUser2 = createAsyncThunk("user/update", async (user) => {
  const response = await axios.post(
    "http://localhost:8800/api/users/1/update",
    user
  );
  return response.data;
});
