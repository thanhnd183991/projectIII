const router = require("express").Router();
const { isAuth, isAdmin } = require("../middlewares/verifyIdentity");
const {
  createSeries,
  createRandomSeries,
  getSeries,
  getAllSeries,
  updateSeries,
  searchSeries,
  deleteSeries,
} = require("../controllers/series");

//CREATE
router.post("/", isAuth, isAdmin, createSeries);

//CREATE RANDOM
router.post("/random", isAuth, isAdmin, createRandomSeries);

//UPDATE
router.put("/:id", isAuth, isAdmin, updateSeries);

//DELETE
router.delete("/:id", isAuth, isAdmin, deleteSeries);

//GET ALL
router.get("/", getAllSeries);
//SEARCH
router.get("/search", searchSeries);
//GET
router.get("/find/:id", getSeries);

module.exports = router;
