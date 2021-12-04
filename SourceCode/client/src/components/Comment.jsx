import React, { useState } from "react";
import CardContent from "./CardContent";
import { movies } from "../data";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CardTitle, CardInteraction, CardReact } from "./CardContent";
import { styled } from "@mui/material/styles";
import ReactEmoji from "react-emoji";
import InputEmoji from "react-input-emoji";
import { Paper, Avatar } from "@mui/material";

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
