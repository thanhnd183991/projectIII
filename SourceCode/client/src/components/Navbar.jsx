import AccountCircle from "@mui/icons-material/AccountCircle";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import MovieIcon from "@mui/icons-material/Movie";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, update, login } from "../redux/authSlice";
import Link from "./Link";
import { DELETE_ALL_NOTIFICATION } from "../redux/notificationSlice";
import { socket } from "../App";
import { isValidToken } from "../utils/jwt";
import {
  CLICK_NOTIFICATION,
  RE_ENTER,
  UPDATE_NOTIFICATION,
} from "../redux/notificationSlice";
import { useLocation } from "react-router-dom";
import { UPDATE_LIKE, UPDATE_COMMENT } from "../redux/detailSlice";
import { UPDATE_GENRES } from "../redux/genreSlice";
import MyNotification from "./MyNotification";
import axios from "../utils/axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  background: "transparent",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "10ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const NavBar = styled(AppBar)(({ theme }) => ({
  background:
    " linear-gradient(180deg, rgba(5,0,0,0.7) 0%, rgba(3,0,0,0.5410539215686274) 50%, rgba(236,242,244,0) 100%)",
  boxShadow: "none",
}));

const Logo = styled("img")(({ theme }) => ({
  height: "55px",
  width: "auto-fit",
  margin: "0 10px 0 0",
  [theme.breakpoints.down("sm")]: {
    height: "40px",
    margin: "5px 30px 0 0",
  },
}));
const OptionNotification = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 10px 0 0",
  cursor: "pointer",
  boxSizing: "border-box",
  color: alpha(theme.palette.common.white, 0.8),
  "&:hover": {
    color: alpha(theme.palette.common.white, 0.9),
    ul: {
      display: "flex",
      maxHeight: "80vh",
      overflow: "auto",
      backgroundColor: "inherit",
      borderRadius: "5px",
    },
  },
  "& ul": {
    width: "300px",
    color: "white",
    position: "absolute",
    top: "50px",
    right: "80px",
    listStyleType: "none",
    margin: 0,
    padding: 0,
    display: "none",
    flexWrap: "wrap",
  },
  "& ul li": {
    width: "100%",
    listStyleType: "none",
    backgroundColor: "#363738",
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    padding: "5px",
    "&:hover": {
      background: "#151616",
    },
  },
}));
const Option = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 10px 0 0",
  cursor: "pointer",
  boxSizing: "border-box",
  color: alpha(theme.palette.common.white, 0.8),
  "&:hover": {
    color: alpha(theme.palette.common.white, 0.9),
    ul: {
      display: "flex",
      backgroundColor: "inherit",
    },
  },
  "& span": {
    userSelect: "none",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  "& ul": {
    width: "220px",

    color: "white",
    position: "absolute",
    top: "50px",
    left: "248px",
    listStyleType: "none",
    margin: 0,
    padding: 0,
    display: "none",
    flexWrap: "wrap",
    [theme.breakpoints.down("md")]: {
      left: "180px",
      top: "40px",
    },
  },
  "& ul li": {
    width: "50%",
    listStyleType: "none",
    backgroundColor: "#323335",
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: "5px 0",
    "&:hover": {
      background: "white",
      color: "#323335",
    },
  },
}));
export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notification);
  const { movie } = useSelector((state) => state.detail);
  const { genres } = useSelector((state) => state.genre);

  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState("");
  // console.log(location);
  useEffect(() => {
    const getGenres = async () => {
      if (genres.length === 0) {
        const { data } = await axios.get("/movies/genres");
        if (data.data) {
          console.log(data.data);
          dispatch(UPDATE_GENRES(data.data.split("|")));
        }
      }
    };
    getGenres();
  }, [genres.length, dispatch]);
  useEffect(() => {
    console.log("navbar run update user");
    if (localStorage.getItem("userInfo")) {
      // console.log(localStorage.getItem("userInfo"));
      dispatch(update(JSON.parse(localStorage.getItem("userInfo"))));
    }
  }, [dispatch]);
  useEffect(() => {
    if (isValidToken(localStorage.getItem("accessToken")).isValid) {
      socket.off("haveLike").on("haveLike", (dataLike) => {
        if (
          !(
            (
              location.pathname.includes("watch") &&
              movie.id === dataLike.movieID
            )
            // ||
            // location.pathname.includes("detail")
          )
        ) {
          dispatch(
            UPDATE_NOTIFICATION({
              content: dataLike.content,
              movie: dataLike.movie,
              times: dataLike.times,
              type: dataLike.type,
              createdAt: dataLike.createdAt,
            })
          );
          console.log(dataLike);
        }
      });
      socket.off("homeLike").on("homeLike", (dataLike) => {
        // console.log("homeLike", dataLike);
        if (movie.id === dataLike.movieID) {
          dispatch(UPDATE_LIKE(dataLike.likes));
        }
      });
      socket.off("homeComment").on("homeComment", (dataCmt) => {
        if (movie.id === dataCmt.movieID) {
          dispatch(UPDATE_COMMENT(dataCmt.comment));
        }
      });
      socket.off("reEnterNotification").on("reEnterNotification", (data) => {
        // console.log("re", data);
        dispatch(RE_ENTER(data));
      });
      socket.off("adminEditMovie").on("adminEditMovie", (editData) => {
        console.log(editData);
        dispatch(
          UPDATE_NOTIFICATION({
            content: editData.content,
            movie: editData.movie,
            times: editData.times,
            type: editData.type,
            createdAt: editData.createdAt,
          })
        );
      });
      socket.off("haveComment").on("haveComment", (dataCmt) => {
        if (
          !(
            (
              location.pathname.includes("watch") &&
              movie.id === dataCmt.movieID
            )
            //  ||
            // location.pathname.includes("detail")
          )
        ) {
          dispatch(
            UPDATE_NOTIFICATION({
              content: dataCmt.content,
              movie: dataCmt.movie,
              times: dataCmt.times,
              type: dataCmt.type,
              createdAt: dataCmt.createdAt,
            })
          );
        }
        console.log(dataCmt);
      });
      dispatch(login(JSON.parse(localStorage.getItem("userInfo"))));
    }
  }, [dispatch, userInfo.id, movie.id, location.pathname]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?q=${search}`);
  };

  const ListOptions = () => (
    <Box sx={{ display: { xs: "flex" } }}>
      <Link to="/search?type=movie">
        <Option>
          <MovieIcon />
          <span>Phim lẻ</span>
        </Option>
      </Link>

      <Link to="/search?type=series">
        <Option>
          <LocalMoviesIcon />
          <span>Phim bộ</span>
        </Option>
      </Link>
      <Option>
        <FormatListBulletedIcon />
        <span>Thể loại</span>
        <ul>
          <Box
            sx={{
              height: "14px",
              width: "100%",
              background: isScrolled ? "black" : "inherit",
            }}
          ></Box>
          {genres &&
            genres.map((el, i) => (
              <li key={i} onClick={() => navigate(`/search?genre=${el}`)}>
                {el}
              </li>
            ))}
        </ul>
      </Option>
    </Box>
  );

  const menuId = "primary-search-account-menu";

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 0 }}>
      <NavBar
        sx={{ mb: 0 }}
        style={{ background: isScrolled && "black" }}
        position="fixed"
      >
        <Toolbar sx={{ mb: 0 }}>
          <Link to="/home">
            <Typography variant="h6" noWrap component="div">
              <Logo src="/images/logo.png" />
            </Typography>
          </Link>
          <ListOptions />
          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <form onSubmit={(e) => handleSearchSubmit(e)}>
              <StyledInputBase
                placeholder="Search…"
                onChange={(e) => handleChange(e)}
                value={search}
                inputProps={{ "aria-label": "search" }}
                // onKeyDown={(e) => handleKeyDown(e)}
              />
              <button type="submit" hidden>
                Submit
              </button>
            </form>
          </Search>
          <Box sx={{ display: "flex" }}>
            <OptionNotification>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <ul>
                <Box
                  sx={{
                    height: "14px",
                    width: "100%",
                    background: isScrolled ? "black" : "inherit",
                  }}
                ></Box>
                {/* {Array(5)
                  .fill("Something will happen here")
                  .map((el, i) => (
                    <li key={i} onClick={() => {}}>
                      {el}
                    </li>
                  ))} */}
                {notifications.map((noti, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      navigate(`/detail/${noti?.movie?._id}`);
                      dispatch(
                        CLICK_NOTIFICATION({ moiveID: noti?.movie?._id })
                      );
                    }}
                  >
                    <MyNotification
                      times={noti.times}
                      type={noti.type}
                      content={noti.content}
                      movie={noti.movie}
                      createdAt={noti.createdAt}
                    />
                  </li>
                ))}
              </ul>
            </OptionNotification>

            {userInfo.id ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => {
                  navigate("/userInfo");
                }}
                color="inherit"
              >
                {userInfo.avatar ? (
                  <Avatar src={userInfo.avatar} />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
            ) : (
              <Button
                size="small"
                edge="end"
                xs={{ ml: "5px" }}
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => {
                  dispatch(DELETE_ALL_NOTIFICATION());
                  dispatch(logout());
                  navigate("/login");
                }}
                color="inherit"
              >
                Đăng nhập
              </Button>
            )}
          </Box>
        </Toolbar>
      </NavBar>
    </Box>
  );
}
