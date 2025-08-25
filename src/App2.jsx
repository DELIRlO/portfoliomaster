// src/App.jsx - VERSÃO ATUALIZADA
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import CertificatesCarousel from "./components/CertificatesCarousel";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FuturisticLoader from "./components/FuturisticLoader";
import ParticleBackground from "./components/ParticleBackground";
import useTheme from "./hooks/useTheme";
import useBackgroundMusic from "./hooks/useBackgroundMusic";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { darkMode, toggleTheme } = useTheme();
  const { isPlaying, toggleMusic } = useBackgroundMusic();

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const maxLoadingTime = setTimeout(() => {
      setIsLoading(false);
    }, 8000);

    return () => clearTimeout(maxLoadingTime);
  }, []);

  if (isLoading) {
    return <FuturisticLoader onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen text-foreground fade-in-after-loading relative">
      {/* COMPONENTE DE PARTÍCULAS DE FUNDO */}
      <ParticleBackground />

      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleTheme}
        musicPlaying={isPlaying}
        toggleMusic={toggleMusic}
      />
      <main className="relative z-20">
        <Hero />
        <About />
        <Projects />
        <CertificatesCarousel />
        <Contact />
      </main>
      <Footer className="relative z-20" />
    </div>
  );
}

export default App;
