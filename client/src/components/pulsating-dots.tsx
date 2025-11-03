import { useEffect, useRef } from 'react';

interface PulsatingDotsProps {
  width?: number;
  height?: number;
  className?: string;
}

export function PulsatingDots({ width = 256, height = 256, className = '' }: PulsatingDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    function draw() {
      if (!canvas || !ctx) return;

      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const maxRadius = Math.min(width, height) * 0.35;

      const rings = 25;
      const dotsPerRing = 60;
      const pulse = Math.sin(t * 0.02) * 0.1 + 0.9;

      for (let i = 0; i < rings; i++) {
        const ringRadius = (i / rings) * maxRadius * pulse;
        const numDots = Math.floor(dotsPerRing * Math.sin((i / rings) * Math.PI));
        for (let j = 0; j < numDots; j++) {
          const angle = (j / numDots) * Math.PI * 2 + t * 0.001;
          const x = cx + Math.cos(angle) * ringRadius;
          const y = cy + Math.sin(angle) * ringRadius;

          const brightness = (0.6 + 0.4 * Math.sin((i / rings) * Math.PI)) * 0.5;
          // Primary blue: #2563EB = rgb(37, 99, 235)
          ctx.fillStyle = `rgba(37, 99, 235, ${brightness})`;

          const baseSize = 0.7 + 0.7 * Math.sin(t * 0.05 + i * 0.5);
          const size = Math.max(0.75, baseSize); // Enforce minimum radius for visibility
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      t += 1;
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      data-testid="canvas-pulsating-dots"
    />
  );
}
