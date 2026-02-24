const router = require("express").Router();
const { getTestsBySubject, addTest } = require("../controllers/testController");
const authMiddleware = require("../middleware/authMiddleware");

// GET tests by subject
router.get("/:subjectId", getTestsBySubject);

// ADD test (protected)
router.post("/", authMiddleware, addTest);

module.exports = router;