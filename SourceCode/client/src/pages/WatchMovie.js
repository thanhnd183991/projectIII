import { Container, Grid } from "@mui/material";
import React from "react";
import Aside from "../components/Aside";
import Comments from "../components/Comments";
import Layout from "../components/Layout";
import VideoPlayer from "../components/VideoPlayer";

const WatchMovie = () => {
  return (
    <Layout noSlider>
      <Container component="main" sx={{ my: 2 }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item sm={12} md={8}>
            <VideoPlayer watch />
            <Comments />
          </Grid>
          <Grid item sm={12} md={4}>
            <Aside />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default WatchMovie;
