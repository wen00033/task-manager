import React, { useContext, useState } from "react";
type ThemeContextType = boolean;
type ThemeToggleType = (event: React.ChangeEvent<HTMLInputElement>) => void;

const ThemeContext = React.createContext<ThemeContextType | null>(null);
const ThemeToggle = React.createContext<ThemeToggleType | undefined>(undefined);

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
  const [theme, setTheme] = useState(true);
  const toggle = function () {
    setTheme(!theme);
  };
  return (
    <ThemeContext.Provider value={theme}>
      <ThemeToggle.Provider value={toggle}>{children}</ThemeToggle.Provider>
    </ThemeContext.Provider>
  );
}

export default Theme;
