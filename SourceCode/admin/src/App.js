import {
  CreateSeries,
  CreateMovie,
  User,
  Series,
  Users,
  Movies,
  ListSeries,
  Movie,
  Login,
  MyAccount,
} from "./pages";
import { CssBaseline } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./redux/authSlice";

function App() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(login(JSON.parse(localStorage.getItem("userInfo"))));
  }, [dispatch]);

  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route
          exact
          path="/"
          element={
            userInfo?.isAdmin ? <Users /> : <Navigate replace to="/login" />
          }
        />
        <Route
          exact
          path="/users"
          element={
            userInfo?.isAdmin ? <Users /> : <Navigate replace to="/login" />
          }
        />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/movies"
          element={
            userInfo?.isAdmin ? <Movies /> : <Navigate replace to="/login" />
          }
        />
        <Route
          exact
          path="/series"
          element={
            userInfo?.isAdmin ? (
              <ListSeries />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          exact
          path="/user/:id"
          element={
            userInfo?.isAdmin ? <User /> : <Navigate replace to="/login" />
          }
        />
        <Route
          exact
          path="/movie/:id"
          element={
            userInfo?.isAdmin ? <Movie /> : <Navigate replace to="/login" />
          }
        />
        <Route
          exact
          path="/movie/create"
          element={
            userInfo?.isAdmin ? (
              <CreateMovie />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          exact
          path="/user/create"
          element={
            userInfo?.isAdmin ? <User /> : <Navigate replace to="/login" />
          }
        />
        <Route
          exact
          path="/series/:id"
          element={
            userInfo?.isAdmin ? <Series /> : <Navigate replace to="/login" />
          }
        />
        <Route
          exact
          path="/series/create"
          element={
            userInfo?.isAdmin ? (
              <CreateSeries />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          exact
          path="/account"
          element={
            userInfo?.isAdmin ? <MyAccount /> : <Navigate replace to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
