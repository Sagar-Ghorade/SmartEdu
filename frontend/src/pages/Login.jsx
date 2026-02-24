import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import toast from "react-hot-toast";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    } catch (err) {
      const errMsg = "Invalid email or password";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PublicNavbar />

      <div className="pt-32 pb-20 md:pb-32">
        <div className="container-max container-padding">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Side - Branding */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden md:block"
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-h2 mb-4">Welcome Back! 👋</h2>
                  <p className="text-body-lg text-gray-600 dark:text-gray-400">
                    Log in to your SmartEdu account and continue your learning
                    journey. Access your personalized dashboard, track progress,
                    and explore new courses.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    "Access your personalized dashboard",
                    "Track your learning progress",
                    "Take mock exams and tests",
                    "View detailed performance analytics",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-600 dark:text-primary-400 text-sm">✓</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>

                <img
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop"
                  alt="Students learning"
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="card max-w-md mx-auto p-8">
                <h1 className="text-h3 mb-2">Login</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Enter your credentials to access your account
                </p>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-lg">
                    <p className="text-sm text-red-700 dark:text-red-400">
                      {error}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <FiMail className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field pl-10"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Password
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-primary-600 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
                      >
                        Forgot?
                      </Link>
                    </div>
                    <div className="relative">
                      {/* <FiLock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" /> */}
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="input-field pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? (
                          <FiEyeOff className="w-5 h-5" />
                        ) : (
                          <FiEye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500 cursor-pointer"
                    />
                    <label
                      htmlFor="remember"
                      className="ml-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
                    >
                      Remember me
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? "Logging in..." : "Login"}
                    {!loading && <FiArrowRight className="w-4 h-4" />}
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                      Or
                    </span>
                  </div>
                </div>

                {/* Sign Up Link */}
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-primary-600 hover:text-primary-700 dark:hover:text-primary-400 font-semibold transition-colors"
                  >
                    Sign up free
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;