const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const seriesRoute = require("./routes/series");
const filesRoute = require("./routes/files");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/series", seriesRoute);
app.use("/api/files", filesRoute);

const server = http.createServer(app);

//socket

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
// require("./middlewares/checkTokenInSocket")(io);
const userIo = io.of("/user");

// require("./socket/conversation")(io);
require("./socket/user")(userIo);
require("./socket/notification")(io);

server.listen(5000, () => console.log(`server is running on port 5000`));

module.exports = io;
