const Series = require("../models/Series");
const Movie = require("../models/Movie");
const getRandomSetMovie = require("../utils/getRandomSetMovie");
const { convertId, convertIdArray } = require("../utils/convertModel");
//CREATE

const createSeries = async (req, res) => {
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
    await Series.findByIdAndDelete(req.params.id);
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

//GET

const getSeries = async (req, res) => {
  const q = req.query.q;
  const genreQuery = req.query.genre;
  const seriesId = req.query.seriesId;
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
    } else if (seriesId) {
      list = await Series.findById(seriesId);
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

module.exports = { createSeries, deleteSeries, getSeries };
