// ================================================================
//  Тоосонцрын дүрсүүд. Жижиг "нууц" canvas дээр дүрс зураад,
//  будагдсан пикселүүдийн байрлалыг цэг болгон авна.
//  Цэг бүр [x, y, тод байдал] — x, y нь -0.5 ... 0.5 хооронд.
// ================================================================

const SIZE = 160;

// drawFn-ээр зурж, будагдсан пикселүүдийг цуглуулна
function sample(drawFn, step = 2) {
  const c = document.createElement("canvas");
  c.width = c.height = SIZE;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#fff";
  drawFn(ctx, SIZE);
  const data = ctx.getImageData(0, 0, SIZE, SIZE).data;
  const pts = [];
  for (let y = 0; y < SIZE; y += step) {
    for (let x = 0; x < SIZE; x += step) {
      const a = data[(y * SIZE + x) * 4 + 3];
      if (a > 120) pts.push([x / SIZE - 0.5, y / SIZE - 0.5, 1]);
    }
  }
  return pts;
}

// Цэгүүдийг яг n ширхэг болгож тэнцүүлнэ (бүх дүрс ижил тоотой байх ёстой)
export function resample(pts, n) {
  if (!pts.length) return Array.from({ length: n }, () => [Math.random() - 0.5, Math.random() - 0.5, 0.3]);
  const out = [];
  const shuffled = [...pts].sort(() => Math.random() - 0.5);
  for (let i = 0; i < n; i++) {
    const p = shuffled[i % shuffled.length];
    const jitter = i >= shuffled.length ? 0.004 : 0; // давтагдсан цэгийг бага зэрэг хөдөлгөнө
    out.push([p[0] + (Math.random() - 0.5) * jitter, p[1] + (Math.random() - 0.5) * jitter, p[2]]);
  }
  return out;
}

// Зурган дээрх хүнийг цэгээр зурна: бараан хэсэгт цэг, гэрэлтэй хэсэг хоосон.
// public/me-dots.jpg — хөргийн ойрын, контраст ихтэй хувилбар
export function portrait(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const S = 130;
      const c = document.createElement("canvas");
      c.width = c.height = S;
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0, S, S);
      const d = ctx.getImageData(0, 0, S, S).data;
      const pts = [];
      for (let y = 0; y < S; y++) {
        for (let x = 0; x < S; x++) {
          const i = (y * S + x) * 4;
          const lum = (d[i] * 0.3 + d[i + 1] * 0.59 + d[i + 2] * 0.11) / 255;
          // Зууван маск — хүнээ төвд нь үлдээж, арын дэвсгэрийг бүдгэрүүлнэ
          const dx = (x / S - 0.5) / 0.36, dy = (y / S - 0.5) / 0.6;
          const mask = Math.min(1, Math.max(0, 1 - (dx * dx + dy * dy)) * 2);
          const p = Math.min(1, Math.max(0, (0.62 - lum) * 2.2)) * mask;
          if (Math.random() < p) pts.push([x / S - 0.5, y / S - 0.5, 0.5 + (1 - lum) * 0.5]);
        }
      }
      resolve(pts);
    };
    img.onerror = () => resolve(sample((ctx, s) => { ctx.beginPath(); ctx.arc(s / 2, s / 2, s / 3, 0, 7); ctx.fill(); }));
    img.src = src;
  });
}

// Текстийг цэгээр
export const text = (str, font = "bold 44px Inter, sans-serif") =>
  sample((ctx, s) => {
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    let size = parseInt(font.match(/(\d+)px/)[1], 10);
    while (ctx.measureText(str).width > s * 0.95 && size > 10) {
      size -= 2;
      ctx.font = font.replace(/\d+px/, `${size}px`);
    }
    ctx.fillText(str, s / 2, s / 2);
  }, 1);

// Улаан загалмай — тусламж
export const cross = () =>
  sample((ctx, s) => {
    ctx.beginPath(); ctx.arc(s / 2, s / 2, s * 0.36, 0, 7); ctx.lineWidth = 6; ctx.stroke();
    ctx.fillRect(s * 0.42, s * 0.24, s * 0.16, s * 0.52);
    ctx.fillRect(s * 0.24, s * 0.42, s * 0.52, s * 0.16);
  });

// Гэр — СЭЗИС-д "гэр" шиг ирсэн
export const ger = () =>
  sample((ctx, s) => {
    ctx.beginPath();
    ctx.moveTo(s * 0.12, s * 0.5); ctx.quadraticCurveTo(s * 0.5, s * 0.16, s * 0.88, s * 0.5); ctx.closePath(); ctx.fill();
    ctx.fillRect(s * 0.14, s * 0.5, s * 0.72, s * 0.28);
    ctx.clearRect(s * 0.44, s * 0.58, s * 0.12, s * 0.2);
    ctx.fillRect(s * 0.45, s * 0.22, s * 0.1, s * 0.06);
  });

