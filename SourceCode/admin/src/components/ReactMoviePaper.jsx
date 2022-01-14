import { Avatar, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React from "react";
import Skeleton from "./MySkeleton";
import ReactEmoji from "react-emoji";

const ReactMoviePaper = ({ movie }) => {
  return (
    <Box sx={{ display: "flex", gap: "10px" }}>
      <Grid item xs={12} md={4}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          {movie ? (
            <>
              <Typography variant="h5" gutterBottom component="div">
                Đã thích<em>({movie?.likes?.length})</em>
              </Typography>
              {movie?.likes.map((user, i) => (
                <Box
                  key={user._id || i}
                  sx={{
                    display: "flex",
                    gap: "5px",
                    backgroundColor: "whitesmoke",
                    borderRadius: "5px",
                  }}
                >
                  <Avatar
                    sx={{ width: "32px", height: "32px" }}
                    src={user.avatar}
                  ></Avatar>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                  >
                    {user.username}
                  </Box>
                </Box>
              ))}
            </>
          ) : (
            <Skeleton width="100%" height="300px" />
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {movie ? (
            <>
              <Typography variant="h5" gutterBottom component="div">
                Bình luận<em>({movie?.comments?.length})</em>
              </Typography>
              {movie?.comments.map((userCmt, i) => (
                <Box
                  sx={{
                    display: "flex",
                    gap: "5px",
                    borderRadius: "5px",
                    background: "whitesmoke",
                  }}
                  key={i}
                >
                  <Avatar
                    sx={{ width: "32px", height: "32px" }}
                    src={userCmt.createdBy.avatar}
                  ></Avatar>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                    key={i}
                  >
                    <Box sx={{ fontWeight: "bold" }}>
                      {userCmt.createdBy.username}
                    </Box>
                    <Box
                      sx={{
                        "& img": {
                          width: "15px",
                          height: "15px",
                          marginBottom: "-2px",
                        },
                      }}
                    >
                      {ReactEmoji.emojify(userCmt.data)}
                    </Box>
                  </Box>
                </Box>
              ))}
            </>
          ) : (
            <Skeleton width="100%" height="300px" />
          )}
        </Paper>
      </Grid>
    </Box>
  );
};

export default ReactMoviePaper;
