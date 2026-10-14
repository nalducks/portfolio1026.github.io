import { Button } from "@/components/ui/button";
import profilImg from "@/assets/profil.jpg";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, Download, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import profileDocument from "@/assets/profile.pdf.asset.json";

const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: {
      x: number; y: number; vx: number; vy: number; size: number; opacity: number;
    }[] = [];

    // Burst particles from clicks
    const burstParticles: {
      x: number; y: number; vx: number; vy: number; size: number; opacity: number; life: number;
    }[] = [];

    const PARTICLE_COUNT = 60;
    const CONNECTION_DIST = 120;
    const MOUSE_RADIUS = 150;
    const MOUSE_FORCE = 0.8;
    const BURST_COUNT = 15;
    const primaryColor = [0, 255, 170];
    const mouse = { x: -9999, y: -9999 };

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (let i = 0; i < BURST_COUNT; i++) {
        const angle = (Math.PI * 2 * i) / BURST_COUNT + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 4 + 2;
        burstParticles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3 + 1.5,
          opacity: 1,
          life: 1,
        });
      }
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw grid
      ctx.strokeStyle = `rgba(${primaryColor.join(",")}, 0.03)`;
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
            ctx.strokeStyle = `rgba(${primaryColor.join(",")}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles with mouse interaction
      for (const p of particles) {
        // Mouse repulsion
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_RADIUS && mDist > 0) {
          const force = (1 - mDist / MOUSE_RADIUS) * MOUSE_FORCE;
          p.vx += (mdx / mDist) * force;
          p.vy += (mdy / mDist) * force;
        }

        // Dampen velocity
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Glow near mouse
        const glowAlpha = mDist < MOUSE_RADIUS ? p.opacity + (1 - mDist / MOUSE_RADIUS) * 0.4 : p.opacity;
        const glowSize = mDist < MOUSE_RADIUS ? p.size + (1 - mDist / MOUSE_RADIUS) * 2 : p.size;

        ctx.beginPath();
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${primaryColor.join(",")}, ${glowAlpha})`;
        ctx.fill();
      }

      // Draw burst particles
      for (let i = burstParticles.length - 1; i >= 0; i--) {
        const bp = burstParticles[i];
        bp.x += bp.vx;
        bp.y += bp.vy;
        bp.vx *= 0.96;
        bp.vy *= 0.96;
        bp.life -= 0.02;
        bp.opacity = bp.life;

        if (bp.life <= 0) {
          burstParticles.splice(i, 1);
          continue;
        }

        // Glow ring
        ctx.beginPath();
        ctx.arc(bp.x, bp.y, bp.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${primaryColor.join(",")}, ${bp.opacity * 0.15})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(bp.x, bp.y, bp.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${primaryColor.join(",")}, ${bp.opacity})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  );
};

const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section
      id="home"
      ref={ref}
      className={`flex flex-col items-center justify-center section-padding text-center pt-28 md:pt-32 relative overflow-hidden transition-all duration-700 motion-reduce:transition-none ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* Particle grid background */}
      <Particles />

      <div className="relative" style={{ zIndex: 10 }}>
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-primary/30 mb-6 mx-auto glow-box">
          <img src={profilImg} alt="Dhany Catur Prasetya" className="w-full h-full object-cover" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-primary font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Elektronika · Informatika · Data
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 leading-tight font-display">
          Dhany Catur<br /><span className="text-primary">Prasetya.</span>
        </h1>
        <p className="text-sm md:text-base text-foreground/90 font-medium mt-5 mb-3">{profile.role}</p>
        <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-5 leading-7">
          Berangkat dari perawatan mesin dan elektronika, kini mendalami Data Science serta mengeksplorasi Web3 dan AI.
        </p>
        <p className="inline-flex items-center gap-2 text-xs text-muted-foreground mb-7"><MapPin size={14} />{profile.location}</p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="rounded-lg px-8 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 glow-box">
            <a href="#contact">Mari terhubung <ArrowUpRight size={16} /></a>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-lg px-8 text-sm font-medium border-border text-foreground hover:border-primary hover:text-primary transition-all">
            <a href={profileDocument.url} download="Dhany-Catur-Prasetya-Profile.pdf" target="_blank" rel="noopener noreferrer">
              <Download size={16} /> Unduh profil
            </a>
          </Button>
        </div>
        <a href="#about" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary mt-10">Kenali lebih dekat <ArrowDown size={14} /></a>
      </div>
    </section>
  );
};

export default HeroSection;
