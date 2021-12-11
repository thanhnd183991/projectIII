import { styled } from "@mui/material/styles";
import React from "react";
import Link from "./Link";

const SlideContainer = styled("div")(({ theme }) => ({
  // border:'1px solid blue' ,
  minWidth: "100%",
  height: "100%",
  transition: "0.5s",
  overflow: "hidden",
  position: "relative",
  userSelect: "none",
}));

const SlideImage = styled("img")(({ theme }) => ({
  minWidth: "100%",
  height: "100%",
  transition: "0.5s",
  overflow: "hidden",
  position: "absolute",
  objectFit: "cover",
}));

const SlideInner = styled("div")(({ theme }) => ({
  position: "absolute",
  width: "50%",
  bottom: "80px",
  marginLeft: "20px",
}));

const SlideTitle = styled("div")(({ theme, x }) => ({
  fontSize: 30,
  fontWeight: "bold",
  lineHeight: 1.1,
  marginBottom: "15px",
}));

const SlideDesc = styled("div")(({ theme, x }) => ({
  fontSize: 14,
  fontWeight: "normal",
}));
const SlideGroupButton = styled("div")(({ theme, x }) => ({
  display: "flex",
  gap: "10px",
  marginTop: "10px",
  alignItems: "center",
}));
const SlideButton = styled("div")(({ theme, x }) => ({
  width: "120px",
  height: "40px",
  color: "white",
  background: "#FC2222",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "15px",
  fontWeight: "bold",
  cursor: "pointer",
  "&:hover": {
    background: "red",
  },
}));

const Slide = ({ movie, x }) => {
  return (
    <SlideContainer style={{ transform: `translateX(-${x}%)` }}>
      <SlideImage src={movie.image} />
      <SlideInner>
        <SlideTitle>{movie.title}</SlideTitle>
        <SlideDesc>{movie.desc}</SlideDesc>
        <SlideGroupButton>
          <Link to="/detail/1">
            <SlideButton>Trailer</SlideButton>
          </Link>
          <Link to="/watch/1">
            <SlideButton>Xem phim</SlideButton>
          </Link>
        </SlideGroupButton>
      </SlideInner>
    </SlideContainer>
  );
};

export default Slide;
