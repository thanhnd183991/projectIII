import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const CommentContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "10px",
}));
const CommentContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const CommentSender = styled("div")(({ theme }) => ({
  fontWeight: "bold",
}));

const CommentMessage = styled("div")(({ theme }) => ({
  fontWeight: "normal",
}));

const Comment = () => {
  return (
    <CommentContainer>
      <Avatar>A</Avatar>
      <CommentContent>
        <CommentSender>AAAA</CommentSender>
        <CommentMessage>lajflllafjowufonslcnlafj</CommentMessage>
      </CommentContent>
    </CommentContainer>
  );
};

export default Comment;
