const mongoose = require("mongoose");
const customUser = mongoose.Schema({
  id: { type: String },
  username: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, default: "" },
});

customUser.method("transform", function () {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

const customComment = mongoose.Schema({
  user: {
    type: customUser,
  },
  comment: {
    type: String,
  },
  prevCommentId: {
    type: String,
    default: "",
  },
  totalChild: {
    type: Number,
    default: 0,
  },
});

customComment.method("transform", function () {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    image: { type: String },
    imageTitle: { type: String },
    imageSmall: { type: String },
    trailer: { type: String, default: "" },
    video: { type: String, default: "" },
    year: { type: Number },
    duration: { type: String },
    genre: { type: String },
    isSeries: { type: Boolean, default: false },
    idSeries: { type: mongoose.ObjectId, default: null },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: [customUser],
      default: [],
    },
    comments: {
      type: [customComment],
      default: [],
    },
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
