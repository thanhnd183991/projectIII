let allGenres;
export const setAllGenres = (movies) => {
  let genreSet = new Set();
  movies.forEach((movie) => {
    movie.genre.split("|").forEach((genre) => {
      genreSet.add(genre);
    });
  });
  allGenres = Array.from(genreSet);
};
export const getAllGenres = (movies) => {
  return allGenres || [];
};
