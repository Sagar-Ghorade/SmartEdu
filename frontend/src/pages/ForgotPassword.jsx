import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";
import API from "../services/api";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Try server endpoint if available. If not, still show neutral message.
      await API.post("/auth/forgot", { email });
      toast.success("If the email exists, a reset link has been sent.");
      navigate("/login");
    } catch (err) {
      // Don't reveal whether email exists
      toast.success("If the email exists, a reset link has been sent.");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PublicNavbar />

      <div className="pt-28 pb-20">
        <div className="container-max container-padding">
          <div className="max-w-md mx-auto">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="card p-8">
                <h1 className="text-h3 mb-2">Forgot Password</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Enter your account email and we'll send instructions to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
                    <div className="relative">
                      <FiMail className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="input-field pl-10"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button type="submit" className="btn-primary flex-1" disabled={loading}>
                      {loading ? "Sending..." : "Send reset link"}
                    </button>
                    <Link to="/login" className="btn-secondary flex items-center gap-2">
                      <FiArrowLeft /> Back
                    </Link>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
