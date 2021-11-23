const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, "./uploads/images");
    } else if (file.mimetype.includes("video")) {
      cb(null, "./uploads/videos");
    }
  },
  filename: (req, file, cb) => {
    // console.log("diskStorage name file: ", file);

    let filename = `${Date.now()}-${file.fieldname}-${file.originalname}`;
    cb(null, filename);
  },
});

let upload = multer({
  storage,
  limit: { fileSize: 1000000 * 100 },
}).any();

module.exports = { upload };
