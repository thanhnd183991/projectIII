const Movie = require("../models/Movie");
const User = require("../models/User");
const { upload } = require("../config/diskStorage");
const deleteFile = require("../utils/deleteFile");
//CREATE

const createMovie = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
    } else {
      // further code
      console.log(req.body.title);
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
        return res
          .status(500)
          .json({ success: false, message: "sorry film is existing" });
      }
      let newMovie = new Movie({
        title: req.body.title,
        desc: req.body.desc,
        genre: req.body.genre,
        year: req.body.year,
        limit: req.body.limit,
        isSeries: req.body.isSeries,
      });

      movieFiles.forEach((file) => {
        newMovie[file.fieldname] = file.path;
      });

      // console.log("new Movie", newMovie);
      try {
        const saveMovie = await newMovie.save();
        res.status(201).json(saveMovie);
      } catch (err) {
        res.status(500).json(err);
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
    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE

const deleteMovie = async (req, res) => {
  try {
    const rs = await Movie.findByIdAndDelete(req.params.id);
    if (!rs) {
      return res
        .status(200)
        .json({ success: false, message: "sorry, the film is not existing" });
    }
    res
      .status(200)
      .json({ success: true, message: "The movie has been deleted..." });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "sorry, the film is not existing" });
  }
};

//GET

const getMovie = async (req, res) => {
  // console.log(req.params.id);
  try {
    const movie = await Movie.findById(req.params.id);
    // const movie = await Movie.find({ title: req.query.title }).exec();
    res.status(200).json(movie);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "sorry the film is not existing" });
  }
};

//GET RANDOM

const getRandomMovie = async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET ALL

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().select({ video: 0 }).limit(20);
    res.status(200).json(movies.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
};

// SEARCH
const searchMovie = async (req, res) => {
  const { q, genre: genreQuery } = req.query;

  let movies = null;
  try {
    if (q) {
      movies = await Movie.find({
        title: { $regex: new RegExp(".*" + q + ".*", "i") },
      })
        .select({ video: 0 })
        .limit(10);
    } else if (genreQuery) {
      movies = await Movie.find({
        genre: { $regex: new RegExp(".*" + genreQuery + ".*", "i") },
      })
        .select({ video: 0 })
        .limit(10);
    }
    return res.status(200).json(movies);
  } catch (error) {
    res.status(403).json({
      success: false,
      message: "something wrong",
    });
  }
};

// VIEW MOVIE

const viewMovie = async (req, res) => {
  Movie.findById(req.params.id, function (err, doc) {
    if (err) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }
    doc.views = doc.views + 1;
    doc.save((err, payload) => {
      if (err)
        return res
          .status(404)
          .json({ success: false, message: "something wrong" });
      else return res.status(200).json(payload);
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
        return res.status(200).json({ success: true, movie });
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
        return res.status(200).json({ success: true, movie });
      }
    } else {
      res.status(400).json({ success: false, messages: "movie not found" });
    }
  } else {
    res.status(400).json({ success: false, messages: "user not found" });
  }
};

// U

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
        return res.status(200).json({ success: true, movie });
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
        return res.status(200).json({ success: true, movie });
      }
    } else {
      res.status(400).json({ success: false, messages: "movie not found" });
    }
  } else {
    res.status(400).json({ success: false, messages: "user not found" });
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
