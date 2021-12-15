import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import Aside from "../components/Aside";
import Comments from "../components/Comments";
import Layout from "../components/Layout";
import VideoPlayer from "../components/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../api/getDetailAPI";

const WatchMovie = () => {
  const dispatch = useDispatch();
  const { movie, asideMovies, pending } = useSelector((state) => state.detail);
  const { movieId } = useParams();
  useEffect(() => {
    if (movie === {}) {
      console.log("watch movie");
      dispatch(getDetail(movieId));
    }
  }, [dispatch, movieId, movie]);
  return (
    <Layout noSlider>
      <Container component="main" sx={{ my: 2 }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item sm={12} md={8}>
            <VideoPlayer watch movie={movie} pending={pending} />
            <Comments movie={movie} pending={pending} />
          </Grid>
          <Grid item sm={12} md={4}>
            <Aside asideMovies={asideMovies} pending={pending} />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default WatchMovie;
