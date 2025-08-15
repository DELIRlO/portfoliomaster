import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "./ui/button";
import { ArrowDown, Download } from "lucide-react";
import userData from "../userData";
import PageTransition from "./PageTransition";

const Hero = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
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

  // Função para criar efeito nas letras
  const createLetterEffect = (text) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="letter-effect"
        style={{
          animationDelay: `${index * 0.1}s`,
          display: "inline-block",
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <PageTransition isVisible={inView}>
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>

        {/* Estilos CSS para brilho interno e zoom no hover */}
        <style jsx>{`
          @keyframes shimmerEffect {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }

          .circle-shimmer {
            background: linear-gradient(
              90deg,
              #2d2d2d 0%,
              #4a4a4a 15%,
              #6b6b6b 30%,
              #e8e8e8 45%,
              #ffffff 50%,
              #e8e8e8 55%,
              #6b6b6b 70%,
              #4a4a4a 85%,
              #2d2d2d 100%
            );
            background-size: 400% 100%;
            animation: shimmerEffect 5s ease-in-out infinite;
          }

          .letter-effect {
            position: relative;
            display: inline-block;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: default;
            background: linear-gradient(
              90deg,
              #2d2d2d 0%,
              #4a4a4a 15%,
              #6b6b6b 30%,
              #e8e8e8 45%,
              #ffffff 50%,
              #e8e8e8 55%,
              #6b6b6b 70%,
              #4a4a4a 85%,
              #2d2d2d 100%
            );
            background-size: 200% 100%;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmerEffect 3s ease-in-out infinite;
          }

          .letter-effect:hover {
            transform: scale(1.14);
            filter: drop-shadow(0 0 6px rgba(232, 232, 232, 0.6))
              drop-shadow(0 0 11px rgba(255, 255, 255, 0.5))
              drop-shadow(0 0 17px rgba(107, 107, 107, 0.35));
            animation-duration: 1s;
          }

          /* Efeito diferenciado para cada letra baseado na posição */
          .letter-effect:nth-child(odd) {
            animation-delay: 0.1s;
          }

          .letter-effect:nth-child(even) {
            animation-delay: 0.3s;
          }

          .letter-effect:nth-child(3n) {
            animation-delay: 0.5s;
          }

          /* Suporte para browsers que não suportam background-clip */
          @supports not (-webkit-background-clip: text) {
            .letter-effect {
              background: none;
              -webkit-text-fill-color: initial;
              color: inherit;
              text-shadow: 0 0 10px rgba(232, 232, 232, 0.6);
            }

            .letter-effect:hover {
              color: #e8e8e8;
              text-shadow: 0 0 4px #ffffff, 0 0 7px #e8e8e8, 0 0 11px #6b6b6b;
            }
          }
        `}</style>

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
              <div className="relative group w-32 h-32 mx-auto mb-6">
                <div className="absolute -inset-0.5 circle-shimmer rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-full h-full rounded-full bg-background flex items-center justify-center text-4xl font-bold gradient-text">
                  {createLetterEffect("CF")}
                </div>
              </div>
            </div>

            {/* Título principal com efeito nas letras */}
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {createLetterEffect("Olá, eu sou ")}
              <span className="gradient-text">
                {createLetterEffect(userData.name)}
              </span>
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
                  <a
                    href="#contact"
                    className="relative z-10 flex items-center"
                  >
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
    </PageTransition>
  );
};

export default Hero;
2;
