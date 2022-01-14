const Series = require("../models/Series");
const Movie = require("../models/Movie");
const getRandomSetMovie = require("../utils/getRandomSetMovie");
const { convertId, convertIdArray } = require("../utils/convertModel");
const mongoose = require("mongoose");
//CREATE RANDOM
const createRandomSeries = async (req, res) => {
  try {
    const randomSetMovie = await getRandomSetMovie(req.body.title);
    if (!randomSetMovie.content) {
      return res.json({
        errors: [
          { field: "server", message: "not found movie to create series" },
        ],
      });
    }
    const newSeries = await Series.create(randomSetMovie);
    randomSetMovie?.content.forEach(async (movieId) => {
      await Movie.findByIdAndUpdate(movieId, {
        $set: {
          idSeries: newSeries._id,
        },
      });
    });
    return res
      .status(200)
      .json({ statusCode: 200, data: convertId(newSeries) });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      errros: [{ field: "server", message: err.message }],
    });
  }
};

//DELETE

const deleteSeries = async (req, res) => {
  try {
    const series = await Series.findById(req.params.id);
    if (!series) {
      return res.json({
        errors: [{ field: "server", message: "not found series" }],
      });
    }
    series?.content.forEach(async (movieId) => {
      await Movie.findByIdAndUpdate(movieId, {
        $set: {
          idSeries: null,
          isSeries: false,
        },
      });
    });
    await series.delete();
    res.status(201).json({
      statusCode: 201,
      data: { message: "The list has been delete..." },
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      errros: [{ field: "server", message: err.message }],
    });
  }
};

// GET ALL
const getAllSeries = async (req, res) => {
  try {
    const list = await Series.find();
    res.status(200).json({ statusCode: 200, data: convertIdArray(list) });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      errros: [{ field: "server", message: err.message }],
    });
  }
};

const getSeries = async (req, res) => {
  try {
    let data = {};
    let series = await Series.findById(req.params.id);
    let movies = await Movie.find({ _id: { $in: series.content } });
    data.movies = convertIdArray(movies);
    data.series = convertId(series);
    res.json({ data });
  } catch (err) {
    res.json({ errors: [{ field: "server", message: err.message }] });
  }
};

//Search
const searchSeries = async (req, res) => {
  const q = req.query.q;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (q) {
      if (genreQuery) {
        list = await Series.find({
          $or: [
            {
              title: { $regex: new RegExp(".*" + q + ".*", "i") },
              genre: { $regex: new RegExp(".*" + genreQuery + ".*", "i") },
            },
          ],
        })
          .select({ video: 0 })
          .limit(10);
      } else {
        list = await Series.find({
          title: { $regex: new RegExp(".*" + q + ".*", "i") },
        })
          .select({ video: 0 })
          .limit(10);
      }
    } else if (genreQuery) {
      console.log("vao");
      list = await Series.find({
        genre: { $regex: new RegExp(".*" + genreQuery + ".*", "i") },
      })
        .select({ video: 0 })
        .limit(10);
    } else {
      list = await Series.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json({ statusCode: 200, data: convertIdArray(list) });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      errros: [{ field: "server", message: err.message }],
    });
  }
};

//CREATE
const createSeries = async (req, res) => {
  try {
    // console.log(req.body);
    const checkSeries = await Series.findOne({ title: req.body.title });
    if (checkSeries) {
      return res.json({
        errors: [{ message: "title đã được sử dụng", field: "title" }],
      });
    }
    const series = await Series.create(req.body);
    req.body?.content.forEach(async (movieId) => {
      await Movie.findByIdAndUpdate(movieId, {
        $set: {
          idSeries: series._id,
          isSeries: true,
        },
      });
    });
    return res.status(200).json({ statusCode: 200, data: convertId(series) });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      errros: [{ field: "server", message: err.message }],
    });
  }
};

//UPDATE
const updateSeries = async (req, res) => {
  try {
    // console.log(req.body);
    let series = await Series.findById(req.params.id || req.body.id);
    series.title = req.body.title || series.title;
    const checkSeries = await Series.findOne({ title: series.title });
    // console.log(checkSeries._id, " ", series._id);
    if (checkSeries && String(checkSeries._id) != String(series._id)) {
      return res.json({
        errors: [{ message: "title đã được sử dụng", field: "title" }],
      });
    }
    series.genre = req.body.genre || series.genre;

    series?.content.forEach(async (movieId) => {
      await Movie.findByIdAndUpdate(movieId, {
        $set: {
          idSeries: null,
          isSeries: false,
        },
      });
    });

    req.body?.content.forEach(async (movieId) => {
      await Movie.findByIdAndUpdate(movieId, {
        $set: {
          idSeries: series._id,
          isSeries: true,
        },
      });
    });
    series.content = req.body.content || series.content;
    series.year = req.body.year || series.year;
    series = await series.save();
    res.status(200).json({ statusCode: 200, data: convertId(series) });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      errros: [{ field: "server", message: err.message }],
    });
  }
};

module.exports = {
  createSeries,
  createRandomSeries,
  deleteSeries,
  updateSeries,
  getAllSeries,
  getSeries,
  searchSeries,
};
