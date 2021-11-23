const router = require("express").Router();
const { isAuth, isAdmin } = require("../middlewares/verifyIdentity");
const {
  createSeries,
  getSeries,
  deleteSeries,
} = require("../controllers/series");

//CREATE

router.post("/", isAuth, isAdmin, createSeries);

//DELETE

router.delete("/:id", isAuth, isAdmin, deleteSeries);

//GET

router.get("/", getSeries);

module.exports = router;
