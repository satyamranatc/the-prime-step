import type { GlyphId } from "@/lib/content";

const line = { vectorEffect: "non-scaling-stroke" as const, strokeWidth: 1.5 };

function Network() {
  const layers = [
    [90, 200, 310],
    [60, 150, 250, 340],
    [130, 270],
  ];
  const xs = [90, 200, 310];
  return (
    <>
      {layers.slice(0, -1).flatMap((l, i) =>
        l.flatMap((y1) =>
          layers[i + 1].map((y2) => (
            <line
              key={`${i}-${y1}-${y2}`}
              x1={xs[i]}
              y1={y1}
              x2={xs[i + 1]}
              y2={y2}
              className="stroke-light"
              {...line}
            />
          )),
        ),
      )}
      {layers.map((l, i) =>
        l.map((y) => (
          <circle
            key={`n-${i}-${y}`}
            cx={xs[i]}
            cy={y}
            r={i === 2 ? 15 : 11}
            className={i === 2 ? "fill-brand stroke-deep" : "fill-paper stroke-deep"}
            {...line}
          />
        )),
      )}
    </>
  );
}

function Search() {
  const picked = 37;
  return (
    <>
      {Array.from({ length: 64 }).map((_, i) => {
        const x = 70 + (i % 8) * 34;
        const y = 70 + Math.floor(i / 8) * 34;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i === picked ? 11 : 6}
            className={i === picked ? "fill-brand stroke-deep" : "fill-pale stroke-light"}
            {...line}
          />
        );
      })}
      <circle cx="226" cy="214" r="62" className="fill-paper/40 stroke-deep" strokeWidth="6" vectorEffect="non-scaling-stroke" />
      <line x1="270" y1="258" x2="340" y2="328" className="stroke-deep" strokeWidth="12" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </>
  );
}

function Sheet() {
  const filled = new Set([1, 3, 7, 8, 10, 14, 15, 17, 21, 22]);
  return (
    <>
      {Array.from({ length: 25 }).map((_, i) => {
        const x = 60 + (i % 5) * 56;
        const y = 70 + Math.floor(i / 5) * 56;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="50"
            height="50"
            rx="4"
            className={filled.has(i) ? "fill-brand stroke-deep" : "fill-paper stroke-pale"}
            {...line}
          />
        );
      })}
    </>
  );
}

const glyphs: Record<GlyphId, React.ReactNode> = {
  python: (
    <>
      <rect x="50" y="110" width="230" height="140" rx="70" className="fill-pale stroke-deep" {...line} />
      <rect x="120" y="160" width="230" height="140" rx="70" className="fill-brand stroke-deep" {...line} />
      <circle cx="110" cy="180" r="9" className="fill-deep" />
      <circle cx="290" cy="230" r="9" className="fill-paper" />
    </>
  ),
  java: (
    <>
      <path d="M95 215h210v45a105 105 0 0 1-210 0z" className="fill-brand stroke-deep" {...line} />
      <path d="M305 235h28a32 32 0 0 1 0 64h-40" fill="none" className="stroke-deep" {...line} />
      <path d="M150 185c-18-24 18-38 0-70" fill="none" className="stroke-light" {...line} />
      <path d="M200 185c-18-24 18-38 0-70" fill="none" className="stroke-deep" {...line} />
      <path d="M250 185c-18-24 18-38 0-70" fill="none" className="stroke-light" {...line} />
    </>
  ),
  fullstack: (
    <>
      <polygon points="200,200 345,262 200,324 55,262" className="fill-soft stroke-deep" {...line} />
      <polygon points="200,130 345,192 200,254 55,192" className="fill-pale stroke-deep" {...line} />
      <polygon points="200,60 345,122 200,184 55,122" className="fill-brand stroke-deep" {...line} />
    </>
  ),
  data: (
    <>
      <line x1="40" y1="340" x2="360" y2="340" className="stroke-deep" {...line} />
      {[80, 130, 190, 260].map((h, i) => (
        <rect
          key={h}
          x={65 + i * 72}
          y={340 - h}
          width="46"
          height={h}
          className={i === 3 ? "fill-brand stroke-deep" : "fill-pale stroke-deep"}
          {...line}
        />
      ))}
      <polyline points="88,236 160,196 232,136 304,56" fill="none" className="stroke-deep" {...line} />
      {[
        [88, 236],
        [160, 196],
        [232, 136],
        [304, 56],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="7" className="fill-paper stroke-deep" {...line} />
      ))}
    </>
  ),
  ai: <Network />,
  mobile: (
    <>
      <rect x="125" y="40" width="150" height="320" rx="30" className="fill-paper stroke-deep" {...line} />
      <rect x="170" y="56" width="60" height="10" rx="5" className="fill-pale" />
      <rect x="148" y="96" width="104" height="70" rx="10" className="fill-brand stroke-deep" {...line} />
      <rect x="148" y="180" width="104" height="26" rx="8" className="fill-pale stroke-deep" {...line} />
      <rect x="148" y="218" width="70" height="26" rx="8" className="fill-soft stroke-deep" {...line} />
      <rect x="148" y="300" width="104" height="36" rx="18" className="fill-deep" />
    </>
  ),
  foundations: <Search />,
  office: <Sheet />,
};

export default function Glyph({ id }: { id: GlyphId }) {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true" focusable="false">
      <g className="glyph-float">{glyphs[id]}</g>
    </svg>
  );
}

