import { movieRows } from "../dummyData";
const getAllGenres = () => {
  let genreSet = new Set();
  movieRows.forEach((movie) => {
    movie.genre.split("|").forEach((genre) => {
      genreSet.add(genre);
    });
  });
  return Array.from(genreSet);
};
export const allGenres = getAllGenres();
