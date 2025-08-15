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
  Briefcase,
  BookOpen,
  Aperture,
  Building,
} from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

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

  const menuItems = [
    { id: "home", label: "HOME", icon: <Home className="h-5 w-5" /> },
    { id: "about", label: "SOBRE", icon: <User className="h-5 w-5" /> },
    {
      id: "curriculum",
      label: "CURRÍCULO",
      icon: <Briefcase className="h-5 w-5" />,
    },
    { id: "projects", label: "PROJETOS", icon: <Code className="h-5 w-5" /> },
    { id: "courses", label: "CURSOS", icon: <BookOpen className="h-5 w-5" /> },
    { id: "skills", label: "SKILLS", icon: <Aperture className="h-5 w-5" /> },
    {
      id: "building",
      label: "TRABALHOS",
      icon: <Building className="h-5 w-5" />,
    },
    { id: "contact", label: "CONTATO", icon: <Mail className="h-5 w-5" /> },
  ];

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
            <motion.h1
              className="text-xl font-bold"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              CarlosFilho
            </motion.h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.slice(0, 4).map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className="relative group"
                whileHover={{ y: -2 }}
              >
                <span className="relative z-10 flex items-center gap-2 px-3 py-2">
                  {item.icon}
                  <span className="text-foreground/90 group-hover:text-primary font-medium transition-all duration-300">
                    {item.label}
                  </span>
                </span>
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-primary to-purple-500 group-hover:w-full transition-all duration-500 ease-out" />
              </motion.a>
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
              {[
                {
                  icon: <Github className="h-4 w-4" />,
                  href: "https://github.com/DELIRlO",
                },
                {
                  icon: <Linkedin className="h-4 w-4" />,
                  href: "https://www.linkedin.com/in/ysneshy",
                },
                {
                  icon: <Instagram className="h-4 w-4" />,
                  href: "https://www.instagram.com/ysneshy",
                },
              ].map((social, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="relative group"
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-600 group-hover:w-full transition-all duration-300" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="mobile-menu fixed top-0 right-0 z-50 h-full w-80 bg-background/95 backdrop-blur-lg border-l border-primary/20 shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-primary/20">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    Menu
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:bg-primary/10"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <nav className="flex-1 px-6 py-8 overflow-y-auto">
                  <div className="space-y-3">
                    {menuItems.map((item, index) => (
                      <motion.button
                        key={item.id}
                        onClick={() => handleMobileMenuClick(item.id)}
                        className="w-full text-left p-4 rounded-lg hover:bg-primary/5 transition-all duration-300 group flex items-center gap-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <span className="text-primary">{item.icon}</span>
                        <span className="text-lg font-medium group-hover:text-primary transition-colors duration-300">
                          {item.label}
                        </span>
                        <span className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent group-hover:from-primary/50 transition-all duration-500" />
                      </motion.button>
                    ))}
                  </div>
                </nav>

                <div className="p-6 border-t border-primary/20">
                  <div className="flex items-center justify-center space-x-6">
                    {[
                      {
                        icon: <Github className="h-5 w-5" />,
                        href: "https://github.com/DELIRlO",
                      },
                      {
                        icon: <Linkedin className="h-5 w-5" />,
                        href: "https://www.linkedin.com/in/ysneshy",
                      },
                      {
                        icon: <Instagram className="h-5 w-5" />,
                        href: "https://www.instagram.com/ysneshy",
                      },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full hover:bg-primary/10 transition-colors duration-300"
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Carlos Filho
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-1">
                      Desenvolvedor Full Stack
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
