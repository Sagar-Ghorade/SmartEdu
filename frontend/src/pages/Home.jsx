import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiBook,
  FiPieChart,
  FiCheckCircle,
  FiTrendingUp,
  FiUsers,
  FiArrowRight,
  FiPlay,
} from "react-icons/fi";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

function Home() {
  const stats = [
    { number: "250+", label: "Study Programs", icon: FiBook },
    { number: "976+", label: "Students Enrolled", icon: FiUsers },
    { number: "150+", label: "Top Achievers", icon: FiTrendingUp },
    { number: "99.8%", label: "Success Rate", icon: FiCheckCircle },
  ];

  const features = [
    {
      icon: FiBook,
      title: "Smart Learning",
      description:
        "Access comprehensive curriculum from Class 1-12 with expert-curated content and interactive lessons.",
    },
    {
      icon: FiPieChart,
      title: "Performance Analytics",
      description:
        "Track your progress with real-time analytics, detailed insights, and personalized recommendations.",
    },
    {
      icon: FiCheckCircle,
      title: "Mock Board Exams",
      description:
        "Practice with real board-level tests, full-length exams, and detailed performance analysis.",
    },
    {
      icon: FiTrendingUp,
      title: "Progress Tracking",
      description:
        "Monitor improvement over time with visual charts, strength & weakness identification.",
    },
    {
      icon: FiUsers,
      title: "Student Community",
      description:
        "Connect with peers, share resources, and grow together in a supportive learning environment.",
    },
    {
      icon: FiPlay,
      title: "Live Doubt Sessions",
      description:
        "Clear your doubts with expert tutors through live interactive sessions and one-on-one support.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PublicNavbar />

      {/* HERO SECTION */}
      <section className="pt-32 md:pt-40 pb-20 md:pb-32 relative overflow-hidden">
        {/* Background Blur Elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>

        <div className="container-max container-padding relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6 md:space-y-8"
            >
              <motion.div variants={itemVariants}>
                <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-semibold">
                  ✨ Welcome to SmartEdu
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-h1 leading-[1.2]"
              >
                Transform Your{" "}
                <span className="gradient-text">Educational</span> Journey
              </motion.h1>

              <motion.p variants={itemVariants} className="text-body-lg">
                SmartEdu is a comprehensive learning platform for students
                from Class 1-12, featuring smart enrollment, real-time
                analytics, mock board exams, and expert guidance to help you
                achieve your academic goals.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link to="/register" className="btn-primary btn-lg text-center">
                  Get Started <FiArrowRight className="inline-block ml-2" />
                </Link>
                <button className="btn-outline btn-lg">
                  <FiPlay className="inline-block mr-2" /> Watch Demo
                </button>
              </motion.div>

              <motion.div variants={itemVariants} className="flex gap-8 pt-8">
                <div>
                  <p className="text-2xl font-bold text-primary-600">976+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Active Students
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary-600">99.8%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Success Rate
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-3xl transform rotate-3 opacity-20 blur-2xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=600&fit=crop"
                  alt="Students learning together"
                  className="rounded-3xl shadow-2xl w-full object-cover aspect-square"
                />
                <div className="absolute bottom-4 left-4 right-4 glass p-4">
                  <p className="text-white font-semibold text-sm">
                    📈 Join 976+ successful students
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 md:py-24 bg-gradient-primary-subtle dark:bg-gray-800/50">
        <div className="container-max container-padding">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="card text-center"
                >
                  <div className="mx-auto w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 md:py-32">
        <div className="container-max container-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-h2 mb-4">Why Choose SmartEdu?</h2>
            <p className="text-body-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover the features that make SmartEdu the preferred choice for
              students across India
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="card-interactive"
                >
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-h4 mb-2">{feature.title}</h3>
                  <p className="text-body text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 md:py-32 gradient-primary rounded-3xl mx-4 md:mx-8 relative overflow-hidden mb-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="container-max container-padding relative z-10 text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-h2 mb-4"
          >
            Ready to Transform Your Learning?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg mb-8 opacity-90 max-w-2xl mx-auto"
          >
            Join thousands of students who are already achieving their academic
            goals with SmartEdu
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/register"
              className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Start Free Trial
            </Link>
            <Link
              to="/"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;