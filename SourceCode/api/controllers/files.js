const fs = require("fs");
const path = require("path");
const stream = require("stream");

const sendFile = async (req, res) => {
  const { video, trailer, image, imageTitle, imageSmall, avatar } = req.query;
  if (video || trailer) {
    return sendVideo(req, res, video || trailer);
  } else {
    return sendImage(req, res, image || imageTitle || imageSmall || avatar);
  }
};

const sendImage = async (req, res, filePath) => {
  const options = {
    root: path.join(__dirname, "/../uploads/"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };
  // console.log(options);
  res.sendFile(`\\${filePath}`, options, function (err) {
    if (err) {
      return res.json({ errors: [{ field: "server", message: err.message }] });
    }
  });
};

//send Video
const sendVideo = async (req, res, fileId) => {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).json({
      errors: [{ field: "server", message: "Requires Range header" }],
    });
  }

  // get video stats (about 61MB)
  const videoPath = path.join(__dirname, `/../uploads/${fileId}`);
  const videoSize = fs.statSync(videoPath).size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
};
module.exports = { sendFile };
