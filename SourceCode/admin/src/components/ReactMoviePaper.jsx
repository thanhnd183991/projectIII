import React from "react";

import Layout from "../components/Layout";
import MyTextField from "../components/MyTextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router";
import { Typography, Button, Box, Avatar } from "@mui/material";
import validateRegister from "../utils/validateRegister";
import { Formik, Form } from "formik";
import MyFileField from "../components/MyFileField";
import MySelectField from "../components/MySelectField";
import { userRows } from "../dummyData";

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
          <Typography variant="h5" gutterBottom component="div">
            Đã thích
          </Typography>
          {userRows.map((user) => (
            <Box
              sx={{
                display: "flex",
                gap: "5px",
                backgroundColor: "whitesmoke",
                borderRadius: "5px",
              }}
              key={user.id}
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
          <Typography variant="h5" gutterBottom component="div">
            Bình luận
          </Typography>
          {userRows.map((user) => (
            <Box
              sx={{
                display: "flex",
                gap: "5px",
                borderRadius: "5px",
                background: "whitesmoke",
              }}
              key={user.id}
            >
              <Avatar
                sx={{ width: "32px", height: "32px" }}
                src={user.avatar}
              ></Avatar>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
                key={user.id}
              >
                <Box sx={{ fontWeight: "bold" }}>{user.username}</Box>
                <Box>something comment</Box>
              </Box>
            </Box>
          ))}
        </Paper>
      </Grid>
    </Box>
  );
};

export default ReactMoviePaper;
