const User = require("../models/User");
const argon2 = require("argon2");

//UPDATE
const updateUser = async (req, res) => {
  if (req.user?.id === req.params?.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = await argon2.hash(req.body.password);
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ success: false, err });
    }
  } else {
    res
      .status(403)
      .json({ success: false, message: "You can update only your account!" });
  }
};

//DELETE
const deleteUser = async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "User has been deleted..." });
    } catch (err) {
      res.status(500).json({ success: false, message: err });
    }
  } else {
    res
      .status(403)
      .json({ success: false, message: "You can delete only your account!" });
  }
};

//GET
const findUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...info } = user._doc;
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json({ success: false, message: "you are not admin" });
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
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to see all users!");
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
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { updateUser, deleteUser, findUser, allUsers, getUserStats };
