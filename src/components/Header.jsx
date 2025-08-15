import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Github,
  Linkedin,
  Instagram,
  Music,
  VolumeX,
  Menu,
  X,
  Home,
  User,
  Code,
  Mail,
} from "lucide-react";
import { Button } from "./ui/button";

const Header = ({ darkMode, toggleDarkMode, musicPlaying, toggleMusic }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileMenuClick = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen &&
        !event.target.closest(".mobile-menu") &&
        !event.target.closest(".menu-button")
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  const SmokeText = ({ text }) => (
    <span style={{ display: "inline-block" }}>{text}</span>
  );

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
              <SmokeText text="Carlos.Filho" />
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {[
              {
                id: "home",
                label: "Início",
                icon: <Home className="h-4 w-4" />,
              },
              {
                id: "about",
                label: "Sobre",
                icon: <User className="h-4 w-4" />,
              },
              {
                id: "projects",
                label: "Projetos",
                icon: <Code className="h-4 w-4" />,
              },
              {
                id: "contact",
                label: "Contato",
                icon: <Mail className="h-4 w-4" />,
              },
            ].map((item) => (
              <a key={item.id} href={`#${item.id}`} className="relative group">
                <span className="relative z-10 flex items-center gap-2 px-3 py-2">
                  {item.icon}
                  <span className="text-foreground/90 group-hover:text-primary font-medium transition-all duration-500 relative">
                    {item.label}
                  </span>
                </span>
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-primary via-blue-500 to-purple-500 group-hover:w-full transition-all duration-700 ease-out">
                  <span
                    className="absolute inset-0 animate-pulse"
                    style={{
                      background: `
                        linear-gradient(
                          to right,
                          #2d2d2d 0%,
                          #4a4a4a 15%,
                          #6b6b6b 30%,
                          #e8e8e8 45%,
                          #ffffff 50%,
                          #e8e8e8 55%,
                          #6b6b6b 70%,
                          #4a4a4a 85%,
                          #2d2d2d 100%
                        )`,
                      opacity: 0.7,
                      mixBlendMode: "screen",
                    }}
                  />
                </span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(3)].map((_, particleIndex) => (
                    <span
                      key={particleIndex}
                      className="absolute w-1 h-1 bg-primary/60 rounded-full"
                      style={{
                        left: `${20 + particleIndex * 30}%`,
                        top: "50%",
                        animation: `particleFloat 1.5s ease-in-out infinite ${
                          particleIndex * 0.2
                        }s`,
                        animationDelay: `${particleIndex * 200}ms`,
                      }}
                    />
                  ))}
                </span>
                <span className="absolute inset-0 border border-transparent group-hover:border-primary/20 transition-all duration-500 rounded-lg opacity-0 group-hover:opacity-100 overflow-hidden">
                  <span className="absolute top-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-700 delay-100 rounded-full"></span>
                  <span className="absolute top-0 right-0 w-[1px] h-0 bg-primary group-hover:h-full transition-all duration-700 delay-200 rounded-full"></span>
                  <span className="absolute bottom-0 right-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-700 delay-300 rounded-full"></span>
                  <span className="absolute bottom-0 left-0 w-[1px] h-0 bg-primary group-hover:h-full transition-all duration-700 delay-400 rounded-full"></span>
                </span>
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
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
                        ? "text-purple-600"
                        : "text-foreground/90"
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] w-0 bg-purple-600 group-hover:w-full transition-all duration-300 ${
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
                        ? "text-pink-500"
                        : "text-foreground/90"
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-pink-500 to-yellow-500 group-hover:w-full transition-all duration-300 ${
                      hoveredIcon === "instagram" ? "w-full" : ""
                    }`}
                  ></span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 md:hidden ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={`mobile-menu fixed top-0 right-0 h-full w-80 bg-background/95 backdrop-blur-lg border-l border-primary/20 transform transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-primary/20">
              <h2 className="text-xl font-bold gradient-text">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:bg-primary/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="flex-1 px-6 py-8">
              <div className="space-y-6">
                {[
                  {
                    id: "home",
                    label: "Início",
                    icon: <Home className="h-5 w-5" />,
                  },
                  {
                    id: "about",
                    label: "Sobre",
                    icon: <User className="h-5 w-5" />,
                  },
                  {
                    id: "projects",
                    label: "Projetos",
                    icon: <Code className="h-5 w-5" />,
                  },
                  {
                    id: "contact",
                    label: "Contato",
                    icon: <Mail className="h-5 w-5" />,
                  },
                ].map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleMobileMenuClick(item.id)}
                    className="w-full text-left p-4 rounded-lg bg-card/30 hover:bg-primary/10 transition-all duration-300 group border border-transparent hover:border-primary/20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-primary">{item.icon}</span>
                      <span className="text-lg font-medium group-hover:text-primary transition-colors duration-300">
                        {item.label}
                      </span>
                    </div>

                    <div className="mt-2 h-[2px] w-0 bg-gradient-to-r from-primary to-purple-500 group-hover:w-full transition-all duration-500 ease-out" />
                  </button>
                ))}
              </div>
            </nav>

            <div className="p-6 border-t border-primary/20">
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:bg-primary/10 hover:scale-110 transition-all duration-300"
                >
                  <a
                    href="https://github.com/DELIRlO"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:bg-primary/10 hover:scale-110 transition-all duration-300"
                >
                  <a
                    href="https://www.linkedin.com/in/ysneshy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:bg-primary/10 hover:scale-110 transition-all duration-300"
                >
                  <a
                    href="https://www.instagram.com/ysneshy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </Button>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">Carlos Filho</p>
                <p className="text-xs text-muted-foreground/60">
                  Desenvolvedor Full Stack
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
