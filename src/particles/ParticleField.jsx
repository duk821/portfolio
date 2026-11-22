import { useEffect, useRef } from "react";

// ================================================================
//  Тоосонцрын талбар — canvas дээр мянга мянган цэг зурна.
//  Цэг бүр өөрийн "зорилтот" байрлал руу пүрш мэт татагдана.
//  shape солигдоход цэгүүд шинэ дүрс рүү урсан шилжинэ.
//  Хулгана ойртвол цэгүүд зугтана.
// ================================================================
export default function ParticleField({ shapes, shape, layout = "center", scale = 0.72, accent = "#ff6b3d", className = "" }) {
  const canvasRef = useRef(null);
  const state = useRef({ particles: [], mouse: { x: -9999, y: -9999 }, shape, layout, scale });

  // Шинэ prop ирэхэд зорилтыг шинэчилнэ
  useEffect(() => {
    Object.assign(state.current, { shape, layout, scale });
    state.current.retarget?.();
  }, [shape, layout, scale]);

  useEffect(() => {
    if (!shapes) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const st = state.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, raf;

    const n = shapes.portrait.length;
    st.particles = Array.from({ length: n }, (_, i) => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      vx: 0, vy: 0, tx: 0, ty: 0, b: 1, hot: i % 23 === 0, // зарим цэг өнгөтэй
      seed: Math.random() * 1000,
    }));

    // Дүрсийн цэгүүдийг дэлгэцийн координат руу хөрвүүлнэ
    st.retarget = () => {
      const pts = shapes[st.shape] || shapes.scatter;
      const small = W < 760;
      const size = Math.min(W, H) * st.scale * (small ? 1.05 : 1);
      let cx = W / 2, cy = H / 2;
      if (st.layout === "right" && !small) cx = W * 0.72;
      if (st.layout === "right" && small) cy = H * 0.3;
      st.particles.forEach((p, i) => {
        const [x, y, b] = pts[i];
        if (st.shape === "scatter") { p.tx = (x * 0.5 + 0.5) * W; p.ty = (y * 0.5 + 0.5) * H; }
        else { p.tx = cx + x * size; p.ty = cy + y * size; }
        p.b = b;
      });
    };

    const resize = () => {
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      st.retarget();
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      st.mouse.x = e.clientX - r.left; st.mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { st.mouse.x = st.mouse.y = -9999; };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    const tick = (t) => {
      ctx.clearRect(0, 0, W, H);
      const { mouse } = st;
      for (const p of st.particles) {
        // Пүрш: зорилт руу татах хүч
        let ax = (p.tx - p.x) * 0.012;
        let ay = (p.ty - p.y) * 0.012;
        // Хулганаас зугтах
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 9000) { const f = (9000 - d2) / 9000; ax += dx * f * 0.06; ay += dy * f * 0.06; }
        // Салхинд найгах мэт бага зэрэг хөдөлгөөн
        ax += Math.sin(t * 0.001 + p.seed) * 0.04;
        ay += Math.cos(t * 0.0012 + p.seed) * 0.04;
        p.vx = (p.vx + ax) * 0.88;
        p.vy = (p.vy + ay) * 0.88;
        p.x += p.vx; p.y += p.vy;

        ctx.globalAlpha = 0.35 + p.b * 0.65;
        ctx.fillStyle = p.hot ? accent : "#ece8df";
        const r = p.hot ? 1.6 : 0.6 + p.b * 0.9;
        ctx.fillRect(p.x - r / 2, p.y - r / 2, r, r);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [shapes, accent]);

  return <canvas ref={canvasRef} className={`particles ${className}`} aria-hidden="true" />;
}
