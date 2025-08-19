import { useEffect, useState } from "react";

const PageTransition = ({ children, isVisible = true }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setStage(0);
      return;
    }

    setStage(1);
    const timer1 = setTimeout(() => setStage(2), 300);
    const timer2 = setTimeout(() => setStage(3), 600);
    const timer3 = setTimeout(() => setStage(4), 900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isVisible]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Conteúdo principal */}
      <div
        className={`relative z-0 transition-opacity duration-500 ${
          stage === 4 ? "opacity-100" : "opacity-70"
        }`}
      >
        {children}
      </div>

      {/* Efeito de reflexo metálico */}
      {stage > 0 && (
        <div
          className={`absolute inset-0 z-10 pointer-events-none ${
            stage < 4 ? "opacity-100" : "opacity-0"
          } transition-opacity duration-700`}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `
              linear-gradient(
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
              )`,
              backgroundSize: "400% 400%",
              animation: "cascadeReflection 5s linear infinite",
              mixBlendMode: "overlay",
            }}
          ></div>

          {/* Efeito de partículas */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0,
                animation: `particleFade ${
                  0.5 + Math.random() * 1
                }s ease-in-out infinite alternate`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}

          {/* Efeito de borda luminosa */}
          <div
            className={`absolute inset-0 border-2 ${
              stage === 2 ? "opacity-80" : "opacity-0"
            } transition-opacity duration-300`}
            style={{
              borderImage: `
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
              ) 1`,
              mixBlendMode: "screen",
            }}
          ></div>
        </div>
      )}

      <style jsx global>{`
        @keyframes cascadeReflection {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 400% 400%;
          }
        }

        @keyframes particleFade {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: ${Math.random() * 0.5 + 0.3};
          }
          100% {
            opacity: 0;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default PageTransition;
