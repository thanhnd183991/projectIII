import { styled } from "@mui/material/styles";
import React from "react";
import { movies } from "../data";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Paper } from "@mui/material";

const VideoPlayerContainer = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  marginBottom: "20px",
}));

const VideoTitle = styled("div")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "5px",
}));

const Video = styled("video")(({ theme }) => ({
  objectFit: "cover",
  height: "400px",
}));

const VideoPlayerInteraction = styled("div")(({ theme }) => ({
  display: "flex",
  margin: "5px 0",
  gap: "20px",
  alignItems: "center",
}));
const VideoPlayerReact = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  alignSelf: "center",
  gap: "5px",
}));

const VideoPlayerDesc = styled("div")(({ theme }) => ({}));
const VideoPlayer = ({ watch }) => {
  const movie = movies[0];

  return (
    <VideoPlayerContainer>
      <VideoTitle>{watch ? "Title" : "Trailer"}</VideoTitle>
      <Video autoPlay progress controls src={movie.video} />
      {watch ? (
        <>
          <VideoPlayerInteraction>
            <VideoPlayerReact>
              <VisibilityIcon />
              {movie.views}
            </VideoPlayerReact>
            <VideoPlayerReact>
              <VisibilityIcon />
              1.000
            </VideoPlayerReact>
          </VideoPlayerInteraction>
          <VideoPlayerDesc>{movie.desc}</VideoPlayerDesc>
        </>
      ) : null}
    </VideoPlayerContainer>
  );
};

export default VideoPlayer;
