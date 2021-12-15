import API from "./baseURL";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getHome = createAsyncThunk("home/getHome", async (page) => {
  const responseHero = API.get("/movies?hero=true");
  const responseContentMovies = API.get(`/movies?views=true&page=${page}`);
  const responseAsideMovies = API.get("/movies/random");

  try {
    const response = await Promise.all([
      responseHero,
      responseContentMovies,
      responseAsideMovies,
    ]);
    return {
      hero: response[0].data.data,
      contentMovies: response[1].data.data.movies,
      numberOfPages: response[1].data.data.numberOfPages,
      currentPage: response[1].data.data.currentPage,
      asideMovies: response[2].data.data,
    };
  } catch (err) {
    console.log(err.message);
  }
});

export const getPageHome = createAsyncThunk(
  "home/getPageHome",
  async (page) => {
    const response = await API.get(`/movies?views=true&page=${page}`);
    return {
      contentMovies: response.data.data.movies,
      numberOfPages: response.data.data.numberOfPages,
      currentPage: response.data.data.currentPage,
    };
  }
);
// export const getHomeAPI = () => {
//   const responseHero = API.get("/movies?hero=true");
//   const responseContentMovies = API.get("/movies?views=true");
//   const responseAsideMovies = API.get("/movies/random");
//   Promise.all([responseHero, responseContentMovies, responseAsideMovies])
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((err) => console(err.message));

//   return;
// };
