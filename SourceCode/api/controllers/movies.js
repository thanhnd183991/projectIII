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

// json response
// statusCode
// data
// errors: []

//CREAT
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
        limit: req.body.limit,
        isSeries: req.body.isSeries,
      });

      movieFiles.forEach((file) => {
        // console.log("now", file);
        newMovie[
          file.fieldname
        ] = `${process.env.APP_BASE_URL}/api/files?${file.fieldname}=${file.filename}`;
      });

      try {
        const saveMovie = await newMovie.save();
        console.log(saveMovie);
        res
          .status(201)
          .json({ data: convertId(saveMovie), statusCode: 201, errors: null });
      } catch (err) {
        res.json({
          statusCode: 500,
          errors: [{ field: "server", message: err.message }],
        });
      }
    }
  });
};

//UPDATE

const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ statusCode: 200, data: convertId(updatedMovie), errors: null });
  } catch (err) {
    return res.json({
      statusCode: 500,
      errors: [{ field: "server", message: err.message }],
    });
  }
};

//DELETE

const deleteMovie = async (req, res) => {
  try {
    const rs = await Movie.findByIdAndDelete(req.params.id);
    if (!rs) {
      return res.json({
        statusCode: 404,
        errors: [{ field: "id", message: "không tim thấy phim" }],
      });
    }
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

//GET

const getMovie = async (req, res) => {
  // console.log(req.params.id);
  try {
    const movie = await Movie.findById(req.params.id);
    // const movie = await Movie.find({ title: req.query.title }).exec();
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
  let movies;
  try {
    if (type === "series") {
      movies = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 10 } },
      ]);
    } else {
      movies = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 10 } },
      ]);
    }
    console.log(typeof movies);
    res.status(200).json({ statusCode: 200, data: convertIdArray(movies) });
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

const likeMovie = async (req, res) => {
  // console.log(req.user);
  const { id: userID } = req.user;
  const { id: movieID } = req.params;
  const user = await User.findById(userID);
  if (user) {
    const userLike = {
      id: userID,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    };
    let movie = await Movie.findById(movieID);
    // console.log(movie);

    if (movie) {
      if (movie.likes.length === 0) {
        movie.likes.push(userLike);
        movie = await movie.save();
        // console.log("moive", movie);
        return res
          .status(200)
          .json({ statusCode: 200, data: convertId(movie) });
      } else {
        const result = movie.likes.find(({ id }) => id === userLike.id);
        console.log(result.id);
        if (result.id) {
          movie.likes = movie.likes.filter(
            ({ id }) => String(id) !== String(userLike.id)
          );
        } else {
          movie.likes.push(userLike);
        }
        movie = await movie.save();
        // console.log("moive", movie);
        return res
          .status(200)
          .json({ statusCode: 200, data: convertId(movie) });
      }
    } else {
      res.json({
        statusCode: 404,
        errors: [{ field: "movieId", message: "movie not found" }],
      });
    }
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
  const user = await User.findById(userID);
  if (user) {
    const userComment = {
      id: userID,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    };
    const customComment = {
      user: userComment,
      comment: req.body.comment,
      prevCommentId: req.body.previousCommentId
        ? req.body.prevCommentId
        : "root",
    };
    let movie = await Movie.findById(movieID);
    // console.log(movie);

    if (movie) {
      if (movie.comments.length === 0) {
        movie.comments.push(customComment);
        movie = await movie.save();
        // console.log("moive", movie);
        return res
          .status(200)
          .json({ statusCode: 200, data: convertId(movie) });
      } else {
        const result = movie.comments.find(
          ({ user }) => user.id === userComment.id
        );
        if (result.id) {
          movie.comments = movie.comments.filter(
            ({ user }) => String(user.id) !== String(userComment.id)
          );
        } else {
          movie.comments.push(customComment);
        }
        movie = await movie.save();
        // console.log("moive", movie);
        return res
          .status(200)
          .json({ statusCode: 200, data: convertId(movie) });
      }
    } else {
      res.json({
        statusCode: 404,
        errors: [{ message: "movie not found", field: "movieId" }],
      });
    }
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
  commentMovie,
};
