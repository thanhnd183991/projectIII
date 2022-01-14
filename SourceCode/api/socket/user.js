const User = require("../models/User");
// not ideal
let onlineUsers = [];
function onlineCount(userId, socket) {
  const repeated = onlineUsers.find((user) => user.userId === userId);

  if (!repeated) {
    onlineUsers.push({
      userId,
      sessionId: socket.id,
      lastActivity: Date.now(),
    });
    return onlineUsers;
  } else {
    onlineUsers = onlineUsers.map((user) =>
      user.userId === userId ? { ...user, sessionId: socket.id } : user
    );
    return onlineUsers;
  }
}

const userIo = (io) => {
  io.on("connection", async (socket) => {
    console.log("hi");
    socket.emit("online-count", onlineUsers);
    socket.on("user-init", async (userId) => {
      console.log(userId);
      console.log("userinit");
      if (userId) {
        const users = onlineCount(userId, socket);
        io.emit("online-count", users);
        await User.findByIdAndUpdate(userId, {
          status: "online",
        });
      }
    });

    socket.on("sign-in", async (userId) => {
      // console.log("vao sign-in");
      const users = onlineCount(userId, socket);
      await User.findByIdAndUpdate(userId, {
        status: "online",
      });
      // console.log(users);
      io.emit("online-count", users);
    });
    socket.on("sign-out", async (userId) => {
      console.log("vao sign-out");
      await User.findByIdAndUpdate(userId, {
        status: "offline",
        // lastActivity: Date.now(),
      });
      io.emit(
        "online-count",
        onlineUsers.filter((user) => user.sessionId !== socket.id)
      );

      // socket.leave(userId);
    });

    socket.on("userOptedOut", (data) => console.log(data));
    socket.on("disconnect", async () => {
      console.log("user has disconnected");
      const user = onlineUsers.find((u) => u.sessionId === socket.id);
      onlineUsers = onlineUsers.filter((user) => user.sessionId !== socket.id);

      if (user) {
        await User.findByIdAndUpdate(user.userId, {
          status: "offline",
        });
      }
      io.emit("online-count", onlineUsers);
      socket.emit("userDisconnected", "userDisconnected");
    });
  });
};

module.exports = userIo;
