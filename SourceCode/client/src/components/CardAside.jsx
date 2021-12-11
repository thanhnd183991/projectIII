import React from "react";
import { styled } from "@mui/material/styles";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";

const CardContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "5px",
  cursor: "pointer",
  userSelect: "none",
  fontSize: "12px",
  "&:hover": {
    filter: "brightness(1.15)",
  },
}));

const CardImage = styled("img")(({ theme }) => ({
  height: "130px",
  width: "auto-fit",
  objectFit: "cover",
  transition: "0.5s",
  overflow: "hidden",
}));

const CardInner = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "3px",
}));

const CardTitle = styled("div")(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "bold",
}));

const CardInteraction = styled("div")(({ theme }) => ({}));

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
const CardYear = styled("div")(({ theme }) => ({}));
const CardGenre = styled("div")(({ theme }) => ({}));

const Card = ({ movie, x }) => {
  return (
    <CardContainer>
      <CardImage src="/images/item.jpg" />
      <CardInner>
        <CardTitle>hello</CardTitle>
        <CardInteraction>
          <CardReact>
            <VisibilityIcon />
            <div>10.0000</div>
          </CardReact>
          <CardReact>
            <ThumbUpIcon />
            <div>1.000</div>
          </CardReact>
        </CardInteraction>
        <CardYear>Năm: 2019</CardYear>
        <CardGenre>Thể loại: Tâm lý, Tình cảm</CardGenre>
      </CardInner>
    </CardContainer>
  );
};

export default Card;
