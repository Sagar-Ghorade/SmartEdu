import { motion } from "framer-motion";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen text-white">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-12 h-12 border-4 border-white border-t-transparent rounded-full"
      />
    </div>
  );
}

export default Loader;