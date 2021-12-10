import AddIcon from "@mui/icons-material/Add";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CustomCard({ movie }) {
  if (movie == null) {
    return (
      <Card
        sx={{
          width: "32%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <AddIcon
          sx={{
            trasistion: "0.5s",
            "&:hover": {
              transform: "scale(1.1)",
            },
            fontSize: "200px",
            fontWeigth: "bold",
            color: "whitesmoke",
          }}
        />
      </Card>
    );
  }
  return (
    <Card sx={{ width: "32%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="200"
        image={movie.imageSmall}
        alt="image "
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.desc.length > 50
            ? movie.desc.substring(0, 50) + "..."
            : movie.desc}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", gap: "10px" }}>
        <Box
          sx={{
            flex: 1 / 4,
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <VisibilityIcon />
          {movie.views}
        </Box>
        <Box
          sx={{
            flex: 1 / 4,
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <ThumbUpIcon />
          {movie.likes.length}
        </Box>
        <Box
          sx={{
            flex: 1 / 4,
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <CommentIcon />
          {movie.comments.length}
        </Box>
        <Box
          sx={{
            flex: 1 / 4,
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "pointer",
          }}
        >
          <DeleteIcon />
          Xóa
        </Box>
      </CardActions>
    </Card>
  );
}
