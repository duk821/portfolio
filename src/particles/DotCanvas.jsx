import { useEffect, useRef } from "react";
import { gauge, frames, portrait, resample } from "./shapes";

// Картын доторх жижиг цэгэн зураг. Эцэг элементийнхээ хэмжээгээр canvas үүсгэж,
// дүрсийг цэгээр зурна. Хулгана ойртоход цэгүүд зугтаж, буцаад байрандаа ирнэ.
const cache = {};
async function getShape(name, n) {
  const key = `${name}-${n}`;
  if (!cache[key]) {
    const raw = name === "gauge" ? gauge() : name === "frames" ? frames() : await portrait("/me-dots.jpg");
    cache[key] = resample(raw, n);
  }
  return cache[key];
}

export default function DotCanvas({ shape, dark = "#111" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -999, y: -999 };
    let W = 0, H = 0, raf, visible = true, parts = [], alive = true;

    const layout = (pts) => {
      const size = Math.min(W * 0.9, H * 0.95);
      parts.forEach((p, i) => {
        p.tx = W / 2 + pts[i][0] * size;
        p.ty = H / 2 + pts[i][1] * size;
      });
    };

    const resize = () => {
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (parts.pts) layout(parts.pts);
    };

    getShape(shape, window.innerWidth < 760 ? 900 : 1600).then((pts) => {
      if (!alive) return;
      parts = pts.map((_, i) => ({ x: Math.random() * W, y: H + Math.random() * 80, vx: 0, vy: 0, tx: 0, ty: 0, d: i % 9 === 0, s: Math.random() * 99 }));
      parts.pts = pts;
      layout(pts);
    });

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    // Дэлгэцэн дээр харагдахгүй үед зурахгүй — CPU хэмнэнэ
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);

    const move = (e) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const leave = () => { mouse.x = mouse.y = -999; };
    canvas.parentElement.addEventListener("pointermove", move);
    canvas.parentElement.addEventListener("pointerleave", leave);

    const tick = (t) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        let ax = (p.tx - p.x) * 0.03, ay = (p.ty - p.y) * 0.03;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 4200) { const f = (4200 - d2) / 4200; ax += dx * f * 0.18; ay += dy * f * 0.18; }
        ax += Math.sin(t * 0.002 + p.s) * 0.03;
        p.vx = (p.vx + ax) * 0.82; p.vy = (p.vy + ay) * 0.82;
        p.x += p.vx; p.y += p.vy;
        ctx.fillStyle = p.d ? dark : "#fff";
        ctx.fillRect(p.x, p.y, 1.6, 1.6);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      canvas.parentElement?.removeEventListener("pointermove", move);
      canvas.parentElement?.removeEventListener("pointerleave", leave);
    };
  }, [shape, dark]);

  return <canvas ref={ref} className="dot-canvas" aria-hidden="true" />;
}
