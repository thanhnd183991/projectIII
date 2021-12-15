const User = require("../models/User");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const { v4 } = require("uuid");
const sendEmail = require("../utils/sendEmail.js");
const redis = require("../config/redis.js");
const { FORGOT_PASSWORD_PREFIX } = require("../constants.js");
const validateRegister = require("../utils/validateRegister");
const { convertId } = require("../utils/convertModel");

// json res co dang:
// {
//   errors:[
// {  field
//   message}
// ]
//
//   statusCode:
//   data
// }

//REGISTER
const register = async (req, res) => {
  const error = validateRegister(
    req.body.username,
    req.body.email,
    req.body.password
  );
  if (error) {
    return res.json({ error, statusCode: 500 });
  }
  const userByUsername = await User.findOne({
    username: req.body.username,
  });

  const userByEmail = await User.findOne({
    email: req.body.email,
  });
  let errors = [];
  if (userByUsername) {
    errors.push({
      field: "username",
      message: "trùng tên",
    });
  }
  if (userByEmail) {
    errors.push({
      field: "email",
      message: "trùng email",
    });
  }
  if (errors.length !== 0) {
    res.json({
      statusCode: 500,
      data: null,
      errors,
    });
    return;
  }
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: await argon2.hash(req.body.password),
  });
  try {
    const {
      _doc: { password, ...info },
    } = await newUser.save();
    const accessToken = jwt.sign(
      { id: info._id, isAdmin: info.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );
    res.status(201).json({
      statusCode: 201,
      data: { ...convertId(info), accessToken },
    });
  } catch (err) {
    return res.json({
      statusCode: 500,
      data: null,
      errors: [
        {
          field: "server",
          message: err.message,
        },
      ],
    });
  }
};

//LOGIN
const login = async (req, res) => {
  const error = validateRegister(null, req.body.email, req.body.password);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.json({
        statusCode: 500,
        data: null,
        errors: [
          {
            field: "email",
            message: "email không đúng",
          },
        ],
      });
      return;
    }

    const isTruePassword = await argon2.verify(
      user.password,
      req.body.password
    );

    if (!isTruePassword)
      return res.json({
        statusCode: 500,
        data: null,
        errors: [
          {
            field: "password",
            message: "mật khẩu không đúng",
          },
        ],
      });

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, createdAt, updatedAt, _id, ...info } = user._doc;

    res.status(200).json({
      statusCode: 200,
      data: { id: _id, ...info, accessToken },
      errors: null,
    });
  } catch (err) {
    return res.json({
      statusCode: 500,
      data: null,
      errors: [
        {
          field: "server",
          message: err.message,
        },
      ],
    });
  }
};

//FORGOT_PASSWORD
const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.json({
      statusCode: 500,
      data: null,
      errors: [
        {
          field: "email",
          message: "email không đúng",
        },
      ],
    });
  }
  const rs = await sendEmail(req.body.email, user._id);
  // console.log("rs", rs);
  if (rs !== "OK") {
    return res.json({
      statusCode: 500,
      data: null,
      errors: [
        {
          field: "server",
          message: "lỗi gửi email ",
        },
      ],
    });
  }
  return res.status(200).json({
    statusCode: 200,
    errors: null,
    data: { message: "check mail của bạn" },
  });
};

//CHANGE-PASSWORD
const changePassword = async (req, res) => {
  const { password, token } = req.body;

  const payload = await redis.get(FORGOT_PASSWORD_PREFIX + token);
  if (payload) {
    const hashPassword = await argon2.hash(password);
    await User.findByIdAndUpdate(payload, { password: hashPassword });
    await redis.del(FORGOT_PASSWORD_PREFIX + token);
    res
      .status(200)
      .json({ statusCode: 200, data: { message: "password updated" } });
  } else {
    return res
      .status(500)
      .json({ statusCode: 500, data: { message: "wrong something" } });
  }
};
module.exports = { register, login, forgotPassword, changePassword };
