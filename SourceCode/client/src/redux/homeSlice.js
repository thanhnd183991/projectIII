import { createSlice } from "@reduxjs/toolkit";
import API from "../utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getHome = createAsyncThunk("home/getHome", async (page) => {
  const responseHero = API.get("/movies?hero=true");
  const responseContentMovies = API.get(`/movies?views=true&page=${page}`);
  const responseAsideMovies = API.get("/movies/random?limit=4");

  try {
    const response = await Promise.all([
      responseHero,
      responseContentMovies,
      responseAsideMovies,
    ]);
    // console.log(response);
    if (
      response[0].data.errors ||
      response[1].data.errors ||
      response[2].data.errors
    ) {
      return {
        error:
          response[0].data.errors ||
          response[1].data.data ||
          response[2].data.errors,
      };
    }
    return {
      hero: response[0].data.data,
      contentMovies: response[1].data.data.movies,
      numberOfPages: response[1].data.data.numberOfPages,
      currentPage: response[1].data.data.currentPage,
      asideMovies: response[2].data.data,
    };
  } catch (err) {
    return {
      error: err.message,
    };
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

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    hero: [],
    numberOfPages: 0,
    currentPage: 0,
    contentMovies: [],
    asideMovies: [],
    pending: null,
    error: null,
    pendingPage: null,
  },
  reducers: {},
  extraReducers: {
    [getHome.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [getHome.fulfilled]: (state, action) => {
      // console.log(action.payload);
      state.hero = action.payload.hero;
      state.contentMovies = action.payload.contentMovies;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
      state.asideMovies = action.payload.asideMovies;
      state.pending = false;
    },
    [getHome.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
    [getPageHome.pending]: (state) => {
      state.pendingPage = true;
      state.error = false;
    },
    [getPageHome.fulfilled]: (state, action) => {
      // console.log(action.payload);
      state.contentMovies = action.payload.contentMovies;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
      state.pendingPage = false;
    },
    [getPageHome.rejected]: (state) => {
      state.pendingPage = false;
      state.error = true;
    },
  },
});
export default homeSlice.reducer;
