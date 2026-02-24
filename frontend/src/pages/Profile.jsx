import { motion } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2 } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "JD";

  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-h2 text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <FiUser className="w-8 h-8 text-primary-600" />
          My Profile
        </h1>
        <p className="text-body text-gray-600 dark:text-gray-400">
          Manage your personal information and account settings
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="card text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
              {initials}
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {user?.name || "John Doe"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {user?.role ? `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} •` : "Student •"} Class 10
            </p>
            <button className="btn-primary btn-sm w-full flex items-center justify-center gap-2">
              <FiEdit2 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </motion.div>

        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              Personal Information
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <FiUser className="w-5 h-5 text-primary-600 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {user?.name || "John Doe"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <FiMail className="w-5 h-5 text-primary-600 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {user?.email || "john@example.com"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <FiPhone className="w-5 h-5 text-primary-600 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FiMapPin className="w-5 h-5 text-primary-600 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">New Delhi, India</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;
