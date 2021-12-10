import { Button, Container } from "@mui/material";
import * as React from "react";
import Layout from "../components/Layout";
import MovieTable from "../components/MovieTable";
import SeriesTable from "../components/SeriesTable";
import { Link } from "react-router-dom";
import { seriesRows, movieRows } from "../dummyData";
const Products = ({ movies, series }) => {
  return (
    <Layout>
      <Link to={movies ? "/movie/create" : "/series/create"}>
        <Button variant="contained" sx={{ mb: 1 }}>
          {movies ? "Tạo phim mới" : "Tạo series mới"}
        </Button>
      </Link>
      {movies ? (
        <MovieTable movies={movieRows} />
      ) : (
        <SeriesTable series={seriesRows} />
      )}
    </Layout>
  );
};

export default Products;