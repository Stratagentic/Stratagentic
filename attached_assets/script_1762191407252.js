const canvas = document.getElementById("dotfield");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

let t = 0;

function draw() {
  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const maxRadius = Math.min(width, height) * 0.35;

  const rings = 25; // number of concentric rings
  const dotsPerRing = 60; // density
  const pulse = Math.sin(t * 0.02) * 0.1 + 0.9; // subtle breathing motion

  for (let i = 0; i < rings; i++) {
    const ringRadius = (i / rings) * maxRadius * pulse;
    const numDots = Math.floor(dotsPerRing * Math.sin((i / rings) * Math.PI));
    for (let j = 0; j < numDots; j++) {
      const angle = (j / numDots) * Math.PI * 2 + t * 0.001;
      const x = cx + Math.cos(angle) * ringRadius;
      const y = cy + Math.sin(angle) * ringRadius;

      const brightness = 0.6 + 0.4 * Math.sin((i / rings) * Math.PI);
      ctx.fillStyle = `rgba(180, 200, 255, ${brightness})`;

      const size = 1.2 + 1.2 * Math.sin(t * 0.05 + i * 0.5);
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  t += 1;
  requestAnimationFrame(draw);
}

draw();