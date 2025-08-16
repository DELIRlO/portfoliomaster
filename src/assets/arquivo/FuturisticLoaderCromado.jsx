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
        const increment = Math.random() * 3 + 1.5; // Velocidade variável
        const newProgress = prev + increment;

        if (newProgress >= 100) {
          clearInterval(interval);
          // Aguarda um pouco antes de chamar onComplete
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

  // Controla os passos do loading
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    // Mostra o texto após um delay
    setTimeout(() => setShowText(true), 400);

    return () => clearInterval(stepInterval);
  }, [steps.length]);

  // Gera partículas flutuantes com a nova paleta
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
      {/* Grid de fundo animado com nova paleta */}
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
      </div>

      {/* Partículas flutuantes */}
      {particles}

      {/* Efeito de brilho radial */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-radial-gradient from-[#ffffff10] to-transparent"></div>
      </div>

      {/* Container principal */}
      <div className="relative z-10 text-center max-w-lg w-full px-4">
        {/* Holograma central */}
        <div className="relative mb-8">
          <div className="w-64 h-64 relative mx-auto">
            {/* Anéis rotativos com nova paleta */}
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

            {/* Núcleo central com gradiente da paleta */}
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

            {/* Linha de escaneamento com nova paleta */}
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

          {/* Barra de progresso com a paleta completa */}
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

          {/* Steps do loading com nova paleta */}
          <div className="text-left space-y-2 mb-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 text-sm transition-all duration-500 ${
                  index <= currentStep
                    ? "text-[#e8e8e8] opacity-100"
                    : "text-[#4a4a4a] opacity-50"
                }`}
              >
                <div className="flex-shrink-0">
                  {index < currentStep ? (
                    <div className="w-2 h-2 bg-[#ffffff] rounded-full" />
                  ) : index === currentStep ? (
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{
                        background: `linear-gradient(90deg, #6b6b6b, #e8e8e8, #6b6b6b)`,
                      }}
                    />
                  ) : (
                    <div className="w-2 h-2 bg-[#4a4a4a] rounded-full" />
                  )}
                </div>
                <span className="font-mono text-xs">
                  {index < currentStep
                    ? "✓"
                    : index === currentStep
                    ? "▶"
                    : "○"}{" "}
                  {step}
                </span>
              </div>
            ))}
          </div>

          {/* Código binário com nova paleta */}
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

      {/* Estilos CSS inline para garantir funcionamento */}
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
      `}</style>
    </div>
  );
};

export default FuturisticLoader;
