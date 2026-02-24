const router = require("express").Router();
const { getDashboardStats } = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Admin only dashboard
router.get("/", authMiddleware, adminMiddleware, getDashboardStats);

module.exports = router;