import { Container, Grid } from "@mui/material";
import React from "react";
import Aside from "../components/Aside";
import Contents from "../components/Contents";
import Layout from "../components/Layout";

const SeachMovie = () => {
  return (
    // <Box
    //   sx={{
    //     width: "100%",
    //     // height: ``,
    //     minHeight: "100vh",
    //     background: "#323335",
    //     paddingTop: "70px",
    //   }}
    // >
    <Layout noSlider>
      <Container component="main" sx={{ my: 2 }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item sm={12} md={8}>
            <Contents search={true} />
          </Grid>
          <Grid item sm={12} md={4}>
            <Aside />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default SeachMovie;
