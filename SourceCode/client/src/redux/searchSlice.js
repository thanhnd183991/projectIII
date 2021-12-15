import { createSlice } from "@reduxjs/toolkit";
import { getSearch } from "../api/getSearchAPI";

export const searchSlice = createSlice({
  name: "home",
  initialState: {
    contentMovies: [],
    asideMovies: [],
    pending: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getSearch.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [getSearch.fulfilled]: (state, action) => {
      // console.log("redux", action.payload);
      state.contentMovies = action.payload.contentMovies || [];
      state.asideMovies = action.payload.asideMovies || [];
      state.pending = false;
    },
    [getSearch.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});
export default searchSlice.reducer;
