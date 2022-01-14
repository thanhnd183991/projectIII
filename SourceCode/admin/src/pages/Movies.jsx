import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMovies } from "../api/getMoviesAPI";
import Layout from "../components/Layout";
import MovieTable from "../components/MovieTable";
import { UPDATE_GENRES } from "../redux/genreSlice";
const Movies = () => {
  const dispatch = useDispatch();
  const { loaded, movies, pending, error } = useSelector(
    (state) => state.movies
  );
  const { genres } = useSelector((state) => state.genre);

  useEffect(() => {
    if (!loaded) dispatch(getMovies());
    if (genres.length === 0) dispatch(UPDATE_GENRES());
  }, [loaded, dispatch, genres.length]);

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>;
  }

  return (
    <Layout>
      <Link to={"/movie/create"}>
        <Button variant="contained" sx={{ mb: 1 }}>
          Tạo phim mới
        </Button>
      </Link>

      <MovieTable data={movies} loaded={loaded} pending={pending} />
    </Layout>
  );
};

export default Movies;
