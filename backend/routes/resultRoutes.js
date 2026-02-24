const router = require("express").Router();
const { submitResult, getMyResults } = require("../controllers/resultController");
const authMiddleware = require("../middleware/authMiddleware");

// Submit result (protected)
router.post("/", authMiddleware, submitResult);

// Get my results (protected)
router.get("/my", authMiddleware, getMyResults);

module.exports = router;