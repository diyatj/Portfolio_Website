import React, { useEffect, useRef } from "react";
import "../styles/GemCanvas.css";

// Original particle-field implementation (not copied from any third-party
// site): each facet is drawn and sampled on its own, one at a time, using
// canvas clipping — so every particle in a facet gets that facet's exact
// symbol, guaranteed, with no brightness math or geometry test needed.
const SIZE = 320;
const FONT_SIZE = 6;
const COL_GAP = FONT_SIZE * 0.85;
const ROW_GAP = FONT_SIZE * 1.05;

const FACETS = [
  { pts: [[150, 26], [60, 140], [150, 158]], fill: "#C43A2E", char: "=" }, // top-left    — region 3
  { pts: [[150, 26], [150, 158], [240, 140]], fill: "#D9534A", char: ":" }, // top-right   — region 4, lightest
  { pts: [[60, 140], [150, 158], [150, 274]], fill: "#5C0012", char: "#" }, // bottom-left — region 1, darkest
  { pts: [[150, 158], [240, 140], [150, 274]], fill: "#A3001F", char: "*" }, // bottom-right— region 2
];

function sampleGem() {
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  const raw = [];

  FACETS.forEach((facet) => {
    // clip to just this facet, then fill it — anything sampled now can
    // only belong to this facet, so the symbol assignment is guaranteed
    ctx.save();
    ctx.beginPath();
    facet.pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.closePath();
    ctx.clip();
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.fillStyle = facet.fill;
    ctx.fillRect(0, 0, SIZE, SIZE);

    const imgData = ctx.getImageData(0, 0, SIZE, SIZE).data;
    for (let y = 0; y < SIZE; y += ROW_GAP) {
      for (let x = 0; x < SIZE; x += COL_GAP) {
        const i = (Math.floor(y) * SIZE + Math.floor(x)) * 4;
        if (imgData[i + 3] > 128) {
          const r = imgData[i], g = imgData[i + 1], b = imgData[i + 2];
          raw.push({ x, y, char: facet.char, color: `${r},${g},${b}` });
        }
      }
    }
    ctx.restore();
  });

  return raw;
}

const GemCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    canvas.style.width = SIZE + "px";
    canvas.style.height = SIZE + "px";
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.scale(dpr, dpr);

    const raw = sampleGem();
    const particles = raw.map((p) => ({
      x: p.x + (Math.random() - 0.5) * 260,
      y: p.y + (Math.random() - 0.5) * 260,
      targetX: p.x,
      targetY: p.y,
      vx: 0,
      vy: 0,
      char: p.char,
      color: p.color,
      baseAlpha: 0.7 + Math.random() * 0.3,
      delay: Math.random() * 0.5,
      shimmer: Math.random() * Math.PI * 2,
    }));

    const mouse = { x: -1000, y: -1000, active: false };
    const mouseTarget = { x: -1000, y: -1000 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseTarget.x = e.clientX - rect.left;
      mouseTarget.y = e.clientY - rect.top;
      const within =
        e.clientX > rect.left - 120 && e.clientX < rect.right + 120 &&
        e.clientY > rect.top - 120 && e.clientY < rect.bottom + 120;
      mouse.active = within;
    };

    const handleTouchMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      mouseTarget.x = t.clientX - rect.left;
      mouseTarget.y = t.clientY - rect.top;
      mouse.active = true;
      if (e.cancelable) e.preventDefault();
    };

    const handleTouchEnd = () => { mouse.active = false; };

    document.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd);

    const startTime = performance.now();
    let animationId;

    const draw = () => {
      animationId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, SIZE, SIZE);

      mouse.x += (mouseTarget.x - mouse.x) * 0.15;
      mouse.y += (mouseTarget.y - mouse.y) * 0.15;

      const elapsed = (performance.now() - startTime) / 1000;
      ctx.font = `${FONT_SIZE}px 'IBM Plex Mono', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      particles.forEach((p) => {
        const t = elapsed - p.delay;
        if (t < 0) return;

        const fadeProgress = Math.min(t / 1.2, 1);
        const easedFade = 1 - Math.pow(1 - fadeProgress, 2);
        const shimmerVal = Math.sin(elapsed * 2 + p.shimmer) * 0.08;
        const alpha = Math.max(0, p.baseAlpha * easedFade + shimmerVal);

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
          const maxDist = SIZE * 0.22;
          if (dist < maxDist) {
            const force = (1 - dist / maxDist) * 3.6;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        p.vx += dx * 0.05;
        p.vy += dy * 0.05;
        p.vx *= 0.9;
        p.vy *= 0.9;

        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
        ctx.fillText(p.char, p.x, p.y);
      });
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className="gem-stage">
      <canvas ref={canvasRef} className="gem-canvas" />
    </div>
  );
};

export default GemCanvas;
