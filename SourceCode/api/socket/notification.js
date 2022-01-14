const User = require("../models/User");
const Movie = require("../models/Movie");
const Notification = require("../models/Notification");
const mongoose = require("mongoose");
// not ideal
const filterUser = (likes, comments) => {
  // console.log(likes, comments);
  let offlineSet = new Set();
  let onlineSet = new Set();
  likes.forEach((user) => {
    if (user.status === "online") {
      onlineSet.add(String(user._id));
    } else {
      offlineSet.add(String(user._id));
    }
  });
  comments.forEach((comment) => {
    if (comment.createdBy.status === "online") {
      onlineSet.add(String(comment.createdBy._id));
    } else {
      offlineSet.add(String(comment.createdBy._id));
    }
  });
  return { onlineSet, offlineSet };
};

const notificationMessage = (times, username, type, movieTitle, data) => {
  if (times > 1) {
    return `Bạn có ||${times} thông báo ||từ phim ||${movieTitle}`;
  } else {
    return `${username} ||đã ${type} phim ||${movieTitle}||${data}`;
  }
};

const notificationIo = (io) => {
  io.on("connection", (socket) => {
    socket.on("enter", async ({ userID }) => {
      socket.join(userID);
      socket.join("home");
      const notification = await Notification.findOne({
        user: userID,
      }).populate({
        path: "data.movie",
        select: "_id title imageSmall",
      });
      if (notification) {
        socket.emit("reEnterNotification", notification.data);
        await notification.delete();
      }
    });

    socket.on("like", async ({ userID, movieID }) => {
      // console.log("userID: " + userID, "movieID" + movieID);
      const userLike = await User.findById(userID);
      const checkMovie = await Movie.findOne({
        _id: movieID,
        likes: { $in: [userID] },
      });
      let movie = {};
      if (checkMovie) {
        movie = await Movie.findByIdAndUpdate(
          movieID,
          {
            $pull: {
              likes: userID,
            },
          },
          { new: true }
        )
          .populate({
            path: "likes",
          })
          .populate({
            path: "comments.createdBy",
          });
      } else {
        movie = await Movie.findByIdAndUpdate(
          movieID,
          {
            $push: {
              likes: userID,
            },
          },
          { new: true }
        )
          .populate({
            path: "likes",
          })
          .populate({
            path: "comments.createdBy",
          });
      }
      //find user online and send notification if user offline save to NotificationModel
      if (movie) {
        const { onlineSet, offlineSet } = filterUser(
          movie.likes,
          movie.comments
        );
        onlineSet.delete(String(userID));

        io.to("home").emit("homeLike", {
          movieID,
          likes: movie.likes,
        });
        // if checkMovie != null ==> dislike add userID dislike to onlineSet
        if (!checkMovie) {
          Array.from(onlineSet).forEach(async (onlineUserId) => {
            if (onlineSet.has(String(onlineUserId))) {
              onlineSet.delete(String(onlineUserId));
              io.to(String(onlineUserId)).emit("haveLike", {
                movieID,
                userID,
                type: "like",
                times: 1,
                createdAt: Date.now(),
                content: notificationMessage(
                  1,
                  userLike.username,
                  "thích",
                  movie.title,
                  ""
                ),
                movie: {
                  _id: movie._id,
                  imageSmall: movie.imageSmall,
                  title: movie.title,
                },
                // likes: movie.likes,
              });
            }
          });
        }

        Array.from(offlineSet).forEach(async (offlineUserId) => {
          offlineSet.delete(String(offlineUserId));
          const notification = await Notification.findOne({
            user: offlineUserId,
          });
          if (notification) {
            const { data } = notification;
            const repeated = data.find((r) => String(r.movie) === movieID);
            if (repeated) {
              const times = repeated.times;
              const noti = await Notification.findOneAndUpdate(
                {
                  _id: notification._id,
                  "data.movie": mongoose.Types.ObjectId(movieID),
                },
                {
                  $set: {
                    "data.$.times": times + 1,
                    "data.$.content": notificationMessage(
                      times + 1,
                      userLike.username,
                      "thích",
                      movie.title,
                      ""
                    ),
                    createdAt: Date.now(),
                  },
                },
                { new: true }
              );
            } else {
              const noti = await Notification.findByIdAndUpdate(
                notification._id,
                {
                  $addToSet: {
                    data: {
                      times: 1,
                      type: "like",
                      content: notificationMessage(
                        1,
                        userLike.username,
                        "thích",
                        movie.title,
                        ""
                      ),
                      movie: mongoose.Types.ObjectId(movieID),
                      createdAt: Date.now(),
                    },
                  },
                },
                { new: true }
              );
            }
          } else {
            await Notification.create({
              user: offlineUserId,
              data: [
                {
                  times: 1,
                  type: "like",
                  content: notificationMessage(
                    1,
                    userLike.username,
                    "thích",
                    movie.title,
                    ""
                  ),
                  movie: movieID,
                  createdAt: Date.now(),
                },
              ],
            });
          }
        });
      }
    });

    socket.on("comment", async ({ userID, movieID, data: dataCmt }, cb) => {
      const user = await User.findById(userID);
      if (user) {
        const movie = await Movie.findByIdAndUpdate(
          movieID,
          {
            $push: {
              comments: {
                data: dataCmt,
                createdBy: mongoose.Types.ObjectId(userID),
                createdAt: Date.now(),
              },
            },
          },
          { new: true }
        )
          .populate({
            path: "comments.createdBy",
          })
          .populate({
            path: "likes",
          });
        if (movie) {
          const { onlineSet, offlineSet } = filterUser(
            movie.likes,
            movie.comments
          );
          onlineSet.delete(userID);

          io.to("home").emit("homeComment", {
            movieID,
            comment: movie.comments[movie.comments.length - 1] || {},
          });

          //online
          Array.from(onlineSet).forEach(async (onlineUserId) => {
            onlineSet.delete(String(onlineUserId));
            io.to(String(onlineUserId)).emit("haveComment", {
              userID,
              movieID,
              times: 1,
              type: "comment",
              createdAt: Date.now(),
              content: notificationMessage(
                1,
                user.username,
                "bình luận",
                movie.title,
                dataCmt
              ),
              movie: {
                _id: movie._id,
                imageSmall: movie.imageSmall,
                title: movie.title,
              },
              // comment: movie.comments[movie.comments.length - 1] || {},
            });
          });

          //offline
          Array.from(offlineSet).forEach(async (offlineUserId) => {
            offlineSet.delete(String(offlineUserId));
            const notification = await Notification.findOne({
              user: offlineUserId,
            });
            if (notification) {
              const { data } = notification;
              // find movie in array data
              const repeated = data.find((r) => String(r.movie) === movieID);
              if (repeated) {
                const times = repeated.times;
                const noti = await Notification.findOneAndUpdate(
                  {
                    _id: notification._id,
                    "data.movie": mongoose.Types.ObjectId(movieID),
                  },
                  {
                    $set: {
                      "data.$.times": times + 1,
                      "data.$.content": notificationMessage(
                        times + 1,
                        user.username,
                        "bình luận",
                        movie.title,
                        dataCmt
                      ),
                      createdAt: Date.now(),
                    },
                  },
                  { new: true }
                );
              } else {
                const noti = await Notification.findByIdAndUpdate(
                  notification._id,
                  {
                    $addToSet: {
                      data: {
                        times: 1,
                        type: "comment",
                        createdAt: Date.now(),
                        content: notificationMessage(
                          1,
                          user.username,
                          "bình luận",
                          movie.title,
                          dataCmt
                        ),
                        movie: mongoose.Types.ObjectId(movieID),
                      },
                    },
                  },
                  { new: true }
                );
              }
            } else {
              await Notification.create({
                user: offlineUserId,
                data: [
                  {
                    times: 1,
                    type: "comment",
                    content: notificationMessage(
                      1,
                      user.username,
                      "bình luận",
                      movie.title,
                      dataCmt
                    ),
                    movie: movieID,
                    createdAt: Date.now(),
                  },
                ],
              });
            }
          });
        } else {
          cb(404, "movie not found");
        }
      }
    });

    socket.on("editMovie", async ({ movieID, oldTitle, username }) => {
      console.log("editMovieAdmin");
      const movie = await Movie.findOne({
        _id: movieID,
      })
        .populate({ path: "likes" })
        .populate({ path: "comments.createdBy" });
      if (movie) {
        const { onlineSet, offlineSet } = filterUser(
          movie.likes,
          movie.comments
        );
        // console.log(onlineSet, offlineSet);
        Array.from(onlineSet).forEach(async (onlineUserId) => {
          if (onlineSet.has(String(onlineUserId))) {
            onlineSet.delete(String(onlineUserId));
            io.to(String(onlineUserId)).emit("adminEditMovie", {
              movieID,
              movieID,
              type: "like",
              times: 1,
              createdAt: Date.now(),
              content: notificationMessage(
                1,
                username,
                "sửa",
                `${
                  oldTitle === movie.title
                    ? oldTitle
                    : oldTitle + " thành " + movie.title
                } `,
                ""
              ),
              movie: {
                _id: movie._id,
                imageSmall: movie.imageSmall,
                title: movie.title,
              },
              // likes: movie.likes,
            });
          }
        });

        Array.from(offlineSet).forEach(async (offlineUserId) => {
          offlineSet.delete(String(offlineUserId));
          const notification = await Notification.findOne({
            user: offlineUserId,
          });
          if (notification) {
            const { data } = notification;
            const repeated = data.find((r) => String(r.movie) === movieID);
            if (repeated) {
              const times = repeated.times;
              const noti = await Notification.findOneAndUpdate(
                {
                  _id: notification._id,
                  "data.movie": mongoose.Types.ObjectId(movieID),
                },
                {
                  $set: {
                    "data.$.times": times + 1,
                    "data.$.content": notificationMessage(
                      times + 1,
                      "",
                      "thích",
                      movie.title,
                      ""
                    ),
                  },
                },
                { new: true }
              );
            } else {
              const noti = await Notification.findByIdAndUpdate(
                notification._id,
                {
                  $addToSet: {
                    data: {
                      times: 1,
                      type: "like",
                      content: notificationMessage(
                        1,
                        username,
                        "sửa",
                        `${
                          oldTitle === movie.title
                            ? oldTitle
                            : oldTitle + " thành " + movie.title
                        } `,
                        ""
                      ),
                      movie: mongoose.Types.ObjectId(movieID),
                    },
                  },
                },
                { new: true }
              );
            }
          } else {
            await Notification.create({
              user: offlineUserId,
              data: [
                {
                  times: 1,
                  type: "like",
                  content: notificationMessage(
                    1,
                    username,
                    "sửa",
                    `${
                      oldTitle === movie.title
                        ? oldTitle
                        : oldTitle + " thành " + movie.title
                    } `,
                    ""
                  ),
                  movie: movieID,
                },
              ],
            });
          }
        });
      }
    });
  });
};

module.exports = notificationIo;
