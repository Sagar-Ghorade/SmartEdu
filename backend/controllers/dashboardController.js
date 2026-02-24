const db = require("../config/db");

// ADMIN DASHBOARD STATS (Async/Await Version)
exports.getDashboardStats = async (req, res) => {
  try {
    const [totalUsers] = await db.query("SELECT COUNT(*) AS count FROM users");
    const [totalStudents] = await db.query("SELECT COUNT(*) AS count FROM users WHERE role = 'student'");
    const [totalClasses] = await db.query("SELECT COUNT(*) AS count FROM classes");
    const [totalSubjects] = await db.query("SELECT COUNT(*) AS count FROM subjects");
    const [totalTests] = await db.query("SELECT COUNT(*) AS count FROM tests");
    const [totalEnrollments] = await db.query("SELECT COUNT(*) AS count FROM enrollments");
    const [totalRevenue] = await db.query("SELECT IFNULL(SUM(amount_paid),0) AS total FROM payments");

    res.json({
      totalUsers: totalUsers[0].count,
      totalStudents: totalStudents[0].count,
      totalClasses: totalClasses[0].count,
      totalSubjects: totalSubjects[0].count,
      totalTests: totalTests[0].count,
      totalEnrollments: totalEnrollments[0].count,
      totalRevenue: totalRevenue[0].total
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};