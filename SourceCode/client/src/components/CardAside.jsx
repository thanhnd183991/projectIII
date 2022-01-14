import React from "react";
import { styled } from "@mui/material/styles";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";

const CardContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "5px",
  width: "100%",
  cursor: "pointer",
  userSelect: "none",
  fontSize: "12px",
  "&:hover": {
    filter: "brightness(1.15)",
  },
}));
const CardImageCon = styled("div")(({ theme }) => ({
  height: "108px",
  width: "92px",
  transition: "0.5s",
  overflow: "hidden",
}));

const CardImage = styled("img")(({ theme }) => ({
  height: "108px",
  width: "92px",
  "&:hover": {
    transform: "scale(1.1)",
  },
  objectFit: "cover",
  transition: "0.5s",
  overflow: "hidden",
}));

const CardInner = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "3px",
  flex: 1,
}));

const CardTitle = styled("div")(({ theme }) => ({
  fontSize: 14,
  fontWeight: "bold",
  margin: "0",
  // whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const CardReact = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "5px",
  alignItems: "center",
  "& .MuiSvgIcon-root": {
    fontSize: "15px",
    marginRight: "3px",
  },
  "& div": {
    marginBottom: "-3px",
  },
}));

const Card = ({ movie }) => {
  return (
    <CardContainer>
      <CardImageCon>
        <CardImage src={movie.imageTitle} />
      </CardImageCon>
      <CardInner>
        <CardTitle>{movie.title}</CardTitle>
        <div>
          <CardReact>
            <VisibilityIcon />
            <div>{movie.views}</div>
          </CardReact>
          <CardReact>
            <ThumbUpIcon />
            <div>{movie.likes.length}</div>
          </CardReact>
        </div>
        <div>Năm: {movie.year}</div>
        <div>Thể loại: {movie.genre.split("|").join(", ")}</div>
      </CardInner>
    </CardContainer>
  );
};

export default Card;
