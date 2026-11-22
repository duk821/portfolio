// Easter egg: Монголын өвөл — дэлгэцэн дээр цас орно
export default function Snow() {
  return (
    <div className="snow" aria-hidden="true">
      {Array.from({ length: 60 }).map((_, i) => (
        <span
          key={i}
          style={{
            left: `${(i * 37) % 100}%`,
            animationDuration: `${5 + (i % 7)}s`,
            animationDelay: `${(i % 10) * -0.8}s`,
            fontSize: `${8 + (i % 4) * 4}px`,
          }}
        >❄</span>
      ))}
    </div>
  );
}
