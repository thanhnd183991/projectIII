const multer = require("multer");
const { v4 } = require("uuid");
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
    // if (file.mimetype.includes("image")) {
    //   cb(null, "./uploads/images");
    // } else if (file.mimetype.includes("video")) {
    //   cb(null, "./uploads/videos");
    // }
  },
  filename: (req, file, cb) => {
    // console.log("diskStorage name file: ", file);
    const uid = v4();
    const tailFile = file.originalname.match(/\.[0-9a-z]+$/i)[0];
    let filename = `${Date.now()}-${file.fieldname}-${uid}${tailFile}`;
    // console.log("disk ", filename);
    cb(null, filename);
  },
});

let upload = multer({
  storage,
  limit: { fileSize: 1000000 * 100 },
}).any();

module.exports = { upload };
