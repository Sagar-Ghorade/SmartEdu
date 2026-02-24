import { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Check token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Validate token with backend and fetch user
      API.get("/auth/me")
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          // token invalid or expired
          localStorage.removeItem("token");
          setUser(null);
        });
    }

    setLoading(false);
  }, []);

  // 🔹 Login
  const login = async (email, password) => {
    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      // Ideally use returned user from backend
      setUser(data.user || { name: "Student" });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Login failed. Try again.",
      };
    }
  };

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // 🔹 Register
  const register = async (name, email, password) => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      // Auto login after registration
      return await login(email, password);
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Registration failed. Try again.",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);