import API from "./baseURL";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSearch = createAsyncThunk("search/getSearch", async (query) => {
  const responseSearchMovies = API.get(`/movies/search?${query}`);
  const responseAsideMovies = API.get("/movies/random");
  try {
    const response = await Promise.all([
      responseSearchMovies,
      responseAsideMovies,
    ]);
    // console.log(response[0].data.data);
    if (query === "type=series" && response[0].data.data instanceof Array) {
      let getEp1s = [];
      response[0].data.data.forEach((series, index) => {
        const idEp1 = response[0].data.data[index].content[0];
        getEp1s.push(API.get(`/movies/find/${idEp1}`));
      });
      const resEp1s = await Promise.all(getEp1s);
      resEp1s.forEach((eachEp1, i) => {
        response[0].data.data[i].ep1 = eachEp1.data.data;
      });
    }
    return {
      contentMovies: response[0].data.data,
      asideMovies: response[1].data.data,
    };
  } catch (err) {
    console.log(err);
  }
});

export const getMovieById = (id) => API.get(`/movies/find/${id}`);
