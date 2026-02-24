const db = require("../config/db");

// ================= GET TESTS BY SUBJECT =================
exports.getTestsBySubject = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const [tests] = await db.query(
      "SELECT * FROM tests WHERE subject_id = ?",
      [subjectId]
    );

    res.json(tests);

  } catch (error) {
    console.error("Get Tests Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= ADD TEST =================
exports.addTest = async (req, res) => {
  try {
    const { subject_id, test_type, total_marks } = req.body;

    if (!subject_id || !test_type || !total_marks) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate subject exists
    const [subjectCheck] = await db.query(
      "SELECT id FROM subjects WHERE id = ?",
      [subject_id]
    );

    if (subjectCheck.length === 0) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Prevent duplicate test type for same subject
    const [existing] = await db.query(
      "SELECT id FROM tests WHERE subject_id = ? AND test_type = ?",
      [subject_id, test_type]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Test type already exists for this subject" });
    }

    await db.query(
      "INSERT INTO tests (subject_id, test_type, total_marks) VALUES (?, ?, ?)",
      [subject_id, test_type, total_marks]
    );

    res.status(201).json({ message: "Test Added Successfully" });

  } catch (error) {
    console.error("Add Test Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};