import { createSlice } from "@reduxjs/toolkit";
import {
  updateMoviesByDeleteSeries,
  getMovies,
  deleteMovie,
} from "../api/getMoviesAPI";

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    numberOfPages: 0,
    currentPage: 0,
    movies: [],
    total: 0,
    loaded: null,
    pending: null,
    error: null,
  },
  reducers: {
    update: (state, action) => {
      if (!state.movies) {
        state.movies = [];
        state.movies.push(action.payload.data);
      } else {
        const index = state.movies.findIndex(
          (el) => el.id === action.payload.data?.id
        );
        if (index === -1) {
          state.movies.unshift(action.payload.data);
        } else if (index > -1) {
          state.movies[index] = action.payload.data;
        }
      }
    },
    updateByCreateSeries: (state, action) => {
      if (!state.movies) {
        state.movies = [];
      } else {
        action.payload.data.forEach((el) => {
          state.movies.splice(
            state.movies.findIndex((v) => v.id === el.id),
            1
          );
        });
      }
    },
    addMovieByDeleteSeries: (state, action) => {
      if (!state.movies) {
        state.movies = [];
      } else {
        state.movies.push(action.payload);
      }
    },
    deleteMovieByAddSeries: (state, action) => {
      if (!state.movies) {
        state.movies = [];
      } else {
        state.movies.splice(
          state.movies.findIndex((v) => v.id === action.payload.movieId),
          1
        );
      }
    },
  },
  extraReducers: {
    [getMovies.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [getMovies.fulfilled]: (state, action) => {
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.movies = action.payload.movies.sort(function (a, b) {
          return a.title.localeCompare(b.title);
        });
        // state.total = action.payload.total;
        // state.numberOfPages = action.payload.numberOfPages;
        // state.currentPage = action.payload.currentPage;
        state.loaded = true;
      }
      state.pending = false;
    },
    [getMovies.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },

    [deleteMovie.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [deleteMovie.fulfilled]: (state, action) => {
      // console.log(action.payload);
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.movies.splice(
          state.movies.findIndex((v) => v.id === action.payload.id),
          1
        );
      }
      state.pending = false;
    },
    [deleteMovie.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },

    [updateMoviesByDeleteSeries.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [updateMoviesByDeleteSeries.fulfilled]: (state, action) => {
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        console.log(action.payload);
        state.movies.push.apply(state.movies, action.payload.movies);
        // state.total = action.payload.total;
        // state.numberOfPages = action.payload.numberOfPages;
        // state.currentPage = action.payload.currentPage;
      }
      state.pending = false;
    },
    [updateMoviesByDeleteSeries.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});
export const {
  update,
  updateByCreateSeries,
  addMovieByDeleteSeries,
  deleteMovieByAddSeries,
} = moviesSlice.actions;
export default moviesSlice.reducer;
