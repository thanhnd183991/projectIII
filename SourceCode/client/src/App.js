import React, { useState } from "react";
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
  const [user, setUser] = useState(false);
  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <Router>
          <Navbar user={user} setUser={setUser} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login setUser={setUser} />} />
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
