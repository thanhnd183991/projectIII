import React, { useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import MoreIcon from "@mui/icons-material/MoreVert";
import MovieIcon from "@mui/icons-material/Movie";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "./Link";
import { useNavigate } from "react-router-dom";

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
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  "& ul": {
    width: "200px",

    color: "white",
    position: "absolute",
    top: "50px",
    left: "248px",
    listStyleType: "none",
    margin: 0,
    padding: 0,
    display: "none",
    flexWrap: "wrap",
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
export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState("");

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    console.log(search);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate("/search");
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setUser(false);
    navigate("/login");
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const ListOptions = () => (
    <Box sx={{ display: { xs: "flex" } }}>
      <Link to="/search">
        <Option>
          <MovieIcon />
          <span>Phim lẻ</span>
        </Option>
      </Link>

      <Link to="/search">
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
          {Array(20)
            .fill("genre")
            .map((el, i) => (
              <li key={i} onClick={() => navigate("/search")}>
                {el}
              </li>
            ))}
        </ul>
      </Option>
    </Box>
  );

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 0 }}>
      <NavBar
        sx={{ mb: 0 }}
        style={{ background: isScrolled && "black" }}
        position="fixed"
      >
        <Toolbar sx={{ mb: 0 }}>
          <Link to="/">
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
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            {user ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                // onClick={handleProfileMenuOpen}
                onClick={() => {
                  setUser(false);
                  navigate("/login");
                }}
                color="inherit"
              >
                <AccountCircle />
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
                  setUser(false);
                  navigate("/login");
                }}
                color="inherit"
              >
                Đăng nhập
              </Button>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </NavBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
