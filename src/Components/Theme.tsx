import React, { useContext, useState, useEffect } from "react";
type ThemeContextType = boolean;
type ThemeToggleType = (event: React.ChangeEvent<HTMLInputElement>) => void;

const ThemeContext = React.createContext<ThemeContextType | null>(null);
const ThemeToggle = React.createContext<ThemeToggleType | undefined>(undefined);
const GetTasksId = React.createContext<[] | string>([]);

export function useGetTasksId() {
  const context = useContext(GetTasksId);
  if (context === null) {
    throw new Error("useGetTasksId must be used within a ThemeProvider");
  }
  return context;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
export function useThemeToggle() {
  const context = useContext(ThemeToggle);
  if (context == undefined) {
    throw new Error("useThemeToggle must be used within a ThemeProvider");
  }
  return context;
}
type content = {
  children: React.ReactNode;
};
function Theme({ children }: content) {
  const [tasks, setTasks] = useState<[] | string>([]);
  const [theme, setTheme] = useState(true);
  const toggle = function () {
    setTheme(!theme);
  };
  async function getTasks() {
    const res = await fetch(
      "http://localhost:8888/.netlify/functions/getTasksManager"
    );
    const data = await res.json();
    setTasks(data);
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeToggle.Provider value={toggle}>
        <GetTasksId.Provider value={tasks}>{children}</GetTasksId.Provider>
      </ThemeToggle.Provider>
    </ThemeContext.Provider>
  );
}

export default Theme;
