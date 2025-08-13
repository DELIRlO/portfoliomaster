import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "./ui/button";
import { ArrowDown, Download } from "lucide-react";
import userData from "../userData";

const Hero = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const typewriterRef = useRef(null);
  const [hoveredButton, setHoveredButton] = useState("");

  useEffect(() => {
    if (inView && typewriterRef.current) {
      const text = userData.title;
      const element = typewriterRef.current;
      element.innerHTML = "";

      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      };

      setTimeout(typeWriter, 500);
    }
  }, [inView]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>

      <div
        ref={ref}
        className="container mx-auto px-4 text-center relative z-10"
      >
        <div
          className={`transition-all duration-1000 ${
            inView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent p-1">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-4xl font-bold gradient-text">
                CF
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Olá, eu sou <span className="gradient-text">{userData.name}</span>
          </h1>

          <div className="h-16 mb-6">
            <p
              ref={typewriterRef}
              className="text-xl md:text-2xl text-muted-foreground min-h-[2rem]"
            ></p>
          </div>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {userData.about}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div
              className="relative group"
              onMouseEnter={() => setHoveredButton("projects")}
              onMouseLeave={() => setHoveredButton("")}
            >
              <Button
                size="lg"
                className="glow bg-transparent hover:bg-transparent px-6"
                asChild
              >
                <a href="#projects" className="relative z-10 block">
                  <span
                    className={`text-foreground group-hover:text-blue-500 transition-colors duration-300 ${
                      hoveredButton === "projects" ? "text-blue-500" : ""
                    }`}
                  >
                    Ver Projetos
                  </span>
                </a>
              </Button>
              <span
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[3px] w-0 bg-blue-500 group-hover:w-4/5 transition-all duration-400 ${
                  hoveredButton === "projects" ? "w-4/5" : ""
                }`}
              ></span>
            </div>

            <div
              className="relative group"
              onMouseEnter={() => setHoveredButton("cv")}
              onMouseLeave={() => setHoveredButton("")}
            >
              <Button
                variant="outline"
                size="lg"
                className="hover:bg-transparent px-6"
                asChild
              >
                <a href="#contact" className="relative z-10 flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  <span
                    className={`text-foreground group-hover:text-blue-500 transition-colors duration-300 ${
                      hoveredButton === "cv" ? "text-blue-500" : ""
                    }`}
                  >
                    Baixar CV
                  </span>
                </a>
              </Button>
              <span
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[3px] w-0 bg-blue-500 group-hover:w-4/5 transition-all duration-400 ${
                  hoveredButton === "cv" ? "w-4/5" : ""
                }`}
              ></span>
            </div>
          </div>

          <div className="animate-bounce">
            <Button variant="ghost" size="icon" asChild>
              <a href="#about">
                <ArrowDown className="h-6 w-6" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/10 rounded-full blur-lg animate-pulse delay-500"></div>
    </section>
  );
};

export default Hero;
