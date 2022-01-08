import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMovies } from "../api/getMoviesAPI";
import Layout from "../components/Layout";
import MovieTable from "../components/MovieTable";
import { setAllGenres } from "../utils/getInfoMovies";
const Movies = () => {
  const dispatch = useDispatch();
  const { loaded, movies, pending, error } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    if (!loaded) dispatch(getMovies());
  }, [loaded, dispatch]);

  if (movies) {
    setAllGenres(movies);
  }

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
