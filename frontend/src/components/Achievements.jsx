import { motion } from "framer-motion";

function Achievements({ tests }) {
  if (!tests || tests.length === 0) return null;

  const average =
    tests.reduce((acc, item) => acc + item.score, 0) / tests.length;

  const highestScore = Math.max(...tests.map((t) => t.score));

  const badges = [];

  if (average >= 85)
    badges.push("🥇 Top Performer");

  if (tests.length >= 3)
    badges.push("📈 Consistent Performer");

  if (tests.length >= 5)
    badges.push("🔥 Active Learner");

  if (highestScore >= 95)
    badges.push("🎯 High Scorer");

  if (badges.length === 0)
    badges.push("🚀 Keep Going!");

  return (
    <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl">
      <h2 className="text-xl font-semibold mb-4">
        🏆 Achievements
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-purple-600 p-4 rounded-xl text-center font-semibold"
          >
            {badge}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Achievements;