import React, { useEffect, useState, useCallback } from "react";
import ReactGA from "react-ga4";
import { Eye, Users, RefreshCw } from "lucide-react";

const AnalyticsFooter = ({
  gaId = "G-KRH5SVFBEB",
  updateInterval = 300000,
}) => {
  const [analyticsData, setAnalyticsData] = useState({
    pageViews: null,
    users: null,
    lastUpdate: null,
    isLoading: true,
    error: null,
  });

  // Função para buscar dados (mock por enquanto)
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
      ReactGA.event({
        category: "Analytics",
        action: "data_updated",
        label: "footer_analytics",
      });
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

    // Primeira busca
    fetchAnalyticsData();

    // Configura intervalo de atualização
    const interval = setInterval(fetchAnalyticsData, updateInterval);

    // Cleanup
    return () => {
      clearInterval(interval);
    };
  }, [fetchAnalyticsData, gaId, updateInterval]);

  // Loading state
  if (analyticsData.isLoading) {
    return (
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground py-2">
        <RefreshCw className="h-3 w-3 animate-spin" />
        <span>Carregando dados...</span>
      </div>
    );
  }

  // Error state
  if (analyticsData.error) {
    return (
      <div className="flex items-center justify-center gap-2 text-xs text-red-500 py-2">
        <span>⚠️ {analyticsData.error}</span>
      </div>
    );
  }

  return (
    <div className="w-full mt-4 py-2 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
            <Eye className="h-3 w-3" />
            <span>Visualizações:</span>
            <span className="font-medium text-foreground">
              {analyticsData.pageViews?.toLocaleString("pt-BR") || "0"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
            <Users className="h-3 w-3" />
            <span>Visitantes:</span>
            <span className="font-medium text-foreground">
              {analyticsData.users?.toLocaleString("pt-BR") || "0"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
            <RefreshCw className="h-3 w-3" />
            <span>Atualizado:</span>
            <span className="font-medium text-foreground">
              {analyticsData.lastUpdate || "--:--:--"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsFooter;
