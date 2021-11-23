const router = require("express").Router();
const {
  register,
  login,
  forgotPassword,
  changePassword,
} = require("../controllers/auth.js");
//REGISTER
router.post("/register", register);

//LOGIN
router.post("/login", login);

//FORGOT-PASSWORD
router.post("/forgot-password", forgotPassword);

//CHANGE-PASSWORD
router.post("/change-password", changePassword);

module.exports = router;
