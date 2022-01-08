import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import DetailMoviePaper from "../components/DetailMoviePaper";
import Layout from "../components/Layout";
import ReactMoviePaper from "../components/ReactMoviePaper";
import { useParams } from "react-router-dom";
import API from "../api/baseURL";
const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [errors, setErrors] = useState(null);
  useEffect(() => {
    const getMovie = async (userId) => {
      const {
        data: { data, errors },
      } = await API.get(`/movies/find/${userId}`);
      return { data, errors };
    };
    getMovie(id).then(({ data, errors }) =>
      data ? setMovie(data) : setErrors(errors)
    );
  }, [id]);
  if (errors) {
    return <pre>{JSON.stringify(errors)}</pre>;
  }
  return (
    <Layout>
      <Box sx={{ mb: 2, fontWeight: "bold" }}>Thông tin phim</Box>
      <DetailMoviePaper movie={movie} />
      <ReactMoviePaper movie={movie} />
    </Layout>
  );
};

export default Movie;
