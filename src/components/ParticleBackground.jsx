import React, { useEffect, useRef } from "react";

const CircuitBoardEnergy = () => {
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

    // Criar caminhos para os pulsos de energia (30% menos elementos)
    const createEnergyPaths = () => {
      const paths = [];
      const w = canvas.width;
      const h = canvas.height;
      const margin = 40;

      // Reduzir em 30% o número de caminhos horizontais
      const layers = Math.max(3, Math.floor(14 * 0.7)); // 10 camadas (30% menos)
      for (let i = 0; i < layers; i++) {
        const y = margin + ((h - 2 * margin) / (layers - 1)) * i;
        paths.push({
          points: [
            { x: margin, y },
            { x: w - margin, y },
          ],
          type: "horizontal",
        });
      }

      // Reduzir em 30% o número de caminhos verticais
      const vLayers = Math.max(3, Math.floor(11 * 0.7)); // 8 camadas (30% menos)
      for (let i = 0; i < vLayers; i++) {
        const x = margin + ((w - 2 * margin) / (vLayers - 1)) * i;
        paths.push({
          points: [
            { x, y: margin },
            { x, y: h - margin },
          ],
          type: "vertical",
        });
      }

      // Reduzir em 30% o número de conexões diagonais
      for (let i = 1; i < layers - 1; i += 4) {
        // Aumentado de 3 para 4
        const y1 = margin + ((h - 2 * margin) / (layers - 1)) * i;
        const y2 = margin + ((h - 2 * margin) / (layers - 1)) * (i + 1);

        for (let j = 1; j < vLayers - 1; j += 3) {
          // Aumentado de 2 para 3
          const x1 = margin + ((w - 2 * margin) / (vLayers - 1)) * j;
          const x2 = margin + ((w - 2 * margin) / (vLayers - 1)) * (j + 1);

          paths.push({
            points: [
              { x: x1, y: y1 },
              { x: x2, y: y2 },
            ],
            type: "diagonal",
          });

          paths.push({
            points: [
              { x: x2, y: y1 },
              { x: x1, y: y2 },
            ],
            type: "diagonal",
          });
        }
      }

      return paths;
    };

    const energyPaths = createEnergyPaths();

    // Gerar pulsos de energia com maior velocidade
    const generateEnergyPulse = () => {
      const numPulses = 1; // Reduzido de 1-2 para apenas 1

      for (let i = 0; i < numPulses; i++) {
        const path =
          energyPaths[Math.floor(Math.random() * energyPaths.length)];
        if (path.points.length < 2) continue;

        const newPulse = {
          id: Date.now() + Math.random() + i,
          path: path,
          currentSegment: 0,
          progress: 0,
          speed: 1.7 + Math.random() * 1.1,
          intensity: 0.8 + Math.random() * 0.2,
          size: 2 + Math.random() * 2,
          color: [0, 180, 255],
        };

        // Reduzir em 30% o número máximo de pulsos (de 60 para 42)
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

      // Filtra pulsos completos para remoção
      const pulsesToRemove = [];

      // Desenhar pulsos de energia
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

        // Trilha de energia (reduzida em 30%)
        const trailLength = 6; // Reduzido de 8 para 6
        for (let i = 0; i < trailLength; i++) {
          const trailProgress = Math.max(0, segmentProgress - i * 0.1);
          const trailX =
            startPoint.x + (endPoint.x - startPoint.x) * trailProgress;
          const trailY =
            startPoint.y + (endPoint.y - startPoint.y) * trailProgress;

          const trailAlpha = (1 - i / trailLength) * pulse.intensity * 0.4;
          ctx.fillStyle = `rgba(${pulse.color[0]}, ${pulse.color[1]}, ${pulse.color[2]}, ${trailAlpha})`;
          ctx.beginPath();
          ctx.arc(
            trailX,
            trailY,
            pulse.size * (1 - (i / trailLength) * 0.5),
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        // Pulso principal
        const gradient = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          pulse.size * 3
        );
        gradient.addColorStop(
          0,
          `rgba(${pulse.color[0]}, ${pulse.color[1]}, ${pulse.color[2]}, ${pulse.intensity})`
        );
        gradient.addColorStop(
          0.4,
          `rgba(${pulse.color[0]}, ${pulse.color[1]}, ${pulse.color[2]}, ${
            pulse.intensity * 0.6
          })`
        );
        gradient.addColorStop(
          1,
          `rgba(${pulse.color[0]}, ${pulse.color[1]}, ${pulse.color[2]}, 0)`
        );

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(currentX, currentY, pulse.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Núcleo brilhante
        ctx.fillStyle = `rgba(255, 255, 255, ${pulse.intensity * 0.9})`;
        ctx.beginPath();
        ctx.arc(currentX, currentY, pulse.size * 0.7, 0, Math.PI * 2);
        ctx.fill();

        // Atualizar progresso diretamente na referência
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

    // Reduzir frequência de geração de pulsos em 30%
    pulseIntervalRef.current = setInterval(
      generateEnergyPulse,
      200 + Math.random() * 200 // Aumentado de 100-250 para 200-400
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

export default CircuitBoardEnergy;
