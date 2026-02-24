import { motion } from "framer-motion";
import { FiMessageSquare, FiSend, FiSearch } from "react-icons/fi";

function Messages() {
  const conversations = [
    {
      id: 1,
      name: "Physics Trainer",
      avatar: "PT",
      lastMessage: "Your test review is ready!",
      time: "2:30 PM",
      unread: 2,
    },
    {
      id: 2,
      name: "Math Mentor",
      avatar: "MM",
      lastMessage: "Great job on the algebra test!",
      time: "Today",
      unread: 0,
    },
    {
      id: 3,
      name: "Student Support",
      avatar: "SS",
      lastMessage: "How can we help you today?",
      time: "Yesterday",
      unread: 0,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-h2 text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <FiMessageSquare className="w-8 h-8 text-primary-600" />
          Messages
        </h1>
        <p className="text-body text-gray-600 dark:text-gray-400">
          Chat with trainers, mentors, and support team
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="card">
            <div className="relative mb-4">
              <FiSearch className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="input-field pl-10"
              />
            </div>

            <div className="space-y-2">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {conv.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {conv.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {conv.lastMessage}
                      </p>
                    </div>
                    {conv.unread > 0 && (
                      <div className="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                        {conv.unread}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Chat Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="card h-96 flex flex-col">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Physics Trainer
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Online now
              </p>
            </div>

            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              <div className="flex items-end gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex-shrink-0" />
                <div className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm max-w-xs">
                  Hi! Your test review is ready
                </div>
              </div>

              <div className="flex items-end gap-2 justify-end">
                <div className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg text-sm max-w-xs">
                  Thanks! Can you help me with the difficult questions?
                </div>
              </div>

              <div className="flex items-end gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex-shrink-0" />
                <div className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm max-w-xs">
                  Of course! Let's schedule a session
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="input-field flex-1"
              />
              <button className="btn-primary btn-sm p-3 flex items-center justify-center">
                <FiSend className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Messages;
