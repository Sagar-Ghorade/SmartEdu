const router = require("express").Router();
const { getAllClasses, addClass } = require("../controllers/classController");

// GET all classes
router.get("/", getAllClasses);

// ADD new class
router.post("/", addClass);

module.exports = router;