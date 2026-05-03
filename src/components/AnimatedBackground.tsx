import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    // Particles
    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; baseAlpha: number;
    }[] = [];

    for (let i = 0; i < 80; i++) {
      const baseAlpha = Math.random() * 0.4 + 0.1;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 0.5,
        alpha: baseAlpha,
        baseAlpha,
      });
    }

    // Light streaks
    const streaks: {
      x: number; y: number; length: number; speed: number;
      alpha: number; angle: number;
    }[] = [];
    for (let i = 0; i < 5; i++) {
      streaks.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 150 + 80,
        speed: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.08 + 0.02,
        angle: Math.random() * Math.PI * 2,
      });
    }

    const CONNECTION_DIST = 120;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw & update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse proximity glow
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          p.alpha = p.baseAlpha + (1 - dist / 200) * 0.5;
          p.size += (3.5 - p.size) * 0.05;
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
          p.size += ((Math.random() * 2.5 + 0.5) - p.size) * 0.01;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 51, 234, ${p.alpha})`;
        ctx.fill();

        // Glow
        if (p.alpha > 0.3) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
          grad.addColorStop(0, `rgba(147, 51, 234, ${p.alpha * 0.3})`);
          grad.addColorStop(1, "rgba(147, 51, 234, 0)");
          ctx.fillStyle = grad;
          ctx.fill();
        }
      });

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(147, 51, 234, ${(1 - dist / CONNECTION_DIST) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Light streaks
      streaks.forEach((s) => {
        const endX = s.x + Math.cos(s.angle) * s.length;
        const endY = s.y + Math.sin(s.angle) * s.length;
        const grad = ctx.createLinearGradient(s.x, s.y, endX, endY);
        grad.addColorStop(0, "rgba(147, 51, 234, 0)");
        grad.addColorStop(0.5, `rgba(147, 51, 234, ${s.alpha})`);
        grad.addColorStop(1, "rgba(147, 51, 234, 0)");
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        if (s.x < -200 || s.x > canvas.width + 200 || s.y < -200 || s.y > canvas.height + 200) {
          s.x = Math.random() * canvas.width;
          s.y = Math.random() * canvas.height;
          s.angle = Math.random() * Math.PI * 2;
        }
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.45 }}
    />
  );
};

export default AnimatedBackground;
