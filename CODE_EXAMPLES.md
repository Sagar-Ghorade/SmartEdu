# SmartEdu Development Code Examples

This document contains ready-to-use code snippets for implementing the next features.

---

## 1. Enhanced Enrollment Form Component

**File:** `frontend/src/components/EnrollmentForm.jsx`

```jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronRight, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import API from "../services/api";

function EnrollmentForm({ onEnrollmentSuccess }) {
  const [step, setStep] = useState(1);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [fee, setFee] = useState(0);
  const [loading, setLoading] = useState(false);

  // Step 1: Fetch classes
  const handleClassSelect = async (classId) => {
    setSelectedClass(classId);
    setLoading(true);
    try {
      const res = await API.get(`/subjects?classId=${classId}`);
      setSubjects(res.data);
      setStep(2);
    } catch (error) {
      toast.error("Failed to load subjects");
    }
    setLoading(false);
  };

  // Step 2: Handle subject selection
  const toggleSubject = (subjectId) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  // Step 3: Calculate fee and confirm
  const handleConfirmEnrollment = async () => {
    setLoading(true);
    try {
      for (const subjectId of selectedSubjects) {
        await API.post("/enrollments", {
          class_id: selectedClass,
          subject_id: subjectId,
          enrollment_type: "Subject",
        });
      }
      toast.success("Enrolled successfully!");
      onEnrollmentSuccess?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Enrollment failed");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= s
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`h-1 w-16 mx-2 ${
                  step > s ? "bg-primary-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select Class */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-xl font-bold mb-4">Select Your Class</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3].map((classId) => (
              <button
                key={classId}
                onClick={() => handleClassSelect(classId)}
                className="p-4 border-2 border-gray-300 rounded-lg hover:border-primary-600 transition-colors text-left"
              >
                <p className="font-semibold">Class {classId === 1 ? "1st" : classId === 2 ? "10th" : "12th"}</p>
                <p className="text-sm text-gray-500">CBSE, ICSE, STATE</p>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step 2: Select Subjects */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-xl font-bold mb-4">Select Subjects</h2>
          <div className="space-y-3">
            {subjects.map((subject) => (
              <label
                key={subject.id}
                className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedSubjects.includes(subject.id)}
                  onChange={() => toggleSubject(subject.id)}
                  className="w-5 h-5"
                />
                <span className="ml-3 font-medium">{subject.subject_name}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setStep(1)}
              className="btn-secondary flex-1"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={selectedSubjects.length === 0}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              Continue <FiChevronRight />
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Confirm Enrollment */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-xl font-bold mb-4">Confirm Enrollment</h2>
          <div className="card p-6 mb-6">
            <div className="space-y-3">
              {selectedSubjects.map((subId) => {
                const subject = subjects.find((s) => s.id === subId);
                return (
                  <div key={subId} className="flex items-center gap-2">
                    <FiCheckCircle className="text-green-600" />
                    <span>{subject?.subject_name}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600">Total Fee</p>
              <p className="text-2xl font-bold text-primary-600">₹{fee.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setStep(2)}
              className="btn-secondary flex-1"
            >
              Back
            </button>
            <button
              onClick={handleConfirmEnrollment}
              disabled={loading}
              className="btn-primary flex-1"
            >
              {loading ? "Enrolling..." : "Confirm Enrollment"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default EnrollmentForm;
```

---

## 2. Test Taker Component

**File:** `frontend/src/components/TestTaker.jsx`

```jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiClock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import API from "../services/api";

function TestTaker({ testId, onSubmit }) {
  const [testData, setTestData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch test details
    const fetchTest = async () => {
      try {
        const res = await API.get(`/tests/${testId}`);
        setTestData(res.data);
        setTimeLeft(res.data.duration_minutes * 60);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load test");
      }
    };
    fetchTest();
  }, [testId]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0 || submitted) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  // Auto-submit when time expires
  useEffect(() => {
    if (timeLeft === 0 && !submitted) {
      handleSubmit();
    }
  }, [timeLeft, submitted]);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Calculate score (simplified: count correct answers)
      const correctCount = Object.values(answers).filter(
        (answer, idx) => answer === testData.questions[idx].correct_answer
      ).length;
      const marks = (correctCount / testData.questions.length) * testData.total_marks;
      const percentage = (marks / testData.total_marks) * 100;

      await API.post("/results", {
        test_id: testId,
        marks_obtained: Math.round(marks),
        percentage: percentage.toFixed(2),
      });

      setSubmitted(true);
      toast.success("Test submitted successfully!");
      onSubmit?.();
    } catch (error) {
      toast.error("Failed to submit test");
    }
    setLoading(false);
  };

  if (loading) return <div className="text-center py-10">Loading test...</div>;

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10"
      >
        <FiCheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Test Submitted!</h2>
        <p className="text-gray-600 mb-6">Your answers have been recorded.</p>
        <button onClick={() => window.location.href = "/results"} className="btn-primary">
          View Results
        </button>
      </motion.div>
    );
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isTimeRunningOut = timeLeft < 300; // 5 minutes

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header with Timer */}
      <div className="flex justify-between items-center mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h1 className="text-2xl font-bold">{testData?.test_name}</h1>
        <div
          className={`flex items-center gap-2 text-lg font-bold ${
            isTimeRunningOut ? "text-red-600" : "text-gray-700"
          }`}
        >
          <FiClock />
          {minutes}:{seconds.toString().padStart(2, "0")}
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6 mb-8">
        {testData?.questions?.map((question, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="card p-6"
          >
            <h3 className="font-bold mb-4">
              Q{idx + 1}. {question.question_text}
            </h3>
            <div className="space-y-3">
              {["A", "B", "C", "D"].map((option) => (
                <label key={option} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${idx}`}
                    value={option}
                    checked={answers[idx] === option}
                    onChange={() => handleAnswerChange(idx, option)}
                    className="w-5 h-5"
                  />
                  <span>{question[`option_${option.toLowerCase()}`]}</span>
                </label>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn-primary flex-1 py-4 text-lg"
        >
          {loading ? "Submitting..." : "Submit Test"}
        </button>
      </div>

      {/* Confirmation */}
      <p className="text-sm text-gray-500 text-center mt-4">
        ⚠️ You cannot change answers after submission
      </p>
    </div>
  );
}

export default TestTaker;
```

---

## 3. Admin Dashboard Component

**File:** `frontend/src/pages/AdminDashboard.jsx`

```jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiUsers, FiBook, FiEdit2, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import API from "../services/api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, classesRes] = await Promise.all([
        API.get("/users"),
        API.get("/classes"),
      ]);
      setUsers(usersRes.data);
      setClasses(classesRes.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Delete user?")) return;
    try {
      await API.delete(`/users/${userId}`);
      setUsers(users.filter((u) => u.id !== userId));
      toast.success("User deleted");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-200">
        {["users", "classes", "analytics"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              activeTab === tab
                ? "border-primary-600 text-primary-600"
                : "border-transparent text-gray-500"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Users Tab */}
      {activeTab === "users" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="overflow-x-auto card">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Role</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-3">{user.name}</td>
                    <td className="px-6 py-3">{user.email}</td>
                    <td className="px-6 py-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-3 flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Classes Tab */}
      {activeTab === "classes" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="grid md:grid-cols-2 gap-6">
            {classes.map((cls) => (
              <div key={cls.id} className="card p-6">
                <h3 className="text-lg font-bold">{cls.class_name}</h3>
                <p className="text-gray-600">{cls.board}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6 text-center">
              <FiUsers className="w-8 h-8 mx-auto mb-2 text-primary-600" />
              <p className="text-gray-600">Total Users</p>
              <p className="text-3xl font-bold">{users.length}</p>
            </div>
            <div className="card p-6 text-center">
              <FiBook className="w-8 h-8 mx-auto mb-2 text-secondary-600" />
              <p className="text-gray-600">Total Classes</p>
              <p className="text-3xl font-bold">{classes.length}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default AdminDashboard;
```

---

## 4. Backend Endpoint Examples

### Add to `backend/controllers/userController.js`

```javascript
// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query(
      "SELECT id, name, email, role, created_at FROM users LIMIT 100"
    );
    res.json(users);
  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "User deleted" });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
```

### Add to `backend/routes/userRoutes.js`

```javascript
const router = require("express").Router();
const { getAllUsers, deleteUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", authMiddleware, adminMiddleware, getAllUsers);
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
```

### Add to `backend/server.js`

```javascript
app.use("/api/users", require("./routes/userRoutes"));
```

---

## 5. Role-Based Route Protection

**File:** `frontend/src/components/ProtectedRoute.jsx` (Enhanced)

```jsx
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole = null }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
```

**Usage in `frontend/src/App.jsx`:**

```jsx
<Route
  path="/admin"
  element={
    <ProtectedRoute requiredRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
```

---

## 6. Enhanced API Service with Error Handling

**Update to `frontend/src/services/api.js`:**

```javascript
// Add retry logic for failed requests
const retryRequest = async (config, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await axiosInstance(config);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
    }
  }
};

// Add method to API for convenience
export const apiWithRetry = {
  get: (url) => retryRequest({ method: "GET", url }),
  post: (url, data) => retryRequest({ method: "POST", url, data }),
  // ... other methods
};

export default API;
```

---

**Last Updated:** Feb 23, 2026  
**Status:** Ready for Copy-Paste Integration
