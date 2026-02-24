const db = require("../config/db");

// ================= MAKE PAYMENT =================
exports.makePayment = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { enrollment_id, amount_paid } = req.body;

    if (!enrollment_id || !amount_paid) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Check enrollment exists and belongs to user
    const [enrollmentCheck] = await db.query(
      "SELECT id FROM enrollments WHERE id = ? AND user_id = ?",
      [enrollment_id, user_id]
    );

    if (enrollmentCheck.length === 0) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    // Prevent duplicate payment
    const [existing] = await db.query(
      "SELECT id FROM payments WHERE enrollment_id = ?",
      [enrollment_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Payment already completed" });
    }

    await db.query(
      "INSERT INTO payments (user_id, enrollment_id, amount_paid, payment_status) VALUES (?, ?, ?, 'Completed')",
      [user_id, enrollment_id, amount_paid]
    );

    res.status(201).json({ message: "Payment Successful" });

  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= GET MY PAYMENTS =================
exports.getMyPayments = async (req, res) => {
  try {
    const user_id = req.user.id;

    const [payments] = await db.query(`
      SELECT p.*, e.class_id, e.subject_id
      FROM payments p
      JOIN enrollments e ON p.enrollment_id = e.id
      WHERE p.user_id = ?
    `, [user_id]);

    res.json(payments);

  } catch (error) {
    console.error("Get Payments Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};