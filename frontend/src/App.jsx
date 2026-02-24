import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

import { useLayout } from "./context/LayoutContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Tests from "./pages/Tests";
import Results from "./pages/Results";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import ForgotPassword from "./pages/ForgotPassword";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/subjects" element={<Subjects />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/results" element={<Results />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function LayoutWrapper() {
  const location = useLocation();
  const { isOpen, isMobile } = useLayout();

  // Public routes
  const publicRoutes = ["/", "/login", "/register"];
  const isPublic = publicRoutes.includes(location.pathname);

  return (
    <>
      {!isPublic && <Sidebar />}

      <motion.div
        animate={{
          marginLeft:
            !isPublic && !isMobile
              ? isOpen
                ? 240
                : 80
              : 0,
        }}
        transition={{ duration: 0.3 }}
        className="min-h-screen"
      >
        {!isPublic && <Header />}
        <AnimatedRoutes />
      </motion.div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <LayoutWrapper />
    </Router>
  );
}

export default App;