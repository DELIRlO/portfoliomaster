// src/App.jsx - VERSÃO CORRIGIDA
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
  const [isLoading, setIsLoading] = useState(false);
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
    <div
      className="min-h-screen text-foreground fade-in-after-loading relative"
      style={{
        // Força o background do container principal
        backgroundColor: darkMode ? "#000000" : "#ffffff",
        position: "relative",
        overflow: "hidden", // Evita scroll horizontal das partículas
      }}
    >
      {/* COMPONENTE DE PARTÍCULAS DE FUNDO - POSICIONADO ANTES DO CONTEÚDO */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0, // Mudado de -1 para 0
          pointerEvents: "none",
        }}
      >
        <ParticleBackground />
      </div>

      {/* HEADER */}
      <div style={{ position: "relative", zIndex: 50 }}>
        <Header
          darkMode={darkMode}
          toggleDarkMode={toggleTheme}
          musicPlaying={isPlaying}
          toggleMusic={toggleMusic}
        />
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <main
        className="relative"
        style={{
          position: "relative",
          zIndex: 20,
          // Garante que o conteúdo fique acima das partículas
          backgroundColor: "transparent",
        }}
      >
        <Hero />
        <About />
        <Projects />
        <CertificatesCarousel />
        <Contact />
      </main>

      {/* FOOTER */}
      <div style={{ position: "relative", zIndex: 20 }}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
