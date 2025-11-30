import { SYSTEM } from "@thi.ng/random";

// Monokai accent colors for lines
const COLORS = [
  "#f92672", // pink
  "#66d9ef", // cyan
  "#a6e22e", // green
  "#ae81ff", // purple
  "#fd971f", // orange
];

interface FlowLine {
  points: [number, number][];
  color: string;
  opacity: number;
  width: number;
}

// Simple 2D noise implementation (Perlin-like)
const permutation: number[] = [];
for (let i = 0; i < 256; i++) permutation[i] = i;
for (let i = 255; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
}
const perm = [...permutation, ...permutation];

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a: number, b: number, t: number): number {
  return a + t * (b - a);
}

function grad(hash: number, x: number, y: number): number {
  const h = hash & 3;
  const u = h < 2 ? x : y;
  const v = h < 2 ? y : x;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

function noise2D(x: number, y: number): number {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  x -= Math.floor(x);
  y -= Math.floor(y);
  const u = fade(x);
  const v = fade(y);
  const A = perm[X] + Y;
  const B = perm[X + 1] + Y;
  return lerp(
    lerp(grad(perm[A], x, y), grad(perm[B], x - 1, y), u),
    lerp(grad(perm[A + 1], x, y - 1), grad(perm[B + 1], x - 1, y - 1), u),
    v
  );
}

// Flow field parameters
const NOISE_SCALE = 0.004;
const NUM_LINES = 60;
const MAX_POINTS = 120;
const STEP_SIZE = 4;

// Persistent line data for smooth animation
interface PersistentLine {
  seedX: number;
  seedY: number;
  color: string;
  opacity: number;
  width: number;
}

let persistentLines: PersistentLine[] = [];
let lastInitWidth = -1;

function initLines(width: number, height: number, force = false) {
  // Reinitialize if crossing mobile/desktop threshold or first time
  const wasMobile = lastInitWidth > 0 && lastInitWidth < 768;
  const isMobile = width < 768;
  const crossedThreshold = lastInitWidth > 0 && wasMobile !== isMobile;

  if (persistentLines.length > 0 && !force && !crossedThreshold) return;

  persistentLines = [];
  lastInitWidth = width;
  const rng = SYSTEM;

  // On mobile, spread lines across full width
  // On desktop, concentrate on right 70% so text area stays clear
  const startX = isMobile ? 0 : width * 0.3;
  const rangeX = isMobile ? width : width * 0.7;

  for (let i = 0; i < NUM_LINES; i++) {
    persistentLines.push({
      seedX: startX + rng.float(rangeX),
      seedY: rng.float(height),
      color: COLORS[i % COLORS.length],
      opacity: 0.2 + rng.float(0.6),
      width: 1 + rng.float(2.5),
    });
  }
}

// Generate flow field lines
function generateLines(
  width: number,
  height: number,
  time: number
): FlowLine[] {
  initLines(width, height);

  const lines: FlowLine[] = [];
  const timeOffset = time * 0.0003;

  for (const seed of persistentLines) {
    const startX = seed.seedX + Math.sin(timeOffset * 2) * 30;
    const startY = seed.seedY + Math.cos(timeOffset * 1.5) * 20;

    const points: [number, number][] = [[startX, startY]];
    let x = startX;
    let y = startY;

    for (let j = 0; j < MAX_POINTS; j++) {
      const noiseVal = noise2D(
        x * NOISE_SCALE + timeOffset,
        y * NOISE_SCALE + timeOffset * 0.7
      );
      const angle = noiseVal * Math.PI * 3;

      x += Math.cos(angle) * STEP_SIZE;
      y += Math.sin(angle) * STEP_SIZE;

      if (x < -100 || x > width + 100 || y < -100 || y > height + 100) break;

      points.push([x, y]);
    }

    if (points.length > 5) {
      lines.push({
        points,
        color: seed.color,
        opacity: seed.opacity,
        width: seed.width,
      });
    }
  }

  return lines;
}

// Draw lines to canvas
function drawLines(
  ctx: CanvasRenderingContext2D,
  lines: FlowLine[],
  width: number,
  height: number
) {
  ctx.clearRect(0, 0, width, height);

  for (const line of lines) {
    if (line.points.length < 2) continue;

    ctx.beginPath();
    ctx.strokeStyle = line.color;
    ctx.globalAlpha = line.opacity;
    ctx.lineWidth = line.width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.moveTo(line.points[0][0], line.points[0][1]);

    // Smooth curve through points using quadratic bezier
    for (let i = 1; i < line.points.length - 1; i++) {
      const xc = (line.points[i][0] + line.points[i + 1][0]) / 2;
      const yc = (line.points[i][1] + line.points[i + 1][1]) / 2;
      ctx.quadraticCurveTo(line.points[i][0], line.points[i][1], xc, yc);
    }

    ctx.stroke();
  }

  ctx.globalAlpha = 1;
}

// Track animation frame ID for cleanup
let currentAnimationId: number | null = null;
let currentResizeHandler: (() => void) | null = null;

// Canvas component with generative animation
function generativeCanvas() {
  const canvasId = "hero-canvas";

  // Cancel any existing animation loop
  if (currentAnimationId !== null) {
    cancelAnimationFrame(currentAnimationId);
    currentAnimationId = null;
  }

  // Remove any existing resize handler
  if (currentResizeHandler !== null) {
    window.removeEventListener("resize", currentResizeHandler);
    currentResizeHandler = null;
  }

  // Setup runs after DOM is ready
  setTimeout(() => {
    const el = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!el) return;

    const ctx = el.getContext("2d")!;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = el.getBoundingClientRect();
      el.width = rect.width * dpr;
      el.height = rect.height * dpr;
      // Reset transform and apply new scale
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Reinitialize lines for new dimensions
      initLines(rect.width, rect.height, true);
    };

    resize();
    currentResizeHandler = resize;
    window.addEventListener("resize", resize);

    let time = 0;
    const animate = () => {
      // Stop animation if canvas is no longer in DOM
      if (!document.body.contains(el)) {
        currentAnimationId = null;
        if (currentResizeHandler) {
          window.removeEventListener("resize", currentResizeHandler);
          currentResizeHandler = null;
        }
        return;
      }

      const rect = el.getBoundingClientRect();
      const lines = generateLines(rect.width, rect.height, time);
      drawLines(ctx, lines, rect.width, rect.height);

      time += 16;
      currentAnimationId = requestAnimationFrame(animate);
    };

    animate();
  }, 0);

  return [
    "canvas",
    {
      id: canvasId,
      style: {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        zIndex: "1",
      },
    },
  ];
}

