const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Body parser (VERY IMPORTANT)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// ✅ DB Connection
require("./config/db");

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/classes", require("./routes/classRoutes"));
app.use("/api/subjects", require("./routes/subjectRoutes"));
app.use("/api/fees", require("./routes/feeRoutes"));
app.use("/api/tests", require("./routes/testRoutes"));
app.use("/api/enrollments", require("./routes/enrollmentRoutes"));
app.use("/api/results", require("./routes/resultRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// ✅ Import Auth Middleware
const authMiddleware = require("./middleware/authMiddleware");

// ✅ Test route
app.get("/", (req, res) => {
  res.send("🚀 SmartEdu Backend Running");
});

// ✅ Protected route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed successfully",
    user: req.user
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});