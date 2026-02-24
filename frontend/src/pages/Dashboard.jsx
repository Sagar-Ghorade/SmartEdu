import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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
import { FiTrendingUp, FiAward, FiCheckCircle, FiZap, FiBook, FiTarget } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  // Mock data
  const stats = [
    { label: "Tests Completed", value: "12", icon: FiCheckCircle, color: "primary" },
    { label: "Average Score", value: "82%", icon: FiTrendingUp, color: "secondary" },
    { label: "Rank", value: "#245", icon: FiAward, color: "accent" },
    { label: "Study Streak", value: "7 days", icon: FiZap, color: "primary" },
  ];

  const performanceData = [
    { name: "Math", score: 85, submitted: 10, total: 10 },
    { name: "Science", score: 78, submitted: 8, total: 10 },
    { name: "English", score: 90, submitted: 9, total: 10 },
    { name: "History", score: 75, submitted: 7, total: 10 },
    { name: "Geography", score: 88, submitted: 9, total: 10 },
  ];

  const chartData = [
    { date: "Mon", performance: 75 },
    { date: "Tue", performance: 80 },
    { date: "Wed", performance: 78 },
    { date: "Thu", performance: 85 },
    { date: "Fri", performance: 88 },
    { date: "Sat", performance: 92 },
    { date: "Sun", performance: 85 },
  ];

  const subjectData = [
    { name: "Science", value: 45, color: "#6366f1" },
    { name: "Math", value: 35, color: "#a855f7" },
    { name: "English", value: 20, color: "#f97316" },
  ];

  const recentTests = [
    { id: 1, name: "Physics - Chapter 5", score: 92, date: "Today", status: "completed" },
    { id: 2, name: "Mathematics - Mock Exam", score: 85, date: "Yesterday", status: "completed" },
    { id: 3, name: "Chemistry - Practice Test", score: 78, date: "2 days ago", status: "completed" },
  ];

  const goals = [
    { id: 1, title: "Complete Physics Chapter", progress: 70, target: "100%" },
    { id: 2, title: "Score 90+ in Math", progress: 85, target: "95%" },
    { id: 3, title: "Finish all Mock Tests", progress: 60, target: "12/20" },
  ];

  const { user } = useAuth();

  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-20">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-h2 text-gray-900 dark:text-white mb-2">
          Welcome back, {user?.name || "Student"}! 👋
        </h1>
        <p className="text-body text-gray-600 dark:text-gray-400">
          Here's your learning dashboard. Keep up the great work!
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8"
      >
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const colorClasses = {
            primary: "from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 text-primary-600 dark:text-primary-400",
            secondary: "from-secondary-100 to-secondary-50 dark:from-secondary-900/30 dark:to-secondary-800/20 text-secondary-600 dark:text-secondary-400",
            accent: "from-accent-100 to-accent-50 dark:from-accent-900/30 dark:to-accent-800/20 text-accent-600 dark:text-accent-400",
          };

          return (
            <motion.div
              key={idx}
              whileHover={{ translateY: -4 }}
              className={`card bg-gradient-to-br ${colorClasses[stat.color]}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    {stat.label}
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <Icon className="w-8 h-8 opacity-50" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 card"
        >
          <h3 className="text-h4 mb-6 text-gray-900 dark:text-white">
            Weekly Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" dark="#374151" />
              <XAxis dataKey="date" stroke="#6b7280" dark="#9ca3af" />
              <YAxis stroke="#6b7280" dark="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="performance"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ fill: "#6366f1", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Subject Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h3 className="text-h4 mb-6 text-gray-900 dark:text-white text-center">
            Subject Focus
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={subjectData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {subjectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Subject Performance & Recent Tests */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Subject Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h3 className="text-h4 mb-6 text-gray-900 dark:text-white">
            Subject Scores
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" dark="#374151" />
              <XAxis dataKey="name" stroke="#6b7280" dark="#9ca3af" />
              <YAxis stroke="#6b7280" dark="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="score" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Tests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-h4 text-gray-900 dark:text-white">
              Recent Tests
            </h3>
            <a href="#" className="text-primary-600 hover:text-primary-700 dark:hover:text-primary-400 text-sm font-semibold">
              View All →
            </a>
          </div>
          <div className="space-y-3">
            {recentTests.map((test) => (
              <div
                key={test.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {test.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {test.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary-600 dark:text-primary-400">
                    {test.score}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Learning Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="card"
      >
        <div className="flex items-center gap-2 mb-6">
          <FiTarget className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h3 className="text-h4 text-gray-900 dark:text-white">
            Learning Goals
          </h3>
        </div>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="space-y-2">
              <div className="flex items-end justify-between">
                <p className="font-medium text-gray-900 dark:text-white">
                  {goal.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {goal.progress}%
                </p>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${goal.progress}%` }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="h-full bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full"
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;