// Text animation component
function heroText() {
  return [
    "div",
    {
      class: "hero-text",
    },
    [
      "h1",
      {
        class: "hero-title",
        style: {
          fontSize: "var(--text-6xl)",
          fontWeight: "700",
          lineHeight: "var(--leading-tight)",
          color: "var(--text-primary)",
          marginBottom: "var(--space-4)",
          opacity: "0",
          animation: "fadeInUp 0.8s ease-out 0.3s forwards",
        },
      },
      "NEICHLER",
    ],
    [
      "p",
      {
        class: "hero-tagline",
        style: {
          fontSize: "var(--text-3xl)",
          fontWeight: "300",
          color: "var(--text-secondary)",
          opacity: "0",
          animation: "fadeInUp 0.8s ease-out 0.8s forwards",
        },
      },
      "inspired design",
    ],
    [
      "div",
      {
        style: {
          marginTop: "var(--space-12)",
          opacity: "0",
          animation: "fadeInUp 0.8s ease-out 1.2s forwards",
        },
      },
      [
        "a",
        {
          href: "#contact",
          style: {
            display: "inline-block",
            padding: "var(--space-4) var(--space-8)",
            backgroundColor: "var(--accent-pink)",
            color: "var(--text-primary)",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "var(--text-sm)",
            letterSpacing: "0.05em",
            transition: "all 0.2s ease",
          },
          onmouseover: (e: MouseEvent) => {
            (e.target as HTMLElement).style.backgroundColor = "#ff3385";
            (e.target as HTMLElement).style.transform = "translateY(-2px)";
          },
          onmouseout: (e: MouseEvent) => {
            (e.target as HTMLElement).style.backgroundColor = "#f92672";
            (e.target as HTMLElement).style.transform = "translateY(0)";
          },
        },
        "GET IN TOUCH",
      ],
    ],
  ];
}

// Gradient overlay
function gradientOverlay() {
  return [
    "div",
    {
      class: "hero-gradient",
      style: {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(90deg, #272822 0%, #272822 25%, rgba(39,40,34,0.9) 40%, rgba(39,40,34,0.5) 60%, transparent 80%)",
        zIndex: "5",
        pointerEvents: "none",
      },
    },
  ];
}

// Main hero export
export function hero() {
  return [
    "section",
    {
      id: "hero",
      style: {
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "600px",
        overflow: "hidden",
        backgroundColor: "var(--bg-primary)",
      },
    },
    // Inject keyframe animations
    [
      "style",
      {},
      `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `,
    ],
    generativeCanvas(),
    gradientOverlay(),
    heroText(),
  ];
}
