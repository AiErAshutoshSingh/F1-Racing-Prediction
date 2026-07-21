import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Sparkles,
  Users,
  Wrench,
  MapPinned,
  LineChart,
  History,
  Brain,
  Settings,
  Menu,
  X,
  Zap,
} from "lucide-react";

export const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/predictions", label: "Predictions", icon: Sparkles },
  { to: "/drivers", label: "Drivers", icon: Users },
  { to: "/constructors", label: "Constructors", icon: Wrench },
  { to: "/circuits", label: "Circuits", icon: MapPinned },
  { to: "/race-analytics", label: "Race Analytics", icon: LineChart },
  { to: "/historical", label: "Historical", icon: History },
  { to: "/model-insights", label: "Model", icon: Brain },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function TopNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="absolute inset-0 backdrop-blur-xl bg-[#050505]/70 border-b border-white/[0.06]" />
      <div className="relative mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 py-3">
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="relative">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-[#E10600] to-[#7a0300] grid place-items-center ring-red">
              <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <div className="absolute inset-0 rounded-md bg-[#E10600]/40 blur-lg group-hover:blur-xl transition-all" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-black tracking-widest text-sm text-white">APEX·AI</span>
            <span className="font-mono text-[9px] text-[#E10600] tracking-[0.3em]">F1 RACE CONTROL</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative px-3 py-1.5 rounded-md text-[13px] font-medium tracking-wide transition-colors ${
                  active ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-md bg-white/[0.06] border border-white/[0.08]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#E10600] opacity-70 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E10600]" />
            </span>
            <span className="text-[10px] font-mono tracking-widest text-white/70">LIVE · SEASON 2026</span>
          </div>
        </div>

        <button
          className="lg:hidden h-9 w-9 grid place-items-center rounded-md bg-white/[0.06] border border-white/[0.08] text-white"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="lg:hidden relative border-t border-white/[0.06] bg-[#050505]/95 backdrop-blur-xl"
          >
            <div className="grid grid-cols-2 gap-1 p-3">
              {NAV_ITEMS.map((item) => {
                const active = pathname.startsWith(item.to);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm ${
                      active ? "bg-[#E10600]/15 text-white border border-[#E10600]/40" : "text-white/70 border border-white/[0.06]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function TelemetryTicker() {
  const items = [
    "VER · +0.184s · LAP 42",
    "HAM · P3 · GAP 2.1s",
    "LEC · PIT WINDOW OPEN",
    "NOR · FASTEST S2",
    "PIA · BOX BOX",
    "SAI · DRS ACTIVATED",
    "RUS · UNDER INVESTIGATION",
    "ALO · +1 LAP",
    "TRACK TEMP 42°C · AIR 27°C",
    "SAFETY CAR PROB 12%",
    "RAIN RADAR CLEAR · WIND 8KT NE",
  ];
  const line = items.join("  ◆  ");
  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] bg-black/60 py-1.5">
      <div className="flex gap-8 whitespace-nowrap font-mono text-[10px] tracking-widest text-white/60 animate-ticker">
        <span>{line}  ◆  </span>
        <span>{line}  ◆  </span>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/[0.06]">
      <div className="h-1 hazard-stripes opacity-70" />
      <div className="mx-auto max-w-[1600px] px-6 py-10 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-[#E10600] grid place-items-center">
              <Zap className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-display font-black tracking-widest">APEX·AI</span>
          </div>
          <p className="mt-3 text-white/50 max-w-xs">Machine learning race intelligence for Formula 1. Data from 1950 → 2026.</p>
        </div>
        <div>
          <h4 className="font-mono text-[10px] tracking-widest text-[#E10600]">PLATFORM</h4>
          <ul className="mt-3 space-y-1.5 text-white/60">
            <li>Predictions</li><li>Race Analytics</li><li>Model Insights</li>
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-[10px] tracking-widest text-[#E10600]">DATA</h4>
          <ul className="mt-3 space-y-1.5 text-white/60">
            <li>Ergast Historical Set</li><li>FIA Live Timing</li><li>Weather API</li>
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-[10px] tracking-widest text-[#E10600]">STATUS</h4>
          <ul className="mt-3 space-y-1.5 text-white/60 font-mono text-xs">
            <li>API · <span className="text-emerald-400">OPERATIONAL</span></li>
            <li>Model v4.2 · <span className="text-emerald-400">LIVE</span></li>
            <li>Accuracy · <span className="text-white">95.1%</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/[0.06] py-4 text-center text-[10px] font-mono tracking-widest text-white/40">
        © 2026 APEX·AI · UNOFFICIAL FAN PROJECT · NOT AFFILIATED WITH FORMULA 1
      </div>
    </footer>
  );
}