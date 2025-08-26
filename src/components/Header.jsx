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

  const ReflectiveText = ({ text, darkMode }) => {
    const letters = text.split("");

    return (
      <>
        <style>{`
          @keyframes cascadeReflection {
            0% { 
              background-position: -400% -400%;
              opacity: 0.8;
            }
            50% { 
              background-position: 0% 0%;
              opacity: 1;
            }
            100% { 
              background-position: 400% 400%;
              opacity: 0.8;
            }
          }

          @keyframes letterGlow {
            0%, 100% { 
              text-shadow: 
                0 0 3px rgba(255, 255, 255, 0.4),
                0 0 8px rgba(229, 231, 235, 0.3);
              transform: scale(1) translateY(0px) skewX(0deg);
            }
            50% { 
              text-shadow: 
                0 0 8px rgba(255, 255, 255, 0.7),
                0 0 15px rgba(229, 231, 235, 0.5);
              transform: scale(1.03) translateY(-1px) skewX(-2deg);
            }
          }

          @keyframes sparkleEffect {
            0%, 100% { 
              opacity: 0;
              transform: scale(0) rotate(0deg);
            }
            50% { 
              opacity: 0.9;
              transform: scale(1) rotate(45deg);
            }
          }

          .reflective-letter {
            display: inline-block;
            position: relative;
            background: linear-gradient(
              135deg,
              ${darkMode ? "#1b1b1b" : "#4a4a4a"} 0%,  
              ${darkMode ? "#252525" : "#5a5a5a"} 15%,  
              ${darkMode ? "#353535" : "#6a6a6a"} 25%,  
              ${darkMode ? "#555555" : "#7a7a7a"} 35%,  
              ${darkMode ? "#7a7a7a" : "#8a8a8a"} 42%,  
              ${darkMode ? "#999999" : "#aaaaaa"} 46%,  
              ${darkMode ? "#ffffff" : "#1a1a1a"} 50%,  
              ${darkMode ? "#999999" : "#aaaaaa"} 54%,  
              ${darkMode ? "#7a7a7a" : "#8a8a8a"} 58%,  
              ${darkMode ? "#555555" : "#7a7a7a"} 65%,  
              ${darkMode ? "#353535" : "#6a6a6a"} 75%,  
              ${darkMode ? "#252525" : "#5a5a5a"} 85%,  
              ${darkMode ? "#1b1b1b" : "#4a4a4a"} 100%  
            );
            background-size: 400% 400%;
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            animation: cascadeReflection 15s ease-in-out infinite;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .sparkle {
            animation: sparkleEffect 12s ease-in-out infinite;
          }

          .reflective-letter:nth-child(1) { animation-delay: 0s; }
          .reflective-letter:nth-child(2) { animation-delay: 0.4s; }
          .reflective-letter:nth-child(3) { animation-delay: 0.8s; }
          .reflective-letter:nth-child(4) { animation-delay: 1.2s; }
          .reflective-letter:nth-child(5) { animation-delay: 1s; }
          .reflective-letter:nth-child(6) { animation-delay: 1.25s; }
          .reflective-letter:nth-child(7) { animation-delay: 1.5s; }
          .reflective-letter:nth-child(8) { animation-delay: 1.75s; }

          .reflective-letter:hover {
            animation: letterGlow 0.8s ease-in-out infinite alternate;
            cursor: default;
            transform: translateY(-2px) scale(1.05) skewX(-3deg);
          }

          .sparkle {
            position: absolute;
            width: 3px;
            height: 3px;
            background: radial-gradient(
              circle, 
              ${darkMode ? "#ffffff" : "#2a2a2a"} 0%, 
              ${darkMode ? "#f3f4f6" : "#4a4a4a"} 30%, 
              transparent 70%
            );
            border-radius: 50%;
            pointer-events: none;
            animation: sparkleEffect 8.75s ease-in-out infinite;
          }

          .sparkle:nth-child(1) { 
            top: 8%; left: 15%; 
            animation-delay: 0.5s; 
          }
          .sparkle:nth-child(2) { 
            top: 25%; right: 25%; 
            animation-delay: 2.75s; 
          }
          .sparkle:nth-child(3) { 
            bottom: 12%; left: 55%; 
            animation-delay: 5.75s; 
          }
          .sparkle:nth-child(4) { 
            top: 55%; right: 40%; 
            animation-delay: 8.5s;
          }

          @supports not (-webkit-background-clip: text) {
            .reflective-letter {
              background: none;
              color: ${darkMode ? "#ffffff" : "#1a1a1a"};
              text-shadow: 
                0 0 3px ${
                  darkMode
                    ? "rgba(255, 255, 255, 0.5)"
                    : "rgba(26, 26, 26, 0.5)"
                },
                0 0 8px ${
                  darkMode
                    ? "rgba(229, 231, 235, 0.3)"
                    : "rgba(74, 74, 74, 0.3)"
                };
            }
          }
        `}</style>

        <div className="relative inline-block">
          {letters.map((letter, index) => (
            <span key={index} className="reflective-letter">
              {letter}
            </span>
          ))}

          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
        </div>
      </>
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
            <div className="relative group p-2">
              <h1 className="text-xl font-bold relative overflow-hidden">
                <ReflectiveText text="NeshDev" darkMode={darkMode} />
              </h1>
            </div>
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
              <a
                key={item.id}
                href={`#${item.id}`}
                className="relative group overflow-hidden rounded-lg px-3 py-2"
              >
                {/* Efeito espelhado de fundo */}
                <span
                  className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out transform -translate-x-full group-hover:translate-x-full"
                  style={{
                    background: darkMode
                      ? "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 20%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 80%, transparent 100%)"
                      : "linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.05) 20%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.05) 80%, transparent 100%)",
                  }}
                ></span>

                {/* Brilho de fundo */}
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-500 blur-sm"
                  style={{
                    background: darkMode
                      ? "linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.3) 100%)"
                      : "linear-gradient(45deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.15) 100%)",
                  }}
                ></span>

                {/* Conteúdo do link */}
                <span className="relative z-10 flex items-center gap-2">
                  {item.icon}
                  <span className="text-foreground/90 group-hover:text-primary font-medium transition-all duration-500 relative">
                    {item.label}
                  </span>
                </span>

                {/* Linha inferior com gradiente */}
                <span
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-out"
                  style={{
                    background: darkMode
                      ? "linear-gradient(to right, #3b82f6 0%, #ef4444 50%, #1f2937 100%)"
                      : "linear-gradient(to right, #1e40af 0%, #dc2626 50%, #374151 100%)",
                  }}
                >
                  <span
                    className="absolute inset-0 animate-pulse"
                    style={{
                      background: darkMode
                        ? `linear-gradient(to right, #4a4a4a 0%, #4a4a4a 15%, #6b6b6b 30%, #e8e8e8 45%, #4a4a4a 50%, #e8e8e8 55%, #6b6b6b 70%, #4a4a4a 85%, #4a4a4a 100%)`
                        : `linear-gradient(to right, #374151 0%, #374151 15%, #4b5563 30%, #1f2937 45%, #374151 50%, #1f2937 55%, #4b5563 70%, #374151 85%, #374151 100%)`,
                      opacity: 0.7,
                      mixBlendMode: "screen",
                    }}
                  />
                </span>

                {/* Partículas flutuantes */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  {[...Array(3)].map((_, particleIndex) => (
                    <span
                      key={particleIndex}
                      className="absolute w-1 h-1 rounded-full"
                      style={{
                        left: `${20 + particleIndex * 30}%`,
                        top: "50%",
                        background: darkMode
                          ? "rgba(59, 130, 246, 0.6)"
                          : "rgba(30, 64, 175, 0.6)",
                        animation: `particleFloat 1.5s ease-in-out infinite ${
                          particleIndex * 0.2
                        }s`,
                        animationDelay: `${particleIndex * 200}ms`,
                      }}
                    />
                  ))}
                </span>

                {/* Contorno animado */}
                <span className="absolute inset-0 border border-transparent group-hover:border-primary/20 transition-all duration-500 rounded-lg opacity-0 group-hover:opacity-100 overflow-hidden">
                  {/* Linha superior */}
                  <span
                    className="absolute top-0 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-700 delay-100 rounded-full"
                    style={{ background: darkMode ? "#3b82f6" : "#1e40af" }}
                  ></span>
                  {/* Linha direita */}
                  <span
                    className="absolute top-0 right-0 w-[1px] h-0 group-hover:h-full transition-all duration-700 delay-200 rounded-full"
                    style={{ background: darkMode ? "#3b82f6" : "#1e40af" }}
                  ></span>
                  {/* Linha inferior */}
                  <span
                    className="absolute bottom-0 right-0 w-0 h-[1px] group-hover:w-full transition-all duration-700 delay-300 rounded-full"
                    style={{ background: darkMode ? "#3b82f6" : "#1e40af" }}
                  ></span>
                  {/* Linha esquerda */}
                  <span
                    className="absolute bottom-0 left-0 w-[1px] h-0 group-hover:h-full transition-all duration-700 delay-400 rounded-full"
                    style={{ background: darkMode ? "#3b82f6" : "#1e40af" }}
                  ></span>
                </span>

                <style jsx>{`
                  @keyframes particleFloat {
                    0% {
                      transform: translateY(0px) scale(0);
                      opacity: 0;
                    }
                    50% {
                      transform: translateY(-10px) scale(1);
                      opacity: 1;
                    }
                    100% {
                      transform: translateY(-20px) scale(0);
                      opacity: 0;
                    }
                  }
                `}</style>
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
              className="music-button"
            >
              <span
                className={`music-icon-base ${
                  musicPlaying ? "music-icon-on" : "music-icon-off"
                }`}
              >
                {musicPlaying ? (
                  <Music className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </span>
            </Button>
            <style jsx>{`
              @keyframes subtle-golden-glow {
                0%,
                100% {
                  filter: drop-shadow(0 0 1.5px rgba(255, 255, 148, 0.7))
                    drop-shadow(0 0 3px rgba(249, 219, 92, 0.6))
                    drop-shadow(0 0 4.5px rgba(239, 184, 16, 0.5))
                    drop-shadow(0 0 7.5px rgba(178, 132, 5, 0.3))
                    drop-shadow(0 0 11px rgba(121, 83, 0, 0.2));
                }
                50% {
                  filter: drop-shadow(0 0 2.5px rgba(255, 255, 148, 0.9))
                    drop-shadow(0 0 5px rgba(249, 219, 92, 0.8))
                    drop-shadow(0 0 7.5px rgba(239, 184, 16, 0.7))
                    drop-shadow(0 0 12.5px rgba(178, 132, 5, 0.5))
                    drop-shadow(0 0 18px rgba(121, 83, 0, 0.4));
                }
              }

              @keyframes subtle-purple-glow {
                0%,
                100% {
                  filter: drop-shadow(0 0 1.5px rgba(225, 198, 245, 0.7))
                    drop-shadow(0 0 3px rgba(199, 146, 234, 0.6))
                    drop-shadow(0 0 4.5px rgba(162, 105, 194, 0.5))
                    drop-shadow(0 0 7.5px rgba(126, 78, 153, 0.3))
                    drop-shadow(0 0 11px rgba(88, 49, 109, 0.2));
                }
                50% {
                  filter: drop-shadow(0 0 2.5px rgba(225, 198, 245, 0.9))
                    drop-shadow(0 0 5px rgba(199, 146, 234, 0.8))
                    drop-shadow(0 0 7.5px rgba(162, 105, 194, 0.7))
                    drop-shadow(0 0 12.5px rgba(126, 78, 153, 0.5))
                    drop-shadow(0 0 18px rgba(88, 49, 109, 0.4));
                }
              }

              @keyframes subtle-red-glow {
                0%,
                100% {
                  filter: drop-shadow(
                      0 0 1.5px
                        ${darkMode
                          ? "rgba(255, 153, 153, 0.13)"
                          : "rgba(220, 38, 38, 0.2)"}
                    )
                    drop-shadow(
                      0 0 3px
                        ${darkMode
                          ? "rgba(255, 77, 77, 0.11)"
                          : "rgba(185, 28, 28, 0.18)"}
                    )
                    drop-shadow(
                      0 0 4.5px
                        ${darkMode
                          ? "rgba(255, 0, 0, 0.09)"
                          : "rgba(153, 27, 27, 0.15)"}
                    )
                    drop-shadow(
                      0 0 7.5px
                        ${darkMode
                          ? "rgba(204, 0, 0, 0.06)"
                          : "rgba(127, 29, 29, 0.12)"}
                    )
                    drop-shadow(
                      0 0 11px
                        ${darkMode
                          ? "rgba(128, 0, 0, 0.05)"
                          : "rgba(105, 29, 29, 0.1)"}
                    );
                }
                50% {
                  filter: drop-shadow(
                      0 0 2.5px
                        ${darkMode
                          ? "rgba(255, 153, 153, 0.21)"
                          : "rgba(220, 38, 38, 0.32)"}
                    )
                    drop-shadow(
                      0 0 5px
                        ${darkMode
                          ? "rgba(255, 77, 77, 0.18)"
                          : "rgba(185, 28, 28, 0.28)"}
                    )
                    drop-shadow(
                      0 0 7.5px
                        ${darkMode
                          ? "rgba(255, 0, 0, 0.15)"
                          : "rgba(153, 27, 27, 0.24)"}
                    )
                    drop-shadow(
                      0 0 12.5px
                        ${darkMode
                          ? "rgba(204, 0, 0, 0.12)"
                          : "rgba(127, 29, 29, 0.20)"}
                    )
                    drop-shadow(
                      0 0 18px
                        ${darkMode
                          ? "rgba(128, 0, 0, 0.09)"
                          : "rgba(105, 29, 29, 0.16)"}
                    );
                }
              }

              @keyframes subtle-green-glow {
                0%,
                100% {
                  filter: drop-shadow(
                      0 0 1.5px
                        ${darkMode
                          ? "rgba(153, 255, 153, 0.13)"
                          : "rgba(34, 197, 94, 0.2)"}
                    )
                    drop-shadow(
                      0 0 3px
                        ${darkMode
                          ? "rgba(77, 255, 77, 0.11)"
                          : "rgba(21, 128, 61, 0.18)"}
                    )
                    drop-shadow(
                      0 0 4.5px
                        ${darkMode
                          ? "rgba(0, 255, 0, 0.09)"
                          : "rgba(20, 83, 45, 0.15)"}
                    )
                    drop-shadow(
                      0 0 7.5px
                        ${darkMode
                          ? "rgba(0, 204, 0, 0.06)"
                          : "rgba(22, 101, 52, 0.12)"}
                    )
                    drop-shadow(
                      0 0 11px
                        ${darkMode
                          ? "rgba(0, 128, 0, 0.05)"
                          : "rgba(20, 83, 45, 0.1)"}
                    );
                }
                50% {
                  filter: drop-shadow(
                      0 0 2.5px
                        ${darkMode
                          ? "rgba(153, 255, 153, 0.21)"
                          : "rgba(34, 197, 94, 0.32)"}
                    )
                    drop-shadow(
                      0 0 5px
                        ${darkMode
                          ? "rgba(77, 255, 77, 0.18)"
                          : "rgba(21, 128, 61, 0.28)"}
                    )
                    drop-shadow(
                      0 0 7.5px
                        ${darkMode
                          ? "rgba(0, 255, 0, 0.15)"
                          : "rgba(20, 83, 45, 0.24)"}
                    )
                    drop-shadow(
                      0 0 12.5px
                        ${darkMode
                          ? "rgba(0, 204, 0, 0.12)"
                          : "rgba(22, 101, 52, 0.20)"}
                    )
                    drop-shadow(
                      0 0 18px
                        ${darkMode
                          ? "rgba(0, 128, 0, 0.09)"
                          : "rgba(20, 83, 45, 0.16)"}
                    );
                }
              }

              .music-icon-base {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                transition: all 0.3s ease-in-out;
              }

              .music-icon-off {
                background: ${darkMode
                  ? "radial-gradient(circle, rgba(255, 100, 100, 0.18) 0%, rgba(0, 0, 0, 0) 70%)"
                  : "radial-gradient(circle, rgba(220, 38, 38, 0.25) 0%, rgba(255, 255, 255, 0) 70%)"};
                color: ${darkMode ? "#ff6666" : "#dc2626"};
                animation: subtle-red-glow 3s ease-in-out infinite;
              }

              .music-icon-on {
                background: ${darkMode
                  ? "radial-gradient(circle, rgba(100, 255, 100, 0.24) 0%, rgba(0, 0, 0, 0) 70%)"
                  : "radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, rgba(255, 255, 255, 0) 70%)"};
                color: ${darkMode ? "#66ff66" : "#16a34a"};
                animation: subtle-green-glow 3s ease-in-out infinite;
              }

              .theme-icon-dark {
                display: inline-block;
                color: #efb810;
                animation: subtle-golden-glow 3s ease-in-out infinite;
              }

              .theme-icon-light {
                display: inline-block;
                color: #c792ea;
                animation: subtle-purple-glow 3s ease-in-out infinite;
              }
            `}</style>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="hover:bg-primary/10"
            >
              {darkMode ? (
                <span className="theme-icon-dark">
                  <Sun className="h-4 w-4" />
                </span>
              ) : (
                <span className="theme-icon-light">
                  <Moon className="h-4 w-4" />
                </span>
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
                    className={`absolute bottom-0 left-0 h-[2px] w-0 bg-purple-600 group-hover:w-full transition-all duration-300 rounded-full ${
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
                    className={`absolute bottom-0 left-0 h-[2px] w-0 bg-blue-600 group-hover:w-full transition-all duration-300 rounded-full ${
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
                    className={`absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-pink-500 to-yellow-500 group-hover:w-full transition-all duration-300 rounded-full ${
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
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300" />

        <div
          className={`mobile-menu fixed top-0 right-0 h-full w-80 bg-black border-l border-primary/20 transform transition-transform duration-300 ease-out ${
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
