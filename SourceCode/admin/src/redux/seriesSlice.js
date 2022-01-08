import { createSlice } from "@reduxjs/toolkit";
import { getSeries, deleteSeries } from "../api/getSeriesAPI";

export const seriesSlice = createSlice({
  name: "series",
  initialState: {
    numberOfPages: 0,
    currentPage: 0,
    series: [],
    total: 0,
    loaded: null,
    pending: null,
    error: null,
  },
  reducers: {
    update: (state, action) => {
      if (!state.series) {
        state.series = [];
        state.series.push(action.payload.data);
      } else {
        const index = state.series.findIndex(
          (el) => el.id === action.payload.data?.id
        );
        if (index === -1) {
          state.series.unshift(action.payload.data);
        } else if (index > -1) {
          state.series[index] = action.payload.data;
        }
      }
    },
  },
  extraReducers: {
    [getSeries.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [getSeries.fulfilled]: (state, action) => {
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.series = action.payload.series;
        // state.total = action.payload.total;
        // state.numberOfPages = action.payload.numberOfPages;
        // state.currentPage = action.payload.currentPage;
        state.loaded = true;
      }
      state.pending = false;
    },
    [getSeries.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },

    [deleteSeries.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [deleteSeries.fulfilled]: (state, action) => {
      // console.log(action.payload);
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.series.splice(
          state.series.findIndex((v) => v.id === action.payload.id),
          1
        );
      }
      state.pending = false;
    },
    [deleteSeries.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});
export const { update } = seriesSlice.actions;
export default seriesSlice.reducer;
