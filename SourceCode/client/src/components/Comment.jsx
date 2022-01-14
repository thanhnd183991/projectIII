import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import Skeleton from "./MySkeleton";
import ReactEmoji from "react-emoji";
import moment from "moment";

const CommentContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "10px",
}));
const CommentContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  "& img": {
    width: "15px",
    height: "15px",
    marginBottom: "-2px",
  },
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
      <Avatar src={comment?.createdBy.avatar}>A</Avatar>
      <CommentContent>
        <CommentSender>{comment.createdBy.username}</CommentSender>
        <CommentMessage>{ReactEmoji.emojify(comment.data)}</CommentMessage>
        <span
          style={{
            fontWeight: "normal",
            fontSize: "0.85em",
            fontStyle: "italic",
            color: "#B0B3B8",
          }}
        >
          {" "}
          {moment(comment?.createdAt).locale("vi").fromNow()}
        </span>
      </CommentContent>
    </CommentContainer>
  ) : (
    <Skeleton width="100%" height="50px" />
  );
};

export default Comment;
