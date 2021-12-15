import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import Aside from "../components/Aside";
import Contents from "../components/Contents";
import Layout from "../components/Layout";
import Slider from "../components/Slider";
import { getHome, getPageHome } from "../api/getHomeAPI";
import { useSelector, useDispatch } from "react-redux";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { page } = queryString.parse(location?.search);
  const { contentMovies, asideMovies, pending, pendingPage } = useSelector(
    (state) => state.home
  );
  useEffect(() => {
    if (page) {
      dispatch(getPageHome(page));
    } else dispatch(getHome(1));
  }, [dispatch, page]);
  return (
    <Layout>
      <Slider pending={pending} />
      <Container component="main" sx={{ my: 2 }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item sm={12} md={8}>
            <Contents
              contentMovies={contentMovies}
              pending={pending}
              pendingPage={pendingPage}
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

export default Home;
