const router = require("express").Router();
const { isAuth, isAdmin } = require("../middlewares/verifyIdentity");
const {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovie,
  getRandomMovie,
  getAllMovies,
  searchMovie,
  viewMovie,
  likeMovie,
  commentMovie,getAllGenres,
  getMoviesByArrayId,
} = require("../controllers/movies.js");
const { upload } = require("../config/diskStorage");

//CREATE

router.post("/", isAuth, isAdmin, createMovie);

//UPDATE

router.put("/:id", isAuth, isAdmin, updateMovie);

//DELETE

router.delete("/:id", isAuth, isAdmin, deleteMovie);
router.post("/getMoviesByArrayId", getMoviesByArrayId);

//GET

router.get("/find/:id", getMovie);

//GET RANDOM

router.get("/random", getRandomMovie);

//SEARCH

router.get("/search", searchMovie);

//GET ALL

router.get("/", getAllMovies);

//GET ALL GENRES

router.get("/genres", getAllGenres);

//VIEW

router.get("/view/:id", isAuth, viewMovie);

//LIKE

router.get("/like/:id", isAuth, likeMovie);

//LIKE

router.get("/comment/:id", isAuth, commentMovie);

//TEST FILE UPLOAD
router.post("/files", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(req.body.title, req.body.desc); // here req.body.title and others will work
      // further code
      res.status(200).json({
        success: true,
        msg: "File Uploaded!",
      });
    }
  });
});

module.exports = router;
