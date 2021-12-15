import { createSlice } from "@reduxjs/toolkit";
import { getHome, getPageHome } from "../api/getHomeAPI";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    hero: [],
    numberOfPages: 0,
    currentPage: 0,
    contentMovies: [],
    asideMovies: [],
    pending: null,
    error: null,
    pendingPage: null,
  },
  reducers: {},
  extraReducers: {
    [getHome.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [getHome.fulfilled]: (state, action) => {
      // console.log(action.payload);
      state.hero = action.payload.hero;
      state.contentMovies = action.payload.contentMovies;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
      state.asideMovies = action.payload.asideMovies;
      state.pending = false;
    },
    [getHome.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
    [getPageHome.pending]: (state) => {
      state.pendingPage = true;
      state.error = false;
    },
    [getPageHome.fulfilled]: (state, action) => {
      // console.log(action.payload);
      state.contentMovies = action.payload.contentMovies;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
      state.pendingPage = false;
    },
    [getPageHome.rejected]: (state) => {
      state.pendingPage = false;
      state.error = true;
    },
  },
});
export default homeSlice.reducer;
