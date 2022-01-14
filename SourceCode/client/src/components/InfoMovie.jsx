import React from "react";
import CardContent from "./CardContent";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CardTitle, CardInteraction, CardReact } from "./CardContent";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import Skeleton from "./MySkeleton";
import { useNavigate } from "react-router-dom";

const InfoMovie = ({ movie, pending }) => {
  const navigate = useNavigate();
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
              {movie.movieSeries ? (
                <InfoMovieSubTitle style={{ fontWeight: "bold" }}>
                  Thuộc series: {movie?.movieSeries.title}
                  {" - tập "}
                  {movie?.stt}
                </InfoMovieSubTitle>
              ) : (
                <InfoMovieSubTitle style={{ fontWeight: "bold" }}>
                  Phim lẻ
                </InfoMovieSubTitle>
              )}
              <InfoMovieSubTitle>Năm sản xuất: {movie.year} </InfoMovieSubTitle>
              <InfoMovieSubTitle>
                Thể loại:
                {/* {movie.genre?.split("|").join(", ")}{" "} */}
                {movie.genre?.split("|").map((el, i) => (
                  <LinkSpan
                    key={i}
                    onClick={() => navigate(`/search?genre=${el}`)}
                  >
                    {el}
                    {", "}
                  </LinkSpan>
                ))}
              </InfoMovieSubTitle>
              <InfoMovieSubTitle>
                Thời lượng: {movie?.duration}{" "}
              </InfoMovieSubTitle>
              <InfoMovieSubTitle>Chất lượng: Bản đẹp</InfoMovieSubTitle>
              <CardTitle style={{ marginBottom: "5px" }}>
                Tương tác phim:
              </CardTitle>
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

const LinkSpan = styled("span")(({ theme }) => ({
  cursor: "pointer",
  "&:hover": {
    color: "gray",
  },
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
  marginBottom: "5px",
}));
const InfoMovieBottom = styled("div")(({ theme }) => ({
  fontSize: "normal",
  wordBreak: "break-word",
}));

export default InfoMovie;
