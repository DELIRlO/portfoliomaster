import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import useTheme from "./hooks/useTheme";
import useBackgroundMusic from "./hooks/useBackgroundMusic";

function App() {
  const { darkMode, toggleTheme } = useTheme();
  const { isPlaying, toggleMusic } = useBackgroundMusic();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleTheme}
        musicPlaying={isPlaying}
        toggleMusic={toggleMusic}
      />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
