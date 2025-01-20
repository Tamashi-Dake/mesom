import { useState, useEffect, createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDisplaySettings } from "../../services/settingService";

export const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
  const displayQuery = useQuery({
    queryKey: ["display"],
    queryFn: getDisplaySettings,
  });

  const [theme, setTheme] = useState("light");
  const [accent, setAccent] = useState("blue");

  useEffect(() => {
    if (displayQuery.data) {
      setTheme(displayQuery.data.theme);
      setAccent(displayQuery.data.accent);
    }
  }, [displayQuery.data]);

  useEffect(() => {
    const flipTheme = (theme) => {
      const root = document.documentElement;
      const targetTheme = theme === "dim" ? "dark" : theme;

      if (targetTheme === "dark") root.classList.add("dark");
      else root.classList.remove("dark");

      root.style.setProperty("--main-background", `var(--${theme}-background)`);

      return undefined;
    };

    flipTheme(theme);
  }, [theme]);

  useEffect(() => {
    const flipAccent = (accent) => {
      const root = document.documentElement;

      root.style.setProperty("--main-accent", `var(--accent-${accent})`);

      return undefined;
    };

    flipAccent(accent);
  }, [accent]);

  const changeTheme = ({ theme, accent }) => {
    setTheme(theme);
    setAccent(accent);
  };

  const value = {
    theme,
    accent,
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context)
    throw new Error("useTheme must be used within an ThemeContextProvider");

  return context;
}
