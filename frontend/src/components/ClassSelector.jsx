import { motion } from "framer-motion";

function ClassSelector({ category, selectedClass, setSelectedClass }) {
  if (!category) return null;

  let classes = [];

  if (category === "Primary") classes = [1, 2, 3, 4, 5];
  if (category === "Middle School") classes = [6, 7, 8];
  if (category === "Secondary") classes = [9, 10, 11, 12];

  return (
    <div className="space-y-6 mt-10">
      <h2 className="text-2xl font-bold text-white">
        Select Class
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {classes.map((cls) => (
          <motion.div
            key={cls}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedClass(cls)}
            className={`cursor-pointer p-6 rounded-2xl backdrop-blur-md shadow-xl text-center transition
              ${
                selectedClass === cls
                  ? "bg-green-600 text-white"
                  : "bg-white/20 text-white"
              }`}
          >
            <h3 className="text-xl font-semibold">
              Class {cls}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ClassSelector;