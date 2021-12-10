import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import MyTextField from "../components/MyTextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router";
import { Button, Box } from "@mui/material";
import validateRegister from "../utils/validateRegister";
import { Formik, Form } from "formik";
import DetailMoviePaper from "../components/DetailMoviePaper";
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
