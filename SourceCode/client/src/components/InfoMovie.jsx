import React from "react";
import CardContent from "./CardContent";
import { movies } from "../data";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CardTitle, CardInteraction, CardReact } from "./CardContent";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

const InfoMovieContainer = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  marginBottom: "20px",
}));

const InfoMovieTop = styled("div")(({ theme }) => ({
  display: "flex",
  marginBottom: "10px",
}));

const InfoMovieTopLeft = styled("div")(({ theme }) => ({
  width: "230px",
}));

const InfoMovieTopRight = styled("div")(({ theme }) => ({
  background: "#323335",
  flex: 1,
  padding: theme.spacing(1),
  marginLeft: "5px",
  display: "flex",
  flexDirection: "column",
  color: "white",
}));
const InfoMovieSubTitle = styled("div")(({ theme }) => ({
  fontSize: "normal",
}));
const InfoMovieBottom = styled("div")(({ theme }) => ({
  fontSize: "normal",
}));

const InfoMovie = () => {
  const movie = movies[0];
  return (
    <InfoMovieContainer>
      <InfoMovieTop>
        <InfoMovieTopLeft>
          <CardContent inDetail movie={movie} />
        </InfoMovieTopLeft>
        <InfoMovieTopRight>
          <CardTitle style={{ fontSize: "20px" }}>{movie.title} </CardTitle>
          <InfoMovieSubTitle>{movie.year} </InfoMovieSubTitle>
          <InfoMovieSubTitle>
            {movie.genre.split("|").join(", ")}{" "}
          </InfoMovieSubTitle>
          <InfoMovieSubTitle>{movie.limit} </InfoMovieSubTitle>
          <CardTitle>hello</CardTitle>
          <CardInteraction>
            <CardReact>
              <VisibilityIcon />
              <div>{movie.views}</div>
            </CardReact>
            <CardReact>
              <ThumbUpIcon />
              <div>1.000</div>
            </CardReact>
          </CardInteraction>
        </InfoMovieTopRight>
      </InfoMovieTop>
      <InfoMovieBottom>{movie.desc}</InfoMovieBottom>
    </InfoMovieContainer>
  );
};

export default InfoMovie;
