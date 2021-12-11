import { Avatar, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import InputEmoji from "react-input-emoji";
import Comment from "./Comment";
const CommentsContainer = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  display: "flex",
  alignSelf: "center",
  flexDirection: "column",
  gap: "5px",
}));

const CommentsInputForm = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));
const CommentsContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}));

const Comments = () => {
  const [inputComment, setInputComment] = useState("");

  const handleComment = async (e) => {
    e.preventDefault();
    console.log(inputComment);
  };

  return (
    <CommentsContainer>
      <CommentsInputForm>
        <Avatar>A</Avatar>
        <InputEmoji
          // disabled={isUpdate || isLoadingComment}
          style={{ backgroundColor: "#323335" }}
          value={inputComment}
          onChange={setInputComment}
          cleanOnEnter
          onEnter={handleComment}
          name="comment"
          placeholder="Viết bình luận"
        />
      </CommentsInputForm>
      <CommentsContent>
        {Array(4)
          .fill(4)
          .map((el) => (
            <Comment />
          ))}
      </CommentsContent>
    </CommentsContainer>
  );
};

export default Comments;
