const router = require("express").Router();
const {
  createMovie,
  getListMovie,
  updateStatusMovie,
  deleteMovie,
  getAllMovie
} = require("../controllers/movie");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/create", createMovie);
router.get("/list/:type", getListMovie);
router.get('/all', getAllMovie)
router.put("/status", updateStatusMovie);
router.delete("/:mid", deleteMovie);

module.exports = router;
