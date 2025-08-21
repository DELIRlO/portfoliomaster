import React, { useState, useEffect, useRef } from "react";

const CircuitBoardEnergy = () => {
  const canvasRef = useRef(null);
  const [energyPulses, setEnergyPulses] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let pulseInterval; // Removida a variável 'time' não utilizada

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Criar caminhos para os pulsos de energia
    const createEnergyPaths = () => {
      const paths = [];
      const w = canvas.width;
      const h = canvas.height;
      const margin = 50;

      // Caminhos horizontais
      const layers = 12;
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

      // Caminhos verticais
      const vLayers = 8;
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

      // Conexões diagonais
      for (let i = 1; i < layers - 1; i += 3) {
        const y1 = margin + ((h - 2 * margin) / (layers - 1)) * i;
        const y2 = margin + ((h - 2 * margin) / (layers - 1)) * (i + 1);

        for (let j = 1; j < vLayers - 1; j += 2) {
          const x1 = margin + ((w - 2 * margin) / (vLayers - 1)) * j;
          const x2 = margin + ((w - 2 * margin) / (vLayers - 1)) * (j + 1);

          paths.push({
            points: [
              { x: x1, y: y1 },
              { x: x2, y: y2 },
            ],
            type: "diagonal",
          });
        }
      }

      return paths;
    };

    const energyPaths = createEnergyPaths();

    // Gerar pulsos de energia
    const generateEnergyPulse = () => {
      const path = energyPaths[Math.floor(Math.random() * energyPaths.length)];
      if (path.points.length < 2) return;

      const newPulse = {
        id: Date.now() + Math.random(),
        path: path,
        currentSegment: 0,
        progress: 0,
        speed: 1.2 + Math.random() * 0.8,
        intensity: 0.8 + Math.random() * 0.2,
        size: 2 + Math.random() * 2,
        color: [0, 180, 255], // Azul para todos os pulsos
      };

      setEnergyPulses((prev) => [...prev.slice(-50), newPulse]);
    };

    pulseInterval = setInterval(generateEnergyPulse, 150 + Math.random() * 300);

    const animate = () => {
      // Limpeza completa do canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fundo escuro
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Desenhar pulsos de energia seguindo caminhos
      energyPulses.forEach((pulse, index) => {
        const path = pulse.path;
        if (path.points.length < 2) return;

        // Calcular posição atual no caminho
        const segmentIndex = pulse.currentSegment;
        if (segmentIndex >= path.points.length - 1) {
          setEnergyPulses((prev) => prev.filter((p) => p.id !== pulse.id));
          return;
        }

        const startPoint = path.points[segmentIndex];
        const endPoint = path.points[segmentIndex + 1];
        const segmentProgress = pulse.progress / 100;

        const currentX =
          startPoint.x + (endPoint.x - startPoint.x) * segmentProgress;
        const currentY =
          startPoint.y + (endPoint.y - startPoint.y) * segmentProgress;

        // Trilha de energia
        const trailLength = 8;
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

        // Atualizar progresso (usando cópia do array para evitar mutação direta)
        const updatedPulses = [...energyPulses];
        updatedPulses[index].progress += pulse.speed;
        if (updatedPulses[index].progress >= 100) {
          updatedPulses[index].progress = 0;
          updatedPulses[index].currentSegment++;
        }
        setEnergyPulses(updatedPulses);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(pulseInterval);
      cancelAnimationFrame(animationId);
    };
  }, [energyPulses]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default CircuitBoardEnergy;
