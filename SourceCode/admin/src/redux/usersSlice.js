import { createSlice } from "@reduxjs/toolkit";
import { searchUsers, getUsers, deleteUser } from "../api/getUsersAPI";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    numberOfPages: 0,
    currentPage: 0,
    users: [],
    total: 0,
    loaded: null,
    pending: null,
    error: null,
  },
  reducers: {
    update: (state, action) => {
      console.log(action.payload);
      const index = state.users.findIndex(
        (el) => el.id === action.payload.data.id
      );
      if (index === -1) {
        state.users.push(action.payload.data);
      } else if (index > -1) {
        state.users[index] = action.payload.data;
      }
    },
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [getUsers.fulfilled]: (state, action) => {
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.users = action.payload.users;
        // state.total = action.payload.total;
        // state.numberOfPages = action.payload.numberOfPages;
        // state.currentPage = action.payload.currentPage;
        state.loaded = true;
      }
      state.pending = false;
    },
    [getUsers.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },

    [searchUsers.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [searchUsers.fulfilled]: (state, action) => {
      // console.log(action.payload);
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.users = action.payload.users;
        state.total = action.payload.total;
        state.numberOfPages = action.payload.numberOfPages;
        state.currentPage = action.payload.currentPage;
      }
      state.pending = false;
    },
    [searchUsers.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },

    [deleteUser.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [deleteUser.fulfilled]: (state, action) => {
      // console.log(action.payload);
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.users.splice(
          state.users.findIndex((v) => v.id === action.payload.id),
          1
        );
      }
      state.pending = false;
    },
    [deleteUser.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});
export const { update } = usersSlice.actions;
export default usersSlice.reducer;
