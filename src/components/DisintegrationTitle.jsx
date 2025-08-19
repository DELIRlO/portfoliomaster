import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const DisintegrationTitle = ({ 
  children, 
  className = "", 
  icon = null,
  delay = 0,
  particleCount = 30,
  animationDuration = 2000
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState([]);
  const titleRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  // Gerar partículas baseadas no texto
  const generateParticles = () => {
    const newParticles = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.8 + 0.2,
        delay: Math.random() * 500,
        color: `hsl(${Math.random() * 60 + 200}, 70%, ${Math.random() * 30 + 50}%)`,
      });
    }
    setParticles(newParticles);
  };

  // Trigger da animação quando a seção entra em view
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
        generateParticles();
        
        // Reset após a animação
        setTimeout(() => {
          setIsAnimating(false);
        }, animationDuration);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [inView, delay, animationDuration]);

  return (
    <div ref={ref} className="relative overflow-hidden">
      {/* Título original */}
      <div
        ref={titleRef}
        className={`relative transition-all duration-1000 ${className} ${
          isAnimating ? 'animate-disintegrate' : 'animate-reintegrate'
        }`}
      >
        {icon && (
          <span className="inline-flex items-center mr-3">
            {icon}
          </span>
        )}
        {children}
      </div>

      {/* Partículas de desintegração */}
      {isAnimating && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 rounded-full animate-particle-float"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                opacity: particle.opacity,
                animationDelay: `${particle.delay}ms`,
                animationDuration: `${animationDuration}ms`,
              }}
            />
          ))}
        </div>
      )}

      {/* Efeito de onda energética */}
      {isAnimating && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-energy-wave" />
        </div>
      )}

      <style jsx>{`
        @keyframes disintegrate {
          0% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
            filter: blur(0px);
          }
          30% {
            opacity: 0.7;
            transform: scale(1.05) rotate(1deg);
            filter: blur(1px);
          }
          60% {
            opacity: 0.3;
            transform: scale(0.95) rotate(-1deg);
            filter: blur(3px);
          }
          100% {
            opacity: 0.1;
            transform: scale(0.8) rotate(0deg);
            filter: blur(5px);
          }
        }

        @keyframes reintegrate {
          0% {
            opacity: 0.1;
            transform: scale(0.8) rotate(0deg);
            filter: blur(5px);
          }
          40% {
            opacity: 0.3;
            transform: scale(0.95) rotate(1deg);
            filter: blur(3px);
          }
          70% {
            opacity: 0.7;
            transform: scale(1.05) rotate(-1deg);
            filter: blur(1px);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
            filter: blur(0px);
          }
        }

        @keyframes particle-float {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          25% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(1.2);
            opacity: 0.8;
          }
          50% {
            transform: translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px) scale(0.8);
            opacity: 0.4;
          }
          75% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(1.1);
            opacity: 0.6;
          }
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
        }

        @keyframes energy-wave {
          0% {
            transform: translateX(-100%) skewX(-15deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
            opacity: 0;
          }
        }

        .animate-disintegrate {
          animation: disintegrate 2s ease-in-out;
        }

        .animate-reintegrate {
          animation: reintegrate 2s ease-in-out;
        }

        .animate-particle-float {
          animation: particle-float 2s ease-in-out;
        }

        .animate-energy-wave {
          animation: energy-wave 2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default DisintegrationTitle;
