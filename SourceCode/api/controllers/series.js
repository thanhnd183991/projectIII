const Series = require("../models/Series");
const getRandomSetMovie = require("../utils/getRandomSetMovie");
//CREATE

const createSeries = async (req, res) => {
  try {
    const newSeries = await Series.create(
      await getRandomSetMovie(req.body.title)
    );
    console.log(newSeries);
    return res.status(200).json(newSeries);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//DELETE

const deleteSeries = async (req, res) => {
  try {
    await Series.findByIdAndDelete(req.params.id);
    res
      .status(201)
      .json({ success: true, message: "The list has been delete..." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//GET

const getSeries = async (req, res) => {
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
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createSeries, deleteSeries, getSeries };
