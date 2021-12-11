import { Box } from "@mui/material";
import React from "react";
import DetailMoviePaper from "../components/DetailMoviePaper";
import Layout from "../components/Layout";
import ReactMoviePaper from "../components/ReactMoviePaper";
import { movieRows } from "../dummyData";
const Movie = ({ movie }) => {
  return (
    <Layout>
      <Box sx={{ mb: 2, fontWeight: "bold" }}>Thông tin phim</Box>
      <DetailMoviePaper movie={movieRows[0]} />
      <ReactMoviePaper movie={movieRows[0]} />
    </Layout>
  );
};

export default Movie;
