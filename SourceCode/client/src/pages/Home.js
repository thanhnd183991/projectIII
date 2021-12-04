import { Container, Grid } from "@mui/material";
import React from "react";
import Aside from "../components/Aside";
import Contents from "../components/Contents";
import Layout from "../components/Layout";
import Slider from "../components/Slider";

const home = () => {
  return (
    <Layout>
      <Slider />
      <Container component="main" sx={{ my: 2 }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item sm={12} md={8}>
            <Contents />
          </Grid>
          <Grid item sm={12} md={4}>
            <Aside />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default home;
