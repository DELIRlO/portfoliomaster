import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "./ui/button";
import { ArrowDown, Download, Eye, Briefcase } from "lucide-react";
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
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 md:pt-0"
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

          @keyframes shimmerEffectDiagonal {
            0% {
              background-position: -100% -100%;
            }
            100% {
              background-position: 100% 100%;
            }
          }

          .name-chrome-effect .letter-effect {
            background: linear-gradient(
              135deg,
              #d4d4d4 0%,
              #fafafa 25%,
              #d4d4d4 50%,
              #fafafa 75%,
              #d4d4d4 100%
            );
            background-size: 200% 200%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmerEffectDiagonal 3s ease-in-out infinite;
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

          /* Responsividade para mobile */
          @media (max-width: 768px) {
            .letter-effect:hover {
              transform: scale(1.05);
            }
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

          /* Animações profissionais para os botões - REDUZIDO EM 40% */
          @keyframes professionalGlow {
            0%,
            100% {
              box-shadow: 0 0 3px rgba(59, 130, 246, 0.18),
                0 0 6px rgba(59, 130, 246, 0.12),
                0 0 9px rgba(59, 130, 246, 0.06),
                inset 0 1px 0 rgba(255, 255, 255, 0.06);
            }
            50% {
              box-shadow: 0 0 6px rgba(59, 130, 246, 0.3),
                0 0 12px rgba(59, 130, 246, 0.18),
                0 0 18px rgba(59, 130, 246, 0.12),
                inset 0 1px 0 rgba(255, 255, 255, 0.12);
            }
          }

          @keyframes professionalGlowCV {
            0%,
            100% {
              box-shadow: 0 0 3px rgba(34, 197, 94, 0.18),
                0 0 6px rgba(34, 197, 94, 0.12), 0 0 9px rgba(34, 197, 94, 0.06),
                inset 0 1px 0 rgba(255, 255, 255, 0.06);
            }
            50% {
              box-shadow: 0 0 6px rgba(34, 197, 94, 0.3),
                0 0 12px rgba(34, 197, 94, 0.18),
                0 0 18px rgba(34, 197, 94, 0.12),
                inset 0 1px 0 rgba(255, 255, 255, 0.12);
            }
          }

          @keyframes professionalGlowRed {
            0%,
            100% {
              box-shadow: 0 0 3px rgba(255, 0, 0, 0.18),
                0 0 6px rgba(255, 0, 0, 0.12), 0 0 9px rgba(255, 0, 0, 0.06),
                inset 0 1px 0 rgba(255, 255, 255, 0.06);
            }
            50% {
              box-shadow: 0 0 6px rgba(255, 0, 0, 0.3),
                0 0 12px rgba(255, 0, 0, 0.18), 0 0 18px rgba(255, 0, 0, 0.12),
                inset 0 1px 0 rgba(255, 255, 255, 0.12);
            }
          }

          @keyframes slideShine {
            0% {
              transform: translateX(-100%) skewX(-15deg);
              opacity: 0.6;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateX(300%) skewX(-15deg);
              opacity: 0.6;
            }
          }

          @keyframes pulseScale {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.02);
            }
          }

          @keyframes textShimmer {
            0% {
              background-position: -200% center;
            }
            100% {
              background-position: 200% center;
            }
          }

          /* Classe base para botões profissionais */
          .professional-button {
            position: relative;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            background: linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.1),
              rgba(255, 255, 255, 0.05)
            );
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transform: translateY(0);
          }

          .professional-button:hover {
            transform: translateY(-2px);
            animation: pulseScale 2s ease-in-out infinite;
          }

          /* Responsividade para botões em mobile */
          @media (max-width: 640px) {
            .professional-button {
              padding: 0.75rem 1.5rem !important;
              font-size: 0.9rem !important;
            }

            .professional-button:hover {
              transform: translateY(-1px);
            }
          }

          /* Botão Ver Projetos */
          .projects-button {
            background: linear-gradient(
              145deg,
              rgba(59, 130, 246, 0.1),
              rgba(37, 99, 235, 0.05)
            );
            border: 1px solid rgba(59, 130, 246, 0.3);
          }

          .projects-button:hover {
            animation: professionalGlow 2s ease-in-out infinite;
            background: linear-gradient(
              145deg,
              rgba(59, 130, 246, 0.2),
              rgba(37, 99, 235, 0.1)
            );
            border-color: rgba(59, 130, 246, 0.5);
          }

          /* Botão Baixar CV */
          .cv-button {
            background: linear-gradient(
              145deg,
              rgba(34, 197, 94, 0.1),
              rgba(21, 128, 61, 0.05)
            );
            border: 1px solid rgba(34, 197, 94, 0.3);
          }

          .cv-button:hover {
            animation: professionalGlowCV 2s ease-in-out infinite;
            background: linear-gradient(
              145deg,
              rgba(34, 197, 94, 0.2),
              rgba(21, 128, 61, 0.1)
            );
            border-color: rgba(34, 197, 94, 0.5);
          }

          /* Botão CV Vermelho */
          .cv-button-red {
            background: linear-gradient(
              145deg,
              rgba(255, 0, 0, 0.1),
              rgba(200, 0, 0, 0.05)
            );
            border: 1px solid rgba(255, 0, 0, 0.3);
          }

          .cv-button-red:hover {
            animation: professionalGlowRed 2s ease-in-out infinite;
            background: linear-gradient(
              145deg,
              rgba(255, 0, 0, 0.2),
              rgba(200, 0, 0, 0.1)
            );
            border-color: rgba(255, 0, 0, 0.5);
          }

          /* Efeito de brilho deslizante */
          .professional-button::before {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.2),
              transparent
            );
            transition: left 0.5s;
          }

          .professional-button:hover::before {
            left: 100%;
            animation: slideShine 2s ease-in-out infinite;
          }

          /* Texto e ícones com gradiente animado - ÍCONES AGORA VISÍVEIS */
          .animated-text {
            background: linear-gradient(
              90deg,
              #ffffff 0%,
              #e2e8f0 25%,
              #ffffff 50%,
              #e2e8f0 75%,
              #ffffff 100%
            );
            background-size: 200% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: textShimmer 3s ease-in-out infinite;
          }

          .animated-text-blue {
            background: linear-gradient(
              90deg,
              #3b82f6 0%,
              #1d4ed8 25%,
              #60a5fa 50%,
              #3b82f6 75%,
              #1e40af 100%
            );
            background-size: 200% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: textShimmer 3s ease-in-out infinite;
          }

          .animated-text-green {
            background: linear-gradient(
              90deg,
              #22c55e 0%,
              #15803d 25%,
              #4ade80 50%,
              #22c55e 75%,
              #166534 100%
            );
            background-size: 200% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: textShimmer 3s ease-in-out infinite;
          }

          /* Ícones com cor visível e efeito shimmer */
          .icon-shimmer {
            filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.3));
            transition: all 0.3s ease;
          }

          .icon-shimmer-blue {
            color: #60a5fa;
            filter: drop-shadow(0 0 3px rgba(96, 165, 250, 0.4));
          }

          .icon-shimmer-green {
            color: #4ade80;
            filter: drop-shadow(0 0 3px rgba(74, 222, 128, 0.4));
          }

          .professional-button:hover .icon-shimmer {
            transform: scale(1.1);
            filter: drop-shadow(0 0 4px currentColor);
          }

          /* Partículas flutuantes - AUMENTADO EM 40% */
          .floating-particles {
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
          }

          .particle {
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            animation: floatUp 3s ease-out infinite;
          }

          .particle.blue {
            background: rgba(59, 130, 246, 0.8);
          }

          .particle.green {
            background: rgba(34, 197, 94, 0.8);
          }

          @keyframes floatUp {
            0% {
              opacity: 0;
              transform: translateY(20px) scale(0);
            }
            10% {
              opacity: 1;
              transform: translateY(15px) scale(1);
            }
            90% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: translateY(-20px) scale(0);
            }
          }

          /* Efeito de linha brilhante embaixo */
          .glow-line {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 2px;
            background: linear-gradient(
              90deg,
              transparent,
              currentColor,
              transparent
            );
            transition: width 0.4s ease-out;
          }

          .professional-button:hover .glow-line {
            width: 80%;
          }

          /* Borda animada */
          .animated-border {
            position: absolute;
            inset: 0;
            border-radius: inherit;
            padding: 1px;
            background: linear-gradient(
              45deg,
              transparent,
              currentColor,
              transparent
            );
            -webkit-mask: linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: exclude;
            mask: linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            mask-composite: exclude;
            opacity: 0;
            transition: opacity 0.4s ease;
          }

          .professional-button:hover .animated-border {
            opacity: 0.5;
            animation: rotate-border 2s linear infinite;
          }

          @keyframes rotate-border {
            0% {
              background: linear-gradient(
                45deg,
                transparent,
                currentColor,
                transparent
              );
            }
            25% {
              background: linear-gradient(
                135deg,
                transparent,
                currentColor,
                transparent
              );
            }
            50% {
              background: linear-gradient(
                225deg,
                transparent,
                currentColor,
                transparent
              );
            }
            75% {
              background: linear-gradient(
                315deg,
                transparent,
                currentColor,
                transparent
              );
            }
            100% {
              background: linear-gradient(
                45deg,
                transparent,
                currentColor,
                transparent
              );
            }
          }

          /* Responsividade específica para o círculo CF */
          @media (max-width: 768px) {
            .hero-circle {
              width: 5rem !important; /* 80px */
              height: 5rem !important; /* 80px */
              margin-bottom: 1rem !important;
            }

            .hero-circle-text {
              font-size: 1.5rem !important; /* 24px */
            }
          }

          @media (max-width: 640px) {
            .hero-circle {
              width: 4rem !important; /* 64px */
              height: 4rem !important; /* 64px */
              margin-bottom: 0.75rem !important;
            }

            .hero-circle-text {
              font-size: 1.25rem !important; /* 20px */
            }
          }

          /* Responsividade para títulos */
          @media (max-width: 768px) {
            .hero-main-title {
              font-size: 2rem !important; /* 32px */
              line-height: 2.5rem !important;
              margin-bottom: 0.75rem !important;
            }

            .hero-typewriter {
              font-size: 1.125rem !important; /* 18px */
              line-height: 1.5rem !important;
              min-height: 1.5rem !important;
            }

            .hero-description {
              font-size: 0.875rem !important; /* 14px */
              line-height: 1.25rem !important;
              margin-bottom: 1.5rem !important;
            }
          }

          @media (max-width: 640px) {
            .hero-main-title {
              font-size: 1.75rem !important; /* 28px */
              line-height: 2rem !important;
            }

            .hero-typewriter {
              font-size: 1rem !important; /* 16px */
            }

            .hero-description {
              font-size: 0.8rem !important; /* ~13px */
              padding: 0 0.5rem !important;
            }
          }

          /* Ajustes para botões em mobile empilhados */
          @media (max-width: 640px) {
            .hero-buttons-container {
              gap: 1rem !important;
              margin-bottom: 2rem !important;
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
            <div className="mb-4 md:mb-8">
              <div className="relative group hero-circle w-20 h-20 md:w-32 md:h-32 mx-auto mb-3 md:mb-6">
                <div className="absolute -inset-0.5 circle-shimmer rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="hero-circle-text relative w-full h-full rounded-full bg-background flex items-center justify-center text-2xl md:text-4xl font-bold gradient-text">
                  {createLetterEffect("CF")}
                </div>
              </div>
            </div>

            {/* Título principal com efeito nas letras */}
            <h1 className="hero-main-title text-2xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4">
              {createLetterEffect("Olá, eu sou ")}
              <span className="gradient-text">
                {createLetterEffect(userData.name)}
              </span>
            </h1>

            <div className="h-12 md:h-16 mb-4 md:mb-6">
              <p
                ref={typewriterRef}
                className="hero-typewriter text-lg md:text-xl lg:text-2xl text-muted-foreground min-h-[1.5rem] md:min-h-[2rem]"
              ></p>
            </div>

            <p className="hero-description text-sm md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto px-2 md:px-0">
              {userData.about}
            </p>

            {/* Botões com animações profissionais */}
            <div className="hero-buttons-container flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-8 md:mb-12">
              {/* Botão Ver Projetos */}
              <div className="relative group w-full sm:w-auto">
                <Button
                  size="lg"
                  className="professional-button projects-button w-full sm:w-auto px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-semibold relative z-10"
                  asChild
                  onMouseEnter={() => setHoveredButton("projects")}
                  onMouseLeave={() => setHoveredButton("")}
                >
                  <a
                    href="#projects"
                    className="flex items-center justify-center gap-2 md:gap-3"
                  >
                    <Eye
                      className={`h-4 w-4 md:h-5 md:w-5 icon-shimmer ${
                        hoveredButton === "projects" ? "icon-shimmer-blue" : ""
                      }`}
                    />
                    <span
                      className={
                        hoveredButton === "projects"
                          ? "animated-text-blue"
                          : "animated-text"
                      }
                    >
                      Ver Projetos
                    </span>
                  </a>
                </Button>

                {/* Partículas flutuantes - AUMENTADO PARA 8 (40% mais que 6) */}
                {hoveredButton === "projects" && (
                  <div className="floating-particles">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="particle blue"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          animationDelay: `${i * 0.25}s`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Linha brilhante */}
                <div className="glow-line" style={{ color: "#3b82f6" }}></div>

                {/* Borda animada */}
                <div
                  className="animated-border"
                  style={{ color: "#3b82f6" }}
                ></div>
              </div>

              {/* Botão Baixar CV */}
              <div className="relative group w-full sm:w-auto">
                <Button
                  size="lg"
                  className="professional-button cv-button w-full sm:w-auto px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-semibold relative z-10"
                  asChild
                  onMouseEnter={() => setHoveredButton("cv")}
                  onMouseLeave={() => setHoveredButton("")}
                >
                  <a
                    href="#contact"
                    className="flex items-center justify-center gap-2 md:gap-3"
                  >
                    <Download
                      className={`h-4 w-4 md:h-5 md:w-5 icon-shimmer ${
                        hoveredButton === "cv" ? "icon-shimmer-green" : ""
                      }`}
                    />
                    <span
                      className={
                        hoveredButton === "cv"
                          ? "animated-text-green"
                          : "animated-text"
                      }
                    >
                      Baixar CV
                    </span>
                  </a>
                </Button>

                {/* Partículas flutuantes - AUMENTADO PARA 8 (40% mais que 6) */}
                {hoveredButton === "cv" && (
                  <div className="floating-particles">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="particle green"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          animationDelay: `${i * 0.25}s`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Linha brilhante */}
                <div className="glow-line" style={{ color: "#22c55e" }}></div>

                {/* Borda animada */}
                <div
                  className="animated-border"
                  style={{ color: "#22c55e" }}
                ></div>
              </div>
            </div>

            <div className="animate-bounce">
              <Button variant="ghost" size="icon" asChild>
                <a href="#about">
                  <ArrowDown className="h-5 w-5 md:h-6 md:w-6" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-12 h-12 md:w-20 md:h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 md:w-32 md:h-32 bg-accent/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-10 h-10 md:w-16 md:h-16 bg-primary/10 rounded-full blur-lg animate-pulse delay-500"></div>
      </section>
    </PageTransition>
  );
};

export default Hero;
