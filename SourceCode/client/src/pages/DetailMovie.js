import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import Aside from "../components/Aside";
import InfoMovie from "../components/InfoMovie";
import Comments from "../components/Comments";
import VideoPlayer from "../components/VideoPlayer";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { getDetail } from "../redux/detailSlice";
import { useDispatch, useSelector } from "react-redux";

const DetailMovie = () => {
  const dispatch = useDispatch();
  const { movie, asideMovies, pending } = useSelector((state) => state.detail);
  const { movieId } = useParams();
  useEffect(() => {
    dispatch(getDetail(movieId));
  }, [dispatch, movieId]);
  return (
    <Layout noSlider>
      <Container component="main" sx={{ my: 2 }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item sm={12} md={8}>
            <InfoMovie movie={movie} pending={pending} />
            <VideoPlayer movie={movie} pending={pending} />
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

export default DetailMovie;
