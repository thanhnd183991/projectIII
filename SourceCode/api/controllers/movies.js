const Movie = require("../models/Movie");
const User = require("../models/User");
const Series = require("../models/Series");
const { upload } = require("../config/diskStorage");
const deleteFile = require("../utils/deleteFile");
const {
  covertId,
  convertIdArray,
  convertId,
} = require("../utils/convertModel");
const msToHMS = require("../utils/convertTime");
const { getVideoDurationInSeconds } = require("get-video-duration");
const allGenres = require("../utils/getAllGenres");
const mongoose = require("mongoose");
const redis = require("../config/redis.js");
const { ALL_GENRES_REDIS } = require("../constants");

//CREATE
const createMovie = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.json({ errors: [{ field: "server", message: err.message }] });
    } else {
      // further code
      // console.log(req.body.title);
      // console.log(req.files);
      const mviExits = await Movie.find({ title: req.body.title }).exec();
      // console.log("find", mviExits);
      let movieFiles = Object.keys(req.files).map((key) => req.files[key]);
      // console.log(movieFiles);
      if (mviExits.length != 0) {
        let removeFiles = [];
        // console.log(`${__dirname}/../${movieFiles[0].path}`);
        movieFiles.forEach((file) => {
          removeFiles.push(deleteFile(`${__dirname}/../${file.path}`));
        });
        Promise.all(removeFiles)
          .then(() => console.log("remove files success"))
          .catch((err) => console.log(err.message));
        return res.json({
          statusCode: 500,
          errors: [{ field: "title", message: "xin lỗi phim đã tồn tại" }],
        });
      }
      // console.log(movieFiles);
      let newMovie = new Movie({
        title: req.body.title,
        desc: req.body.desc,
        genre: req.body.genre,
        year: req.body.year,
        isSeries: req.body.isSeries,
      });

      let checkVideo = false;
      movieFiles.forEach(async (file) => {
        // console.log("now", file);
        newMovie[
          file.fieldname
        ] = `${process.env.APP_BASE_URL}/api/files?${file.fieldname}=${file.filename}`;
        if (file.fieldname === "video") {
          checkVideo = true;
          await getVideoDurationInSeconds(`${__dirname}/../${file.path}`)
            .then((duration) => {
              console.log("duration ", duration);
              newMovie.duration = msToHMS(duration * 1000);
              return newMovie.save();
            })
            .then((saveMovie) =>
              res.status(201).json({
                data: convertId(saveMovie),
                statusCode: 201,
                errors: null,
              })
            )
            .catch((err) =>
              res.json({
                statusCode: 500,
                errors: [{ field: "server", message: err.message }],
              })
            );
        }
      });

      if (!checkVideo) {
        try {
          newMovie = await newMovie.save();
          return res.status(201).json({
            data: convertId(newMovie),
            statusCode: 201,
            errors: null,
          });
        } catch (err) {
          return res.json({
            statusCode: 500,
            errors: [{ field: "server", message: err.message }],
          });
        }
      }
    }
  });
};

