import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
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
        <PageTransition>
          <Hero />
        </PageTransition>
        <PageTransition>
          <About />
        </PageTransition>
        <PageTransition>
          <Projects />
        </PageTransition>
        <PageTransition>
          <Contact />
        </PageTransition>
      </main>
      <PageTransition>
        <Footer />
      </PageTransition>
    </div>
  );
}

export default App;
