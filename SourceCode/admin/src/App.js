import {
  CreateSeries,
  CreateMovie,
  User,
  Series,
  Users,
  Products,
  Movie,
} from "./pages";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Users />} />
        <Route exact path="/movies" element={<Products movies />} />
        <Route exact path="/series" element={<Products series />} />
        <Route exact path="/user/:id" element={<User />} />
        <Route exact path="/movie/:id" element={<Movie />} />
        <Route exact path="/movie/create" element={<CreateMovie />} />
        <Route exact path="/user/create" element={<User />} />
        <Route exact path="/series/:id" element={<Series />} />
        <Route exact path="/series/create" element={<CreateSeries />} />
      </Routes>
    </Router>
  );
}

export default App;
