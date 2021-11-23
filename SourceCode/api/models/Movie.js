const mongoose = require("mongoose");
const customUser = mongoose.Schema({
  id: { type: String },
  username: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, default: "" },
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

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    image: { type: String },
    imageTitle: { type: String },
    imageSm: { type: String },
    trailer: { type: String, default: "" },
    video: { type: String, default: "" },
    year: { type: Number },
    limit: { type: String },
    genre: { type: String },
    isSeries: { type: Boolean, default: false },
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

module.exports = mongoose.model("Movie", MovieSchema);
