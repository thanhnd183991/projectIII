import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import Aside from "../components/Aside";
import Comments from "../components/Comments";
import Layout from "../components/Layout";
import VideoPlayer from "../components/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDetail } from "../redux/detailSlice";
import { DELETE_ALL_NOTIFICATION } from "../redux/notificationSlice";
import { logout } from "../redux/authSlice";
import axios from "../utils/axios";
import { isValidToken, setSession } from "../utils/jwt";

const WatchMovie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movie, asideMovies, pending, error } = useSelector(
    (state) => state.detail
  );
  const { movieId } = useParams();
  useEffect(() => {
    dispatch(getDetail(movieId));
    const increaseView = async () => {
      if (
        localStorage.getItem("accessToken") &&
        isValidToken(localStorage.getItem("accessToken")).isValid
      ) {
        setSession(localStorage.getItem("accessToken"));
        await axios.get(`/movies/view/${movieId}`);
      } else {
        console.log("vao");
        dispatch(DELETE_ALL_NOTIFICATION());
        dispatch(logout());
        navigate("/login");
      }
    };
    increaseView();
  }, [dispatch, navigate, movieId]);
  if (error) {
    return <pre>{JSON.stringify(error)}</pre>;
  }
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
