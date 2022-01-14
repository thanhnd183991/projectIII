import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import {
  CreateMovie,
  CreateSeries,
  ListSeries,
  Login,
  Movie,
  Movies,
  MyAccount,
  Series,
  User,
  Users,
} from "./pages";
const REACT_APP_SOCKET_ENDPOINT = "http://localhost:5000";
export const socket = io(REACT_APP_SOCKET_ENDPOINT);
export const userSocket = io(`${REACT_APP_SOCKET_ENDPOINT}/user`);

function App() {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route exact path="/" element={<Users />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/series" element={<ListSeries />} />
        <Route exact path="/user/:id" element={<User />} />
        <Route exact path="/movie/:id" element={<Movie />} />
        <Route exact path="/movie/create" element={<CreateMovie />} />
        <Route exact path="/user/create" element={<User />} />
        <Route exact path="/series/:id" element={<Series />} />
        <Route exact path="/series/create" element={<CreateSeries />} />
        <Route exact path="/account" element={<MyAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
