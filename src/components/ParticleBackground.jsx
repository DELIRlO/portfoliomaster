import React, { useEffect, useRef } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const energyPulsesRef = useRef([]);
  const animationIdRef = useRef(null);
  const pulseIntervalRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Desenhar placa de circuito estática no fundo
    const drawCircuitBoard = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Configuração das linhas do circuito
      ctx.strokeStyle = "rgba(59, 130, 246, 0.15)"; // Azul muito sutil
      ctx.lineWidth = 0.5;
      ctx.lineCap = "round";

      // Grid base - linhas horizontais principais
      const mainHorizontalLines = 8;
      for (let i = 0; i < mainHorizontalLines; i++) {
        const y = (h / (mainHorizontalLines + 1)) * (i + 1);
        ctx.beginPath();
        ctx.moveTo(50, y);
        ctx.lineTo(w - 50, y);
        ctx.stroke();

        // Pequenas ramificações nas linhas principais
        for (let branch = 100; branch < w - 100; branch += 120) {
          // Ramificação para cima
          if (i > 0) {
            ctx.beginPath();
            ctx.moveTo(branch, y);
            ctx.lineTo(branch, y - 30);
            ctx.stroke();
          }

          // Ramificação para baixo
          if (i < mainHorizontalLines - 1) {
            ctx.beginPath();
            ctx.moveTo(branch + 60, y);
            ctx.lineTo(branch + 60, y + 30);
            ctx.stroke();
          }
        }
      }

      // Grid base - linhas verticais principais
      const mainVerticalLines = 12;
      for (let i = 0; i < mainVerticalLines; i++) {
        const x = (w / (mainVerticalLines + 1)) * (i + 1);
        ctx.beginPath();
        ctx.moveTo(x, 50);
        ctx.lineTo(x, h - 50);
        ctx.stroke();

        // Pequenas ramificações nas linhas verticais
        for (let branch = 100; branch < h - 100; branch += 100) {
          // Ramificação para esquerda
          if (i > 0) {
            ctx.beginPath();
            ctx.moveTo(x, branch);
            ctx.lineTo(x - 25, branch);
            ctx.stroke();
          }

          // Ramificação para direita
          if (i < mainVerticalLines - 1) {
            ctx.beginPath();
            ctx.moveTo(x, branch + 50);
            ctx.lineTo(x + 25, branch + 50);
            ctx.stroke();
          }
        }
      }

      // Pontos de conexão (componentes simulados)
      ctx.fillStyle = "rgba(59, 130, 246, 0.25)";
      for (let i = 1; i < mainVerticalLines; i += 2) {
        for (let j = 1; j < mainHorizontalLines; j += 2) {
          const x = (w / (mainVerticalLines + 1)) * (i + 1);
          const y = (h / (mainHorizontalLines + 1)) * (j + 1);

          // Pequenos quadrados como componentes
          ctx.fillRect(x - 3, y - 3, 6, 6);

          // Círculos menores como pontos de solda
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Adicionar alguns componentes maiores (chips simulados)
      ctx.fillStyle = "rgba(59, 130, 246, 0.12)";
      ctx.strokeStyle = "rgba(59, 130, 246, 0.3)";
      ctx.lineWidth = 1;

      // Chip no canto superior esquerdo
      const chip1X = w * 0.15;
      const chip1Y = h * 0.2;
      ctx.fillRect(chip1X - 20, chip1Y - 15, 40, 30);
      ctx.strokeRect(chip1X - 20, chip1Y - 15, 40, 30);

      // Chip no centro
      const chip2X = w * 0.5;
      const chip2Y = h * 0.5;
      ctx.fillRect(chip2X - 25, chip2Y - 18, 50, 36);
      ctx.strokeRect(chip2X - 25, chip2Y - 18, 50, 36);

      // Chip no canto inferior direito
      const chip3X = w * 0.85;
      const chip3Y = h * 0.8;
      ctx.fillRect(chip3X - 18, chip3Y - 12, 36, 24);
      ctx.strokeRect(chip3X - 18, chip3Y - 12, 36, 24);
    };

    // Criar caminhos de circuito para os pulsos de energia
    const createCircuitPaths = () => {
      const paths = [];
      const w = canvas.width;
      const h = canvas.height;
      const margin = 50;

      // Caminhos horizontais principais
      const mainHorizontalLines = 8;
      for (let i = 0; i < mainHorizontalLines; i++) {
        const y = (h / (mainHorizontalLines + 1)) * (i + 1);
        paths.push({
          points: [
            { x: margin, y },
            { x: w - margin, y },
          ],
          type: "horizontal",
        });
      }

      // Caminhos verticais principais
      const mainVerticalLines = 12;
      for (let i = 0; i < mainVerticalLines; i++) {
        const x = (w / (mainVerticalLines + 1)) * (i + 1);
        paths.push({
          points: [
            { x, y: margin },
            { x, y: h - margin },
          ],
          type: "vertical",
        });
      }

      // Caminhos L-shaped (mais complexos, seguindo o desenho do circuito)
      for (let i = 1; i < mainVerticalLines - 1; i += 3) {
        for (let j = 1; j < mainHorizontalLines - 1; j += 2) {
          const startX = (w / (mainVerticalLines + 1)) * (i + 1);
          const startY = (h / (mainHorizontalLines + 1)) * (j + 1);
          const midX = (w / (mainVerticalLines + 1)) * (i + 2);
          const endY = (h / (mainHorizontalLines + 1)) * (j + 2);

          // Caminho em L
          paths.push({
            points: [
              { x: startX, y: startY },
              { x: midX, y: startY },
              { x: midX, y: endY },
            ],
            type: "L-shape",
          });
        }
      }

      return paths;
    };

    const circuitPaths = createCircuitPaths();

    // Gerar pulsos de energia seguindo os caminhos do circuito
    const generateEnergyPulse = () => {
      const path =
        circuitPaths[Math.floor(Math.random() * circuitPaths.length)];
      if (path.points.length < 2) return;

      const newPulse = {
        id: Date.now() + Math.random(),
        path: path,
        currentSegment: 0,
        progress: 0,
        speed: 0.8 + Math.random() * 0.6, // Mais lento e suave
        intensity: 0.6 + Math.random() * 0.3,
        size: 1.5 + Math.random() * 1,
        color: [59, 130, 246], // Azul consistente com o tema
      };

      // Limitar número de pulsos
      if (energyPulsesRef.current.length >= 25) {
        energyPulsesRef.current = [
          ...energyPulsesRef.current.slice(1),
          newPulse,
        ];
      } else {
        energyPulsesRef.current = [...energyPulsesRef.current, newPulse];
      }
    };

    const animate = () => {
      // Limpeza completa do canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fundo escuro
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Desenhar a placa de circuito estática
      drawCircuitBoard();

      // Filtra pulsos completos para remoção
      const pulsesToRemove = [];

      // Desenhar pulsos de energia seguindo os caminhos do circuito
      energyPulsesRef.current.forEach((pulse, index) => {
        const path = pulse.path;
        if (path.points.length < 2) {
          pulsesToRemove.push(pulse.id);
          return;
        }

        // Calcular posição atual no caminho
        const segmentIndex = pulse.currentSegment;
        if (segmentIndex >= path.points.length - 1) {
          pulsesToRemove.push(pulse.id);
          return;
        }

        const startPoint = path.points[segmentIndex];
        const endPoint = path.points[segmentIndex + 1];
        const segmentProgress = pulse.progress / 100;

        const currentX =
          startPoint.x + (endPoint.x - startPoint.x) * segmentProgress;
        const currentY =
          startPoint.y + (endPoint.y - startPoint.y) * segmentProgress;

        // Trilha de energia mais sutil
        const trailLength = 4;
        for (let i = 0; i < trailLength; i++) {
          const trailProgress = Math.max(0, segmentProgress - i * 0.15);
          const trailX =
            startPoint.x + (endPoint.x - startPoint.x) * trailProgress;
          const trailY =
            startPoint.y + (endPoint.y - startPoint.y) * trailProgress;

          const trailAlpha = (1 - i / trailLength) * pulse.intensity * 0.3;
          ctx.fillStyle = `rgba(${pulse.color[0]}, ${pulse.color[1]}, ${pulse.color[2]}, ${trailAlpha})`;
          ctx.beginPath();
          ctx.arc(
            trailX,
            trailY,
            pulse.size * (1 - (i / trailLength) * 0.3),
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        // Pulso principal com glow mais suave
        const gradient = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          pulse.size * 4
        );
        gradient.addColorStop(
          0,
          `rgba(${pulse.color[0]}, ${pulse.color[1]}, ${pulse.color[2]}, ${
            pulse.intensity * 0.8
          })`
        );
        gradient.addColorStop(
          0.3,
          `rgba(${pulse.color[0]}, ${pulse.color[1]}, ${pulse.color[2]}, ${
            pulse.intensity * 0.4
          })`
        );
        gradient.addColorStop(
          1,
          `rgba(${pulse.color[0]}, ${pulse.color[1]}, ${pulse.color[2]}, 0)`
        );

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(currentX, currentY, pulse.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Núcleo brilhante menor
        ctx.fillStyle = `rgba(255, 255, 255, ${pulse.intensity * 0.6})`;
        ctx.beginPath();
        ctx.arc(currentX, currentY, pulse.size * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Atualizar progresso
        energyPulsesRef.current[index].progress += pulse.speed;
        if (energyPulsesRef.current[index].progress >= 100) {
          energyPulsesRef.current[index].progress = 0;
          energyPulsesRef.current[index].currentSegment++;
        }
      });

      // Remover pulsos completos
      if (pulsesToRemove.length > 0) {
        energyPulsesRef.current = energyPulsesRef.current.filter(
          (p) => !pulsesToRemove.includes(p.id)
        );
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Gerar pulsos com menor frequência para manter discrição
    pulseIntervalRef.current = setInterval(
      generateEnergyPulse,
      400 + Math.random() * 400
    );

    // Iniciar animação
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(pulseIntervalRef.current);
      cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "black",
        zIndex: 0, // Mudado para 0 para ficar visível
        pointerEvents: "none", // Não interferir com interações
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default ParticleBackground;
