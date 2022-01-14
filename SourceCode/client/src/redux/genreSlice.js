import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genres: [],
};

export const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    UPDATE_GENRES: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { UPDATE_GENRES } = genresSlice.actions;

export default genresSlice.reducer;
