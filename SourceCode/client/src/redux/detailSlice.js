import { createSlice } from "@reduxjs/toolkit";
import { getDetail } from "../api/getDetailAPI";

export const detailSlice = createSlice({
  name: "detail",
  initialState: {
    movie: {},
    asideMovies: [],
    pending: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getDetail.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [getDetail.fulfilled]: (state, action) => {
      // console.log("redux", action.payload);
      state.movie = action.payload.movie;
      state.asideMovies = action.payload.asideMovies;
      state.pending = false;
    },
    [getDetail.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});
export default detailSlice.reducer;
