import { Grid, Paper } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import React from "react";
import CardAside from "./CardAside";

const Title = styled("h1")(({ theme }) => ({
  fontSize: "18px",
  fontWeight: "bold",
  marginTop: 0,
}));

const Layout = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const Contents = () => {
  return (
    <Layout>
      <Title>Có thể quan tâm</Title>
      <Grid container spacing={2}>
        {Array(5)
          .fill("hello")
          .map((el, index) => {
            return (
              <Grid item xs={6} sm={6} md={12} key={index}>
                <CardAside />
              </Grid>
            );
          })}
      </Grid>
    </Layout>
  );
};

export default Contents;
