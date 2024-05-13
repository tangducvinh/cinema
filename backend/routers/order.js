const router = require("express").Router();

const { createOrder, detailOrder } = require("../controllers/order");

router.post("/create", createOrder);
router.get("/detail/:oid", detailOrder);

module.exports = router;
