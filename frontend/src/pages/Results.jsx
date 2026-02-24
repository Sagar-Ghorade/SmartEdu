import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FiTrendingUp, FiDownload, FiFilter, FiCalendar, FiAward } from "react-icons/fi";

function Results() {
  const [filter, setFilter] = useState("all");

  const subjectResults = [
    { subject: "Physics", score: 92, maxScore: 100, percentage: 92, status: "Excellent" },
    { subject: "Chemistry", score: 85, maxScore: 100, percentage: 85, status: "Good" },
    { subject: "Mathematics", score: 88, maxScore: 100, percentage: 88, status: "Good" },
    { subject: "Biology", score: 78, maxScore: 100, percentage: 78, status: "Average" },
    { subject: "English", score: 80, maxScore: 100, percentage: 80, status: "Good" },
  ];

  const performanceTrend = [
    { week: "Week 1", average: 75 },
    { week: "Week 2", average: 78 },
    { week: "Week 3", average: 82 },
    { week: "Week 4", average: 85 },
    { week: "Week 5", average: 88 },
    { week: "Week 6", average: 86 },
    { week: "Week 7", average: 89 },
  ];

  const strengthWeakness = [
    { name: "Strong", value: 45, color: "#10b981" },
    { name: "Average", value: 35, color: "#f59e0b" },
    { name: "Weak", value: 20, color: "#ef4444" },
  ];

  const topicPerformance = [
    { topic: "Thermodynamics", score: 95 },
    { topic: "Kinematics", score: 88 },
    { topic: "Optics", score: 85 },
    { topic: "Electromagnetism", score: 92 },
    { topic: "Modern Physics", score: 78 },
  ];

  const getStatusColor = (status) => {
    const colors = {
      Excellent: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30",
      Good: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30",
      Average: "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30",
      Poor: "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30",
    };
    return colors[status] || colors.Average;
  };

  const overallScore = Math.round(
    subjectResults.reduce((acc, curr) => acc + curr.percentage, 0) /
      subjectResults.length
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-h2 text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <FiTrendingUp className="w-8 h-8 text-primary-600" />
          Performance Analytics
        </h1>
        <p className="text-body text-gray-600 dark:text-gray-400">
          Track your progress and identify areas for improvement
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid sm:grid-cols-3 gap-4 md:gap-6 mb-8"
      >
        <div className="card bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Overall Score
          </p>
          <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">
            {overallScore}%
          </p>
        </div>
        <div className="card bg-gradient-to-br from-secondary-100 to-secondary-50 dark:from-secondary-900/30 dark:to-secondary-800/20">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Tests Completed
          </p>
          <p className="text-4xl font-bold text-secondary-600 dark:text-secondary-400">
            12
          </p>
        </div>
        <div className="card bg-gradient-to-br from-accent-100 to-accent-50 dark:from-accent-900/30 dark:to-accent-800/20">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Best Score
          </p>
          <p className="text-4xl font-bold text-accent-600 dark:text-accent-400">
            95%
          </p>
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Performance Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 card"
        >
          <h3 className="text-h4 mb-6 text-gray-900 dark:text-white">
            Performance Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }} />
              <Line
                type="monotone"
                dataKey="average"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ fill: "#6366f1", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Strengths & Weaknesses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h3 className="text-h4 mb-6 text-gray-900 dark:text-white text-center">
            Performance Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={strengthWeakness}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {strengthWeakness.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Subject Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="card mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-h4 text-gray-900 dark:text-white">
            Subject-wise Results
          </h3>
          <button className="flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:hover:text-primary-400 font-semibold text-sm">
            <FiDownload className="w-4 h-4" />
            Download Report
          </button>
        </div>

        <div className="space-y-4">
          {subjectResults.map((result, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {result.subject}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {result.score} / {result.maxScore} marks
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {result.percentage}%
                  </p>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-md inline-block ${getStatusColor(
                      result.status
                    )}`}
                  >
                    {result.status}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${result.percentage}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full"
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Topic Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="card"
      >
        <h3 className="text-h4 mb-6 text-gray-900 dark:text-white">
          Topic-wise Performance (Physics)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topicPerformance}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="topic" stroke="#6b7280" angle={-45} textAnchor="end" height={80} />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}
            />
            <Bar dataKey="score" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

export default Results;