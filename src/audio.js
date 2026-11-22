// "Салхи" — Web Audio API-гаар үүсгэсэн зөөлөн орчны дуу (гадны дууны файлгүй)
let ctx, master, started = false;

function start() {
  ctx = new (window.AudioContext || window.webkitAudioContext)();
  master = ctx.createGain();
  master.gain.value = 0;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 600;
  filter.connect(master).connect(ctx.destination);

  // Бага зэрэг зөрүүтэй 3 осциллятор — "дрон" дуу
  [110, 110.6, 164.8].forEach((f, i) => {
    const o = ctx.createOscillator();
    o.type = i === 2 ? "sine" : "triangle";
    o.frequency.value = f;
    const g = ctx.createGain();
    g.gain.value = i === 2 ? 0.05 : 0.08;
    o.connect(g).connect(filter);
    o.start();
  });

  // Салхи мэт аажуухан долгион (LFO)
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.value = 0.08;
  lfoGain.gain.value = 350;
  lfo.connect(lfoGain).connect(filter.frequency);
  lfo.start();
  started = true;
}

export function setAmbient(on) {
  try {
    if (on && !started) start();
    if (!started) return;
    if (ctx.state === "suspended") ctx.resume();
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(on ? 0.5 : 0, ctx.currentTime + 1.2);
  } catch { /* дуу дэмжихгүй хөтөч */ }
}

// Бүлэг солигдоход сонсогдох зөөлөн хонх
export function chime(step = 0) {
  if (!started || master.gain.value < 0.05) return;
  const notes = [523.3, 587.3, 659.3, 784, 880, 987.8, 1046.5, 1174.7];
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "sine";
  o.frequency.value = notes[step % notes.length];
  g.gain.setValueAtTime(0.0001, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);
  o.connect(g).connect(ctx.destination);
  o.start();
  o.stop(ctx.currentTime + 2);
}
