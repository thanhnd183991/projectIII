import API from "./baseURL";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMovies = createAsyncThunk("movies/getMovies", async (page) => {
  try {
    const {
      data: { data, errors },
    } = await API.get(`/movies`);
    if (data) {
      return {
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
  }
});

export const updateMoviesByDeleteSeries = createAsyncThunk(
  "movies/updateMoviesByDeleteSeries",
  async (content) => {
    try {
      const {
        data: { data, errors },
      } = await API.post(`/movies/getMoviesByArrayId`, { content });
      console.log(data);
      if (data) {
        return {
          movies: data,
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
  }
);
export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (id) => {
    try {
      const {
        data: { data, errors },
      } = await API.delete(`/movies/${id}`);
      if (data) {
        return { id };
      } else if (errors) {
        return {
          error: errors,
        };
      }
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const updateMovieAPI = (id, formData) =>
  API.put(`/movies/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const createMovieAPI = (formData) =>
  API.post("/movies", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
