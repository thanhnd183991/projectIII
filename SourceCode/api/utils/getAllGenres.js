const allGenres = (genres) => {
  let genreSet = new Set();
  genres.map((genre) => {
    genre.genre.split("|").map((eachGenre) => genreSet.add(eachGenre));
  });
  return Array.from(genreSet);
};

module.exports = allGenres;
