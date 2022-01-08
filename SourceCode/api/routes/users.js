const router = require("express").Router();
const {
  updateUser,
  deleteUser,
  findUser,
  allUsers,
  getUserStats,
  searchUsers,
} = require("../controllers/users.js");
const { isAuth, isAdmin } = require("../middlewares/verifyIdentity");

router.put("/:id", isAuth, updateUser);

router.delete("/:id", isAuth, isAdmin, deleteUser);

//GET

router.get("/find/:id", isAuth, findUser);

//GET ALL
router.get("/", isAuth, isAdmin, allUsers);

//SEARCH
router.get("/search", isAuth, isAdmin, searchUsers);

//GET USER STATS
router.get("/stats", isAuth, isAdmin, getUserStats);

module.exports = router;
