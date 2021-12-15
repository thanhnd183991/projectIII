const router = require("express").Router();
const { sendFile } = require("../controllers/files.js");

router.get("/", sendFile);

module.exports = router;
