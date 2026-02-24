import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMenu, FiX, FiChevronRight } from "react-icons/fi";

function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Subjects", href: "/subjects" },
    { label: "Tests", href: "/tests" },
    { label: "Results", href: "/results" },
  ];

  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm fixed top-0 left-0 z-50 backdrop-blur-sm">
      <div className="container-max container-padding">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 group-hover:shadow-lg transition-all">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold gradient-text">SmartEdu</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Learning Platform</span>
            </div>
          </Link>

          {/* Center Menu - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Login Button */}
            <Link
              to="/login"
              className="hidden sm:block btn-primary btn-sm"
            >
              Login
            </Link>

            {/* Register Button */}
            <Link
              to="/register"
              className="hidden sm:block btn-outline btn-sm"
            >
              Sign Up
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isOpen ? (
                <FiX className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <FiMenu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden border-t border-gray-100 dark:border-gray-800"
        >
          <div className="py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors group"
              >
                <span className="font-medium">{link.label}</span>
                <FiChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block text-center btn-primary btn-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block text-center btn-outline btn-sm"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}

export default PublicNavbar;