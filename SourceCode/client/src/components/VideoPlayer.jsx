import VisibilityIcon from "@mui/icons-material/Visibility";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { CardTitle } from "./CardContent";
import Skeleton from "./MySkeleton";

const VideoPlayer = ({ watch, movie, pending }) => {
  return (
    <VideoPlayerContainer>
      {pending ? (
        <Skeleton width="100%" height="470px" />
      ) : (
        <>
          <VideoTitle>
            {watch ? `Xem phim ${movie.title}` : `Trailer ${movie.title}`}
          </VideoTitle>
          <Video
            progress={"true"}
            controls
            src={
              watch
                ? movie.video === null
                  ? "https://static.pexels.com/lib/videos/free-videos.mp4"
                  : movie.video
                : movie.trailer === null
                ? "https://static.pexels.com/lib/videos/free-videos.mp4"
                : movie.trailer
            }
          />
          {watch ? (
            <>
              <VideoPlayerInteraction>
                <VideoPlayerReact>
                  <VisibilityIcon />
                  {movie.views}
                </VideoPlayerReact>
                <VideoPlayerReact>
                  <VisibilityIcon />
                  {movie?.likes?.length}
                </VideoPlayerReact>
              </VideoPlayerInteraction>
              <VideoPlayerDesc>
                <CardTitle>Thông tin phim</CardTitle>
                {movie.desc}
              </VideoPlayerDesc>
            </>
          ) : null}
        </>
      )}
    </VideoPlayerContainer>
  );
};

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
export default VideoPlayer;
