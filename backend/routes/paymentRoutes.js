const router = require("express").Router();
const { makePayment, getMyPayments } = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, makePayment);
router.get("/my", authMiddleware, getMyPayments);

module.exports = router;