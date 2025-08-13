import { useState, useEffect } from "react";
import TextTransition from "react-text-transition";
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
  const [hoveredIcon, setHoveredIcon] = useState("");
  const [index, setIndex] = useState(0);

  // Efeito de rotação para o nome
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Efeito de fumaça simples para o nome
  const SmokeText = ({ text }) => {
    return (
      <TextTransition
        springConfig={{ tension: 180, friction: 12 }}
        direction="up"
        inline
        style={{ display: "inline-block" }}
      >
        {text.split("").map((letter, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              transition: "all 0.3s ease",
              transform: `rotate(${(index + i) % 3 === 0 ? "2deg" : "-2deg"})`,
              opacity: (index + i) % 2 === 0 ? 0.9 : 1,
            }}
          >
            {letter}
          </span>
        ))}
      </TextTransition>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-gray-800/30"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">
              <SmokeText text="CarlosFilho" />
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {[
              { id: "home", label: "Início" },
              { id: "about", label: "Sobre" },
              { id: "projects", label: "Projetos" },
              { id: "contact", label: "Contato" },
            ].map((item) => (
              <a key={item.id} href={`#${item.id}`} className="relative group">
                <span className="relative z-10 block px-2 py-1">
                  <span className="text-foreground/90 group-hover:text-blue-600 font-medium transition-colors duration-300">
                    {item.label}
                  </span>
                </span>
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
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
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="relative group"
                onMouseEnter={() => setHoveredIcon("github")}
                onMouseLeave={() => setHoveredIcon("")}
              >
                <a
                  href="https://github.com/DELIRlO"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github
                    className={`h-4 w-4 transition-colors duration-300 ${
                      hoveredIcon === "github"
                        ? "text-blue-600"
                        : "text-foreground/90"
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] w-0 bg-blue-600 group-hover:w-full transition-all duration-300 ${
                      hoveredIcon === "github" ? "w-full" : ""
                    }`}
                  ></span>
                </a>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                asChild
                className="relative group"
                onMouseEnter={() => setHoveredIcon("linkedin")}
                onMouseLeave={() => setHoveredIcon("")}
              >
                <a
                  href="https://www.linkedin.com/in/ysneshy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin
                    className={`h-4 w-4 transition-colors duration-300 ${
                      hoveredIcon === "linkedin"
                        ? "text-blue-600"
                        : "text-foreground/90"
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] w-0 bg-blue-600 group-hover:w-full transition-all duration-300 ${
                      hoveredIcon === "linkedin" ? "w-full" : ""
                    }`}
                  ></span>
                </a>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                asChild
                className="relative group"
                onMouseEnter={() => setHoveredIcon("instagram")}
                onMouseLeave={() => setHoveredIcon("")}
              >
                <a
                  href="https://www.instagram.com/ysneshy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram
                    className={`h-4 w-4 transition-colors duration-300 ${
                      hoveredIcon === "instagram"
                        ? "text-blue-600"
                        : "text-foreground/90"
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] w-0 bg-blue-600 group-hover:w-full transition-all duration-300 ${
                      hoveredIcon === "instagram" ? "w-full" : ""
                    }`}
                  ></span>
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