// Сүлжээ — зангилаа ба утаснууд
export const network = () =>
  sample((ctx, s) => {
    const nodes = [[0.5, 0.5], [0.2, 0.25], [0.8, 0.22], [0.15, 0.7], [0.85, 0.72], [0.5, 0.15], [0.5, 0.85], [0.32, 0.48], [0.7, 0.5]];
    ctx.lineWidth = 2;
    nodes.forEach(([x, y], i) => nodes.slice(i + 1).forEach(([x2, y2]) => {
      if (Math.hypot(x - x2, y - y2) < 0.45) { ctx.beginPath(); ctx.moveTo(x * s, y * s); ctx.lineTo(x2 * s, y2 * s); ctx.stroke(); }
    }));
    nodes.forEach(([x, y], i) => { ctx.beginPath(); ctx.arc(x * s, y * s, i === 0 ? 13 : 7, 0, 7); ctx.fill(); });
  });

// Сервер — давхарласан тавиурууд
export const server = () =>
  sample((ctx, s) => {
    for (let i = 0; i < 4; i++) {
      const y = s * (0.18 + i * 0.17);
      ctx.fillRect(s * 0.24, y, s * 0.52, s * 0.13);
      ctx.clearRect(s * 0.29, y + s * 0.05, s * 0.04, s * 0.03);
      ctx.clearRect(s * 0.42, y + s * 0.055, s * 0.28, s * 0.02);
    }
  });

// Ширээний теннисний цохиур ба бөмбөг
export const paddle = () =>
  sample((ctx, s) => {
    ctx.beginPath(); ctx.ellipse(s * 0.42, s * 0.4, s * 0.22, s * 0.25, -0.5, 0, 7); ctx.fill();
    ctx.save(); ctx.translate(s * 0.56, s * 0.6); ctx.rotate(-0.5); ctx.fillRect(-s * 0.04, 0, s * 0.08, s * 0.24); ctx.restore();
    ctx.beginPath(); ctx.arc(s * 0.78, s * 0.24, s * 0.06, 0, 7); ctx.fill();
  });

// Хурд хэмжигч — TORQUE
export const gauge = () =>
  sample((ctx, s) => {
    ctx.lineWidth = 12;
    ctx.beginPath(); ctx.arc(s / 2, s * 0.6, s * 0.36, Math.PI * 0.85, Math.PI * 2.15); ctx.stroke();
    ctx.lineWidth = 3;
    for (let i = 0; i <= 10; i++) {
      const a = Math.PI * (0.85 + i * 0.13);
      ctx.beginPath();
      ctx.moveTo(s / 2 + Math.cos(a) * s * 0.25, s * 0.6 + Math.sin(a) * s * 0.25);
      ctx.lineTo(s / 2 + Math.cos(a) * s * 0.3, s * 0.6 + Math.sin(a) * s * 0.3);
      ctx.stroke();
    }
    ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(s / 2, s * 0.6); ctx.lineTo(s * 0.72, s * 0.36); ctx.stroke();
    ctx.beginPath(); ctx.arc(s / 2, s * 0.6, 9, 0, 7); ctx.fill();
  }, 1);

// Хананд өлгөсөн жаазууд — ISM Digital Museum
export const frames = () =>
  sample((ctx, s) => {
    ctx.fillRect(s * 0.04, s * 0.2, s * 0.92, 3);
    [[0.1, 0.34, 0.22, 0.3], [0.39, 0.3, 0.22, 0.42], [0.68, 0.36, 0.22, 0.26]].forEach(([x, y, w, h]) => {
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo((x + w / 2) * s, s * 0.21); ctx.lineTo((x + w / 2) * s, y * s); ctx.stroke();
      ctx.fillRect(x * s, y * s, w * s, h * s);
      ctx.clearRect((x + 0.03) * s, (y + 0.03) * s, (w - 0.06) * s, (h - 0.06) * s);
      ctx.fillRect((x + 0.06) * s, (y + 0.06) * s, (w - 0.12) * s, (h - 0.12) * s);
    });
  }, 1);

// Бүх дүрсийг нэг дор бэлдэнэ (portrait нь зураг ачаалах тул async)
export async function buildShapes(n, photo) {
  const raw = {
    portrait: await portrait(photo),
    cross: cross(),
    ger: ger(),
    network: network(),
    server: server(),
    code: text("</>", "bold 70px Inter, sans-serif"),
    paddle: paddle(),
    name: text("Дөлгөөн", "bold 40px Inter, sans-serif"),
    name_en: text("Dulguun", "bold 40px Inter, sans-serif"),
    scatter: Array.from({ length: 400 }, () => [Math.random() * 2 - 1, Math.random() * 2 - 1, 0.4]),
  };
  const out = {};
  for (const k in raw) out[k] = resample(raw[k], n);
  return out;
}
