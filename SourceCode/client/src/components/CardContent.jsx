import { styled } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";

const CardContent = ({ movie, inDetail }) => {
  const navigate = useNavigate();
  return (
    <CardContainer>
      <CardImage src={movie.imageTitle} />
      <CardInner>
        {inDetail ? (
          <CardContentWatchButton
            onClick={() => navigate(`/watch/${movie.id}`)}
          >
            Xem
          </CardContentWatchButton>
        ) : (
          <>
            <CardTitle>{movie.title}</CardTitle>
            <CardInteraction>
              {/* <CardReact>
                <VisibilityIcon />
                <div>{movie.views}</div>
              </CardReact>
              <CardReact>
                <ThumbUpIcon />
                <div>{movie.likes.length}</div>
              </CardReact> */}
              <CardReact>
                <div>{movie.isSeries ? "true" : "false"}</div>
              </CardReact>
              <CardReact>
                <div>{movie.year}</div>
              </CardReact>
            </CardInteraction>
          </>
        )}
      </CardInner>
    </CardContainer>
  );
};
const CardContainer = styled("div")(({ theme }) => ({
  //   border: "1px solid blue",
  width: "176.53px",
  margin: "0 auto",
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
  width: "176.53px",
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
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  // width: "100%",
  wordBreak: "break-word",
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

export default CardContent;
