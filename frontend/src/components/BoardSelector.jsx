import { motion } from "framer-motion";

function BoardSelector({ selectedBoard, setSelectedBoard }) {
  const boards = ["CBSE", "ICSE", "State"];

  return (
    <div className="space-y-6 mt-8">
      <h2 className="text-2xl font-bold text-white">
        Select Board
      </h2>

      <div className="flex gap-6 flex-wrap">
        {boards.map((board) => (
          <motion.div
            key={board}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedBoard(board)}
            className={`cursor-pointer px-6 py-4 rounded-2xl backdrop-blur-md shadow-xl transition
              ${
                selectedBoard === board
                  ? "bg-purple-600 text-white"
                  : "bg-white/20 text-white"
              }`}
          >
            {board}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default BoardSelector;