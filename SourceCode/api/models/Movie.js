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
