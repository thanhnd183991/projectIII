import { Avatar, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import Skeleton from "./MySkeleton";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Comments = ({ movie, pending }) => {
  const [inputComment, setInputComment] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  const handleComment = async (e) => {
    e.preventDefault();
    console.log(inputComment);
  };

  return (
    <CommentsContainer>
      <CommentsInputForm>
        {userInfo.avatar ? (
          <Avatar src={userInfo.avatar}></Avatar>
        ) : (
          <AccountCircle sx={{ width: "32px", height: "32px" }} />
        )}
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
        {pending
          ? Array(3)
              .fill("0")
              .map((_, i) => <Skeleton width="100%" height="64px" />)
          : movie?.comments?.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
      </CommentsContent>
    </CommentsContainer>
  );
};
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
export default Comments;
