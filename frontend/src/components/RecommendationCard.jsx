import { motion } from "framer-motion";

function RecommendationCard({ average }) {
  let recommendation = "";

  if (average < 60)
    recommendation = "We recommend focusing more on Math & Science.";
  else if (average < 80)
    recommendation = "Try advanced practice tests to improve further.";
  else
    recommendation = "Excellent! Consider Olympiad-level preparation.";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl text-white"
    >
      <h2 className="text-xl font-bold mb-2">🧠 AI Recommendation</h2>
      <p>{recommendation}</p>
    </motion.div>
  );
}

export default RecommendationCard;