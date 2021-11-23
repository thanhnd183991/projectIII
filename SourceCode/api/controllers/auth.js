const User = require("../models/User");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const { v4 } = require("uuid");
const sendEmail = require("../utils/sendEmail.js");
const redis = require("../config/redis.js");
const { FORGOT_PASSWORD_PREFIX } = require("../constants.js");
const validateRegister = require("../utils/validateRegister");
//REGISTER
const register = async (req, res) => {
  const error = validateRegister(
    req.body.username,
    req.body.email,
    req.body.password
  );
  if (error) {
    return res.status(500).json({ error });
  }
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });

  if (user) {
    res.status(500).json({ success: false, message: "User already exists" });
    return;
  }
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: await argon2.hash(req.body.password),
  });
  try {
    const {
      _doc: { username, email, _id },
    } = await newUser.save();
    res.status(201).json({ success: true, username, email, _id });
  } catch (err) {
    res.status(500).json(err);
  }
};

//LOGIN
const login = async (req, res) => {
  const error = validateRegister(null, req.body.email, req.body.password);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json({ success: false, message: "Wrong email!" });
      return;
    }

    const isTruePassword = await argon2.verify(
      user.password,
      req.body.password
    );

    if (!isTruePassword) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong password!" });
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, createdAt, updatedAt, ...info } = user._doc;

    res.status(200).json({ success: true, ...info, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};

//FORGOT_PASSWORD
const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json("Wrong password or username!");
  }
  const rs = await sendEmail(req.body.email, user._id);
  // console.log("rs", rs);
  if (rs !== "OK") {
    return res.status(500).json({ success: false, message: rs });
  }
  return res
    .status(200)
    .json({ success: true, message: "please check your mail!" });
};

//CHANGE-PASSWORD
const changePassword = async (req, res) => {
  const { password, token } = req.body;

  const payload = await redis.get(FORGOT_PASSWORD_PREFIX + token);
  if (payload) {
    const hashPassword = await argon2.hash(password);
    await User.findByIdAndUpdate(payload, { password: hashPassword });
    await redis.del(FORGOT_PASSWORD_PREFIX + token);
    res.status(200).json({ success: true, message: "password updated" });
  } else {
    return res.json({ success: false, message: "wrong something" });
  }
};
module.exports = { register, login, forgotPassword, changePassword };
