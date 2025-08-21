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
                {(() => {
                  const ReflectiveText = ({ text }) => {
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
    #1b1b1b 0%,  
    #252525 15%,  
    #353535 25%,  
    #555555 35%,  
    #7a7a7a 42%,  
    #999999 46%,  
    #ffffff 50%,  
    #999999 54%,  
    #7a7a7a 58%,  
    #555555 65%,  
    #353535 75%,  
    #252525 85%,  
    #1b1b1b 100%  
  );
  background-size: 400% 400%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: cascadeReflection 15s ease-in-out infinite;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.sparkle {
  animation: sparkleEffect 12s ease-in-out infinite; /* Sparkles mais lentos */
}

/* Atrasos maiores entre letras (opcional) */
.reflective-letter:nth-child(1) { animation-delay: 0s; }
.reflective-letter:nth-child(2) { animation-delay: 0.4s; }
.reflective-letter:nth-child(3) { animation-delay: 0.8s; }
.reflective-letter:nth-child(4) { animation-delay: 1.2s; }
                          .reflective-letter:nth-child(5) { animation-delay: 1s; }
                          .reflective-letter:nth-child(6) { animation-delay: 1.25s; }
                          .reflective-letter:nth-child(7) { animation-delay: 1.5s; }
                          .reflective-letter:nth-child(8) { animation-delay: 1.75s; }
                          .reflective-letter:nth-child(9) { animation-delay: 2s; }
                          .reflective-letter:nth-child(10) { animation-delay: 2.25s; }
                          .reflective-letter:nth-child(11) { animation-delay: 2.5s; }
                          .reflective-letter:nth-child(12) { animation-delay: 2.75s; }

                          .reflective-letter:hover {
                            animation: letterGlow 0.8s ease-in-out infinite alternate;
                            cursor: default;
                            transform: translateY(-2px) scale(1.05) skewX(-3deg);
                          }

                          .sparkle {
                            position: absolute;
                            width: 3px;
                            height: 3px;
                            background: radial-gradient(circle, #ffffff 0%, #f3f4f6 30%, transparent 70%);
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
                              color: #ffffff;
                              text-shadow: 
                                0 0 3px rgba(255, 255, 255, 0.5),
                                0 0 8px rgba(229, 231, 235, 0.3);
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
                  return <ReflectiveText text="Carlos.Dev" />;
                })()}
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
                  filter: drop-shadow(0 0 1.5px rgba(255, 153, 153, 0.13))
                    drop-shadow(0 0 3px rgba(255, 77, 77, 0.11))
                    drop-shadow(0 0 4.5px rgba(255, 0, 0, 0.09))
                    drop-shadow(0 0 7.5px rgba(204, 0, 0, 0.06))
                    drop-shadow(0 0 11px rgba(128, 0, 0, 0.05));
                }
                50% {
                  filter: drop-shadow(0 0 2.5px rgba(255, 153, 153, 0.21))
                    drop-shadow(0 0 5px rgba(255, 77, 77, 0.18))
                    drop-shadow(0 0 7.5px rgba(255, 0, 0, 0.15))
                    drop-shadow(0 0 12.5px rgba(204, 0, 0, 0.12))
                    drop-shadow(0 0 18px rgba(128, 0, 0, 0.09));
                }
              }

              @keyframes subtle-green-glow {
                0%,
                100% {
                  filter: drop-shadow(0 0 1.5px rgba(153, 255, 153, 0.13))
                    drop-shadow(0 0 3px rgba(77, 255, 77, 0.11))
                    drop-shadow(0 0 4.5px rgba(0, 255, 0, 0.09))
                    drop-shadow(0 0 7.5px rgba(0, 204, 0, 0.06))
                    drop-shadow(0 0 11px rgba(0, 128, 0, 0.05));
                }
                50% {
                  filter: drop-shadow(0 0 2.5px rgba(153, 255, 153, 0.21))
                    drop-shadow(0 0 5px rgba(77, 255, 77, 0.18))
                    drop-shadow(0 0 7.5px rgba(0, 255, 0, 0.15))
                    drop-shadow(0 0 12.5px rgba(0, 204, 0, 0.12))
                    drop-shadow(0 0 18px rgba(0, 128, 0, 0.09));
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
                background: radial-gradient(
                  circle,
                  rgba(255, 100, 100, 0.18) 0%,
                  rgba(0, 0, 0, 0) 70%
                );
                color: #ff6666;
                animation: subtle-red-glow 3s ease-in-out infinite;
              }

              .music-icon-on {
                background: radial-gradient(
                  circle,
                  rgba(100, 255, 100, 0.24) 0%,
                  rgba(0, 0, 0, 0) 70%
                );
                color: #66ff66;
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
