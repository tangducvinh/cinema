const router = require("express").Router();
const {
  createMovie,
  getListMovie,
  updateStatusMovie,
  deleteMovie,
  getAllMovie,
  getMovie,
  updateMovie,
} = require("../controllers/movie");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/create", createMovie);
router.get("/list/:type", getListMovie);
router.get('/all', getAllMovie)
router.get('/infor/:mid', getMovie)
router.put("/status", updateStatusMovie);
router.put('/update', updateMovie)
router.delete("/:mid", deleteMovie);

module.exports = router;
