const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    data: [
      {
        times: { type: Number, default: 0 },
        content: String,
        type: {
          type: String,
          enum: ["like", "comment", "none"],
          default: "none",
        },
        movie: { type: mongoose.Schema.ObjectId, ref: "Movie" },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
