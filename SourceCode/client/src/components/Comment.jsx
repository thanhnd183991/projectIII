import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import Skeleton from "./MySkeleton";

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

const Comment = ({ comment }) => {
  return comment ? (
    <CommentContainer>
      <Avatar src={comment?.user.avatar}>A</Avatar>
      <CommentContent>
        <CommentSender>{comment.user.username}</CommentSender>
        <CommentMessage>{comment.comment}</CommentMessage>
      </CommentContent>
    </CommentContainer>
  ) : (
    <Skeleton width="100%" height="50px" />
  );
};

export default Comment;
