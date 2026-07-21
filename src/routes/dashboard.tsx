import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CalendarClock, Trophy, Users, Wrench, MapPinned, Sparkles, Flag, Cpu } from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, LineChart, Line, BarChart, Bar, CartesianGrid,
} from "recharts";
import { Counter, KpiCard, PageHeader, SectionHeader, Gauge, F1Car } from "../components/f1/visuals";
import { LAP_DELTAS, WINNER_PROBS, CONSTRUCTORS } from "../components/f1/data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [
    { title: "Race Control Dashboard — APEX AI" },
    { name: "description", content: "Live Formula 1 command center with KPIs, telemetry, predicted winner and constructor standings." },
    { property: "og:title", content: "Race Control Dashboard — APEX AI" },
    { property: "og:description", content: "Live F1 KPIs, predicted winner, and constructor standings." },
  ]}),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 py-8">
      <PageHeader
        eyebrow="RACE CONTROL"
        title="Command Deck"
        desc="Live overview of the 2026 Formula 1 World Championship — drivers, teams, upcoming rounds and AI predictions."
        actions={
          <div className="glass rounded-xl px-4 py-2.5 hidden sm:flex items-center gap-3">
            <CalendarClock className="h-4 w-4 text-[#E10600]" />
            <div>
              <div className="text-[10px] font-mono tracking-widest text-white/50">NEXT ROUND</div>
              <div className="font-display font-black text-white">Abu Dhabi GP · 3d 14h</div>
            </div>
          </div>
        }
      />

      {/* KPI grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="TOTAL DRIVERS" value={<Counter to={1084} />} hint="Since 1950 · 3 active rookies" />
        <KpiCard label="CONSTRUCTORS" value={<Counter to={214} />} hint="10 currently on the grid" />
        <KpiCard label="SEASONS" value={<Counter to={75} />} hint="1950 → 2026" />
        <KpiCard label="CIRCUITS" value={<Counter to={77} />} hint="Across 32 countries" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <KpiCard
          accent
          label="PREDICTED WINNER · ABU DHABI"
          value={<span>M. Verstappen</span>}
          hint={<span className="flex items-center gap-2"><Trophy className="h-3.5 w-3.5 text-[#E10600]" /> Model confidence 82%</span>}
        >
          <div className="mt-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-[#3671C6] grid place-items-center font-display font-black text-white">1</div>
            <div className="min-w-0">
              <div className="text-white text-sm font-semibold truncate">Red Bull Racing RB22</div>
              <div className="text-[10px] font-mono tracking-widest text-white/50">GRID P1 · +0.184s POLE</div>
            </div>
          </div>
        </KpiCard>
        <KpiCard
          label="CHAMPIONSHIP LEADER"
          value="L. Norris"
          hint="McLaren · 402 pts · +18 to VER"
        >
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              { l: "WINS", v: "8" }, { l: "PODIUMS", v: "16" }, { l: "AVG", v: "P3.2" },
            ].map((s) => (
              <div key={s.l} className="rounded-lg bg-white/[0.04] p-2">
                <div className="text-[9px] font-mono tracking-widest text-white/50">{s.l}</div>
                <div className="font-display font-black text-white text-lg">{s.v}</div>
              </div>
            ))}
          </div>
        </KpiCard>
        <div className="glass rounded-2xl p-5 flex items-center gap-6">
          <Gauge value={82} label="AI CONFIDENCE" size={160} />
          <div className="min-w-0">
            <div className="font-mono text-[10px] tracking-widest text-[#E10600]">◆ MODEL v4.2</div>
            <div className="mt-1 font-display font-black text-xl text-white">XGBoost Ensemble</div>
            <div className="mt-1 text-xs text-white/60">Trained on 21,847 race outcomes · Updated 2h ago.</div>
            <div className="mt-3 flex gap-2 text-[10px] font-mono">
              <span className="rounded-full glass px-2 py-0.5">ACC 95.1%</span>
              <span className="rounded-full glass px-2 py-0.5">F1 0.92</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts row */}
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 glass rounded-2xl p-5">
          <SectionHeader eyebrow="LAP DELTA · LEADERS" title="Lap-by-lap pace" desc="Rolling laptime deltas across the top four contenders." />
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={LAP_DELTAS}>
                <defs>
                  <linearGradient id="a1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#E10600" stopOpacity={0.5}/><stop offset="100%" stopColor="#E10600" stopOpacity={0}/></linearGradient>
                  <linearGradient id="a2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FF8000" stopOpacity={0.4}/><stop offset="100%" stopColor="#FF8000" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="lap" stroke="rgba(255,255,255,0.35)" fontSize={11} />
                <YAxis domain={["auto","auto"]} stroke="rgba(255,255,255,0.35)" fontSize={11} />
                <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="VER" stroke="#E10600" fill="url(#a1)" strokeWidth={2} />
                <Area type="monotone" dataKey="NOR" stroke="#FF8000" fill="url(#a2)" strokeWidth={2} />
                <Line type="monotone" dataKey="LEC" stroke="#27F4D2" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="HAM" stroke="#ffffff" strokeWidth={1.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <SectionHeader eyebrow="WINNER PROBABILITY" title="Top 6" />
          <div className="space-y-2">
            {WINNER_PROBS.slice(0, 6).map((d, i) => (
              <div key={d.driver} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
                <div className="w-6 text-center font-mono text-[10px] text-white/40">P{i+1}</div>
                <div className="min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-sm text-white">{d.driver}</span>
                    <span className="font-mono text-xs text-white/60">{d.team}</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${d.prob * 100}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.05 }}
                      className="h-full bg-gradient-to-r from-[#E10600] to-[#ff8a00]" />
                  </div>
                </div>
                <span className="font-display font-black text-white tabular-nums text-sm">{Math.round(d.prob * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Constructor chart + car */}
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <SectionHeader eyebrow="CONSTRUCTORS · 2026" title="Team points" />
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={CONSTRUCTORS} margin={{ left: -10 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.35)" fontSize={10} />
                <YAxis stroke="rgba(255,255,255,0.35)" fontSize={11} />
                <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="pts" radius={[6,6,0,0]}>
                  {CONSTRUCTORS.map((c) => (<Bar key={c.name} dataKey="pts" fill={c.color} />))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative">
            <SectionHeader eyebrow="LIVE TELEMETRY" title="Pole Car" />
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[{l:"SPEED",v:"327 KM/H"},{l:"RPM",v:"11,900"},{l:"GEAR",v:"7"},{l:"THR",v:"98%"}].map(s=>(
                <div key={s.l} className="rounded-lg bg-white/[0.04] p-2">
                  <div className="text-[9px] font-mono tracking-widest text-white/40">{s.l}</div>
                  <div className="font-display font-black text-white">{s.v}</div>
                </div>
              ))}
            </div>
            <F1Car className="w-full animate-float-y" />
          </div>
        </div>
      </div>

      {/* Quick nav band */}
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: Sparkles, label: "Predictions", to: "/predictions" },
          { icon: Users, label: "Drivers", to: "/drivers" },
          { icon: Wrench, label: "Constructors", to: "/constructors" },
          { icon: MapPinned, label: "Circuits", to: "/circuits" },
          { icon: Flag, label: "Race Analytics", to: "/race-analytics" },
          { icon: Cpu, label: "Model Insights", to: "/model-insights" },
        ].slice(0,4).map((it) => (
          <a key={it.label} href={it.to} className="group glass rounded-xl p-4 flex items-center gap-3 hover:bg-white/[0.08]">
            <it.icon className="h-4 w-4 text-[#E10600]" />
            <span className="font-display font-bold tracking-wider text-white text-sm">{it.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}