// src/components/ParticleBackground.jsx - VERSÃO MELHORADA
import { useEffect, useRef, useState } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const cardsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Configurações do sistema de partículas
    const config = {
      particleCount: Math.min(63, Math.floor((window.innerWidth * window.innerHeight) / 8000 * 0.42)),
      connectionDistance: 120,
      cardDistortionRadius: 180,
      particleSpeed: 0.8,
      distortionStrength: 80,
      returnSpeed: 0.08,
      trailEffect: 0.05
    };
    
    const updateDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    updateDimensions();
    
    // Inicializar partículas com propriedades mais próximas ao vídeo
    const initParticles = () => {
      particlesRef.current = [];
      
      for (let i = 0; i < config.particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * config.particleSpeed,
          vy: (Math.random() - 0.5) * config.particleSpeed,
          radius: Math.random() * 2 + 0.8,
          opacity: Math.random() * 0.6 + 0.4,
          originalX: 0,
          originalY: 0,
          distorted: false,
          hue: Math.random() * 60 + 200, // Azul a roxo (200-260)
          saturation: Math.random() * 30 + 70, // 70-100%
          lightness: Math.random() * 20 + 60, // 60-80%
          connection: Math.random() < 0.85,
          glowIntensity: Math.random() * 0.5 + 0.5,
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
    };
    
    // Atualizar posições dos cards com melhor detecção
    const updateCardPositions = () => {
      const cardSelectors = [
        '.card',
        '[class*="card"]',
        '.bg-card',
        '.professional-button-cv',
        'button[class*="glow"]',
        '.group:has(.card)',
        '[class*="hover:"]'
      ];
      
      const cardElements = [];
      cardSelectors.forEach(selector => {
        try {
          cardElements.push(...document.querySelectorAll(selector));
        } catch (e) {
          // Ignora seletores CSS4 não suportados
        }
      });
      
      // Remove duplicatas e elementos muito pequenos
      const uniqueCards = Array.from(new Set(cardElements))
        .filter(card => {
          const rect = card.getBoundingClientRect();
          return rect.width > 50 && rect.height > 30; // Filtrar elementos muito pequenos
        });
      
      cardsRef.current = uniqueCards.map(card => {
        const rect = card.getBoundingClientRect();
        return {
          x: rect.left,
          y: rect.top + window.scrollY,
          width: rect.width,
          height: rect.height,
          distortionRadius: config.cardDistortionRadius,
          element: card,
          centerX: rect.left + rect.width / 2,
          centerY: rect.top + window.scrollY + rect.height / 2
        };
      });
    };
    
    // Função aprimorada de deformação das partículas
    const distortParticle = (particle, card) => {
      const dx = particle.x - card.centerX;
      const dy = particle.y - (card.centerY - window.scrollY);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < card.distortionRadius && distance > 0) {
        if (!particle.distorted) {
          particle.originalX = particle.x;
          particle.originalY = particle.y;
          particle.distorted = true;
        }

        const force = (card.distortionRadius - distance) / card.distortionRadius;
        const angle = Math.atan2(dy, dx);
        
        // Efeito de repulsão mais natural
        const pushDistance = force * config.distortionStrength;
        const targetX = card.centerX + Math.cos(angle) * (distance + pushDistance);
        const targetY = (card.centerY - window.scrollY) + Math.sin(angle) * (distance + pushDistance);
        
        // Movimento suave com interpolação
        particle.x += (targetX - particle.x) * 0.15;
        particle.y += (targetY - particle.y) * 0.15;
        
        // Turbulência baseada em tempo
        const time = Date.now() * 0.002;
        particle.x += Math.sin(time + particle.x * 0.01) * force * 15;
        particle.y += Math.cos(time * 1.1 + particle.y * 0.01) * force * 15;
        
        // Efeitos visuais intensificados
        particle.opacity = Math.min(1, particle.opacity + force * 0.5);
        particle.radius = Math.min(4, particle.radius + force * 1.8);
        particle.glowIntensity = Math.min(2, particle.glowIntensity + force);
        
        // Adicionar efeito visual ao card
        if (distance < card.distortionRadius * 0.6) {
          const intensity = (card.distortionRadius * 0.6 - distance) / (card.distortionRadius * 0.6);
          card.element.style.transform = `scale(${1 + intensity * 0.03}) translateZ(0)`;
          card.element.style.filter = `brightness(${1 + intensity * 0.2}) saturate(${1 + intensity * 0.3})`;
          card.element.style.boxShadow = `0 ${intensity * 20}px ${intensity * 40}px rgba(59, 130, 246, ${intensity * 0.4})`;
        }
        
      } else if (particle.distorted) {
        // Retorno gradual à posição original
        particle.x += (particle.originalX - particle.x) * config.returnSpeed;
        particle.y += (particle.originalY - particle.y) * config.returnSpeed;
        
        // Restaurar propriedades visuais
        particle.opacity = Math.max(0.4, particle.opacity - 0.02);
        particle.radius = Math.max(0.8, particle.radius - 0.08);
        particle.glowIntensity = Math.max(0.5, particle.glowIntensity - 0.03);
        
        if (Math.abs(particle.x - particle.originalX) < 2 && 
            Math.abs(particle.y - particle.originalY) < 2) {
          particle.distorted = false;
        }
      }
    };
    
    // Função para desenhar conexões com gradientes melhorados
    const drawConnections = (ctx) => {
      particlesRef.current.forEach((particle, i) => {
        if (!particle.connection) return;
        
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          if (!otherParticle.connection) return;
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.connectionDistance) {
            const opacity = (config.connectionDistance - distance) / config.connectionDistance * 0.6;
            
            // Gradiente dinâmico nas conexões
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y, 
              otherParticle.x, otherParticle.y
            );
            
            const color1 = `hsla(${particle.hue}, ${particle.saturation}%, ${particle.lightness}%, ${opacity * particle.glowIntensity})`;
            const color2 = `hsla(${otherParticle.hue}, ${otherParticle.saturation}%, ${otherParticle.lightness}%, ${opacity * otherParticle.glowIntensity})`;
            
            gradient.addColorStop(0, color1);
            gradient.addColorStop(0.5, `hsla(${(particle.hue + otherParticle.hue) / 2}, 80%, 70%, ${opacity * 0.8})`);
            gradient.addColorStop(1, color2);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
    };
    
    // Função para desenhar partículas com efeitos aprimorados
    const drawParticles = (ctx) => {
      particlesRef.current.forEach(particle => {
        const time = Date.now() * 0.003;
        const pulse = Math.sin(time + particle.pulsePhase) * 0.3 + 1;
        
        // Halo externo
        if (particle.distorted || particle.glowIntensity > 1) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius * 6 * pulse, 0, Math.PI * 2);
          
          const haloGradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.radius * 6 * pulse
          );
          haloGradient.addColorStop(0, `hsla(${particle.hue}, 90%, 80%, ${particle.opacity * 0.3})`);
          haloGradient.addColorStop(0.5, `hsla(${particle.hue + 20}, 85%, 75%, ${particle.opacity * 0.1})`);
          haloGradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = haloGradient;
          ctx.fill();
        }
        
        // Partícula principal
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * pulse, 0, Math.PI * 2);
        
        const mainGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * pulse * 2
        );
        
        const baseOpacity = particle.opacity * particle.glowIntensity;
        mainGradient.addColorStop(0, `hsla(${particle.hue}, 95%, 85%, ${baseOpacity})`);
        mainGradient.addColorStop(0.3, `hsla(${particle.hue + 10}, 90%, 80%, ${baseOpacity * 0.9})`);
        mainGradient.addColorStop(0.7, `hsla(${particle.hue + 20}, 85%, 75%, ${baseOpacity * 0.6})`);
        mainGradient.addColorStop(1, `hsla(${particle.hue + 30}, 80%, 70%, ${baseOpacity * 0.2})`);
        
        ctx.fillStyle = mainGradient;
        ctx.fill();
        
        // Core brilhante
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 0.3 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 95%, ${baseOpacity})`;
        ctx.fill();
      });
    };
    
    // Loop principal de animação
    const animate = () => {
      if (!isActive) return;
      
      // Background bem preto com trail effect
      ctx.fillStyle = `rgba(0, 0, 0, ${config.trailEffect})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      updateCardPositions();
      
      // Aplicar distorções dos cards
      particlesRef.current.forEach(particle => {
        cardsRef.current.forEach(card => {
          distortParticle(particle, card);
        });
      });
      
      // Atualizar movimento das partículas
      particlesRef.current.forEach(particle => {
        if (!particle.distorted) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Rebatimento nas bordas com pequena randomização
          if (particle.x < 0 || particle.x > canvas.width) {
            particle.vx *= -1;
            particle.vx += (Math.random() - 0.5) * 0.1;
            particle.x = Math.max(0, Math.min(canvas.width, particle.x));
          }
          if (particle.y < 0 || particle.y > canvas.height) {
            particle.vy *= -1;
            particle.vy += (Math.random() - 0.5) * 0.1;
            particle.y = Math.max(0, Math.min(canvas.height, particle.y));
          }
        }
        
        // Atualizar fase do pulse
        particle.pulsePhase += 0.02;
      });

      // Desenhar elementos
      drawConnections(ctx);
      drawParticles(ctx);
      
      // Resetar estilos dos cards que não estão sendo afetados
      cardsRef.current.forEach(card => {
        let isAffected = false;
        particlesRef.current.forEach(particle => {
          const dx = particle.x - card.centerX;
          const dy = particle.y - (card.centerY - window.scrollY);
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < card.distortionRadius * 0.6) {
            isAffected = true;
          }
        });
        
        if (!isAffected && card.element.style.transform) {
          card.element.style.transform = '';
          card.element.style.filter = '';
          card.element.style.boxShadow = '';
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Inicializar e começar animação
    initParticles();
    animate();
    
    // Event listeners
    const handleScroll = () => updateCardPositions();
    const handleResize = () => {
      updateDimensions();
      initParticles();
    };
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const handleVisibilityChange = () => {
      setIsActive(!document.hidden);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1]"
      style={{
        background: 'transparent',
        mixBlendMode: 'normal'
      }}
    />
  );
};

export default ParticleBackground;