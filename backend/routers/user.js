const router = require("express").Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

const {
  register,
  deleteUser,
  login,
  getAllUser,
  refreshToken,
  logout,
  getUser,
  sendNewPassword,
  changePassword,
  updateUser,
} = require("../controllers/user");

// lay thong tin cua toan bo user
router.get("/all", getAllUser);
// lay thong tin cua 1 user
router.get("/infor-user", [verifyAccessToken], getUser);
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);
router.post("/send-password", sendNewPassword);
router.post("/change-password", [verifyAccessToken], changePassword);
router.put('/', updateUser)
router.delete("/:uid", deleteUser);

module.exports = router;
