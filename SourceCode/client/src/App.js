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
import { useSelector } from "react-redux";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const { userInfo } = useSelector((state) => state.auth);
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
            <Route exact path="/search" element={<SearchMovie />} />
            <Route exact path="/detail/:movieId" element={<DetailMovie />} />
            <Route
              exact
              path="/watch/:id"
              element={userInfo.id ? <WatchMovie /> : <Login />}
            />
            <Route
              exact
              path="/userInfo/"
              element={userInfo.id ? <User /> : <Login />}
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
