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

  // Gera partículas flutuantes
  const particles = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 3}s`,
      }}
    />
  ));

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center overflow-hidden">
      {/* Grid de fundo animado */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "gridMove 20s linear infinite",
          }}
        />
      </div>

      {/* Partículas flutuantes */}
      {particles}

      {/* Container principal */}
      <div className="relative z-10 text-center max-w-lg w-full px-4">
        {/* Holograma central */}
        <div className="relative mb-8">
          <div className="w-64 h-64 relative mx-auto">
            {/* Anéis rotativos */}
            {[1, 2, 3].map((ring) => (
              <div
                key={ring}
                className="absolute inset-0 rounded-full border border-cyan-400/30"
                style={{
                  width: `${ring * 80}px`,
                  height: `${ring * 80}px`,
                  margin: "auto",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  animation: `rotate${ring} ${3 + ring}s linear infinite`,
                  borderStyle: ring === 2 ? "dashed" : "solid",
                }}
              />
            ))}

            {/* Núcleo central */}
            <div className="absolute inset-0 w-32 h-32 m-auto rounded-full bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-sm border border-cyan-400/50 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/30 to-cyan-500/30 flex items-center justify-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                  CF
                </div>
              </div>
            </div>

            {/* Linha de escaneamento */}
            <div className="absolute inset-0 w-64 h-64 m-auto">
              <div
                className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80"
                style={{
                  top: "50%",
                  transformOrigin: "center",
                  animation: "scan 2s ease-in-out infinite",
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
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              CARLOS FILHO
            </h2>
            <p className="text-cyan-300/80 text-sm font-mono">
              ENGENHEIRO DE COMPUTAÇÃO
            </p>
          </div>

          {/* Barra de progresso */}
          <div className="relative mb-4">
            <div className="w-full h-2 bg-gray-800/50 backdrop-blur-sm rounded-full overflow-hidden border border-cyan-400/20">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full relative overflow-hidden transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                {/* Efeito brilho */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  style={{
                    animation: "shimmer 1.5s ease-in-out infinite",
                    transform: "skewX(-15deg)",
                  }}
                />
              </div>
            </div>

            {/* Porcentagem */}
            <div className="absolute -top-8 right-0 text-cyan-400 text-sm font-mono">
              {Math.round(Math.min(progress, 100))}%
            </div>
          </div>

          {/* Steps do loading */}
          <div className="text-left space-y-2 mb-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 text-sm transition-all duration-500 ${
                  index <= currentStep
                    ? "text-cyan-300 opacity-100"
                    : "text-gray-600 opacity-50"
                }`}
              >
                <div className="flex-shrink-0">
                  {index < currentStep ? (
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                  ) : index === currentStep ? (
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  ) : (
                    <div className="w-2 h-2 bg-gray-600 rounded-full" />
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

          {/* Código binário */}
          <div className="text-center">
            <div className="text-xs font-mono text-cyan-400/40 space-x-1">
              {Array.from({ length: 24 }, (_, i) => (
                <span
                  key={i}
                  className="inline-block animate-pulse"
                  style={{ animationDelay: `${i * 50}ms` }}
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
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </div>
  );
};

export default FuturisticLoader;
