import { useState } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiBell, FiSearch, FiLogOut, FiUser, FiSettings, FiMoon, FiSun } from "react-icons/fi";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useLayout } from "../context/LayoutContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleSidebar, isMobile } = useLayout();
  const { darkMode, toggleTheme } = useTheme();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { user, logout } = useAuth();

  // Get page title
  const getPageTitle = () => {
    const pathMap = {
      "/dashboard": "Dashboard",
      "/subjects": "Subjects",
      "/tests": "Tests",
      "/results": "Results",
    };
    return pathMap[location.pathname] || "Dashboard";
  };

  const notifications = [
    {
      id: 1,
      type: "success",
      message: "Math test submitted successfully",
      time: "5 min ago",
    },
    {
      id: 2,
      type: "info",
      message: "New chapter available: Statistics",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "warning",
      message: "Practice test reminder for Physics",
      time: "2 hours ago",
    },
  ];

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="h-16 md:h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <FiMenu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
          )}

          <h1 className="hidden sm:block text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            {getPageTitle()}
          </h1>
        </div>

        {/* Center - Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <FiSearch className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, tests..."
              className="input-field pl-10 py-2 text-sm"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search - Mobile */}
          <button className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <FiSearch className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <FiBell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>

            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-80 card shadow-xl z-50"
              >
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                    >
                      <div className="flex gap-3">
                        <div
                          className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                            notification.type === "success"
                              ? "bg-green-500"
                              : notification.type === "warning"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                          }`}
                        ></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
                  <button className="text-sm text-primary-600 hover:text-primary-700 dark:hover:text-primary-400 font-semibold">
                    View All
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            {darkMode ? (
              <FiSun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <FiMoon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 md:gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold text-sm">
                {(user?.name || "John Doe")
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {user?.name || "John Doe"}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Student"}
                </span>
              </div>
            </button>

            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-64 card shadow-xl z-50"
              >
                {/* Profile Info */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {user?.name || "John Doe"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email || "john@example.com"}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    {user?.role ? `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} • Class 10` : "Class 10 • Science & Math"}
                  </p>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <FiUser className="w-4 h-4" />
                    <span className="text-sm">View Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <FiSettings className="w-4 h-4" />
                    <span className="text-sm">Settings</span>
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-gray-200 dark:border-gray-700 p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;