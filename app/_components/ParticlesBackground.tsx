"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 16;
const MAX_DISTANCE = 180;
const SPEED_RANGE = [0.05, 0.15];
const SIZE_RANGE = [1.2, 4]; // 별 크기 살짝 키움
const CONTENT_WIDTH = 1024;
const MIN_GUTTER = 40;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  side: "left" | "right";
  opacity: number;
}

function generateParticles(W: number, H: number): Particle[] {
  const gutterWidth = Math.max(MIN_GUTTER, (W - CONTENT_WIDTH) / 2);
  const half = PARTICLE_COUNT / 2;
  const particles: Particle[] = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const side = i < half ? "left" : "right";
    const speed =
      SPEED_RANGE[0] + Math.random() * (SPEED_RANGE[1] - SPEED_RANGE[0]);
    const angle = Math.random() * Math.PI * 2;

    particles.push({
      x:
        side === "left"
          ? Math.random() * gutterWidth
          : W - gutterWidth + Math.random() * gutterWidth,
      y: Math.random() * H,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: SIZE_RANGE[0] + Math.random() * (SIZE_RANGE[1] - SIZE_RANGE[0]),
      side: side,
      opacity: 0.4 + Math.random() * 0.5, // 최소 투명도 상향
    });
  }
  return particles;
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    let particles = generateParticles(W, H);

    const tick = () => {
      const gutterWidth = Math.max(MIN_GUTTER, (W - CONTENT_WIDTH) / 2);
      const isDark = document.documentElement.classList.contains("dark");

      // 색상: 라이트모드 보라색 선명하게, 다크모드 부드러운 노란빛
      const dotColor = isDark ? "#FFFDE7" : "#6d28d9"; // 라이트모드 보라색을 더 진한 700급으로 변경
      const lineColor = isDark ? "#E2E8F0" : "#7c3aed";

      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.side === "left") {
          if (p.x < p.size) {
            p.x = p.size;
            p.vx *= -1;
          }
          if (p.x > gutterWidth - p.size) {
            p.x = gutterWidth - p.size;
            p.vx *= -1;
          }
        } else {
          if (p.x < W - gutterWidth + p.size) {
            p.x = W - gutterWidth + p.size;
            p.vx *= -1;
          }
          if (p.x > W - p.size) {
            p.x = W - p.size;
            p.vx *= -1;
          }
        }
        if (p.y < p.size) {
          p.y = p.size;
          p.vy *= -1;
        }
        if (p.y > H - p.size) {
          p.y = H - p.size;
          p.vy *= -1;
        }

        // 점 그리기: 라이트모드 투명도 0.4로 상향
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.globalAlpha = isDark ? p.opacity * 0.6 : 0.45;
        ctx.fill();
      }

      // 연결선 그리기
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          if (p1.side !== p2.side) continue;

          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < MAX_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor;

            // 선 투명도 및 두께 상향
            const alpha = (1 - dist / MAX_DISTANCE) * (isDark ? 0.25 : 0.35);
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 1.2; // 0.5에서 1.2로 두께 대폭 상향
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(tick);
    };

    tick();

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      particles = generateParticles(W, H);
    };
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      /* hidden: 기본적으로 숨김 (라이트모드)
         dark:block: 다크모드일 때만 보이게 함
      */
      className="fixed inset-0 -z-10 pointer-events-none hidden dark:block"
    />
  );
}
