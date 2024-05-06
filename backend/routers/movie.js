const router = require("express").Router();
const {
  createMovie,
  getListMovie,
  updateStatusMovie,
  deleteMovie,
  getAllMovie,
  getMovie,
  updateMovie,
  uploadImage,
} = require("../controllers/movie");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require('../config/cloudinary.config')

router.post("/create", createMovie);
router.get("/list/:type", getListMovie);
router.get('/all', getAllMovie)
router.get('/infor/:mid', getMovie)
router.put("/status", updateStatusMovie);
router.put("/upload-image", uploader.single('file'), uploadImage);
router.put('/update', updateMovie)
router.delete("/:id", deleteMovie);

module.exports = router;
