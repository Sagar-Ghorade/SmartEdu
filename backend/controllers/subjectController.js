const db = require("../config/db");

// ================= GET SUBJECTS BY CLASS =================
exports.getSubjectsByClass = async (req, res) => {
  try {
    const { classId } = req.params;

    const [subjects] = await db.query(
      "SELECT * FROM subjects WHERE class_id = ?",
      [classId]
    );

    res.json(subjects);

  } catch (error) {
    console.error("Get Subjects Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= ADD SUBJECT =================
exports.addSubject = async (req, res) => {
  try {
    const { class_id, subject_name } = req.body;

    if (!class_id || !subject_name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if class exists
    const [classCheck] = await db.query(
      "SELECT id FROM classes WHERE id = ?",
      [class_id]
    );

    if (classCheck.length === 0) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Prevent duplicate subject in same class
    const [existing] = await db.query(
      "SELECT id FROM subjects WHERE class_id = ? AND subject_name = ?",
      [class_id, subject_name]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Subject already exists in this class" });
    }

    await db.query(
      "INSERT INTO subjects (class_id, subject_name) VALUES (?, ?)",
      [class_id, subject_name]
    );

    res.status(201).json({ message: "Subject Added Successfully" });

  } catch (error) {
    console.error("Add Subject Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};