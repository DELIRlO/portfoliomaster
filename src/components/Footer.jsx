import React, { useEffect, useState, useCallback } from "react";
import ReactGA from "react-ga4";
import {
  Eye,
  Users,
  RefreshCw,
  TrendingUp,
  Activity,
  Clock,
  Github,
  Linkedin,
  Instagram,
  Heart,
} from "lucide-react";
import { Button } from "./ui/button";
import { useInView } from "react-intersection-observer";
import PageTransition from "./PageTransition";

const Footer = ({ gaId = "G-KRH5SVFBEB", updateInterval = 300000 }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  const [hoveredIcon, setHoveredIcon] = useState("");

  // Estado dos dados do Analytics
  const [analyticsData, setAnalyticsData] = useState({
    pageViews: null,
    users: null,
    lastUpdate: null,
    isLoading: true,
    error: null,
  });

  // Função para buscar dados do Analytics
  const fetchAnalyticsData = useCallback(async () => {
    try {
      // TODO: Implementar integração real com Google Analytics Reporting API
      // Por enquanto usando dados simulados

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula latência da API

      const newData = {
        pageViews: Math.floor(Math.random() * 5000) + 1000,
        users: Math.floor(Math.random() * 2000) + 500,
        lastUpdate: new Date().toLocaleTimeString("pt-BR"),
        isLoading: false,
        error: null,
      };

      setAnalyticsData(newData);

      // Envia evento para o GA4
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
    // Detecta ambiente de desenvolvimento
    const isDevelopment =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "" ||
      window.location.port === "3000" ||
      window.location.port === "5173"; // Vite default port

    // Inicializa GA4 apenas se não foi inicializado
    if (!window.gtag) {
      ReactGA.initialize(gaId, {
        debug: isDevelopment,
        testMode: isDevelopment, // Evita enviar dados reais em dev
      });
    }

    // Primeira busca dos dados
    fetchAnalyticsData();

    // Configura intervalo de atualização
    const interval = setInterval(fetchAnalyticsData, updateInterval);

    // Cleanup
    return () => {
      clearInterval(interval);
    };
  }, [fetchAnalyticsData, gaId, updateInterval]);

  // Componente dos dados do Analytics
  const AnalyticsSection = () => {
    // Loading state
    if (analyticsData.isLoading) {
      return (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Activity className="h-3 w-3 animate-pulse text-blue-500" />
          <span>Carregando...</span>
        </div>
      );
    }

    // Error state
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
          {/* Layout principal com 3 seções responsivas */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            {/* Seção 1: Copyright (Esquerda) */}
            <div className="flex-shrink-0 order-1">
              <p className="text-muted-foreground text-center lg:text-left text-sm animate-pulse-gray">
                © 2025 Carlos Filho. Feito com{" "}
                <Heart className="inline h-4 w-4 mx-1 animate-pulse-red" />
                React - tailwind
              </p>
            </div>

            {/* Seção 2: Analytics (Centro) */}
            <div className="flex-1 flex justify-center order-3 lg:order-2">
              <AnalyticsSection />
            </div>

            {/* Seção 3: Social Links (Direita) */}
            <div className="flex items-center space-x-1 order-2 lg:order-3">
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
                        ? "text-purple-600"
                        : "text-foreground/90"
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] w-0 bg-purple-600 group-hover:w-full transition-all duration-300 ${
                      hoveredIcon === "github" ? "w-full" : ""
                    }`}
                  ></span>
                </a>
              </Button>

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
                        ? "text-blue-600"
                        : "text-foreground/90"
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] w-0 bg-blue-600 group-hover:w-full transition-all duration-300 ${
                      hoveredIcon === "linkedin" ? "w-full" : ""
                    }`}
                  ></span>
                </a>
              </Button>

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
                >
                  <Instagram
                    className={`h-4 w-4 transition-colors duration-300 ${
                      hoveredIcon === "instagram"
                        ? "text-pink-500"
                        : "text-foreground/90"
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-pink-500 to-yellow-500 group-hover:w-full transition-all duration-300 ${
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
