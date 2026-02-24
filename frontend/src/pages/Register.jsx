import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiPhone,
  FiAward,
} from "react-icons/fi";
import toast from "react-hot-toast";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    class: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agree, setAgree] = useState(false);

  const classes = [
    "Class 1-5",
    "Class 6-8",
    "Class 9-10",
    "Class 11-12",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      const errMsg = "Passwords do not match";
      setError(errMsg);
      toast.error(errMsg);
      return;
    }

    if (!agree) {
      const errMsg = "Please agree to the terms and conditions";
      setError(errMsg);
      toast.error(errMsg);
      return;
    }

    setLoading(true);

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const result = await register(fullName, formData.email, formData.password);
      if (result.success) {
        toast.success("Registration successful!");
        navigate("/dashboard");
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    } catch (err) {
      const errMsg = "Registration failed. Please try again.";
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
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Side - Branding */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden md:block md:sticky md:top-32"
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-h2 mb-4">Join SmartEdu Today 🎓</h2>
                  <p className="text-body-lg text-gray-600 dark:text-gray-400">
                    Get started on your learning journey with SmartEdu. Create
                    your account in minutes and unlock access to comprehensive
                    study materials, mock exams, and personalized analytics.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    "Personalized learning paths",
                    "Mock board exams",
                    "Performance analytics",
                    "Expert doubt sessions",
                    "Free trial access",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-secondary-600 dark:text-secondary-400 text-sm">✓</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-900/50 rounded-xl p-4">
                  <p className="text-sm text-primary-900 dark:text-primary-400">
                    <span className="font-semibold">🎁 Special Offer:</span> Get
                    30 days free access when you sign up today!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Registration Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="card max-w-md mx-auto p-8">
                <h1 className="text-h3 mb-2">Create Account</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Fill in your details to get started
                </p>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-lg">
                    <p className="text-sm text-red-700 dark:text-red-400">
                      {error}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        First Name
                      </label>
                      <div className="relative">
                        <FiUser className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="firstName"
                          placeholder="FirstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="input-field pl-10 text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Last Name
                      </label>
                      <div className="relative">
                        <FiUser className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="lastName"
                          placeholder="LastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="input-field pl-10 text-sm"
                        />
                      </div>
                    </div>
                  </div>

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

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Phone Number
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+91 1234567890"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="input-field pl-10"
                      />
                    </div>
                  </div>

                  {/* Class Selection */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Class
                    </label>
                    <div className="relative">
                      <FiAward className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                      <select
                        name="class"
                        value={formData.class}
                        onChange={handleChange}
                        required
                        className="input-field pl-10 appearance-none"
                      >
                        <option value="" disabled>
                          Select your class
                        </option>
                        {classes.map((cls) => (
                          <option key={cls} value={cls}>
                            {cls}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Password
                    </label>
                    <div className="relative">
                      {/* <FiLock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" /> */}
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Min 8 characters"
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

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Confirm Password
                    </label>
                    <div className="relative">
                      {/* <FiLock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" /> */}
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="input-field pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <FiEyeOff className="w-5 h-5" />
                        ) : (
                          <FiEye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="agree"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      className="w-4 h-4 mt-1 rounded border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500 cursor-pointer"
                    />
                    <label
                      htmlFor="agree"
                      className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
                    >
                      I agree to the{" "}
                      <a href="#" className="text-primary-600 hover:text-primary-700 font-semibold">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-primary-600 hover:text-primary-700 font-semibold">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50 mt-6"
                  >
                    {loading ? "Creating account..." : "Create Account"}
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

                {/* Login Link */}
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary-600 hover:text-primary-700 dark:hover:text-primary-400 font-semibold transition-colors"
                  >
                    Log in here
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

export default Register;