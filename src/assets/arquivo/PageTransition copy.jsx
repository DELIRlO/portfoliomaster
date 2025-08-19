import { useEffect, useState } from "react";

const PageTransition = ({ children, isVisible = true }) => {
  const [mounted, setMounted] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Reset animation state first
      setShowContent(false);
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isVisible]);

  if (!mounted) return null;

  return (
    <div className="relative overflow-hidden">
      {/* Efeito de tela regenerando */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-gray-800/20 via-gray-500/20 to-gray-800/20 transition-all duration-1000 ease-out ${
          showContent
            ? "opacity-0 scale-x-0 translate-x-full"
            : "opacity-100 scale-x-100 translate-x-0"
        }`}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #2d2d2d 15%, #4a4a4a 30%, #6b6b6b 45%, #e8e8e8 50%, #ffffff 55%, #e8e8e8 70%, #6b6b6b 85%, #4a4a4a 100%)",
          transformOrigin: "left center",
        }}
      />

      {/* Efeito de pixels regenerando */}
      <div
        className={`absolute inset-0 transition-all duration-1200 ease-out ${
          showContent ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(232, 232, 232, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(107, 107, 107, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(74, 74, 74, 0.1) 0%, transparent 50%)
          `,
          animation: showContent ? "none" : "pixelRegenerate 1s ease-out",
        }}
      />

      {/* Conteúdo principal */}
      <div
        className={`transition-all duration-1000 ease-out transform ${
          showContent
            ? "opacity-100 translate-y-0 scale-100 blur-0"
            : "opacity-0 translate-y-4 scale-98 blur-sm"
        }`}
        style={{
          transitionDelay: showContent ? "200ms" : "0ms",
        }}
      >
        {children}
      </div>

      {/* Efeito de scan line */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-800 ease-out ${
          showContent
            ? "opacity-0 translate-y-full"
            : "opacity-100 translate-y-0"
        }`}
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(107, 107, 107, 0.2) 48%, rgba(232, 232, 232, 0.4) 50%, rgba(107, 107, 107, 0.2) 52%, transparent 100%)",
          height: "2px",
          animation: showContent ? "none" : "scanLine 1s ease-out",
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

export default PageTransition;
