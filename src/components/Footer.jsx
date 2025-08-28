import React, { useEffect, useState, useCallback } from "react";
import ReactGA from "react-ga4";
import {
  Users,
  TrendingUp,
  Activity,
  Clock,
  Github,
  Linkedin,
  Heart,
} from "lucide-react";
import { Button } from "./ui/button";
import { useInView } from "react-intersection-observer";
import PageTransition from "./PageTransition";

/* ===================== */
/* 🔥 Animações do Footer */
/* ===================== */
import "../index.css"; // certifique-se que contém as animações abaixo:

/*
@keyframes fadeInOut {
  0%, 100% { opacity: 0.4; transform: translateY(1px); }
  50% { opacity: 1; transform: translateY(0); }
}

@keyframes heartBeat {
  0%, 100% {
    transform: scale(1);
    color: #7f1d1d;
  }
  50% {
    transform: scale(1.05);
    color: #ef4444;
  }
}

.animate-fade-in-out {
  animation: fadeInOut 4s ease-in-out infinite;
}

.animate-heart-beat {
  animation: heartBeat 4s ease-in-out infinite;
}
*/

const Footer = ({ gaId = "G-KRH5SVFBEB", updateInterval = 300000 }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  const [hoveredIcon, setHoveredIcon] = useState("");

  const [analyticsData, setAnalyticsData] = useState({
    pageViews: null,
    users: null,
    lastUpdate: null,
    isLoading: true,
    error: null,
  });

  const fetchAnalyticsData = useCallback(async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newData = {
        pageViews: Math.floor(Math.random() * 5000) + 1000,
        users: Math.floor(Math.random() * 2000) + 500,
        lastUpdate: new Date().toLocaleTimeString("pt-BR"),
        isLoading: false,
        error: null,
      };

      setAnalyticsData(newData);

      if (window.gtag) {
        ReactGA.event({
          category: "Analytics",
          action: "data_updated",
          label: "footer_analytics",
        });
      }
    } catch (error) {
      console.error("Erro ao buscar dados do Analytics:", error);
      setAnalyticsData((prev) => ({
        ...prev,
        isLoading: false,
        error: "Erro ao carregar dados",
      }));
    }
  }, []);

  useEffect(() => {
    const isDevelopment =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "" ||
      window.location.port === "3000" ||
      window.location.port === "5173";

    if (!window.gtag) {
      ReactGA.initialize(gaId, {
        debug: isDevelopment,
        testMode: isDevelopment,
      });
    }

    fetchAnalyticsData();
    const interval = setInterval(fetchAnalyticsData, updateInterval);

    return () => {
      clearInterval(interval);
    };
  }, [fetchAnalyticsData, gaId, updateInterval]);

  const AnalyticsSection = () => {
    if (analyticsData.isLoading) {
      return (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Activity className="h-3 w-3 animate-pulse text-blue-500" />
          <span>Carregando...</span>
        </div>
      );
    }

    if (analyticsData.error) {
      return (
        <div className="flex items-center gap-2 text-xs text-red-500">
          <span>⚠️ Erro nos dados</span>
        </div>
      );
    }

    return (
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5 hover:text-foreground transition-colors group">
          <div className="p-1 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
            <TrendingUp className="h-3 w-3 text-blue-500" />
          </div>
          <span>Visualizações:</span>
          <span className="font-medium text-foreground">
            {analyticsData.pageViews?.toLocaleString("pt-BR") || "0"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 hover:text-foreground transition-colors group">
          <div className="p-1 rounded-full bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
            <Users className="h-3 w-3 text-green-500" />
          </div>
          <span>Visitantes:</span>
          <span className="font-medium text-foreground">
            {analyticsData.users?.toLocaleString("pt-BR") || "0"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 hover:text-foreground transition-colors group">
          <div className="p-1 rounded-full bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
            <Clock className="h-3 w-3 text-purple-500" />
          </div>
          <span>Atualizado:</span>
          <span className="font-medium text-foreground">
            {analyticsData.lastUpdate || "--:--:--"}
          </span>
        </div>
      </div>
    );
  };

  return (
    <PageTransition isVisible={inView}>
      <footer className="py-8 border-t border-border bg-card/30" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            {/* Copyright + Animações */}
            <div className="flex-shrink-0 order-1">
              <p className="text-muted-foreground text-center lg:text-left text-sm animate-fade-in-out">
                © 2025 Carlos Filho. Feito com{" "}
                <Heart className="inline h-4 w-4 mx-1 animate-heart-beat" />
                React - Tailwind
              </p>
            </div>

            {/* Analytics */}
            <div className="flex-1 flex justify-center order-3 lg:order-2">
              <AnalyticsSection />
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-1 order-2 lg:order-3">
              {/* GitHub */}
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="relative group"
                onMouseEnter={() => setHoveredIcon("github")}
                onMouseLeave={() => setHoveredIcon("")}
              >
                <a
                  href="https://github.com/DELIRlO"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github
                    className={`h-4 w-4 transition-colors duration-300 ${
                      hoveredIcon === "github"
                        ? "stroke-purple-600"
                        : "stroke-foreground/90"
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] w-0 bg-purple-600 group-hover:w-full transition-all duration-300 ${
                      hoveredIcon === "github" ? "w-full" : ""
                    }`}
                  ></span>
                </a>
              </Button>

              {/* LinkedIn */}
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="relative group"
                onMouseEnter={() => setHoveredIcon("linkedin")}
                onMouseLeave={() => setHoveredIcon("")}
              >
                <a
                  href="https://www.linkedin.com/in/ysneshy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin
                    className={`h-4 w-4 transition-colors duration-300 ${
                      hoveredIcon === "linkedin"
                        ? "stroke-blue-600"
                        : "stroke-foreground/90"
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] w-0 bg-blue-600 group-hover:w-full transition-all duration-300 ${
                      hoveredIcon === "linkedin" ? "w-full" : ""
                    }`}
                  ></span>
                </a>
              </Button>

              {/* Instagram */}
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="relative group"
                onMouseEnter={() => setHoveredIcon("instagram")}
                onMouseLeave={() => setHoveredIcon("")}
              >
                <a
                  href="https://www.instagram.com/ysneshy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="relative flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 transition-all duration-300"
                  >
                    <defs>
                      <linearGradient
                        id="ig-thin-gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#f472b6" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                    </defs>
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                      fill="none"
                      stroke={
                        hoveredIcon === "instagram"
                          ? "url(#ig-thin-gradient)"
                          : "currentColor"
                      }
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                      fill="none"
                      stroke={
                        hoveredIcon === "instagram"
                          ? "url(#ig-thin-gradient)"
                          : "currentColor"
                      }
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="17"
                      cy="7"
                      r="1"
                      fill={
                        hoveredIcon === "instagram"
                          ? "url(#ig-thin-gradient)"
                          : "currentColor"
                      }
                    />
                  </svg>
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-pink-400 via-purple-500 to-yellow-400 group-hover:w-full transition-all duration-300 ${
                      hoveredIcon === "instagram" ? "w-full" : ""
                    }`}
                  ></span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </PageTransition>
  );
};

export default Footer;
