const mongoose = require("mongoose");

const SeriesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    genre: { type: String },
    content: { type: Array },
  },
  { timestamps: true }
);
SeriesSchema.method("transform", function () {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});
module.exports = mongoose.model("Series", SeriesSchema);
