import { useEffect, useRef, useState } from "react";

interface GlobeErrorProps {
  maxWidth?: number;
  maxHeight?: number;
}

export function GlobeError({ maxWidth = 512, maxHeight = 512 }: GlobeErrorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: maxWidth, height: maxHeight });

  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const size = Math.min(rect.width, maxWidth, maxHeight);
      setDimensions({ width: size, height: size });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [maxWidth, maxHeight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = dimensions;

    const POINTS = 1000;
    const RADIUS = Math.min(width, height) * 0.44;
    const COLOR = "#DC2626"; // Red color for error
    const points: Array<{ x: number; y: number; z: number; offsetX: number; offsetY: number }> = [];
    let t = 0;

    let isDragging = false;
    let lastX = 0, lastY = 0;
    let velocityX = 0, velocityY = 0;
    let rotX = 0, rotY = 0;
    const baseRotY = 0.002;
    const mouse = { x: 0, y: 0, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;

      if (isDragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;

        velocityY = -dx * 0.002;
        velocityX = dy * 0.002;

        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseLeave = () => {
      isDragging = false;
      mouse.active = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      isDragging = true;
      lastX = touch.clientX;
      lastY = touch.clientY;
      
      const rect = canvas.getBoundingClientRect();
      mouse.x = touch.clientX - rect.left;
      mouse.y = touch.clientY - rect.top;
      mouse.active = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      mouse.x = touch.clientX - rect.left;
      mouse.y = touch.clientY - rect.top;
      mouse.active = true;

      if (isDragging) {
        const dx = touch.clientX - lastX;
        const dy = touch.clientY - lastY;

        velocityY = -dx * 0.002;
        velocityX = dy * 0.002;

        lastX = touch.clientX;
        lastY = touch.clientY;
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
      mouse.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("touchcancel", handleTouchEnd);

    // Build points in sphere
    for (let i = 0; i < POINTS; i++) {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = 2 * Math.PI * Math.random();
      const r = RADIUS * Math.cbrt(Math.random());
      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(theta);
      points.push({ x, y, z, offsetX: 0, offsetY: 0 });
    }

    function project(p: { x: number; y: number; z: number }, rotY: number, rotX: number) {
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      let x = p.x * cosY + p.z * sinY;
      let z = p.z * cosY - p.x * sinY;
      let y = p.y;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      let y2 = y * cosX - z * sinX;
      let z2 = z * cosX + y * sinX;

      const depth = 500;
      const scale = depth / (depth + z2);
      const px = width / 2 + x * scale;
      const py = height / 2 + y2 * scale;
      return { px, py, scale, z: z2 };
    }

    // Function to draw a plus sign
function drawPlus(x: number, y: number, size: number, alpha: number) {
  ctx.fillStyle = COLOR;
  ctx.globalAlpha = alpha;
  ctx.font = `${size * 3}px monospace`; // or 'Arial', 'sans-serif'
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("+", x, y);
}

    function draw() {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, width, height);

      const pulse = Math.sin(t * 0.04) * 0.3 + 0.7;

      rotY += baseRotY + velocityY;
      rotX += velocityX;
      velocityX *= 0.96;
      velocityY *= 0.96;
      rotX = Math.max(Math.min(rotX, Math.PI / 3), -Math.PI / 3);

      const cx = width / 2;
      const cy = height / 2;
      let proximityBoost = 1;
      if (mouse.active) {
        const dx = mouse.x - cx;
        const dy = mouse.y - cy;
        const d = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - d / (Math.min(width, height) / 2));
        proximityBoost = 1 + proximity * 2;
        rotY += dx * 0.000001 * proximity;
        rotX -= dy * 0.000001 * proximity;
      }

      for (let i = 0; i < POINTS; i++) {
        const p = points[i];
        const dist = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
        const wave = Math.sin(dist / 10 - t * 0.1);
        const amp = wave * 6 * pulse;
        const pr = project({ x: p.x, y: p.y, z: p.z + amp }, rotY, rotX);

        if (mouse.active) {
          const dx = pr.px - mouse.x;
          const dy = pr.py - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const influenceRadius = 260;
         if (d < influenceRadius) {
  const strength = Math.pow(1 - d / influenceRadius, 2.5) * 20 * proximityBoost; // Increased strength
  const pushX = (dx / d) * strength; // Normalized direction away from mouse
  const pushY = (dy / d) * strength;
  p.offsetX = (p.offsetX + pushX) * 0.97; // Less damping = more movement
  p.offsetY = (p.offsetY + pushY) * 0.97;
} else {
            p.offsetX *= 0.9;
            p.offsetY *= 0.9;
          }
        } else {
          p.offsetX *= 0.9;
          p.offsetY *= 0.9;
        }

        const alpha = 0.25 + 0.75 * (1 - dist / RADIUS);
        const depthBias = Math.pow(pr.scale, 1.5);
        const size = 2 * pr.scale * (1 + depthBias * 0.8);

        // Draw plus sign instead of circle
        drawPlus(pr.px + p.offsetX, pr.py + p.offsetY, size, alpha * pr.scale);
      }

      ctx.globalAlpha = 1;
      t += 1;
      animationId = requestAnimationFrame(draw);
    }

    let animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [dimensions]);

  return (
    <div ref={containerRef} style={{ width: "100%", maxWidth: `${maxWidth}px` }}>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{ display: "block", cursor: "grab", width: "100%", height: "auto" }}
      />
    </div>
  );
}
