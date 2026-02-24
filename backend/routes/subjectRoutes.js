const router = require("express").Router();
const { getSubjectsByClass, addSubject } = require("../controllers/subjectController");
const authMiddleware = require("../middleware/authMiddleware");

// GET subjects by class
router.get("/:classId", getSubjectsByClass);

// ADD subject (protected)
router.post("/", authMiddleware, addSubject);

module.exports = router;