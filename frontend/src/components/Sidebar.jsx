import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiBook,
  FiTrendingUp,
  FiCheckSquare,
  FiMenu,
  FiX,
  FiSettings,
  FiLogOut,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";
import { useLayout } from "../context/LayoutContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Sidebar() {
  const location = useLocation();
  const { isOpen, toggleSidebar, isMobile, setIsOpen } = useLayout();
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  const mainMenuItems = [
    { name: "Dashboard", path: "/dashboard", icon: FiHome },
    { name: "Subjects", path: "/subjects", icon: FiBook },
    { name: "Tests", path: "/tests", icon: FiCheckSquare },
    { name: "Results", path: "/results", icon: FiTrendingUp },
  ];

  const secondaryMenuItems = [
    { name: "Profile", path: "/profile", icon: FiUser },
    { name: "Messages", path: "/messages", icon: FiMessageSquare },
    { name: "Settings", path: "/settings", icon: FiSettings },
  ];

  const isActive = (path) => location.pathname === path;

  const SidebarContent = () => (
    <>
      {/* Logo Section */}
      <div className="flex items-center justify-between h-20 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          {isOpen && (
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-sm">
                SmartEdu
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Learning
              </p>
            </div>
          )}
        </div>
        {isMobile && (
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 mb-4 uppercase tracking-wider">
          {isOpen ? "Main Menu" : ""}
        </p>
        {mainMenuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          const isProtected = ["Subjects", "Tests", "Results"].includes(item.name);
          const canAccess = isAuthenticated || !isProtected;

          return (
            <button
              key={item.path}
              onClick={() => {
                if (canAccess) {
                  navigate(item.path);
                  if (isMobile) setIsOpen(false);
                } else {
                  toast.error("Please login to access this section");
                  navigate("/login");
                }
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group text-left ${
                canAccess
                  ? active
                    ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  : "text-gray-400 dark:text-gray-600 opacity-50 cursor-not-allowed"
              }`}
              title={!isOpen ? item.name : ""}
              disabled={!canAccess}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && (
                <>
                  <span className="font-medium text-sm">{item.name}</span>
                  {active && (
                    <div className="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400 ml-auto"></div>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Secondary Menu */}
      <nav className="px-3 py-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 mb-4 uppercase tracking-wider">
          {isOpen ? "Settings" : ""}
        </p>
        {secondaryMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => isMobile && setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              title={!isOpen ? item.name : ""}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="font-medium text-sm">{item.name}</span>}
            </Link>
          );
        })}

        {/* Logout Button */}
        <button
          onClick={() => {
            logout();
            navigate("/login");
            if (isMobile) setIsOpen(false);
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
        >
          <FiLogOut className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span className="font-medium text-sm">Logout</span>}
        </button>
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isMobile ? (isOpen ? "100%" : 0) : isOpen ? 260 : 80,
          x: isMobile ? (isOpen ? 0 : "-100%") : 0,
        }}
        transition={{ duration: 0.3, type: "tween" }}
        className="fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 flex flex-col overflow-hidden w-80"
      >
        <SidebarContent />
      </motion.aside>

      {/* Toggle Button (Desktop) */}
      {!isMobile && (
        <motion.button
          onClick={toggleSidebar}
          className="fixed left-2 bottom-4 z-40 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          title="Toggle sidebar"
        >
          <FiMenu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </motion.button>
      )}
    </>
  );
}

export default Sidebar;