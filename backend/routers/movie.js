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
const { verifyAccessToken, isAdmin, checkRole } = require("../middlewares/verifyToken");
const uploader = require('../config/cloudinary.config')

router.post("/create", verifyAccessToken, checkRole, createMovie);
router.get("/list/:type", getListMovie);
router.get('/all', getAllMovie)
router.get('/infor/:mid', getMovie)
router.put("/status", verifyAccessToken, checkRole, updateStatusMovie);
router.put("/upload-image", uploader.single('file'), uploadImage);
router.put('/update', verifyAccessToken, checkRole, updateMovie)
router.delete("/:id", verifyAccessToken, checkRole, deleteMovie);

module.exports = router;
