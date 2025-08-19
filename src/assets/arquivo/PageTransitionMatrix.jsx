import { useEffect, useState, useRef } from "react";

const PageTransition = ({ children, isVisible = true }) => {
  const [stage, setStage] = useState(0);
  const containerRef = useRef(null);
  const requestRef = useRef();
  const previousTimeRef = useRef();

  // Configurações otimizadas
  const settings = {
    binary: {
      count: Math.floor((window.innerWidth * window.innerHeight) / 2500), // Reduzido em 60%
      size: 12,
      speed: 1.5,
    },
    particles: {
      count: Math.floor((window.innerWidth * window.innerHeight) / 7500), // 1/3 dos elementos
      size: 4,
      speed: 0.8,
    },
  };

  const [elements, setElements] = useState([]);

  // Inicialização otimizada
  useEffect(() => {
    const initElements = () => {
      const newElements = [];

      // Adiciona números binários (2/3)
      for (let i = 0; i < settings.binary.count; i++) {
        newElements.push({
          id: `b-${i}`,
          type: "binary",
          value: Math.random() > 0.5 ? "1" : "0",
          x: Math.random() * 100,
          y: Math.random() * 100,
          speed: Math.random() * 0.5 + settings.binary.speed,
          size: Math.random() * 4 + settings.binary.size,
          flip: Math.floor(Math.random() * 30) + 20,
        });
      }

      // Adiciona partículas (1/3)
      for (let i = 0; i < settings.particles.count; i++) {
        newElements.push({
          id: `p-${i}`,
          type: "particle",
          x: Math.random() * 100,
          y: Math.random() * 100,
          speed: Math.random() * 0.3 + settings.particles.speed,
          size: Math.random() * 2 + settings.particles.size,
        });
      }

      setElements(newElements);
    };

    initElements();

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Animação otimizada com requestAnimationFrame
  const animate = (time) => {
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time;
    }

    const deltaTime = time - previousTimeRef.current;
    previousTimeRef.current = time;

    if (deltaTime > 100) return; // Limita fps em caso de lag

    setElements((prev) =>
      prev.map((el) => {
        // Movimento vertical
        const newY = el.y > 100 ? 0 : el.y + el.speed * (deltaTime / 16);

        // Atualiza binários
        if (el.type === "binary") {
          return {
            ...el,
            y: newY,
            flip: el.flip - 1,
            value: el.flip <= 0 ? (el.value === "1" ? "0" : "1") : el.value,
            flip: el.flip <= 0 ? Math.floor(Math.random() * 30) + 20 : el.flip,
          };
        }

        // Atualiza partículas
        return {
          ...el,
          y: newY,
        };
      })
    );

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (stage === 4) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current);
    }

    return () => cancelAnimationFrame(requestRef.current);
  }, [stage]);

  // Controle dos estágios
  useEffect(() => {
    if (!isVisible) {
      setStage(0);
      return;
    }

    setStage(1);
    const timer2 = setTimeout(() => setStage(2), 200);
    const timer3 = setTimeout(() => setStage(3), 400);
    const timer4 = setTimeout(() => setStage(4), 600);

    return () => {
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {/* Conteúdo principal */}
      <div
        className={`relative z-0 transition-opacity duration-500 ${
          stage === 4 ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>

      {/* Efeito de transição */}
      {stage > 0 && stage < 4 && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
          <div className="text-2xl md:text-4xl font-bold text-white animate-pulse">
            {stage === 1 && "Loading..."}
            {stage === 2 && "Initializing..."}
            {stage === 3 && "Almost there..."}
          </div>
        </div>
      )}

      {/* Efeito pós-transição (stage 4) */}
      {stage === 4 && (
        <>
          {/* Brilho metálico (30% opacity) */}
          <div
            className="absolute inset-0 z-10 pointer-events-none opacity-30"
            style={{
              background: `
                linear-gradient(
                  135deg,
                  rgba(27, 27, 27, 0.3) 0%,  
                  rgba(37, 37, 37, 0.3) 15%,  
                  rgba(53, 53, 53, 0.3) 25%,  
                  rgba(85, 85, 85, 0.3) 35%,  
                  rgba(122, 122, 122, 0.3) 42%,  
                  rgba(153, 153, 153, 0.3) 46%,  
                  rgba(255, 255, 255, 0.3) 50%,  
                  rgba(153, 153, 153, 0.3) 54%,  
                  rgba(122, 122, 122, 0.3) 58%,  
                  rgba(85, 85, 85, 0.3) 65%,  
                  rgba(53, 53, 53, 0.3) 75%,  
                  rgba(37, 37, 37, 0.3) 85%,  
                  rgba(27, 27, 27, 0.3) 100%  
                )`,
              backgroundSize: "400% 400%",
              animation: "metalReflection 8s linear infinite",
              mixBlendMode: "overlay",
            }}
          />

          {/* Elementos animados */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {elements.map((el) => (
              <div
                key={el.id}
                className={`absolute ${
                  el.type === "binary"
                    ? "font-mono text-green-400"
                    : "rounded-full bg-white"
                }`}
                style={{
                  left: `${el.x}%`,
                  top: `${el.y}%`,
                  fontSize: `${el.size}px`,
                  width: el.type === "particle" ? `${el.size}px` : "auto",
                  height: el.type === "particle" ? `${el.size}px` : "auto",
                  opacity: el.type === "particle" ? 0.6 : 0.8,
                  transform: `translateY(${
                    Math.sin(Date.now() * 0.001 * el.speed * 10) * 5
                  }px)`,
                }}
              >
                {el.type === "binary" ? el.value : ""}
              </div>
            ))}
          </div>
        </>
      )}

      <style jsx global>{`
        @keyframes metalReflection {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 400% 400%;
          }
        }
      `}</style>
    </div>
  );
};

export default PageTransition;
