import { useState, useEffect } from "react";

const FuturisticLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showText, setShowText] = useState(false);

  const steps = [
    "Inicializando sistema...",
    "Carregando componentes React...",
    "Conectando APIs...",
    "Compilando interface...",
    "Otimizando performance...",
    "Portfolio pronto!",
  ];

  // Controla o progresso da barra
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 3 + 1.5;
        const newProgress = prev + increment;

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 800);
          return 100;
        }
        return newProgress;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Controla os passos do loading - mais demorado
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 1400); // Aumentado de 800ms para 1400ms

    setTimeout(() => setShowText(true), 600); // Aumentado de 400ms para 600ms

    return () => clearInterval(stepInterval);
  }, [steps.length]);

  // Gera partículas flutuantes
  const particles = Array.from({ length: 30 }, (_, i) => {
    const colors = [
      "bg-[#2d2d2d]",
      "bg-[#4a4a4a]",
      "bg-[#6b6b6b]",
      "bg-[#e8e8e8]",
      "bg-[#ffffff]",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return (
      <div
        key={i}
        className={`absolute w-1.5 h-1.5 ${randomColor} rounded-full`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 5}s`,
          opacity: Math.random() * 0.5 + 0.1,
        }}
      />
    );
  });

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] backdrop-blur-md flex items-center justify-center overflow-hidden">
      {/* Grid de fundo animado com energia */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(232, 232, 232, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(232, 232, 232, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            animation: "gridMove 20s linear infinite",
          }}
        />

        {/* Quadrados com energia pulsante - apenas azul */}
        {Array.from({ length: 50 }, (_, i) => {
          const gridX = (i % 10) * 120;
          const gridY = Math.floor(i / 10) * 100;
          return (
            <div
              key={`energy-${i}`}
              className="absolute"
              style={{
                left: `${gridX}px`,
                top: `${gridY}px`,
                width: "40px",
                height: "40px",
                border: "1px solid transparent",
                background: "transparent",
                animation: `energyGrid ${
                  3 + Math.random() * 4
                }s ease-in-out infinite`,
                animationDelay: `${Math.random() * 6}s`,
              }}
            />
          );
        })}

        {/* Ondas de energia atravessando o grid - apenas azul */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 38px,
                rgba(0, 136, 255, 0.1) 40px,
                rgba(0, 136, 255, 0.1) 42px,
                transparent 44px
              )
            `,
            animation: "energyWave 4s linear infinite",
          }}
        />
      </div>

      {/* Partículas flutuantes */}
      {particles}

      {/* Trilhas de energia - apenas azul */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Trilhas verticais azuis */}
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-0.5 opacity-25"
            style={{
              left: `${15 + i * 15}%`,
              top: `-100px`,
              height: "200px",
              background: `linear-gradient(180deg, 
                transparent, 
                #0088ff 20%, 
                #ffffff 50%, 
                #0088ff 80%, 
                transparent)`,
              animation: `energyFlowV ${
                2.5 + Math.random() * 2.5
              }s linear infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Efeito de brilho radial */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-radial-gradient from-[#ffffff10] to-transparent"></div>
      </div>

      {/* Container principal */}
      <div className="relative z-10 text-center max-w-lg w-full px-4">
        {/* Holograma central */}
        <div className="relative mb-8">
          <div className="w-64 h-64 relative mx-auto">
            {/* Anéis rotativos */}
            {[1, 2, 3].map((ring) => (
              <div
                key={ring}
                className="absolute inset-0 rounded-full"
                style={{
                  width: `${ring * 80}px`,
                  height: `${ring * 80}px`,
                  margin: "auto",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  animation: `rotate${ring} ${3 + ring}s linear infinite`,
                  border:
                    ring === 2
                      ? `1px dashed rgba(232, 232, 232, 0.3)`
                      : `1px solid rgba(107, 107, 107, 0.3)`,
                  boxShadow: `0 0 ${ring * 5}px rgba(232, 232, 232, 0.1)`,
                }}
              />
            ))}

            {/* Núcleo central */}
            <div className="absolute inset-0 w-32 h-32 m-auto rounded-full backdrop-blur-sm border border-[#6b6b6b]/50 flex items-center justify-center">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, 
                    #2d2d2d 0%,
                    #4a4a4a 25%,
                    #6b6b6b 50%,
                    #e8e8e8 75%,
                    #ffffff 100%)`,
                  animation: "pulse 2s ease-in-out infinite alternate",
                  boxShadow: `0 0 20px rgba(232, 232, 232, 0.3)`,
                }}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-[#e8e8e8] to-[#ffffff] bg-clip-text text-transparent">
                  CF
                </div>
              </div>
            </div>

            {/* Linha de escaneamento */}
            <div className="absolute inset-0 w-64 h-64 m-auto">
              <div
                className="absolute w-full h-0.5"
                style={{
                  top: "50%",
                  transformOrigin: "center",
                  animation: "scan 2s ease-in-out infinite",
                  background: `linear-gradient(90deg, 
                    transparent, 
                    #e8e8e8, 
                    #ffffff, 
                    #e8e8e8, 
                    transparent)`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Seção de progresso */}
        <div className="w-full max-w-sm mx-auto">
          {/* Texto de apresentação */}
          <div
            className={`mb-6 transition-all duration-500 ${
              showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#e8e8e8] to-[#ffffff] bg-clip-text text-transparent mb-2">
              CARLOS FILHO
            </h2>
            <p className="text-[#6b6b6b] text-sm font-mono">
              ENGENHEIRO DE COMPUTAÇÃO
            </p>
          </div>

          {/* Barra de progresso */}
          <div className="relative mb-4">
            <div className="w-full h-2 bg-[#2d2d2d]/80 backdrop-blur-sm rounded-full overflow-hidden border border-[#4a4a4a]/30">
              <div
                className="h-full rounded-full relative overflow-hidden transition-all duration-300 ease-out"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background: `linear-gradient(90deg, 
                    #2d2d2d 0%,
                    #4a4a4a 15%,
                    #6b6b6b 30%,
                    #e8e8e8 45%,
                    #ffffff 50%,
                    #e8e8e8 55%,
                    #6b6b6b 70%,
                    #4a4a4a 85%,
                    #2d2d2d 100%)`,
                }}
              >
                {/* Efeito brilho */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(90deg, 
                      transparent, 
                      rgba(255,255,255,0.5), 
                      transparent)`,
                    animation: "shimmer 1.5s ease-in-out infinite",
                    transform: "skewX(-15deg)",
                  }}
                />
              </div>
            </div>

            {/* Porcentagem */}
            <div className="absolute -top-8 right-0 text-[#e8e8e8] text-sm font-mono">
              {Math.round(Math.min(progress, 100))}%
            </div>
          </div>

          {/* Steps do loading - SÍMBOLO MINIMALISTA */}
          <div className="text-left space-y-2 mb-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 text-sm transition-all duration-500 ${
                  index <= currentStep
                    ? "text-green-400 opacity-100"
                    : "text-[#4a4a4a] opacity-50"
                }`}
              >
                <div className="flex-shrink-0 w-4 flex items-center justify-center">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      index < currentStep
                        ? "bg-green-400"
                        : index === currentStep
                        ? "bg-green-400 animate-pulse"
                        : "bg-[#4a4a4a]"
                    }`}
                  />
                </div>
                {/* Símbolo minimalista em azul */}
                <span className="text-blue-400 text-xs mr-1">
                  {index < currentStep
                    ? "✓"
                    : index === currentStep
                    ? "▸"
                    : "○"}
                </span>
                <span className="font-mono text-xs text-green-400">{step}</span>
              </div>
            ))}
          </div>

          {/* Código binário */}
          <div className="text-center">
            <div className="text-xs font-mono text-[#6b6b6b]/60 space-x-1">
              {Array.from({ length: 24 }, (_, i) => (
                <span
                  key={i}
                  className="inline-block animate-pulse"
                  style={{
                    animationDelay: `${i * 50}ms`,
                    color: Math.random() > 0.7 ? "#e8e8e8" : "#6b6b6b",
                  }}
                >
                  {Math.round(Math.random())}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Estilos CSS */}
      <style jsx>{`
        @keyframes rotate1 {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes rotate2 {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        @keyframes rotate3 {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes scan {
          0%,
          100% {
            transform: rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: rotate(180deg);
            opacity: 0.7;
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(400%) skewX(-15deg);
          }
        }
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(40px, 40px);
          }
        }
        @keyframes pulse {
          0% {
            transform: scale(0.98);
            opacity: 0.9;
          }
          100% {
            transform: scale(1.02);
            opacity: 1;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(
              ${Math.random() * 20 - 10}px,
              ${Math.random() * 20 - 10}px
            );
          }
        }

        @keyframes energyFlowV {
          0% {
            transform: translateY(-100px);
            opacity: 0;
          }
          20% {
            opacity: 0.25;
          }
          80% {
            opacity: 0.25;
          }
          100% {
            transform: translateY(calc(100vh + 100px));
            opacity: 0;
          }
        }

        @keyframes energyGrid {
          0%,
          90% {
            border-color: transparent;
            box-shadow: none;
            background: transparent;
          }
          10% {
            border-color: rgba(0, 136, 255, 0.6);
            box-shadow: 0 0 15px rgba(0, 136, 255, 0.4),
              inset 0 0 15px rgba(0, 136, 255, 0.2);
            background: rgba(0, 136, 255, 0.1);
          }
        }

        @keyframes energyWave {
          0% {
            transform: translateX(-100%) translateY(-100%);
            opacity: 0.3;
          }
          50% {
            opacity: 0.1;
          }
          100% {
            transform: translateX(100%) translateY(100%);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

export default FuturisticLoader;
