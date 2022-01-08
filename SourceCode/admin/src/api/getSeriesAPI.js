import API from "./baseURL";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSeries = createAsyncThunk("series/getSeries", async (page) => {
  try {
    const {
      data: { data, errors },
    } = await API.get(`/series`);
    if (data) {
      return {
        series: data,
        // numberOfPages: data.numberOfPages,
        // currentPage: data.currentPage,
        // total: data.total,
      };
    } else if (errors) {
      return {
        error: errors,
      };
    }
  } catch (err) {
    console.log(err.message);
  }
});

export const deleteSeries = createAsyncThunk(
  "series/deleteSeries",
  async (id) => {
    try {
      const {
        data: { data, errors },
      } = await API.delete(`/series/${id}`);
      if (data) {
        return { id };
      } else if (errors) {
        return {
          error: errors.message,
        };
      }
    } catch (err) {
      return {
        error: err.message,
      };
    }
  }
);

export const updateSeriesAPI = (id, data) => API.put(`/series/${id}`, data);

export const createSeriesAPI = (data) => API.post("/series", data);

export const getSelectedSeries = createAsyncThunk(
  "selectedSeries/getSelectedSeries",
  async (id) => {
    try {
      const {
        data: { data, errors },
      } = await API.get(`/series/find/${id}`);
      if (data) {
        return {
          series: data.series,
          movies: data.movies,
          // numberOfPages: data.numberOfPages,
          // currentPage: data.currentPage,
          // total: data.total,
        };
      } else if (errors) {
        return {
          error: errors,
        };
      }
    } catch (err) {
      console.log(err.message);
      return {
        error: err.message,
      };
    }
  }
);
