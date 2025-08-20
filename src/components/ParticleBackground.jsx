import { useEffect, useRef } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    // Particle class com movimento 3D
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        // Posição inicial dispersa - evita o centro completamente (raios reduzidos em 30%)
        const angle = Math.random() * Math.PI * 2;
        const minRadius = 140; // Reduzido de 200 para 140 (30% menor)
        const maxRadius = 560; // Reduzido de 800 para 560 (30% menor)
        const radius = minRadius + Math.random() * (maxRadius - minRadius);

        this.x = canvas.width / 2 + Math.cos(angle) * radius;
        this.y = canvas.height / 2 + Math.sin(angle) * radius;

        // Profundidade (z) - começa pequeno (fundo) e vem para frente
        this.z = Math.random() * 1000 + 1;
        this.maxZ = 1000;

        // Velocidade de aproximação
        this.speed = Math.random() * 8 + 2;

        // Posição 3D original (antes da projeção) - evita o centro (raios reduzidos em 30%)
        const angle3d = Math.random() * Math.PI * 2;
        const radius3d = 700 + Math.random() * 1400; // Reduzido de 1000-3000 para 700-2100 (30% menor)
        this.x3d = Math.cos(angle3d) * radius3d;
        this.y3d = Math.sin(angle3d) * radius3d;

        this.color = this.getRandomColor();
        this.baseOpacity = Math.random() * 0.8 + 0.2;
        this.pulse = Math.random() * 0.02 + 0.01;

        // Trails para algumas partículas
        this.hasTrail = Math.random() > 0.7;
        this.trail = [];
      }

      getRandomColor() {
        const grayColors = [
          "#2d2d2d", // Cinza escuro
          "#4a4a4a", // Cinza médio escuro
          "#6b6b6b", // Cinza médio
          "#8c8c8c", // Cinza médio claro
          "#a8a8a8", // Cinza claro
          "#c4c4c4", // Cinza muito claro
          "#e8e8e8", // Quase branco
          "#ffffff", // Branco puro
          "#f5f5f5", // Branco suave
          "#d9d9d9", // Cinza bem claro
        ];
        return grayColors[Math.floor(Math.random() * grayColors.length)];
      }

      update() {
        // Move a partícula para frente (diminui z)
        this.z -= this.speed;

        // Se chegou muito perto, reseta no fundo
        if (this.z <= 1) {
          this.reset();
          return;
        }

        // Projeção 3D para 2D
        const scale = (this.maxZ - this.z) / this.maxZ;
        this.x = (this.x3d / this.z) * 200 + canvas.width / 2;
        this.y = (this.y3d / this.z) * 200 + canvas.height / 2;

        // Tamanho baseado na profundidade (reduzido em 20%)
        this.size = (scale * 4 + 0.5) * 0.8;

        // Opacidade baseada na profundidade
        this.opacity =
          this.baseOpacity * scale + Math.sin(Date.now() * this.pulse) * 0.2;

        // Interação com mouse removida

        // Atualiza trail se a partícula tem um (trail mais fino)
        if (this.hasTrail && this.size > 1.2) {
          this.trail.push({
            x: this.x,
            y: this.y,
            opacity: this.opacity * 0.3,
          });
          if (this.trail.length > 8) {
            this.trail.shift();
          }
        }

        // Remove partícula se sair da tela
        if (
          this.x < -50 ||
          this.x > canvas.width + 50 ||
          this.y < -50 ||
          this.y > canvas.height + 50
        ) {
          this.reset();
        }
      }

      draw(ctx) {
        ctx.save();

        // Desenha trail primeiro
        if (this.hasTrail && this.trail.length > 1) {
          for (let i = 0; i < this.trail.length - 1; i++) {
            const point = this.trail[i];
            const nextPoint = this.trail[i + 1];
            const trailOpacity = point.opacity * (i / this.trail.length);

            ctx.globalAlpha = trailOpacity;
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.size * 0.24; // Trail mais fino (reduzido de 0.3 para 0.24)
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(nextPoint.x, nextPoint.y);
            ctx.stroke();
          }
        }

        // Glow effect baseado no tamanho (reduzido em 30%)
        const glowSize = this.size * 1.68; // Reduzido de 2.4 para 1.68 (30% menor)
        ctx.shadowColor = this.color;
        ctx.shadowBlur = glowSize;

        // Partícula principal
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    // Create particles (reduzido em 30%)
    const createParticles = () => {
      const particleCount = Math.min(
        84,
        Math.floor(((canvas.width * canvas.height) / 8000) * 0.7)
      ); // 120 * 0.7 = 84
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle());
      }
    };

    // Mouse tracking removido

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    // Connection lines removidas

    // Animation loop
    const animate = () => {
      // Clear com fade effect mais suave
      ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Sort particles by z-depth (draw furthest first)
      particlesRef.current.sort((a, b) => b.z - a.z);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    createParticles();
    window.addEventListener("resize", handleResize);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -10,
        background: "transparent",
        pointerEvents: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
};

export default ParticleBackground;
