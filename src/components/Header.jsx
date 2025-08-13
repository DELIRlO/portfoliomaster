import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Github,
  Linkedin,
  Instagram,
  Music,
  VolumeX,
} from "lucide-react";
import { Button } from "./ui/button";

const Header = ({ darkMode, toggleDarkMode, musicPlaying, toggleMusic }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold gradient-text">carlos.dev</h1>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#home"
              className="text-foreground hover:text-primary transition-colors"
            >
              Início
            </a>
            <a
              href="#about"
              className="text-foreground hover:text-primary transition-colors"
            >
              Sobre
            </a>
            <a
              href="#projects"
              className="text-foreground hover:text-primary transition-colors"
            >
              Projetos
            </a>
            <a
              href="#contact"
              className="text-foreground hover:text-primary transition-colors"
            >
              Contato
            </a>
          </nav>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMusic}
              className={`music-button ${musicPlaying ? "playing" : "stopped"}`}
            >
              {musicPlaying ? (
                <Music className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="hover:bg-primary/10"
            >
              {darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://github.com/DELIRlO"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://www.linkedin.com/in/ysneshy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://www.instagram.com/ysneshy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
