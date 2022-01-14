import axios from "../utils/axios";

export const getMovieById = (movieId) => axios.get(`/movies/find/${movieId}`);
export const searchMovieByMovideId = (movieId) =>
  axios.get(`/movies/search?movieId=${movieId}`);
export const searchMovieByQuery = (query) =>
  axios.get(`/movies/search?${query}`);

export const getMovieHero = axios.get("/movies?hero=true");
export const getMovieByViewsAndPage = (page) =>
  axios.get(`/movies?views=true&page=${page}`);
export const getRandomMovieByLimit = (limit) =>
  axios.get(`/movies/random${limit ? "?limit=" + limit : ""}`);
