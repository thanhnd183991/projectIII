import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styled } from "@mui/material/styles";
import React from "react";

const CardContainer = styled("div")(({ theme }) => ({
  //   border: "1px solid blue",
  width: "auto-fit",
  height: "250px",
  transition: "0.5s",
  overflow: "hidden",
  position: "relative",
  userSelect: "none",
  cursor: "pointer",
}));

const CardImage = styled("img")(({ theme }) => ({
  transition: "0.5s",
  overflow: "hidden",
  position: "absolute",
  width: "auto-fit",
  height: "250px",
  objectFit: "cover",
  left: "50%",
  transform: "translate(-50%, -0%)",
  "&:hover": {
    transform: "scale(1.1) translate(-45%, -0%)",
  },
}));

const CardInner = styled("div")(({ theme }) => ({
  position: "absolute",
  width: "176.53px",
  bottom: 0,
  padding: "10px",

  left: "50%",
  transform: "translate(-50%, -0%)",
  height: "20%",
  display: "flex",
  flexDirection: "column",
  fontSize: "12px",
  background: "rgba(0, 0, 0, 0.5)",
}));

export const CardTitle = styled("div")(({ theme, x }) => ({
  fontSize: 14,
  fontWeight: "bold",
  margin: "0",
}));

export const CardInteraction = styled("div")(({ theme, x }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  justifyContent: "flex-start",
}));

export const CardReact = styled("div")(({ theme, x }) => ({
  display: "flex",
  alignItems: "center",
  fontSize: "12px",
  justifyContent: "center",
  "& .MuiSvgIcon-root": {
    fontSize: "15px",
    marginRight: "3px",
  },
  "& div": {
    marginBottom: "-3px",
  },
}));

const CardContentWatchButton = styled("div")(({ theme, x }) => ({
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
  alignSelf: "center",
  "&:hover": {
    background: "red",
  },
}));

const CardContent = ({ movie, inDetail }) => {
  return (
    <CardContainer>
      <CardImage src="/images/item.jpg" />
      <CardInner>
        {inDetail ? (
          <CardContentWatchButton>Xem</CardContentWatchButton>
        ) : (
          <>
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
          </>
        )}
      </CardInner>
    </CardContainer>
  );
};

export default CardContent;
