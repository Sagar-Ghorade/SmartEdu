import { useState } from "react";
import { motion } from "framer-motion";
import { FiPlay, FiClock, FiTarget, FiZap, FiFilter } from "react-icons/fi";

function Tests() {
  const [filter, setFilter] = useState("all");

  const testCategories = [
    {
      id: 1,
      type: "Weekly Test",
      icon: "📅",
      description: "Short weekly assessments",
      duration: "30 mins",
      questions: 25,
      difficulty:  "Easy",
      available: true,
    },
    {
      id: 2,
      type: "Unit Test",
      icon: "📖",
      description: "Chapter-wise unit tests",
      duration: "45 mins",
      questions: 40,
      difficulty: "Medium",
      available: true,
    },
    {
      id: 3,
      type: "Monthly Test",
      icon: "📊",
      description: "Comprehensive monthly exam",
      duration: "90 mins",
      questions: 60,
      difficulty: "Medium",
      available: true,
    },
    {
      id: 4,
      type: "Mock Board Exam",
      icon: "🎯",
      description: "Full-length board level exam",
      duration: "180 mins",
      questions: 100,
      difficulty: "Hard",
      available: false,
    },
  ];

  const completedTests = [
    {
      id: 1,
      name: "Physics Weekly Test - Week 1",
      score: 92,
      status: "Excellent",
      date: "Today",
      time: "2:30 PM",
      attempt: 1,
    },
    {
      id: 2,
      name: "Mathematics Unit Test - Algebra",
      score: 85,
      status: "Good",
      date: "Yesterday",
      time: "3:00 PM",
      attempt: 1,
    },
    {
      id: 3,
      name: "Chemistry Monthly Test - March",
      score: 78,
      status: "Average",
      date: "3 days ago",
      time: "10:00 AM",
      attempt: 1,
    },
    {
      id: 4,
      name: "Biology Unit Test - Cells",
      score: 88,
      status: "Good",
      date: "1 week ago",
      time: "4:15 PM",
      attempt: 2,
    },
  ];

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30",
      Medium: "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30",
      Hard: "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30",
    };
    return colors[difficulty] || colors.Easy;
  };

  const getStatusColor = (status) => {
    const colors = {
      Excellent: "text-green-600 dark:text-green-400",
      Good: "text-blue-600 dark:text-blue-400",
      Average: "text-yellow-600 dark:text-yellow-400",
      Poor: "text-red-600 dark:text-red-400",
    };
    return colors[status] || colors.Average;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-h2 text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <FiTarget className="w-8 h-8 text-primary-600" />
          Test Series
        </h1>
        <p className="text-body text-gray-600 dark:text-gray-400">
          Practice with our comprehensive test series and track your performance
        </p>
      </motion.div>

      {/* Available Tests Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="text-h4 text-gray-900 dark:text-white mb-6">
          Available Tests
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {testCategories.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ translateY: -4 }}
              className={`card cursor-pointer relative group transition-all ${
                !test.available && "opacity-60 pointer-events-none"
              }`}
            >
              <div className="absolute top-4 right-4 text-3xl">
                {test.icon}
              </div>

              <h3 className="text-h4 text-gray-900 dark:text-white mb-2">
                {test.type}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {test.description}
              </p>

              <div className="space-y-2 mb-4 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <FiClock className="w-4 h-4" />
                  <span>{test.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4">📋</span>
                  <span>{test.questions} Questions</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-md ${getDifficultyColor(
                    test.difficulty
                  )}`}
                >
                  {test.difficulty}
                </span>
                {test.available && (
                  <button className="flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                    <FiPlay className="w-4 h-4" />
                    <span className="hidden sm:inline">Start</span>
                  </button>
                )}
                {!test.available && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Coming Soon
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Completed Tests Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-h4 text-gray-900 dark:text-white flex items-center gap-2">
            <FiZap className="w-5 h-5 text-primary-600" />
            Recent Attempts
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                filter === "all"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              All
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {completedTests.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="card"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {test.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {test.date} at {test.time} • Attempt {test.attempt}
                  </p>
                </div>

                <div className="text-right flex items-center gap-4">
                  <div className="text-center">
                    <p
                      className={`text-2xl font-bold ${getStatusColor(
                        test.status
                      )}`}
                    >
                      {test.score}%
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {test.status}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium transition-all"
                  >
                    Review
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Tests;