//UPDATE
const updateMovie = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.json({ errors: [{ field: "server", message: err.message }] });
    } else {
      let movie = await Movie.findById(req.params.id);
      const checkMovie = await Movie.findOne({ title: req.body.title });
      let movieFiles = Object.keys(req.files).map((key) => req.files[key]);
      if (checkMovie && checkMovie._id === movie._id) {
        let removeFiles = [];
        movieFiles.forEach((file) => {
          removeFiles.push(deleteFile(`${__dirname}/../${file.path}`));
        });
        Promise.all(removeFiles)
          .then(() => console.log("remove files success"))
          .catch((err) => console.log(err.message));
        return res.json({
          errors: [{ field: "server", message: "trùng tên" }],
        });
      }
      if (movie.length != 0) {
        let removeFiles = [];
        movieFiles.forEach((file) => {
          if (file.fieldname) {
            const myURL = movie[file.fieldname];
            if (myURL) {
              let index = myURL.indexOf("=");
              const myPath = myURL.substring(index + 1);
              // console.log("mypath ", myPath);
              removeFiles.push(deleteFile(`${__dirname}/../uploads/${myPath}`));
            }
          }
        });
        Promise.all(removeFiles)
          .then(() => console.log("remove files success"))
          .catch((err) => console.log(err.message));
      }

      movie.title = req.body.title || movie.title;
      movie.desc = req.body.desc || movie.desc;
      movie.genre = req.body.genre || movie.genre;
      movie.year = req.body.year || movie.year;
      movie.isSeries = req.body.isSeries || movie.isSeries;
      movie.idSeries = req.body.idSeries || movie.idSeries;

      let checkVideo = false;
      movieFiles.forEach(async (file) => {
        movie[
          file.fieldname
        ] = `${process.env.APP_BASE_URL}/api/files?${file.fieldname}=${file.filename}`;
        if (file.fieldname === "video") {
          checkVideo = true;
          await getVideoDurationInSeconds(`${__dirname}/../${file.path}`)
            .then((duration) => {
              movie.duration = msToHMS(duration * 1000);
              // console.log(movie);
              return movie.save();
            })
            .then((updateMovie) =>
              res.status(200).json({
                data: convertId(updateMovie),
                statusCode: 200,
                errors: null,
              })
            )
            .catch((err) =>
              res.json({
                statusCode: 500,
                errors: [{ field: "server", message: err.message }],
              })
            );
        }
      });
      if (!checkVideo) {
        movie.save();
        return res.status(200).json({
          statusCode: 200,
          data: convertId(movie),
          errors: null,
        });
      }
    }
  });
};

//DELETE
const deleteMovie = async (req, res) => {
  try {
    const rs = await Movie.findById(req.params.id);
    if (!rs) {
      return res.json({
        statusCode: 404,
        errors: [{ field: "id", message: "không tim thấy phim" }],
      });
    }
    await rs.delete();
    res.status(200).json({
      statusCode: 200,
      data: { message: "The movie has been deleted..." },
    });
  } catch (err) {
    return res.json({
      statusCode: 500,
      errors: [{ field: "server", message: err.message }],
    });
  }
};

// get list movies by array id
const getMoviesByArrayId = async (req, res) => {
  try {
    let movies = await Movie.find({ _id: { $in: req.body.content } });
    movies = Object.values(movies);
    res.status(200).json({ data: convertIdArray(movies), statusCode: 200 });
  } catch (err) {
    return res.json({
      statusCode: 500,
      errors: [{ field: "server", message: err.message }],
    });
  }
};

//GET
const getMovie = async (req, res) => {
  // console.log(req.params.id);
  try {
    const movie = await Movie.findById(req.params.id)
      .populate({
        path: "comments.createdBy",
      })
      .populate({ path: "likes" });
    // const movie = await Movie.find({ title: req.query.title }).exec();
    movie.comments = movie.comments.reverse();
    if (movie.isSeries) {
      const tmpMovieSeries = await Series.findById(movie?.idSeries);
      movie._doc.movieSeries = tmpMovieSeries;
      stt = tmpMovieSeries.content.findIndex((v) => v === String(movie._id));
      movie._doc.stt = stt + 1;
    }
    // console.log(movie);
    res.status(200).json({ data: convertId(movie), statusCode: 200 });
  } catch (err) {
    return res.json({
      statusCode: 500,
      errors: [{ field: "server", message: err.message }],
    });
  }
};

//GET RANDOM
const getRandomMovie = async (req, res) => {
  const type = req.query.type;
  const limit = req.query.limit;
  // console.log(limit);
  let movies;
  try {
    if (type === "series") {
      movies = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 10 } },
      ]);
    } else if (limit) {
      movies = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: Number(limit) } },
      ]);
    } else {
      movies = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 10 } },
      ]);
    }
    res.status(200).json({ statusCode: 200, data: convertIdArray(movies) });
  } catch (err) {
    return res.json({
      statusCode: 500,
      errors: [{ field: "server", message: err.message }],
    });
  }
};

