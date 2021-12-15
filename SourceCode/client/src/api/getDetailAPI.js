import API from "./baseURL";
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
      return {
        movie: response[0].data.data,
        asideMovies: response[1].data.data,
      };
    } catch (err) {
      console.log(err);
    }
  }
);

export const getMovieById = (id) => API.get(`/movies/find/${id}`);
