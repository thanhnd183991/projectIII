const Movie = require("../models/Movie");
const splitGenre = (genre) => {
  const sG = genre.split("|");
  return sG;
};
const getRandomSetMovie = async (title) => {
  const randomNumber = Math.ceil(Math.random() * 10) + 1;

  try {
    const movies = await Movie.aggregate([
      { $match: { isSeries: true, idSeries: null } },
      { $sample: { size: randomNumber } },
    ]);
    let genreSet = new Set();
    let idMovies = movies.map((movie) => {
      splitGenre(movie.genre).map((eachGenre) => genreSet.add(eachGenre));
      return movie._id;
    });
    return {
      title,
      genre: Array.from(genreSet).join("|"),
      content: idMovies,
    };
  } catch (err) {
    console.log(err.message);
    return {};
  }
};

module.exports = getRandomSetMovie;
