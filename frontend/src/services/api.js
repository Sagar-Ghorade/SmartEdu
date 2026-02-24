import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ========== AUTH APIs ==========
export const authAPIs = {
  login: (email, password) => API.post("/auth/login", { email, password }),
  register: (name, email, password) => API.post("/auth/register", { name, email, password }),
};

// ========== SUBJECTS APIs ==========
export const subjectAPIs = {
  getAll: () => API.get("/subjects"),
  enroll: (subjectId) => API.post(`/enrollments`, { subjectId }),
};

// ========== TESTS APIs ==========
export const testAPIs = {
  getAll: () => API.get("/tests"),
  getById: (id) => API.get(`/tests/${id}`),
  submitTest: (testId, answers) => API.post(`/tests/${testId}/submit`, { answers }),
};

// ========== RESULTS APIs ==========
export const resultAPIs = {
  getAll: () => API.get("/results"),
  getById: (id) => API.get(`/results/${id}`),
};

// ========== DASHBOARD APIs ==========
export const dashboardAPIs = {
  getStats: () => API.get("/dashboard/stats"),
  getPerformance: () => API.get("/dashboard/performance"),
};

// ========== FEES APIs ==========
export const feeAPIs = {
  getAll: () => API.get("/fees"),
  getFeeStructure: (classId) => API.get(`/fees/${classId}`),
};

// ========== CLASSES APIs ==========
export const classAPIs = {
  getAll: () => API.get("/classes"),
};

export default API;