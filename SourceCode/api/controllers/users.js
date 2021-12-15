const User = require("../models/User");
const argon2 = require("argon2");
const { convertId, convertIdArray } = require("../utils/convertModel");
const { upload } = require("../config/diskStorage");
const deleteFile = require("../utils/deleteFile");
const path = require("path");
//UPDATE
const updateUser = async (req, res) => {
  if (req.user?.id === req.params?.id || req.user.isAdmin) {
    upload(req, res, async (err) => {
      if (err) {
        return res.json({
          statusCode: 500,
          errors: [{ field: "server", message: err.message }],
        });
      } else {
        if (req.body?.password) {
          req.body.password = await argon2.hash(req.body.password);
        }
        const user = await User.findOne({ email: req.body.email });
        // console.log(user);
        if (user && String(user._id) !== req.params?.id) {
          return res.json({
            errors: [{ field: "email", message: "email đã tồn tại" }],
          });
        }
        if (req.files[0]) {
          const avatarFile = req.files[0];
          const pathAvatar = `${process.env.APP_BASE_URL}/api/files?${req.files[0].fieldname}=${avatarFile.filename}`;
          req.body.avatar = pathAvatar;
          const user = await User.findById(req.params?.id);
          try {
            if (user.avatar) {
              await deleteFile(
                path.join(
                  __dirname,
                  `/../uploads/${user.avatar?.split("=")[1]}`
                )
              );
            }
          } catch (err) {
            console.log(err.message);
          }
        }
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        const { password, ...info } = convertId(updatedUser);
        res.status(200).json({ statusCode: 200, data: info });
      }
    });
  } else {
    res.json({
      statusCode: 403,
      errrors: [
        { field: "server", message: "You can update only your account!" },
      ],
    });
  }
};

//DELETE
const deleteUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({
        statusCode: 200,
        data: { message: "User has been deleted..." },
      });
    } catch (err) {
      res.json({
        statusCode: 500,
        errors: [{ field: "server", message: err.message }],
      });
    }
  } else {
    res.json({
      statusCode: 403,
      errrors: [
        { field: "server", message: "You can update only your account!" },
      ],
    });
  }
};

//GET
const findUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...info } = convertId(user);
      res.status(200).json({ statusCode: 200, data: info });
    } catch (err) {
      res.json({
        statusCode: 500,
        errors: [{ field: "server", message: err.message }],
      });
    }
  } else {
    return res.json({
      statusCode: 403,
      errros: [{ field: "server", message: "you are not admin" }],
    });
  }
};

//GET ALL
const allUsers = async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await User.find().select({ password: 0 }).sort({ _id: -1 }).limit(5)
        : await User.find().select({ password: 0 });
      return res
        .status(200)
        .json({ statusCode: 200, data: convertIdArray(users) });
    } catch (err) {
      res.json({
        statusCode: 500,
        errors: [{ field: "server", message: err.message }],
      });
    }
  } else {
    return res.json({
      statusCode: 403,
      errros: [{ field: "server", message: "you are not admin" }],
    });
  }
};

//GET USER STATS
const getUserStats = async (req, res) => {
  const today = new Date();
  const latYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    return res.status(200).json({ statusCode: 200, data });
  } catch (err) {
    res.json({
      statusCode: 500,
      errors: [{ field: "server", message: err.message }],
    });
  }
};

module.exports = { updateUser, deleteUser, findUser, allUsers, getUserStats };
