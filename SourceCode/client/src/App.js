import React from "react";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {
  Home,
  Login,
  User,
  SearchMovie,
  DetailMovie,
  WatchMovie,
  ForgotPassword,
} from "./pages";
import Navbar from "./components/Navbar";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import { io } from "socket.io-client";
import { isValidToken } from "./utils/jwt";
const REACT_APP_SOCKET_ENDPOINT = "http://localhost:5000";
export const socket = io(REACT_APP_SOCKET_ENDPOINT);
export const userSocket = io(`${REACT_APP_SOCKET_ENDPOINT}/user`);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  console.log(
    isValidToken(localStorage.getItem("accessToken")).isValid
      ? "true app"
      : "false app"
  );
  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Navigate replace to="/home" />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
            <Route
              exact
              path="/change_password/:token"
              element={<ForgotPassword />}
            />
            <Route exact path="/search" element={<SearchMovie />} />
            <Route exact path="/detail/:movieId" element={<DetailMovie />} />
            <Route exact path="/watch/:movieId" element={<WatchMovie />} />
            <Route exact path="/userInfo/" element={<User />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
