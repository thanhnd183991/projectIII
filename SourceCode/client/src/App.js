import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  SearchMovie,
  DetailMovie,
  WatchMovie,
  ForgotPassword,
} from "./pages";
import Navbar from "./components/Navbar";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <div>
      <CssBaseline />

      <ThemeProvider theme={darkTheme}>
        <Navbar />
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
            <Route exact path="/search" element={<SearchMovie />} />
            <Route exact path="/detail/:id" element={<DetailMovie />} />
            <Route exact path="/watch/:id" element={<WatchMovie />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
