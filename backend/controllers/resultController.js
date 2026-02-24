const db = require("../config/db");

// ================= SUBMIT RESULT =================
exports.submitResult = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { test_id, marks_obtained } = req.body;

    if (!test_id || marks_obtained === undefined) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Check if test exists
    const [testCheck] = await db.query(
      "SELECT total_marks FROM tests WHERE id = ?",
      [test_id]
    );

    if (testCheck.length === 0) {
      return res.status(404).json({ message: "Test not found" });
    }

    const total_marks = testCheck[0].total_marks;

    if (marks_obtained > total_marks) {
      return res.status(400).json({ message: "Marks exceed total marks" });
    }

    // Prevent duplicate result submission
    const [existing] = await db.query(
      "SELECT id FROM results WHERE user_id = ? AND test_id = ?",
      [user_id, test_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Result already submitted" });
    }

    const percentage = ((marks_obtained / total_marks) * 100).toFixed(2);

    await db.query(
      "INSERT INTO results (user_id, test_id, marks_obtained, percentage) VALUES (?, ?, ?, ?)",
      [user_id, test_id, marks_obtained, percentage]
    );

    res.status(201).json({
      message: "Result Submitted Successfully",
      percentage: percentage + "%"
    });

  } catch (error) {
    console.error("Submit Result Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= GET MY RESULTS =================
exports.getMyResults = async (req, res) => {
  try {
    const user_id = req.user.id;

    const [results] = await db.query(`
      SELECT r.*, t.test_type, t.total_marks
      FROM results r
      JOIN tests t ON r.test_id = t.id
      WHERE r.user_id = ?
    `, [user_id]);

    res.json(results);

  } catch (error) {
    console.error("Get Results Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};