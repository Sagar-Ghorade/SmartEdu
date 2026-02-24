import { useState } from "react";
import { motion } from "framer-motion";
import { FiSettings, FiBell, FiLock, FiGlobe, FiCheck } from "react-icons/fi";

function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    privateProfile: false,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-h2 text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <FiSettings className="w-8 h-8 text-primary-600" />
          Settings
        </h1>
        <p className="text-body text-gray-600 dark:text-gray-400">
          Manage your preferences and account settings
        </p>
      </motion.div>

      <div className="max-w-2xl">
        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-6"
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <FiBell className="w-6 h-6 text-primary-600" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Notifications
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Email Notifications
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive updates and alerts via email
                </p>
              </div>
              <button
                onClick={() => handleToggle("emailNotifications")}
                className={`w-10 h-6 rounded-full transition-colors flex items-center justify-end ${
                  settings.emailNotifications
                    ? "bg-primary-600"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                {settings.emailNotifications && (
                  <FiCheck className="w-4 h-4 text-white mr-1" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Push Notifications
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get real-time updates on your device
                </p>
              </div>
              <button
                onClick={() => handleToggle("pushNotifications")}
                className={`w-10 h-6 rounded-full transition-colors flex items-center justify-end ${
                  settings.pushNotifications
                    ? "bg-primary-600"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                {settings.pushNotifications && (
                  <FiCheck className="w-4 h-4 text-white mr-1" />
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-6"
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <FiLock className="w-6 h-6 text-primary-600" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Privacy & Security
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Private Profile
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Hide your profile from other users
                </p>
              </div>
              <button
                onClick={() => handleToggle("privateProfile")}
                className={`w-10 h-6 rounded-full transition-colors flex items-center justify-end ${
                  settings.privateProfile
                    ? "bg-primary-600"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                {settings.privateProfile && (
                  <FiCheck className="w-4 h-4 text-white mr-1" />
                )}
              </button>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <button className="btn-outline btn-sm w-full">
                Change Password
              </button>
            </div>
          </div>
        </motion.div>

        {/* Language & Region */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <FiGlobe className="w-6 h-6 text-primary-600" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Language & Region
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Language
              </label>
              <select className="input-field">
                <option>English</option>
                <option>Hindi</option>
                <option>Urdu</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Time Zone
              </label>
              <select className="input-field">
                <option>UTC +5:30 (India)</option>
                <option>UTC +0:00 (GMT)</option>
                <option>UTC -5:00 (EST)</option>
              </select>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Settings;
