const router = require("express").Router();

const { paymentVPN, verifyVnp } = require("../controllers/payment");

router.post("/vnp", paymentVPN);
router.get("/verify-vnp", verifyVnp);

module.exports = router;
