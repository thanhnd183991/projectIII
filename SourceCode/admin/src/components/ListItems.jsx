import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import PeopleIcon from "@mui/icons-material/People";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MovieIcon from "@mui/icons-material/Movie";
import { Link } from "react-router-dom";
import * as React from "react";
export const mainListItems = (
  <div>
    <Link to="/" style={{ textDecoration: "none", color: "black" }}>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Người dùng" />
      </ListItem>
    </Link>
    <Link to="/movies" style={{ textDecoration: "none", color: "black" }}>
      <ListItem button>
        <ListItemIcon>
          <MovieIcon />
        </ListItemIcon>
        <ListItemText primary="Phim lẻ" />
      </ListItem>
    </Link>
    <Link to="/series" style={{ textDecoration: "none", color: "black" }}>
      <ListItem button>
        <ListItemIcon>
          <LocalMoviesIcon />
        </ListItemIcon>
        <ListItemText primary="Phim bộ" />
      </ListItem>
    </Link>
  </div>
);