//GET ALL GENRES
const getAllGenres = async (req, res) => {
  try {
    let data = null;
    if (redis) {
      const payload = await redis.get(ALL_GENRES_REDIS);
      if (payload) {
        console.log(payload);
        data = payload;
        return res.status(200).json({ statusCode: 200, data });
      } else {
        const genres = await Movie.find().select({ genre: 1 });

        data = allGenres(genres).sort(function (a, b) {
          return a.localeCompare(b);
        });
        if (data[0] === "(no genres listed)") {
          data.shift();
          data.push("(no genres listed)");
        }
        // console.log(data);
        await redis.set(
          ALL_GENRES_REDIS,
          data.join("|"),
          "ex",
          1000 * 60 * 60 * 24 * 7 // a week
        );
      }
    } else {
      const genres = await Movie.find().select({ genre: 1 });

      data = allGenres(genres).sort(function (a, b) {
        return a.localeCompare(b);
      });
      if (data[0] === "(no genres listed)") {
        data.shift();
        data.push("(no genres listed)");
      }
    }

    console.log(data);
    res.status(200).json({
      data: data.join("|"),
    });
  } catch (err) {
    return res.json({
      statusCode: 500,
      errors: [{ field: "server", message: err.message }],
    });
  }
};

//GET ALL

const getAllMovies = async (req, res) => {
  try {
    let movies;
    const LIMIT = 8;
    const { hero, views, page } = req.query;
    const startIndex = (Number(page || 1) - 1) * LIMIT; // get the starting index of every page
    let total = 0;
    if (hero) {
      // tim 3 bo phim moi nhat
      movies = await Movie.find().sort({ updatedAt: -1 }).limit(3);
      return res.json({ data: convertIdArray(movies) });
    } else if (views) {
      total = await Movie.countDocuments({});
      movies = await Movie.find()
        .sort({ views: -1 })
        .limit(LIMIT)
        .skip(startIndex);
    } else {
      movies = await Movie.find({ isSeries: false }).sort({ updatedAt: -1 });
    }
    res.status(200).json({
      data: {
        movies: convertIdArray(movies),
        currentPage: Number(page || 1),
        numberOfPages: Math.ceil(total / LIMIT),
        total,
      },
    });
  } catch (err) {
    return res.json({
      statusCode: 500,
      errors: [{ field: "server", message: err.message }],
    });
  }
};

// SEARCH
const searchMovie = async (req, res) => {
  const { q, genre: genreQuery, type, movieId } = req.query;
  let movies = null;
  try {
    if (q) {
      movies = await Movie.find({
        title: { $regex: new RegExp(".*" + q + ".*", "i") },
      });
    } else if (genreQuery) {
      movies = await Movie.find({
        genre: { $regex: new RegExp(".*" + genreQuery + ".*", "i") },
      });
    } else if (type === "movie") {
      movies = await Movie.find({ isSeries: false });
    } else if (type === "series") {
      movies = await Series.find();
    } else if (movieId) {
      const movie = await Movie.findById(movieId);
      if (!movie) {
        return res.json({
          errors: [{ field: "server", message: "Not found movie" }],
        });
      }
      if (movie.isSeries) {
        // dung la series tim het series
        let tmp = [];
        list = await Series.findById(movie.idSeries);
        if (list?.content) {
          list.content.forEach((movieIdOfSeries) => {
            if (String(movieIdOfSeries) !== String(movie._id)) {
              tmp.push(Movie.findById(movieIdOfSeries));
            }
          });
          const rs = await Promise.all(tmp);
          return res.json({ data: convertIdArray(rs) });
        }
      } else {
        // tim theo the loai
        const genreOfMovie = movie.genre.split("|")[0];
        movies = await Movie.find({
          genre: { $regex: new RegExp(".*" + genreOfMovie + ".*", "i") },
        }).limit(10);
        if (movies.length > 10) {
          return res
            .status(200)
            .json({ statusCode: 200, data: convertIdArray(movies) });
        }
      }
    }
    return res
      .status(200)
      .json({ statusCode: 200, data: convertIdArray(movies) });
  } catch (error) {
    res.json({
      statusCode: 500,
      errors: [{ field: "server", message: error.message }],
    });
  }
};

// VIEW MOVIE

