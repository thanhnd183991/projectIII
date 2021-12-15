export const filterMovies = (movies) => {
  let genreSet = new Set();
  let yearSet = new Set();
  if (movies instanceof Array) {
    movies.forEach((movie) => {
      yearSet.add(movie.year);
      movie.genre.split("|").forEach((genre) => {
        genreSet.add(genre);
      });
    });
    let years = Array.from(yearSet);
    years.sort((a, b) => a - b);
    years.unshift("Tất cả");
    let genres = Array.from(genreSet);
    genres.unshift("Tất cả");
    return { years, genres };
  } else return null;
};
