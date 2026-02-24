import { useState } from "react";
import { motion } from "framer-motion";

function FeeCalculator() {
  const [classLevel, setClassLevel] = useState("");
  const [board, setBoard] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [mode, setMode] = useState("group");

  const subjectList = ["Maths", "Science", "English", "Social", "Computer"];

  const handleSubjectChange = (subject) => {
    if (subjects.includes(subject)) {
      setSubjects(subjects.filter((s) => s !== subject));
    } else {
      setSubjects([...subjects, subject]);
    }
  };

  // 🔹 Base Fee Logic by Class
  let baseFee = 0;
  if (classLevel >= 1 && classLevel <= 5) baseFee = 1500;
  if (classLevel >= 6 && classLevel <= 8) baseFee = 2000;
  if (classLevel >= 9 && classLevel <= 10) baseFee = 3000;
  if (classLevel >= 11 && classLevel <= 12) baseFee = 4000;

  // 🔹 Board Multiplier
  let boardMultiplier = 1;
  if (board === "ICSE") boardMultiplier = 1.1;
  if (board === "State") boardMultiplier = 0.9;

  // 🔹 Subject Fee
  const subjectFee = subjects.length * 500;

  // 🔹 Mode Multiplier
  const modeMultiplier = mode === "individual" ? 1.5 : 1;

  // 🔹 Discount (If more than 3 subjects)
  const discount = subjects.length >= 3 ? 500 : 0;

  const totalFee =
    (baseFee + subjectFee) * boardMultiplier * modeMultiplier - discount;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl text-white"
    >
      <h2 className="text-2xl font-bold mb-6">💰 Advanced Fee Calculator</h2>

      {/* Class Selection */}
      <div className="mb-4">
        <label className="block mb-2">Select Class</label>
        <select
          className="w-full p-2 rounded text-black"
          onChange={(e) => setClassLevel(Number(e.target.value))}
        >
          <option value="">Choose Class</option>
          {[1,2,3,4,5,6,7,8,9,10,11,12].map((cls) => (
            <option key={cls} value={cls}>
              Class {cls}
            </option>
          ))}
        </select>
      </div>

      {/* Board Selection */}
      <div className="mb-4">
        <label className="block mb-2">Select Board</label>
        <select
          className="w-full p-2 rounded text-black"
          onChange={(e) => setBoard(e.target.value)}
        >
          <option value="">Choose Board</option>
          <option value="CBSE">CBSE</option>
          <option value="ICSE">ICSE</option>
          <option value="State">State</option>
        </select>
      </div>

      {/* Subject Selection */}
      <div className="mb-4">
        <label className="block mb-2">Select Subjects</label>
        <div className="grid grid-cols-2 gap-2">
          {subjectList.map((subject) => (
            <button
              key={subject}
              onClick={() => handleSubjectChange(subject)}
              className={`p-2 rounded transition ${
                subjects.includes(subject)
                  ? "bg-green-600"
                  : "bg-white/30"
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      {/* Mode Selection */}
      <div className="mb-4">
        <label className="block mb-2">Mode</label>
        <select
          className="w-full p-2 rounded text-black"
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="group">Group</option>
          <option value="individual">Individual</option>
        </select>
      </div>

      {/* Fee Display */}
      <motion.div
        key={totalFee}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="mt-6 text-xl font-bold"
      >
        Total Fee: ₹ {totalFee > 0 ? totalFee.toFixed(0) : 0}
      </motion.div>

      {discount > 0 && (
        <p className="text-sm mt-2 text-green-300">
          🎉 Multi-subject discount applied (₹500)
        </p>
      )}
    </motion.div>
  );
}

export default FeeCalculator;