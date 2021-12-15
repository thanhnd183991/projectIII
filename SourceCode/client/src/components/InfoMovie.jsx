import React from "react";
import CardContent from "./CardContent";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CardTitle, CardInteraction, CardReact } from "./CardContent";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import Skeleton from "./MySkeleton";

const InfoMovie = ({ movie, pending }) => {
  return (
    <InfoMovieContainer>
      {pending ? (
        <Skeleton width="100%" height="300px" />
      ) : (
        <>
          <InfoMovieTop>
            <InfoMovieTopLeft>
              <CardContent inDetail movie={movie} />
            </InfoMovieTopLeft>
            <InfoMovieTopRight>
              <div
                style={{
                  fontSize: "20px",
                  whiteSpace: "wrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  // width: "100%",
                  wordBreak: "break-word",
                  fontWeight: "bold",
                }}
              >
                {movie.title}{" "}
              </div>
              <InfoMovieSubTitle>{movie.year} </InfoMovieSubTitle>
              <InfoMovieSubTitle>
                {movie.genre?.split("|").join(", ")}{" "}
              </InfoMovieSubTitle>
              <InfoMovieSubTitle>{movie?.duration} </InfoMovieSubTitle>
              <CardTitle>Tương tác phim:</CardTitle>
              <CardInteraction>
                <CardReact>
                  <VisibilityIcon />
                  <div>{movie?.views}</div>
                </CardReact>
                <CardReact>
                  <ThumbUpIcon />
                  <div>{movie?.likes?.length}</div>
                </CardReact>
              </CardInteraction>
            </InfoMovieTopRight>
          </InfoMovieTop>
          <InfoMovieBottom>
            <CardTitle>Thông tin phim</CardTitle>
            {movie?.desc}
          </InfoMovieBottom>
        </>
      )}
    </InfoMovieContainer>
  );
};
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

export default InfoMovie;
