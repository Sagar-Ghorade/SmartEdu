import { motion } from "framer-motion";

function CategorySelector({ selectedCategory, setSelectedCategory }) {
  const categories = [
    {
      name: "Primary",
      description: "Classes 1 – 5 (6–10 years)",
    },
    {
      name: "Middle School",
      description: "Classes 6 – 8 (11–14 years)",
    },
    {
      name: "Secondary",
      description: "Classes 9 – 12 (15–18 years)",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">
        Select Student Category
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.name}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedCategory(category.name)}
            className={`cursor-pointer p-6 rounded-2xl backdrop-blur-md shadow-xl transition 
              ${
                selectedCategory === category.name
                  ? "bg-blue-600 text-white"
                  : "bg-white/20 text-white"
              }`}
          >
            <h3 className="text-xl font-semibold mb-2">
              {category.name}
            </h3>
            <p className="text-sm opacity-80">
              {category.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default CategorySelector;