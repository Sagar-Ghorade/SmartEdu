const router = require("express").Router();
const { enrollStudent, getMyEnrollments } = require("../controllers/enrollmentController");
const authMiddleware = require("../middleware/authMiddleware");

// Enroll (protected)
router.post("/", authMiddleware, enrollStudent);

// Get my enrollments (protected)
router.get("/my", authMiddleware, getMyEnrollments);

module.exports = router;