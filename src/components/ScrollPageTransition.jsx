import { useEffect, useState, useRef } from 'react';

const ScrollPageTransition = ({ children, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      {
        threshold,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, hasAnimated]);

  return (
    <div ref={elementRef} className="relative overflow-hidden">
      {/* Efeito de tela regenerando */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-500/20 to-purple-600/20 transition-all duration-1000 ease-out ${
          isVisible
            ? 'opacity-0 scale-x-0 translate-x-full'
            : 'opacity-100 scale-x-100 translate-x-0'
        }`}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(147, 51, 234, 0.3) 25%, rgba(59, 130, 246, 0.3) 50%, rgba(147, 51, 234, 0.3) 75%, transparent 100%)',
          transformOrigin: 'left center'
        }}
      />
      
      {/* Efeito de pixels regenerando */}
      <div
        className={`absolute inset-0 transition-all duration-1200 ease-out ${
          isVisible
            ? 'opacity-0'
            : 'opacity-100'
        }`}
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)
          `,
          animation: isVisible ? 'none' : 'pixelRegenerate 1s ease-out'
        }}
      />

      {/* Conteúdo principal */}
      <div
        className={`transition-all duration-1000 ease-out transform ${
          isVisible
            ? 'opacity-100 translate-y-0 scale-100 blur-0'
            : 'opacity-0 translate-y-8 scale-95 blur-sm'
        }`}
        style={{
          transitionDelay: isVisible ? '200ms' : '0ms'
        }}
      >
        {children}
      </div>

      {/* Efeito de scan line */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-800 ease-out ${
          isVisible
            ? 'opacity-0 translate-y-full'
            : 'opacity-100 translate-y-0'
        }`}
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(147, 51, 234, 0.2) 48%, rgba(147, 51, 234, 0.4) 50%, rgba(147, 51, 234, 0.2) 52%, transparent 100%)',
          height: '2px',
          animation: isVisible ? 'none' : 'scanLine 1s ease-out'
        }}
      />

      <style jsx>{`
        @keyframes pixelRegenerate {
          0% {
            opacity: 1;
            filter: blur(0px);
          }
          50% {
            opacity: 0.7;
            filter: blur(1px);
          }
          100% {
            opacity: 0;
            filter: blur(2px);
          }
        }

        @keyframes scanLine {
          0% {
            transform: translateY(-100vh);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollPageTransition;

