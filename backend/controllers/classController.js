const db = require("../config/db");

// GET ALL CLASSES
exports.getAllClasses = async (req, res) => {
  try {
    // Query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    const sort = req.query.sort || "id";
    const order = req.query.order === "desc" ? "DESC" : "ASC";

    const offset = (page - 1) * limit;

    // Total count for pagination metadata
    const [countResult] = await db.query(
      "SELECT COUNT(*) AS total FROM classes WHERE class_name LIKE ?",
      [`%${search}%`]
    );

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    // Fetch paginated data
    const [classes] = await db.query(
      `SELECT * FROM classes 
       WHERE class_name LIKE ?
       ORDER BY ${sort} ${order}
       LIMIT ? OFFSET ?`,
      [`%${search}%`, limit, offset]
    );

    res.json({
      page,
      limit,
      total,
      totalPages,
      data: classes
    });

  } catch (error) {
    console.error("Get Classes Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ADD CLASS (Admin Only)
exports.addClass = async (req, res) => {
  try {
    const { class_name, board } = req.body;

    if (!class_name || !board) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Prevent duplicate class
    const [existing] = await db.query(
      "SELECT id FROM classes WHERE class_name = ? AND board = ?",
      [class_name, board]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Class already exists" });
    }

    await db.query(
      "INSERT INTO classes (class_name, board) VALUES (?, ?)",
      [class_name, board]
    );

    res.status(201).json({ message: "Class Added Successfully" });

  } catch (error) {
    console.error("Add Class Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};