import { useState } from "react";
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
  // Estado para controlar o loading
  const [isLoading, setIsLoading] = useState(false);

  // Seus hooks originais
  const { darkMode, toggleTheme } = useTheme();
  const { isPlaying, toggleMusic } = useBackgroundMusic();

  // Função chamada quando o loading completa
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Se ainda está carregando, mostra o loading futurista
  if (isLoading) {
    return <FuturisticLoader onComplete={handleLoadingComplete} />;
  }

  // Quando termina o loading, mostra seu portfolio original
  return (
    <>
      <ParticleBackground />

      <div
        className="min-h-screen text-foreground fade-in-after-loading relative"
        style={{ background: "transparent" }}
      >
        <Header
          darkMode={darkMode}
          toggleDarkMode={toggleTheme}
          musicPlaying={isPlaying}
          toggleMusic={toggleMusic}
        />
        <main className="relative z-10">
          <Hero />
          <About />
          <Projects />
          <CertificatesCarousel />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
