const db = require("../config/db");

// ================= GET ALL FEES =================
exports.getAllFees = async (req, res) => {
  try {
    const [fees] = await db.query(`
      SELECT f.*, c.class_name, s.subject_name
      FROM fees f
      LEFT JOIN classes c ON f.class_id = c.id
      LEFT JOIN subjects s ON f.subject_id = s.id
    `);

    res.json(fees);

  } catch (error) {
    console.error("Get Fees Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= ADD FEE =================
exports.addFee = async (req, res) => {
  try {
    const { class_id, subject_id, fee_type, fee_amount } = req.body;

    if (!class_id || !fee_type || !fee_amount) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Check if class exists
    const [classCheck] = await db.query(
      "SELECT id FROM classes WHERE id = ?",
      [class_id]
    );

    if (classCheck.length === 0) {
      return res.status(404).json({ message: "Class not found" });
    }

    // If subject_id is provided, validate it
    if (subject_id) {
      const [subjectCheck] = await db.query(
        "SELECT id FROM subjects WHERE id = ? AND class_id = ?",
        [subject_id, class_id]
      );

      if (subjectCheck.length === 0) {
        return res.status(404).json({ message: "Subject not found in this class" });
      }
    }

    // Prevent duplicate fee entry
    const [existing] = await db.query(
      "SELECT id FROM fees WHERE class_id = ? AND subject_id IS NOT DISTINCT FROM ? AND fee_type = ?",
      [class_id, subject_id || null, fee_type]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Fee already defined for this configuration" });
    }

    await db.query(
      "INSERT INTO fees (class_id, subject_id, fee_type, fee_amount) VALUES (?, ?, ?, ?)",
      [class_id, subject_id || null, fee_type, fee_amount]
    );

    res.status(201).json({ message: "Fee Added Successfully" });

  } catch (error) {
    console.error("Add Fee Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};