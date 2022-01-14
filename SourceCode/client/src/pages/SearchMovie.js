import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import Aside from "../components/Aside";
import Contents from "../components/Contents";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { getSearch } from "../redux/searchSlice";

const SeachMovie = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { contentMovies, asideMovies, pending } = useSelector(
    (state) => state.search
  );
  const { type, q, genre } = queryString.parse(location?.search);
  useEffect(() => {
    if (type) {
      dispatch(getSearch(`type=${type}`));
    } else if (q) {
      dispatch(getSearch(`q=${q}`));
    } else if (genre) {
      dispatch(getSearch(`genre=${genre}`));
    }
  }, [dispatch, q, type, genre]);

  return (
    <Layout noSlider>
      <Container component="main" sx={{ my: 2 }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item sm={12} md={8}>
            <Contents
              search={true}
              location={location}
              contentMovies={contentMovies}
              typeMovie={type}
              pending={pending}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <Aside asideMovies={asideMovies} pending={pending} />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default SeachMovie;
