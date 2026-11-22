// Бүтээл бүрийн зураг — SVG-ээр өөрөө зурсан.
// Бодит screenshot байвал data.js-д image талбар нэмэхэд тэр нь харагдана.
export default function Thumb({ project }) {
  if (project.image) return <img className="thumb" src={project.image} alt={project.title} />;

  const art = {
    kingshop: (
      <>
        <rect width="320" height="180" fill="#1d1d1d" />
        <circle cx="240" cy="70" r="46" fill="#f28c28" />
        <path d="M194 70 H286 M240 24 V116 M207 37 Q240 70 207 103 M273 37 Q240 70 273 103" stroke="#1d1d1d" strokeWidth="3" fill="none" />
        <path d="M30 130 Q40 100 80 104 L120 112 Q150 118 150 136 L150 146 L30 146 Z" fill="#fff" />
        <path d="M30 146 H150" stroke="#e4572e" strokeWidth="6" />
        <text x="30" y="60" fill="#ffd166" fontSize="26" fontWeight="800" fontFamily="sans-serif">KING</text>
        <text x="30" y="88" fill="#fff" fontSize="26" fontWeight="800" fontFamily="sans-serif">SHOP</text>
      </>
    ),
    torque: (
      <>
        <rect width="320" height="180" fill="#121214" />
        <path d="M0 150 L320 150" stroke="#e11d2e" strokeWidth="3" />
        <path d="M150 128 Q160 98 200 94 L236 92 Q262 74 288 92 L306 96 Q316 104 314 124 L150 128 Z" fill="#e11d2e" />
        <path d="M218 94 L236 80 Q258 72 276 86 L282 94 Z" fill="#1f2937" />
        {[176, 286].map((x) => (
          <g key={x}>
            <circle cx={x} cy="130" r="17" fill="#0b0b0c" stroke="#3f3f46" strokeWidth="3" />
            <circle cx={x} cy="130" r="7" fill="#a1a1aa" />
          </g>
        ))}
        <g transform="translate(64 92)" fill="none" stroke="#e11d2e" strokeWidth="3">
          <circle r="30" stroke="#3f3f46" strokeWidth="6" />
          <path d="M-24 12 A26 26 0 1 1 24 12" />
          <line x1="0" y1="0" x2="16" y2="-16" stroke="#fff" />
        </g>
        <text x="24" y="40" fill="#fff" fontSize="30" fontWeight="900" fontStyle="italic" fontFamily="sans-serif" letterSpacing="3">TORQUE</text>
      </>
    ),
    portfolio: (
      <>
        <rect width="320" height="180" fill="#0a0a0a" />
        <circle cx="160" cy="70" r="70" fill="#7c3aed" opacity=".25" />
        <rect x="112" y="40" width="96" height="18" rx="9" fill="none" stroke="#8b5cf6" />
        <text x="160" y="53" textAnchor="middle" fontSize="8" fill="#ddd" fontFamily="sans-serif">Шинэ боломжид нээлттэй</text>
        <text x="160" y="92" textAnchor="middle" fontSize="24" fontWeight="800" fill="#fff" fontFamily="sans-serif">Сайн уу! Би <tspan fill="#8b5cf6">Дөлгөөн</tspan></text>
        <rect x="104" y="112" width="52" height="16" rx="8" fill="#8b5cf6" />
        <rect x="164" y="112" width="52" height="16" rx="8" fill="none" stroke="#8b5cf6" />
      </>
    ),
    rhel: (
      <>
        <rect width="320" height="180" fill="#0c0c0c" />
        <rect x="20" y="20" width="280" height="140" rx="8" fill="#151515" stroke="#2a2a2a" />
        {["$ cat /etc/redhat-release", "Red Hat Enterprise Linux 8.10", "$ ./upgrade-check.sh", "[ OK ] Шалгалт амжилттай", "Red Hat Enterprise Linux 9 ✓"].map((t, i) => (
          <text key={i} x="34" y={48 + i * 22} fontSize="12" fontFamily="monospace" fill={i === 4 ? "#ee0000" : i === 3 ? "#7ee2a8" : "#c4b5fd"}>{t}</text>
        ))}
      </>
    ),
    museum: (
      <>
        <rect width="320" height="180" fill="#efe6d4" />
        <line x1="0" y1="34" x2="320" y2="34" stroke="#7b5e3b" strokeWidth="4" />
        {[30, 128, 226].map((x, i) => (
          <g key={x}>
            <line x1={x + 32} y1="34" x2={x + 32} y2="56" stroke="#7b5e3b" />
            <rect x={x} y="56" width="64" height="82" fill="#7b5e3b" />
            <rect x={x + 6} y="62" width="52" height="70" fill={["#4c7aaf", "#d9822b", "#5a9a6e"][i]} />
          </g>
        ))}
        <text x="160" y="166" textAnchor="middle" fill="#7b5e3b" fontSize="14" fontFamily="serif">ISM Digital Museum</text>
      </>
    ),
    travel: (
      <>
        <rect width="320" height="180" fill="#dff0e8" />
        <path d="M0 140 L70 90 L120 120 L190 70 L250 110 L320 80 L320 180 L0 180 Z" fill="#9cc7a5" />
        <path d="M40 150 C90 60 160 160 210 80 S280 60 290 40" stroke="#e4572e" strokeWidth="4" strokeDasharray="8 7" fill="none" />
        {[[40, 150], [135, 115], [210, 80], [290, 40]].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="8" fill="#fff" stroke="#e4572e" strokeWidth="4" />
        ))}
      </>
    ),
    help: (
      <>
        <rect width="320" height="180" fill="#e8ecff" />
        <rect x="30" y="30" width="170" height="40" rx="20" fill="#fff" />
        <text x="50" y="56" fontSize="14" fill="#3b4cca" fontFamily="sans-serif">Хичээл хаанаас үзэх вэ?</text>
        <rect x="120" y="90" width="170" height="40" rx="20" fill="#3b4cca" />
        <text x="140" y="116" fontSize="14" fill="#fff" fontFamily="sans-serif">Ингээд шийднэ ✓</text>
        <text x="40" y="160" fontSize="34" fill="#3b4cca" fontFamily="sans-serif" fontWeight="800">?</text>
      </>
    ),
  };

  return (
    <svg className="thumb" viewBox="0 0 320 180" role="img" aria-label={project.title}>
      {art[project.thumb] || <rect width="320" height="180" fill="#ccc" />}
    </svg>
  );
}
