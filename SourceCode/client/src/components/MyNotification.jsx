import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import React from "react";
import moment from "moment";
export default function MyNotification({
  createdAt,
  times,
  type,
  content,
  movie,
}) {
  const arrayContent = content.split("||");
  return (
    <Box
      sx={{ display: "flex", gap: 1, alignItems: "center", fontSize: "14px" }}
    >
      <Avatar src={movie.imageSmall} sx={{ width: 56, height: 56 }} alt="" />
      <Box>
        {times > 1 ? (
          <>
            <Box>
              {arrayContent[0]}
              <strong>{arrayContent[1]}</strong>
              {arrayContent[2]}
              <strong>{arrayContent[3]}</strong>{" "}
            </Box>
            <Box style={{ color: "#B0B3B8" }}>
              {moment(createdAt).fromNow()}
            </Box>
          </>
        ) : type === "comment" ? (
          <>
            <Box>
              <strong>{arrayContent[0]}</strong>
              {arrayContent[1]}
              <strong>{arrayContent[2]}</strong>
            </Box>
            <Box
              sx={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                width: "200px",
              }}
            >
              <em>{arrayContent[3]}</em>
              <Box style={{ color: "#B0B3B8" }}>
                {moment(createdAt).fromNow()}
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Box>
              <strong>{arrayContent[0]}</strong>
              {arrayContent[1]}
              <strong>{arrayContent[2]}</strong>
            </Box>
            <Box style={{ color: "#B0B3B8" }}>
              {moment(createdAt).fromNow()}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
