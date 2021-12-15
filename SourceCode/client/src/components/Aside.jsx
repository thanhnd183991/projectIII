import { Grid, Paper } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import React from "react";
import CardAside from "./CardAside";
import Skeleton from "./MySkeleton";
import Link from "./Link";

const Title = styled("h1")(({ theme }) => ({
  fontSize: "18px",
  fontWeight: "bold",
  marginTop: 0,
}));

const PaperAside = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const Aside = ({ asideMovies, pending }) => {
  return (
    <PaperAside>
      <Title>Có thể quan tâm</Title>
      <Grid container spacing={2}>
        {pending ? (
          <>
            {Array(8)
              .fill("0")
              .map((_, i) => (
                <Grid item xs={6} sm={6} md={12} key={i}>
                  <Skeleton with="100%" height="118px" />
                </Grid>
              ))}
          </>
        ) : (
          asideMovies.map((movie) => {
            return (
              <Grid item xs={6} sm={6} md={12} key={movie.id}>
                <Link to={`/detail/${movie.id}`}>
                  <CardAside movie={movie} />
                </Link>
              </Grid>
            );
          })
        )}
      </Grid>
    </PaperAside>
  );
};

export default Aside;
