const router = require("express").Router();

const {
  createOrder,
  detailOrder,
  allOrder,
  listOrderUser,
  getDataChart,
} = require("../controllers/order");

router.post("/create", createOrder);
router.get("/detail/:oid", detailOrder);
router.get("/allOrder", allOrder);
router.get("/listOrderUser/:uid", listOrderUser);
router.get('/data-chart/:type', getDataChart)

module.exports = router;
