const db = require("../config/db");

// ================= ENROLL STUDENT =================
exports.enrollStudent = async (req, res) => {
  try {
    const user_id = req.user.id;
    // Support either existing class_id or virtual class_number + board
    const { class_id, class_number, board, subject_id, subject_name, enrollment_type, mode } = req.body;

    let resolvedClassId = class_id || null;

    // If class_id not provided, try to resolve or create by class_number + board
    if (!resolvedClassId) {
      if (!class_number || !board) {
        return res.status(400).json({ message: "Required fields missing: class_id or (class_number + board)" });
      }

      // try to find existing class by board and class_name starting with the number
      const likeName = `${class_number}%`;
      const [found] = await db.query(
        "SELECT id FROM classes WHERE board = ? AND class_name LIKE ? LIMIT 1",
        [board, likeName]
      );
      if (found.length > 0) {
        resolvedClassId = found[0].id;
      } else {
        // insert a new class record for this board and class number
        const className = `${class_number}th`;
        const [ins] = await db.query(
          "INSERT INTO classes (class_name, board) VALUES (?, ?)",
          [className, board]
        );
        resolvedClassId = ins.insertId;
      }
    }

    if (!resolvedClassId || !enrollment_type) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Check if class exists (use resolvedClassId)
    const [classCheck] = await db.query(
      "SELECT id FROM classes WHERE id = ?",
      [resolvedClassId]
    );

    if (classCheck.length === 0) {
      return res.status(404).json({ message: "Class not found" });
    }

    // If subject enrollment, validate subject. Allow creation when subject_name supplied for virtual subjects
    let resolvedSubjectId = subject_id || null;
    if (enrollment_type === "Subject") {
      if (!resolvedSubjectId && !subject_name) {
        return res.status(400).json({ message: "Subject ID or subject_name required for subject enrollment" });
      }

      if (resolvedSubjectId) {
        const [subjectCheck] = await db.query(
          "SELECT id FROM subjects WHERE id = ? AND class_id = ?",
          [resolvedSubjectId, resolvedClassId]
        );

        if (subjectCheck.length === 0) {
          return res.status(404).json({ message: "Subject not found in this class" });
        }
      } else if (subject_name) {
        // try to find subject by name for this class
        const [foundSub] = await db.query(
          "SELECT id FROM subjects WHERE class_id = ? AND subject_name = ? LIMIT 1",
          [resolvedClassId, subject_name]
        );
        if (foundSub.length > 0) resolvedSubjectId = foundSub[0].id;
        else {
          // create subject record
          const [insSub] = await db.query(
            "INSERT INTO subjects (class_id, subject_name) VALUES (?, ?)",
            [resolvedClassId, subject_name]
          );
          resolvedSubjectId = insSub.insertId;
        }
      }
    }

    // Prevent duplicate enrollment
    const [existing] = await db.query(
      "SELECT id FROM enrollments WHERE user_id = ? AND class_id = ? AND subject_id <=> ?",
      [user_id, resolvedClassId, resolvedSubjectId || null]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    const [insEnroll] = await db.query(
      "INSERT INTO enrollments (user_id, class_id, subject_id, enrollment_type) VALUES (?, ?, ?, ?)",
      [user_id, resolvedClassId, resolvedSubjectId || null, enrollment_type]
    );

    res.status(201).json({
      message: "Enrollment Successful",
      enrollmentId: insEnroll.insertId,
      class_id: resolvedClassId,
      subject_id: resolvedSubjectId || null,
    });

  } catch (error) {
    console.error("Enroll Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= GET MY ENROLLMENTS =================
exports.getMyEnrollments = async (req, res) => {
  try {
    const user_id = req.user.id;

    const [enrollments] = await db.query(`
      SELECT e.*, c.class_name, c.board, s.subject_name
      FROM enrollments e
      LEFT JOIN classes c ON e.class_id = c.id
      LEFT JOIN subjects s ON e.subject_id = s.id
      WHERE e.user_id = ?
    `, [user_id]);

    res.json(enrollments);

  } catch (error) {
    console.error("Get Enrollments Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};