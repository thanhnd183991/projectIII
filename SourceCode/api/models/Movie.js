const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, default: null },
    image: { type: String, default: null },
    imageTitle: { type: String, default: null },
    imageSmall: { type: String, default: null },
    trailer: { type: String, default: null },
    video: { type: String, default: null },
    year: { type: Number, default: null },
    duration: { type: String, default: null },
    genre: { type: String, default: null },
    isSeries: { type: Boolean, default: false },
    idSeries: { type: mongoose.ObjectId, default: null },
    views: {
      type: Number,
      default: 0,
    },
    likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    comments: [
      {
        data: String,
        createdBy: { type: mongoose.Schema.ObjectId, ref: "User" },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
  },
  { timestamps: true }
);

MovieSchema.method("transform", function () {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

module.exports = mongoose.model("Movie", MovieSchema);
