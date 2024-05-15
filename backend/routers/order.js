const router = require("express").Router();

const {
  createOrder,
  detailOrder,
  allOrder,
  listOrderUser,
} = require("../controllers/order");

router.post("/create", createOrder);
router.get("/detail/:oid", detailOrder);
router.get("/allOrder", allOrder);
router.get("/listOrderUser/:uid", listOrderUser);

module.exports = router;
