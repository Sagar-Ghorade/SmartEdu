const router = require("express").Router();
const { getAllFees, addFee } = require("../controllers/feeController");
const authMiddleware = require("../middleware/authMiddleware");

// Get all fees
router.get("/", getAllFees);

// Add fee (protected)
router.post("/", authMiddleware, addFee);

module.exports = router;