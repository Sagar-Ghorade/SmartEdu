import { createContext, useContext, useState } from "react";

const TestContext = createContext();

export const TestProvider = ({ children }) => {
  const [tests, setTests] = useState([]);

  const addTestResult = (testName, score) => {
    setTests((prev) => [
      ...prev,
      {
        name: testName,
        score,
      },
    ]);
  };

  return (
    <TestContext.Provider value={{ tests, addTestResult }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTest = () => useContext(TestContext);