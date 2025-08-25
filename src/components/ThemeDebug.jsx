import React from "react";
import useTheme from "../hooks/useTheme";

const ThemeDebug = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="fixed top-4 right-4 z-50 p-4 bg-background border border-border rounded-lg shadow-lg">
      <h3 className="text-sm font-bold mb-2">Theme Debug</h3>
      <div className="space-y-2 text-xs">
        <div>
          <strong>Estado darkMode:</strong> {darkMode ? "true" : "false"}
        </div>
        <div>
          <strong>localStorage:</strong>{" "}
          {localStorage.getItem("theme") || "null"}
        </div>
        <div>
          <strong>Classes do HTML:</strong>
          <div className="break-all text-[10px]">
            {document.documentElement.classList.toString() || "nenhuma"}
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className="w-full px-2 py-1 bg-primary text-primary-foreground rounded text-xs hover:bg-primary/80"
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default ThemeDebug;
