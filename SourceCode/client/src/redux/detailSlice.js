import { createSlice } from "@reduxjs/toolkit";
import API from "../utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getDetail = createAsyncThunk(
  "detail/getDetail",
  async (movieId) => {
    try {
      // console.log("vao");
      const responseDetailMovie = API.get(`/movies/find/${movieId}`);
      const responseDetailAsideMovies = API.get(
        `/movies/search?movieId=${movieId}`
      );
      const response = await Promise.all([
        responseDetailMovie,
        responseDetailAsideMovies,
      ]);
      // console.log("response", response);
      if (response[0].data.errors || response[1].data.errors) {
        return {
          error: response[0].data.errors || response[1].data.errors,
        };
      }
      return {
        movie: response[0].data.data,
        asideMovies: response[1].data.data,
      };
    } catch (err) {
      return {
        error: err.message,
      };
    }
  }
);

export const detailSlice = createSlice({
  name: "detail",
  initialState: {
    movie: {},
    asideMovies: [],
    pending: null,
    error: null,
  },
  reducers: {
    UPDATE_COMMENT: (state, action) => {
      state.movie.comments.unshift(action.payload);
    },
    UPDATE_LIKE: (state, action) => {
      state.movie.likes = action.payload;
    },
  },
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

export const { UPDATE_COMMENT, UPDATE_LIKE } = detailSlice.actions;
export default detailSlice.reducer;
