const canvas = document.getElementById("globe");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const POINTS = 1000;
const RADIUS = 250;
const COLOR = "#2563EB";
const points = [];
let t = 0;

// Interaction state
let isDragging = false;
let lastX = 0, lastY = 0;
let velocityX = 0, velocityY = 0;
let rotX = 0, rotY = 0;
let baseRotY = 0.002;
const mouse = { x: 0, y: 0, active: false };

canvas.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.active = true;

  if (isDragging) {
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;

    // Natural drag directions
    velocityY = -dx * 0.002;
    velocityX = dy * 0.002;

    lastX = e.clientX;
    lastY = e.clientY;
  }
});

canvas.addEventListener("mousedown", e => {
  isDragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
});

canvas.addEventListener("mouseup", () => (isDragging = false));
canvas.addEventListener("mouseleave", () => {
  isDragging = false;
  mouse.active = false;
});

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

function project(p, rotY, rotX) {
  // Yaw rotation
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);
  let x = p.x * cosY + p.z * sinY;
  let z = p.z * cosY - p.x * sinY;
  let y = p.y;

  // Pitch rotation
  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);
  let y2 = y * cosX - z * sinX;
  let z2 = z * cosX + y * sinX;

  const depth = 500;
  const scale = depth / (depth + z2);
  const px = canvas.width / 2 + x * scale;
  const py = canvas.height / 2 + y2 * scale;
  return { px, py, scale, z: z2 };
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const pulse = Math.sin(t * 0.04) * 0.3 + 0.7;

  // Rotation physics
  rotY += baseRotY + velocityY;
  rotX += velocityX;
  velocityX *= 0.96;
  velocityY *= 0.96;
  rotX = Math.max(Math.min(rotX, Math.PI / 3), -Math.PI / 3);

  // Calculate "proximity magnetism" (cursor distance to globe center)
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  let proximityBoost = 1;
  if (mouse.active) {
    const dx = mouse.x - cx;
    const dy = mouse.y - cy;
    const d = Math.sqrt(dx * dx + dy * dy);
    const proximity = Math.max(0, 1 - d / (Math.min(canvas.width, canvas.height) / 2));
    proximityBoost = 1 + proximity * 2; // up to 3x stronger magnetism when close
    // slight tilt toward cursor
    rotY += dx * 0.000001 * proximity;
    rotX -= dy * 0.000001 * proximity;
  }

  for (let i = 0; i < POINTS; i++) {
    const p = points[i];
    const dist = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
    const wave = Math.sin(dist / 10 - t * 0.1);
    const amp = wave * 6 * pulse;
    const pr = project({ x: p.x, y: p.y, z: p.z + amp }, rotY, rotX);

    // Enhanced magnetic attraction with proximity boost
    if (mouse.active) {
      const dx = pr.px - mouse.x;
      const dy = pr.py - mouse.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      const influenceRadius = 220;
      if (d < influenceRadius) {
        const strength = Math.pow(1 - d / influenceRadius, 2.5) * 8 * proximityBoost;
        p.offsetX = (p.offsetX - dx * 0.01 * strength) * 0.9;
        p.offsetY = (p.offsetY - dy * 0.01 * strength) * 0.9;
      } else {
        p.offsetX *= 0.9;
        p.offsetY *= 0.9;
      }
    } else {
      p.offsetX *= 0.9;
      p.offsetY *= 0.9;
    }

    // Depth and size
    const alpha = 0.25 + 0.75 * (1 - dist / RADIUS);
    const depthBias = Math.pow(pr.scale, 1.5);
    const size = 1.2 * pr.scale * (1 + depthBias * 0.8);

    ctx.beginPath();
    ctx.fillStyle = COLOR;
    ctx.globalAlpha = alpha * pr.scale;
    ctx.arc(pr.px + p.offsetX, pr.py + p.offsetY, size, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  t += 1;
  requestAnimationFrame(draw);
}

draw();
