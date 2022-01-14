import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import usersReducer from "./usersSlice";
import moviesReducer from "./moviesSlice";
import seriesReducer from "./seriesSlice";
import selectedSeriesReducer from "./selectedSeriesSlice";
import genreReducer from "./genreSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    movies: moviesReducer,
    series: seriesReducer,
    selectedSeries: selectedSeriesReducer,
    genre: genreReducer,
  },
});