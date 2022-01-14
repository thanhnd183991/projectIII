import { createSlice } from "@reduxjs/toolkit";
import { setSession } from "../utils/jwt";
import { userSocket } from "../App";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: {
      name: "",
      email: "",
      username: "",
      avatar: "",
      id: null,
      isAdmin: false,
      accessToken: null,
    },
  },
  reducers: {
    logout: (state) => {
      userSocket.emit("sign-out", state.userInfo.id);
      state.userInfo = {};
      localStorage.clear();
    },
    login: (state, action) => {
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.userInfo = action.payload;
      setSession(action.payload.accessToken);
      userSocket.emit("sign-in", state.userInfo.id);
    },
    update: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },
  // extraReducers: {
  //   [login.pending]: (state) => {
  //     state.pending = true;
  //     state.error = false;
  //   },
  //   [login.fulfilled]: (state, action) => {
  //     state.userInfo = action.payload;
  //     state.pending = false;
  //   },
  //   [login.rejected]: (state) => {
  //     state.pending = false;
  //     state.error = true;
  //   },
  // },
});
export const { logout, login, update } = authSlice.actions;
export default authSlice.reducer;
