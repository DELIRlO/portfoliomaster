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

      // Pontos de conexão (componentes simulados) - REMOVIDO OS 3 CHIPS GRANDES
      ctx.fillStyle = "rgba(59, 130, 246, 0.25)";
      for (let i = 1; i < mainVerticalLines; i += 2) {
        for (let j = 1; j < mainHorizontalLines; j += 2) {
          const x = (w / (mainVerticalLines + 1)) * (i + 1);
          const y = (h / (mainHorizontalLines + 1)) * (j + 1);

          // Apenas círculos pequenos como pontos de solda
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
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

      // Caminhos L-shaped e diagonais (mais complexos, seguindo o desenho do circuito)
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

      // NOVOS CAMINHOS DIAGONAIS
      for (let i = 1; i < mainVerticalLines - 2; i += 2) {
        for (let j = 1; j < mainHorizontalLines - 2; j += 2) {
          const startX = (w / (mainVerticalLines + 1)) * (i + 1);
          const startY = (h / (mainHorizontalLines + 1)) * (j + 1);
          const endX = (w / (mainVerticalLines + 1)) * (i + 3);
          const endY = (h / (mainHorizontalLines + 1)) * (j + 3);

          // Diagonal descendente
          paths.push({
            points: [
              { x: startX, y: startY },
              { x: endX, y: endY },
            ],
            type: "diagonal-down",
          });

          // Diagonal ascendente
          paths.push({
            points: [
              { x: startX, y: endY },
              { x: endX, y: startY },
            ],
            type: "diagonal-up",
          });
        }
      }

      return paths;
    };

    const circuitPaths = createCircuitPaths();

    // Gerar pulsos de energia seguindo os caminhos do circuito
    const generateEnergyPulse = () => {
      const numPulses = 1; // Mantém 1 pulso por geração

      for (let i = 0; i < numPulses; i++) {
        const path =
          circuitPaths[Math.floor(Math.random() * circuitPaths.length)];
        if (path.points.length < 2) continue;

        const newPulse = {
          id: Date.now() + Math.random() + i,
          path: path,
          currentSegment: 0,
          progress: 0,
          speed: 1.69 + Math.random() * 1.17, // Aumentado mais 30% (era 1.3-2.2, agora 1.69-2.86)
          intensity: 0.6 + Math.random() * 0.3,
          size: 1.5 + Math.random() * 1,
          color: [59, 130, 246],
          // NOVO: Estados para o efeito de piscar
          isBlinking: false,
          blinkCount: 0,
          blinkTimer: 0,
          blinkPhase: 0, // 0 = visível, 1 = invisível
          finalPosition: null,
        };

        // Aumentar número de pulsos em 40% adicional (era 30, agora 42)
        if (energyPulsesRef.current.length >= 42) {
          energyPulsesRef.current = [
            ...energyPulsesRef.current.slice(1),
            newPulse,
          ];
        } else {
          energyPulsesRef.current = [...energyPulsesRef.current, newPulse];
        }
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

        // Verificar se chegou no final do caminho
        const segmentIndex = pulse.currentSegment;
        if (segmentIndex >= path.points.length - 1) {
          // NOVO: Iniciar efeito de piscar se ainda não começou
          if (!pulse.isBlinking) {
            energyPulsesRef.current[index].isBlinking = true;
            energyPulsesRef.current[index].blinkTimer = 0;
            energyPulsesRef.current[index].blinkCount = 0;
            // Definir posição final
            const finalPoint = path.points[path.points.length - 1];
            energyPulsesRef.current[index].finalPosition = {
              x: finalPoint.x,
              y: finalPoint.y,
            };
          }

          // NOVO: Lógica de piscar
          if (pulse.isBlinking) {
            energyPulsesRef.current[index].blinkTimer += 1;

            // Alternar entre visível/invisível a cada 8 frames (~133ms a 60fps)
            if (energyPulsesRef.current[index].blinkTimer >= 8) {
              energyPulsesRef.current[index].blinkTimer = 0;
              energyPulsesRef.current[index].blinkPhase =
                energyPulsesRef.current[index].blinkPhase === 0 ? 1 : 0;

              // Contar uma piscada completa (visível -> invisível)
              if (energyPulsesRef.current[index].blinkPhase === 1) {
                energyPulsesRef.current[index].blinkCount += 1;
              }
            }

            // Após 3 piscadas completas, remover
            if (pulse.blinkCount >= 3) {
              pulsesToRemove.push(pulse.id);
              return;
            }

            // Desenhar pulso piscando na posição final
            if (pulse.blinkPhase === 0) {
              // Apenas quando visível
              const currentX = pulse.finalPosition.x;
              const currentY = pulse.finalPosition.y;

              // Pulso principal com glow mais intenso durante o piscar
              const gradient = ctx.createRadialGradient(
                currentX,
                currentY,
                0,
                currentX,
                currentY,
                pulse.size * 6
              );
              gradient.addColorStop(
                0,
                `rgba(${pulse.color[0]}, ${pulse.color[1]}, ${pulse.color[2]}, ${pulse.intensity})`
              );
              gradient.addColorStop(
                0.3,
                `rgba(${pulse.color[0]}, ${pulse.color[1]}, ${
                  pulse.color[2]
                }, ${pulse.intensity * 0.6})`
              );
              gradient.addColorStop(
                1,
                `rgba(${pulse.color[0]}, ${pulse.color[1]}, ${pulse.color[2]}, 0)`
              );

              ctx.fillStyle = gradient;
              ctx.beginPath();
              ctx.arc(currentX, currentY, pulse.size * 6, 0, Math.PI * 2);
              ctx.fill();

              // Núcleo brilhante mais intenso
              ctx.fillStyle = `rgba(255, 255, 255, ${pulse.intensity})`;
              ctx.beginPath();
              ctx.arc(currentX, currentY, pulse.size, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          return;
        }

        // Lógica normal para pulsos em movimento
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

        // Atualizar progresso apenas se não estiver piscando
        if (!pulse.isBlinking) {
          energyPulsesRef.current[index].progress += pulse.speed;
          if (energyPulsesRef.current[index].progress >= 100) {
            energyPulsesRef.current[index].progress = 0;
            energyPulsesRef.current[index].currentSegment++;
          }
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

    // Frequência reduzida para compensar o aumento de pulsos simultâneos
    pulseIntervalRef.current = setInterval(
      generateEnergyPulse,
      300 + Math.random() * 300 // Reduzido para gerar mais frequentemente
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
