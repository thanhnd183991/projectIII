import { createSlice } from "@reduxjs/toolkit";
import { getSelectedSeries } from "../api/getSeriesAPI";

export const selectedSeriesSlice = createSlice({
  name: "selectedSeries",
  initialState: {
    series: [],
    seriesMovies: [],
    pending: null,
    error: null,
  },
  reducers: {
    addMovie: (state, action) => {
      if (state.series.content) {
        state.series.content.push(action.payload.movie.id);
      }
      state.seriesMovies.push(action.payload.movie);
    },
    deleteMovie: (state, action) => {
      if (state.series.content) {
        state.series.content.splice(
          state.series.content.findIndex(
            (v) => v.id === action.payload.movieId
          ),
          1
        );
      }
      state.seriesMovies.splice(
        state.seriesMovies.findIndex((v) => v.id === action.payload.movieId),
        1
      );
    },
  },
  extraReducers: {
    [getSelectedSeries.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [getSelectedSeries.fulfilled]: (state, action) => {
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.series = action.payload.series;
        state.seriesMovies = action.payload.movies.sort(function (a, b) {
          return a.title.localeCompare(b.title);
        });
        // state.total = action.payload.total;
        // state.numberOfPages = action.payload.numberOfPages;
        // state.currentPage = action.payload.currentPage;
      }
      state.pending = false;
    },
    [getSelectedSeries.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});
export const { addMovie, deleteMovie } = selectedSeriesSlice.actions;
export default selectedSeriesSlice.reducer;
