import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { TestProvider } from "./context/TestContext";
import { LayoutProvider } from "./context/LayoutContext";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <TestProvider>
          <LayoutProvider>
            <App />
          </LayoutProvider>
        </TestProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);