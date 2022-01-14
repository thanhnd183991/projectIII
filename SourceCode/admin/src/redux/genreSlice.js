import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";

export const UPDATE_GENRES = createAsyncThunk(
  "genres/updateGenres",
  async (page) => {
    const { data } = await axios.get("/movies/genres");
    if (data.data) {
      return {
        data: data.data.split("|"),
      };
    }
    return {
      error: data.errors,
    };
  }
);

const initialState = {
  genres: [],
  error: null,
};

export const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers: {
    [UPDATE_GENRES.pending]: (state) => {},
    [UPDATE_GENRES.fulfilled]: (state, action) => {
      // console.log(action.payload);
      if (action.payload.data) {
        state.genres = action.payload.data;
      } else {
        state.error = action.payload.error;
      }
    },
    [UPDATE_GENRES.rejected]: (state) => {},
  },
});

export default genresSlice.reducer;
