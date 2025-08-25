import React, { useEffect, useRef } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const energyPulsesRef = useRef([]);
  const animationIdRef = useRef(null);
  const pulseIntervalRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // ====== GRID ======
    const MARGIN = 50;
    const ROWS = 8;
    const COLS = 12;

    const gridX = (i) => (canvas.width / (COLS + 1)) * (i + 1);
    const gridY = (j) => (canvas.height / (ROWS + 1)) * (j + 1);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ====== DETECÇÃO DE TEMA ======
    const getThemeColors = () => {
      const isDarkMode = document.documentElement.classList.contains("dark");

      if (isDarkMode) {
        return {
          background: "#000000",
          circuit: "rgba(59, 130, 246, 0.15)",
          solder: "rgba(59, 130, 246, 0.25)",
          particleBlue: [59, 130, 246], // Azul para partículas normais
          particleGold: [255, 215, 0], // Dourado para partículas especiais
        };
      } else {
        return {
          background: "#ffffff",
          circuit: "rgba(59, 130, 246, 0.08)",
          solder: "rgba(59, 130, 246, 0.12)",
          particleBlue: [59, 130, 246], // Azul para partículas normais
          particleGold: [255, 215, 0], // Dourado para partículas especiais
        };
      }
    };

    // ====== FUNDO: placa de circuito ======
    const drawCircuitBoard = (colors) => {
      const w = canvas.width;
      const h = canvas.height;

      // Fundo baseado no tema
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, w, h);

      // Cores do circuito
      ctx.strokeStyle = colors.circuit;
      ctx.lineWidth = 0.5;
      ctx.lineCap = "round";

      // Linhas horizontais principais
      for (let j = 0; j < ROWS; j++) {
        const y = gridY(j);
        ctx.beginPath();
        ctx.moveTo(MARGIN, y);
        ctx.lineTo(w - MARGIN, y);
        ctx.stroke();

        // Ramificações
        for (let x = 100; x < w - 100; x += 120) {
          if (j > 0) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y - 30);
            ctx.stroke();
          }
          if (j < ROWS - 1) {
            ctx.beginPath();
            ctx.moveTo(x + 60, y);
            ctx.lineTo(x + 60, y + 30);
            ctx.stroke();
          }
        }
      }

      // Linhas verticais principais
      for (let i = 0; i < COLS; i++) {
        const x = gridX(i);
        ctx.beginPath();
        ctx.moveTo(x, MARGIN);
        ctx.lineTo(x, h - MARGIN);
        ctx.stroke();

        // Ramificações
        for (let y = 100; y < h - 100; y += 100) {
          if (i > 0) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - 25, y);
            ctx.stroke();
          }
          if (i < COLS - 1) {
            ctx.beginPath();
            ctx.moveTo(x, y + 50);
            ctx.lineTo(x + 25, y + 50);
            ctx.stroke();
          }
        }
      }

      // Pontos de solda
      ctx.fillStyle = colors.solder;
      for (let i = 1; i < COLS; i += 2) {
        for (let j = 1; j < ROWS; j += 2) {
          const x = gridX(i);
          const y = gridY(j);
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    // ====== CAMINHOS ======
    const createCircuitPaths = () => {
      const paths = [];

      // Horizontais
      for (let j = 0; j < ROWS; j++) {
        paths.push({
          type: "horizontal",
          points: [
            { x: MARGIN, y: gridY(j) },
            { x: canvas.width - MARGIN, y: gridY(j) },
          ],
        });
      }

      // Verticais
      for (let i = 0; i < COLS; i++) {
        paths.push({
          type: "vertical",
          points: [
            { x: gridX(i), y: MARGIN },
            { x: gridX(i), y: canvas.height - MARGIN },
          ],
        });
      }

      // Em L
      for (let i = 1; i < COLS - 1; i += 3) {
        for (let j = 1; j < ROWS - 1; j += 2) {
          const startX = gridX(i);
          const startY = gridY(j);
          const midX = gridX(i + 1);
          const endY = gridY(j + 1);
          paths.push({
            type: "L-shape",
            points: [
              { x: startX, y: startY },
              { x: midX, y: startY },
              { x: midX, y: endY },
            ],
          });
        }
      }

      // Zig-zag
      const stairPath = (ci, rj, dx, dy, steps) => {
        const pts = [{ x: gridX(ci), y: gridY(rj) }];
        let c = ci,
          r = rj;
        for (let s = 0; s < steps; s++) {
          c += dx;
          if (c < 0 || c >= COLS) break;
          pts.push({ x: gridX(c), y: gridY(r) });
          r += dy;
          if (r < 0 || r >= ROWS) break;
          pts.push({ x: gridX(c), y: gridY(r) });
        }
        return pts.length > 1 ? pts : null;
      };

      const addStair = (ci, rj, dx, dy, steps) => {
        const p = stairPath(ci, rj, dx, dy, steps);
        if (p) paths.push({ type: "zigzag", points: p });
      };

      const stepsAcross = Math.min(6, Math.floor(Math.min(COLS, ROWS) / 2));

      addStair(1, 1, +1, +1, stepsAcross);
      addStair(COLS - 2, 1, -1, +1, stepsAcross);
      addStair(1, ROWS - 2, +1, -1, stepsAcross);
      addStair(COLS - 2, ROWS - 2, -1, -1, stepsAcross);
      addStair(
        Math.floor(COLS / 3),
        Math.floor(ROWS / 3),
        +1,
        +1,
        stepsAcross - 1
      );
      addStair(
        Math.floor((2 * COLS) / 3),
        Math.floor(ROWS / 2),
        -1,
        +1,
        stepsAcross - 1
      );

      return paths;
    };

    const circuitPaths = createCircuitPaths();

    // Inicializa partículas (azuis e douradas)
    const initializeParticles = () => {
      const zigzagPaths = circuitPaths.filter((p) => p.type === "zigzag");
      const maxParticles = 12;
      let particleCount = 0;

      // Partículas azuis e douradas nos caminhos zigzag
      zigzagPaths.forEach((path, index) => {
        if (particleCount >= maxParticles) return;

        // Alterna entre azul e dourado
        const isGold = index % 3 === 0; // Aproximadamente 1/3 serão douradas

        energyPulsesRef.current.push({
          id: `particle-${Date.now()}-${index}`,
          path,
          currentSegment: 0,
          progress: Math.random() * 100,
          speed: isGold ? 2.5 + Math.random() * 1.5 : 2.0 + Math.random() * 1.5,
          intensity: isGold ? 0.9 : 0.8,
          size: isGold ? 1.8 : 1.6,
          isGold: isGold, // Marca se é partícula dourada
          isBlinking: false,
          blinkCount: 0,
          blinkTimer: 0,
          blinkPhase: 0,
          finalPosition: null,
        });
        particleCount++;
      });
    };

    // Limpa e inicializa partículas
    energyPulsesRef.current = [];
    initializeParticles();

    // Gera novos pulsos
    const generateEnergyPulse = () => {
      const path =
        circuitPaths[Math.floor(Math.random() * circuitPaths.length)];
      if (!path || path.points.length < 2) return;

      const isZigzag = path.type === "zigzag";
      const isGold = isZigzag && Math.random() < 0.3; // 30% de chance de ser dourada em zigzag

      const newPulse = {
        id: Date.now() + Math.random(),
        path,
        currentSegment: 0,
        progress: 0,
        speed: isGold ? 2.5 + Math.random() * 1.5 : 1.7 + Math.random() * 1.2,
        intensity: isGold ? 0.9 : 0.7,
        size: isGold ? 1.8 : 1.8,
        isGold: isGold,
        isBlinking: false,
        blinkCount: 0,
        blinkTimer: 0,
        blinkPhase: 0,
        finalPosition: null,
      };

      if (energyPulsesRef.current.length >= 35) {
        energyPulsesRef.current = [
          ...energyPulsesRef.current.slice(1),
          newPulse,
        ];
      } else {
        energyPulsesRef.current = [...energyPulsesRef.current, newPulse];
      }
    };

    // ====== ANIMAÇÃO ======
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const colors = getThemeColors();
      drawCircuitBoard(colors);

      const toRemove = [];

      energyPulsesRef.current.forEach((pulse, idx) => {
        const path = pulse.path;
        if (path.points.length < 2) {
          toRemove.push(pulse.id);
          return;
        }

        const segmentIndex = pulse.currentSegment;

        // Escolhe a cor baseada no tipo de partícula
        const particleColor = pulse.isGold
          ? colors.particleGold
          : colors.particleBlue;
        const [r, g, b] = particleColor;

        // Final do caminho - piscar e desaparecer
        if (segmentIndex >= path.points.length - 1) {
          if (!pulse.isBlinking) {
            const finalPoint = path.points[path.points.length - 1];
            energyPulsesRef.current[idx].isBlinking = true;
            energyPulsesRef.current[idx].blinkTimer = 0;
            energyPulsesRef.current[idx].blinkCount = 0;
            energyPulsesRef.current[idx].finalPosition = {
              x: finalPoint.x,
              y: finalPoint.y,
            };
          }

          if (pulse.isBlinking) {
            energyPulsesRef.current[idx].blinkTimer += 1;
            if (energyPulsesRef.current[idx].blinkTimer >= 8) {
              energyPulsesRef.current[idx].blinkTimer = 0;
              energyPulsesRef.current[idx].blinkPhase =
                energyPulsesRef.current[idx].blinkPhase === 0 ? 1 : 0;
              if (energyPulsesRef.current[idx].blinkPhase === 1) {
                energyPulsesRef.current[idx].blinkCount += 1;
              }
            }
            if (pulse.blinkCount >= 3) {
              toRemove.push(pulse.id);
              return;
            }
            if (pulse.blinkPhase === 0) {
              const { x: cx, y: cy } = pulse.finalPosition;
              const gradient = ctx.createRadialGradient(
                cx,
                cy,
                0,
                cx,
                cy,
                pulse.size * 6
              );
              gradient.addColorStop(
                0,
                `rgba(${r},${g},${b},${pulse.intensity})`
              );
              gradient.addColorStop(
                0.3,
                `rgba(${r},${g},${b},${pulse.intensity * 0.6})`
              );
              gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
              ctx.fillStyle = gradient;
              ctx.beginPath();
              ctx.arc(cx, cy, pulse.size * 6, 0, Math.PI * 2);
              ctx.fill();

              ctx.fillStyle = `rgba(255,255,255,${pulse.intensity})`;
              ctx.beginPath();
              ctx.arc(cx, cy, pulse.size, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          return;
        }

        // Movimento da partícula
        const A = path.points[segmentIndex];
        const B = path.points[segmentIndex + 1];
        const t = pulse.progress / 100;
        const x = A.x + (B.x - A.x) * t;
        const y = A.y + (B.y - A.y) * t;

        // Trilha
        const trailLen = 4;
        for (let i = 0; i < trailLen; i++) {
          const tp = Math.max(0, t - i * 0.15);
          const tx = A.x + (B.x - A.x) * tp;
          const ty = A.y + (B.y - A.y) * tp;
          const alpha = (1 - i / trailLen) * pulse.intensity * 0.3;
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.beginPath();
          ctx.arc(
            tx,
            ty,
            pulse.size * (1 - (i / trailLen) * 0.3),
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        // Brilho principal
        const gradient = ctx.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          pulse.size * 4
        );
        gradient.addColorStop(
          0,
          `rgba(${r},${g},${b},${pulse.intensity * 0.8})`
        );
        gradient.addColorStop(
          0.3,
          `rgba(${r},${g},${b},${pulse.intensity * 0.4})`
        );
        gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, pulse.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Núcleo
        ctx.fillStyle = `rgba(255,255,255,${pulse.intensity * 0.6})`;
        ctx.beginPath();
        ctx.arc(x, y, pulse.size * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Progresso
        if (!pulse.isBlinking) {
          energyPulsesRef.current[idx].progress += pulse.speed;
          if (energyPulsesRef.current[idx].progress >= 100) {
            energyPulsesRef.current[idx].progress = 0;
            energyPulsesRef.current[idx].currentSegment++;
          }
        }
      });

      // Remove partículas que terminaram
      if (toRemove.length > 0) {
        energyPulsesRef.current = energyPulsesRef.current.filter(
          (p) => !toRemove.includes(p.id)
        );
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Intervalo para gerar novas partículas
    pulseIntervalRef.current = setInterval(() => {
      generateEnergyPulse();
    }, 250 + Math.random() * 150);

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
        zIndex: -1,
        pointerEvents: "none",
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
