import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

// -------- Animated counter ----------
export function Counter({
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1.8,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString()}
      {suffix}
    </span>
  );
}

// -------- KPI Card ----------
export function KpiCard({
  label,
  value,
  hint,
  accent = false,
  children,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  accent?: boolean;
  children?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-2xl p-5 ${accent ? "glass-red" : "glass"}`}
    >
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#E10600]/20 blur-2xl" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.25em] text-white/50">{label}</span>
          {accent && <span className="h-1.5 w-1.5 rounded-full bg-[#E10600] animate-pulse" />}
        </div>
        <div className="mt-3 font-display text-4xl font-black text-white">{value}</div>
        {hint && <div className="mt-2 text-xs text-white/50">{hint}</div>}
        {children}
      </div>
    </motion.div>
  );
}

// -------- Section header ----------
export function SectionHeader({
  eyebrow,
  title,
  desc,
  right,
}: {
  eyebrow?: string;
  title: ReactNode;
  desc?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between mb-6">
      <div className="min-w-0">
        {eyebrow && (
          <div className="font-mono text-[10px] tracking-[0.3em] text-[#E10600] mb-2">
            ◆ {eyebrow}
          </div>
        )}
        <h2 className="font-display text-2xl sm:text-3xl font-black text-white truncate">{title}</h2>
        {desc && <p className="mt-1.5 text-sm text-white/60 max-w-2xl">{desc}</p>}
      </div>
      {right}
    </div>
  );
}

// -------- Page shell ----------
export function PageHeader({
  eyebrow,
  title,
  desc,
  actions,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  actions?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl glass p-6 sm:p-10 mb-8">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#E10600]/20 blur-3xl" />
      <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
        <div className="min-w-0">
          <div className="font-mono text-[10px] tracking-[0.3em] text-[#E10600] mb-3">
            ◆ {eyebrow}
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white neon-red">
            {title}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-white/60 max-w-2xl">{desc}</p>
        </div>
        {actions}
      </div>
    </div>
  );
}

// -------- Speedometer / Gauge ----------
export function Gauge({
  value,
  label,
  size = 220,
}: {
  value: number; // 0-100
  label?: string;
  size?: number;
}) {
  const mv = useMotionValue(0);
  const sv = useSpring(mv, { stiffness: 60, damping: 20 });
  const dash = useTransform(sv, (v) => `${(v / 100) * 251.2} 251.2`);
  const display = useTransform(sv, (v) => Math.round(v));
  const [txt, setTxt] = useState(0);
  useEffect(() => {
    mv.set(value);
    const unsub = display.on("change", (v) => setTxt(v));
    return unsub;
  }, [value, mv, display]);
  const r = 40;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <defs>
          <linearGradient id="gauge-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E10600" />
            <stop offset="100%" stopColor="#ff6a00" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r={r} stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none" />
        <motion.circle
          cx="50" cy="50" r={r}
          stroke="url(#gauge-g)" strokeWidth="6" strokeLinecap="round" fill="none"
          style={{ strokeDasharray: dash }}
          strokeDashoffset={0}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center rotate-0">
        <div className="text-center">
          <div className="font-display text-4xl font-black text-white tabular-nums">{txt}<span className="text-[#E10600]">%</span></div>
          {label && <div className="mt-1 font-mono text-[10px] tracking-widest text-white/50">{label}</div>}
        </div>
      </div>
    </div>
  );
}

// -------- Particle background ----------
export function Particles({ count = 40 }: { count?: number }) {
  const dots = Array.from({ length: count }, (_, i) => i);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((i) => {
        const size = 1 + (i % 3);
        const dur = 6 + (i % 7);
        const delay = (i * 0.3) % 6;
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-[#E10600]/70"
            style={{
              width: size, height: size,
              left: `${left}%`, top: `${top}%`,
              filter: "blur(0.5px)",
              boxShadow: "0 0 8px #E10600",
              animation: `float-y ${dur}s ease-in-out ${delay}s infinite, spin-slow ${dur * 3}s linear infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

// -------- 3D-ish F1 car (pure SVG) ----------
export function F1Car({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="body-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E10600" />
          <stop offset="60%" stopColor="#7a0300" />
          <stop offset="100%" stopColor="#1a0000" />
        </linearGradient>
        <linearGradient id="body-hi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="wheel" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#333" />
          <stop offset="70%" stopColor="#0a0a0a" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>

      {/* under-glow */}
      <ellipse cx="400" cy="220" rx="330" ry="14" fill="#E10600" opacity="0.35" filter="url(#glow)" />

      {/* rear wing */}
      <rect x="640" y="70" width="12" height="90" rx="3" fill="#111" />
      <rect x="600" y="60" width="90" height="16" rx="4" fill="url(#body-g)" />
      <rect x="605" y="80" width="80" height="6" rx="2" fill="#222" />

      {/* front wing */}
      <rect x="30" y="150" width="140" height="14" rx="4" fill="url(#body-g)" />
      <rect x="30" y="168" width="140" height="6" rx="2" fill="#222" />
      <rect x="40" y="140" width="10" height="14" fill="#111" />
      <rect x="150" y="140" width="10" height="14" fill="#111" />

      {/* side pods */}
      <path d="M180 160 L260 120 L560 120 L640 160 L640 190 L180 190 Z" fill="url(#body-g)" />
      <path d="M180 160 L260 120 L560 120 L640 160 Z" fill="url(#body-hi)" opacity="0.35" />

      {/* main body */}
      <path d="M100 170 L260 110 L560 110 L680 150 L680 180 L100 180 Z" fill="url(#body-g)" />
      <path d="M260 110 L560 110 L560 118 L260 118 Z" fill="#111" opacity="0.5" />

      {/* cockpit / halo */}
      <path d="M340 108 Q400 60 460 108" stroke="#0a0a0a" strokeWidth="6" fill="none" />
      <ellipse cx="400" cy="108" rx="52" ry="14" fill="#050505" />
      <ellipse cx="400" cy="106" rx="48" ry="10" fill="#111" />

      {/* driver helmet */}
      <circle cx="400" cy="100" r="14" fill="#111" />
      <path d="M388 100 Q400 90 412 100 Z" fill="#E10600" />

      {/* nose */}
      <path d="M50 160 L200 150 L200 170 L50 172 Z" fill="url(#body-g)" />

      {/* wheels */}
      <g>
        <circle cx="200" cy="200" r="34" fill="url(#wheel)" />
        <circle cx="200" cy="200" r="14" fill="#1a1a1a" stroke="#E10600" strokeWidth="1.5" />
        <circle cx="600" cy="200" r="38" fill="url(#wheel)" />
        <circle cx="600" cy="200" r="16" fill="#1a1a1a" stroke="#E10600" strokeWidth="1.5" />
      </g>

      {/* number */}
      <text x="400" y="152" textAnchor="middle" fontFamily="Orbitron, sans-serif" fontWeight="900" fontSize="26" fill="#fff">1</text>

      {/* speed streaks */}
      <g opacity="0.6">
        <line x1="700" y1="130" x2="790" y2="130" stroke="#E10600" strokeWidth="2" />
        <line x1="700" y1="150" x2="770" y2="150" stroke="#fff" strokeWidth="1" opacity="0.5" />
        <line x1="700" y1="170" x2="790" y2="170" stroke="#E10600" strokeWidth="2" />
      </g>
    </svg>
  );
}

// -------- Animated racing track ----------
export function TrackSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 400" className={className}>
      <defs>
        <linearGradient id="tr" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E10600" />
          <stop offset="100%" stopColor="#ff8a00" />
        </linearGradient>
      </defs>
      <path
        d="M60 240 C 60 100, 220 60, 320 120 S 560 220, 500 320 S 240 380, 140 320 S 60 300, 60 240 Z"
        stroke="rgba(255,255,255,0.08)" strokeWidth="26" fill="none"
      />
      <path
        d="M60 240 C 60 100, 220 60, 320 120 S 560 220, 500 320 S 240 380, 140 320 S 60 300, 60 240 Z"
        stroke="url(#tr)" strokeWidth="3" fill="none"
        strokeDasharray="12 18" className="animate-track-dash"
      />
      {/* sectors */}
      <circle cx="60" cy="240" r="6" fill="#E10600" />
      <circle cx="320" cy="120" r="5" fill="#fff" />
      <circle cx="500" cy="320" r="5" fill="#fff" />
    </svg>
  );
}