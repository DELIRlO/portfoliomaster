// src/hooks/useTheme.js
import { useState, useEffect } from "react";

const useTheme = () => {
  // 🎯 MUDANÇA PRINCIPAL: Inicializa sempre como TRUE (dark mode)
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // 🎯 FORÇA DARK MODE NA INICIALIZAÇÃO
    // Verifica se existe preferência salva, senão usa dark como padrão
    const savedTheme = localStorage.getItem("darkMode");
    const prefersDark = savedTheme ? JSON.parse(savedTheme) : true; // 👈 Padrão TRUE

    setDarkMode(prefersDark);

    // Aplica o tema imediatamente no DOM
    if (prefersDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, []);

  // Aplica mudanças quando darkMode muda
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }

    // Salva a preferência
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return { darkMode, toggleTheme };
};

export default useTheme;