const viewMovie = async (req, res) => {
  Movie.findById(req.params.id, function (err, doc) {
    if (err) {
      return res.json({
        statusCode: 404,
        errors: [{ field: "id", message: "phim khôn tìm thấy" }],
      });
    }
    doc.views = doc.views + 1;
    doc.save((err, payload) => {
      if (err)
        return res.json({
          statusCode: 404,
          data: { field: "server", message: "something wrong" },
        });
      else
        return res
          .status(200)
          .json({ statusCode: 200, data: convertId(payload) });
    });
  });
};

// LIKE MOVIE

// const likeMovie = async (req, res) => {
//   // console.log(req.user);
//   const { id: userID } = req.user;
//   const { id: movieID } = req.params;
//   const user = await User.findById(userID);
//   if (user) {
//     const userLike = {
//       id: userID,
//       username: user.username,
//       email: user.email,
//       avatar: user.avatar,
//     };
//     let movie = await Movie.findById(movieID);
//     // console.log(movie);

//     if (movie) {
//       if (movie.likes.length === 0) {
//         movie.likes.push(userLike);
//         movie = await movie.save();
//         // console.log("moive", movie);
//         return res
//           .status(200)
//           .json({ statusCode: 200, data: convertId(movie) });
//       } else {
//         const result = movie.likes.find(({ id }) => id === userLike.id);
//         console.log(result.id);
//         if (result.id) {
//           movie.likes = movie.likes.filter(
//             ({ id }) => String(id) !== String(userLike.id)
//           );
//         } else {
//           movie.likes.push(userLike);
//         }
//         movie = await movie.save();
//         // console.log("moive", movie);
//         return res
//           .status(200)
//           .json({ statusCode: 200, data: convertId(movie) });
//       }
//     } else {
//       res.json({
//         statusCode: 404,
//         errors: [{ field: "movieId", message: "movie not found" }],
//       });
//     }
//   } else {
//     res.json({
//       statusCode: 404,
//       errors: [{ field: "userId", message: "user not found" }],
//     });
//   }
// };

//NEW LIKE
const likeMovie = async (req, res) => {
  // console.log(req.user);
  const { id: userID } = req.user;
  const { id: movieID } = req.params;
  const user = await User.findById(userID);
  if (user) {
    // const userLike = {
    //   id: userID,
    //   username: user.username,
    //   email: user.email,
    //   avatar: user.avatar,
    // };

    const checkMovie = await Movie.findOne({
      _id: movieID,
      likes: { $in: [userID] },
    });
    let movie = {};
    if (checkMovie) {
      movie = await Movie.findByIdAndUpdate(
        movieID,
        {
          $pull: {
            likes: userID,
          },
        },
        { new: true }
      ).populate({
        path: "likes",
      });
    } else {
      movie = await Movie.findByIdAndUpdate(
        movieID,
        {
          $push: {
            likes: userID,
          },
        },
        { new: true }
      )
        .populate({
          path: "likes",
        })
        .populate({
          path: "comments.createdBy",
        });
    }
    return res.json({
      data: convertId(movie),
    });
  } else {
    res.json({
      statusCode: 404,
      errors: [{ field: "userId", message: "user not found" }],
    });
  }
};

// COMMENT

const commentMovie = async (req, res) => {
  const { id: userID } = req.user;
  const { id: movieID } = req.params;
  const { data } = req.query;
  const user = await User.findById(userID);
  if (user) {
    const movie = await Movie.findByIdAndUpdate(
      movieID,
      {
        $push: {
          comments: {
            data: data,
            createdBy: mongoose.Types.ObjectId(userID),
          },
        },
      },
      { new: true }
    )
      .populate({
        path: "comments.createdBy",
      })
      .populate({
        path: "likes",
      });
    if (!movie) {
      return res.json({
        statusCode: 404,
        errors: [{ message: "movie not found", field: "movieId" }],
      });
    }
    return res.json({
      data: convertId(movie),
    });
  } else {
    res.json({
      statusCode: 404,
      errors: [{ message: "user not found", field: "userId" }],
    });
  }
};

module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovie,
  getRandomMovie,
  getAllMovies,
  searchMovie,
  viewMovie,
  likeMovie,
  getAllGenres,
  getMoviesByArrayId,
  commentMovie,
};
