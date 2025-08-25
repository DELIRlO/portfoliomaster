import React, { useEffect, useRef } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const energyPulsesRef = useRef([]);
  const animationIdRef = useRef(null);
  const pulseIntervalRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // ====== GRID (compartilhado entre desenho e caminhos) ======
    const MARGIN = 50;
    const ROWS = 8; // mesmas 8 linhas da sua placa
    const COLS = 12; // mesmas 12 colunas da sua placa

    const gridX = (i) => (canvas.width / (COLS + 1)) * (i + 1);
    const gridY = (j) => (canvas.height / (ROWS + 1)) * (j + 1);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ====== FUNDO: placa de circuito (sem trilha zig-zag amarela) ======
    const drawCircuitBoard = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Detecta o tema atual
      const isDarkMode = document.documentElement.classList.contains("dark");
      const circuitColor = isDarkMode
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(59,130,246,0.08)";
      const soldColor = isDarkMode
        ? "rgba(255, 255, 255, 0.15)"
        : "rgba(59,130,246,0.15)";

      ctx.strokeStyle = circuitColor;
      ctx.lineWidth = 0.5;
      ctx.lineCap = "round";

      // Linhas horizontais principais
      for (let j = 0; j < ROWS; j++) {
        const y = gridY(j);
        ctx.beginPath();
        ctx.moveTo(MARGIN, y);
        ctx.lineTo(w - MARGIN, y);
        ctx.stroke();

        // Ramificações sutis
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

        // Ramificações sutis
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

      // Pontos de solda discretos
      ctx.fillStyle = soldColor;
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

      // Em L (como no seu código)
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

      // ===== Zig-zag DENTRO do circuito (staircase em cruzamentos) =====
      // helper: cria caminho "escada" alternando X e Y em passos de 1 célula
      const stairPath = (ci, rj, dx, dy, steps) => {
        const pts = [{ x: gridX(ci), y: gridY(rj) }];
        let c = ci,
          r = rj;
        for (let s = 0; s < steps; s++) {
          // passo horizontal
          c += dx;
          if (c < 0 || c >= COLS) break;
          pts.push({ x: gridX(c), y: gridY(r) });
          // passo vertical
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

      // variações pedidas:
      addStair(1, 1, +1, +1, stepsAcross); // direita-baixo-direita...
      addStair(COLS - 2, 1, -1, +1, stepsAcross); // esquerda-baixo-esquerda...
      addStair(1, ROWS - 2, +1, -1, stepsAcross); // direita-cima-direita...
      addStair(COLS - 2, ROWS - 2, -1, -1, stepsAcross); // esquerda-cima-esquerda...

      // mais alguns no meio para densidade
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

    // garante partículas nos zig-zags - LIMITADO A 5 PARTÍCULAS DOURADAS
    const initializeZigzagParticles = () => {
      const zigzagPaths = circuitPaths.filter((p) => p.type === "zigzag");

      // Apenas 5 partículas douradas no total
      const maxGoldenParticles = 5;
      let particleCount = 0;

      // Partículas originais (limitadas)
      zigzagPaths.forEach((path, index) => {
        if (particleCount >= maxGoldenParticles) return;

        energyPulsesRef.current.push({
          id: `zigzag-${Date.now()}-${index}`,
          path,
          currentSegment: 0,
          progress: Math.random() * 100,
          speed: 2.352 + Math.random() * 1.568, // Aumentado em 40% (era 1.68 + 1.12)
          intensity: 0.85,
          size: 1.54, // Reduzido 30% (era 2.2)
          color: [255, 215, 0], // dourado
          isBlinking: false,
          blinkCount: 0,
          blinkTimer: 0,
          blinkPhase: 0,
          finalPosition: null,
        });
        particleCount++;
      });

      // Partículas extras em direções opostas (se ainda houver espaço)
      if (zigzagPaths.length > 0 && particleCount < maxGoldenParticles) {
        for (
          let i = 0;
          i < Math.min(2, maxGoldenParticles - particleCount);
          i++
        ) {
          const originalPath = zigzagPaths[i % zigzagPaths.length];
          const reversedPath = {
            ...originalPath,
            points: [...originalPath.points].reverse(),
          };

          energyPulsesRef.current.push({
            id: `zigzag-rev-${Date.now()}-${i}`,
            path: reversedPath,
            currentSegment: 0,
            progress: Math.random() * 100,
            speed: 2.352 + Math.random() * 1.568, // Aumentado em 40%
            intensity: 0.85,
            size: 1.54, // Reduzido 30%
            color: [255, 215, 0],
            isBlinking: false,
            blinkCount: 0,
            blinkTimer: 0,
            blinkPhase: 0,
            finalPosition: null,
          });
        }
      }
    };
    initializeZigzagParticles();

    // gera pulsos
    const generateEnergyPulse = () => {
      const path =
        circuitPaths[Math.floor(Math.random() * circuitPaths.length)];
      if (!path || path.points.length < 2) return;

      const isZig = path.type === "zigzag";

      // Se for zigzag (dourada), verifica limite de 5 partículas douradas
      if (isZig) {
        const goldenCount = energyPulsesRef.current.filter(
          (p) => p.color[0] === 255 && p.color[1] === 215 && p.color[2] === 0
        ).length;

        if (goldenCount >= 5) return; // Não cria nova partícula dourada se já tem 5
      }

      const newPulse = {
        id: Date.now() + Math.random(),
        path,
        currentSegment: 0,
        progress: 0,
        speed: isZig
          ? 3.318 + Math.random() * 2.296 // Douradas: aumentado 40% (era 2.37 + 1.64)
          : 1.69 + Math.random() * 1.17, // Azuis: velocidade original mantida
        intensity: isZig ? 0.85 : 0.7,
        size: isZig ? 1.68 : 1.8, // Douradas: reduzido 30% (era 2.4) | Azuis: mantido original
        color: isZig ? [255, 215, 0] : [200, 200, 200],
        isBlinking: false,
        blinkCount: 0,
        blinkTimer: 0,
        blinkPhase: 0,
        finalPosition: null,
      };

      if (energyPulsesRef.current.length >= 42) {
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

      // Detecta o tema atual
      const isDarkMode = document.documentElement.classList.contains("dark");
      const bgColor = isDarkMode ? "#020617" : "#ffffff";

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawCircuitBoard();

      const toRemove = [];

      energyPulsesRef.current.forEach((pulse, idx) => {
        const path = pulse.path;
        if (path.points.length < 2) {
          toRemove.push(pulse.id);
          return;
        }

        const segmentIndex = pulse.currentSegment;

        // chegou ao final do caminho -> piscar e sumir
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
              const g = ctx.createRadialGradient(
                cx,
                cy,
                0,
                cx,
                cy,
                pulse.size * 6
              );
              g.addColorStop(
                0,
                `rgba(${pulse.color[0]},${pulse.color[1]},${pulse.color[2]},${pulse.intensity})`
              );
              g.addColorStop(
                0.3,
                `rgba(${pulse.color[0]},${pulse.color[1]},${pulse.color[2]},${
                  pulse.intensity * 0.6
                })`
              );
              g.addColorStop(
                1,
                `rgba(${pulse.color[0]},${pulse.color[1]},${pulse.color[2]},0)`
              );
              ctx.fillStyle = g;
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

        // em movimento
        const A = path.points[segmentIndex];
        const B = path.points[segmentIndex + 1];
        const t = pulse.progress / 100;
        const x = A.x + (B.x - A.x) * t;
        const y = A.y + (B.y - A.y) * t;

        // trilha
        const trailLen = 4;
        for (let i = 0; i < trailLen; i++) {
          const tp = Math.max(0, t - i * 0.15);
          const tx = A.x + (B.x - A.x) * tp;
          const ty = A.y + (B.y - A.y) * tp;
          const alpha = (1 - i / trailLen) * pulse.intensity * 0.3;
          ctx.fillStyle = `rgba(${pulse.color[0]},${pulse.color[1]},${pulse.color[2]},${alpha})`;
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

        // glow principal
        const g = ctx.createRadialGradient(x, y, 0, x, y, pulse.size * 4);
        g.addColorStop(
          0,
          `rgba(${pulse.color[0]},${pulse.color[1]},${pulse.color[2]},${
            pulse.intensity * 0.8
          })`
        );
        g.addColorStop(
          0.3,
          `rgba(${pulse.color[0]},${pulse.color[1]},${pulse.color[2]},${
            pulse.intensity * 0.4
          })`
        );
        g.addColorStop(
          1,
          `rgba(${pulse.color[0]},${pulse.color[1]},${pulse.color[2]},0)`
        );
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, pulse.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // núcleo
        ctx.fillStyle = `rgba(255,255,255,${pulse.intensity * 0.6})`;
        ctx.beginPath();
        ctx.arc(x, y, pulse.size * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // progresso
        if (!pulse.isBlinking) {
          energyPulsesRef.current[idx].progress += pulse.speed;
          if (energyPulsesRef.current[idx].progress >= 100) {
            energyPulsesRef.current[idx].progress = 0;
            energyPulsesRef.current[idx].currentSegment++;
          }
        }
      });

      if (toRemove.length > 0) {
        energyPulsesRef.current = energyPulsesRef.current.filter(
          (p) => !toRemove.includes(p.id)
        );
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    pulseIntervalRef.current = setInterval(() => {
      generateEnergyPulse();
    }, 200 + Math.random() * 200);

    animate();

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
        background: "transparent",
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
