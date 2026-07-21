import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Trophy, Flag, Award, Timer, Gauge as GaugeIcon } from "lucide-react";
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import { PageHeader, SectionHeader } from "../components/f1/visuals";
import { DRIVERS } from "../components/f1/data";

export const Route = createFileRoute("/drivers")({
  head: () => ({ meta: [
    { title: "Driver Analytics — APEX AI" },
    { name: "description", content: "Deep Formula 1 driver profiles: wins, podiums, championships, radar comparisons and AI performance scores." },
    { property: "og:title", content: "F1 Driver Analytics — APEX AI" },
    { property: "og:description", content: "Radar comparisons, form curves and performance scores for every F1 driver." },
  ]}),
  component: Drivers,
});

function Drivers() {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(DRIVERS[0]);
  const [cmp, setCmp] = useState(DRIVERS[1]);
  const filtered = DRIVERS.filter((d) => d.name.toLowerCase().includes(q.toLowerCase()) || d.code.toLowerCase().includes(q.toLowerCase()));

  const radar = [
    { k: "Pace", A: sel.score - 5, B: cmp.score - 8 },
    { k: "Qualifying", A: 100 - sel.avgGrid * 8, B: 100 - cmp.avgGrid * 8 },
    { k: "Racecraft", A: 100 - sel.avgFinish * 6, B: 100 - cmp.avgFinish * 6 },
    { k: "Consistency", A: sel.score - 10, B: cmp.score - 12 },
    { k: "Tyre Mgmt", A: sel.score - 12, B: cmp.score - 6 },
    { k: "Wet Weather", A: sel.score - 15, B: cmp.score - 4 },
  ];
  const trend = Array.from({ length: 12 }, (_, i) => ({
    r: `R${i + 1}`,
    [sel.code]: 3 + Math.sin(i / 2) * 2 + (i % 3 === 0 ? 1 : 0),
    [cmp.code]: 4 + Math.cos(i / 2.4) * 2.2,
  }));

  return (
    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 py-8">
      <PageHeader
        eyebrow="DRIVER ANALYTICS"
        title="Driver Command"
        desc="Search, compare and analyze every driver on the modern F1 grid."
        actions={
          <div className="glass rounded-full flex items-center gap-2 px-4 py-2 min-w-[260px]">
            <Search className="h-4 w-4 text-[#E10600]" />
            <input value={q} onChange={(e)=>setQ(e.target.value)}
              placeholder="Search drivers…"
              className="bg-transparent outline-none text-sm text-white placeholder:text-white/40 w-full" />
          </div>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
        <div className="glass rounded-2xl p-3 max-h-[720px] overflow-auto">
          {filtered.map((d) => (
            <button
              key={d.code}
              onClick={() => setSel(d)}
              className={`w-full text-left flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${sel.code===d.code ? "glass-red" : "hover:bg-white/[0.05]"}`}
            >
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#E10600] to-[#7a0300] grid place-items-center font-display font-black text-white text-sm">
                {d.code}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-white font-semibold text-sm truncate">{d.name}</div>
                <div className="text-[10px] font-mono text-white/50 truncate">{d.team} · {d.nat}</div>
              </div>
              <div className="font-mono text-xs text-[#E10600]">{d.score}</div>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <motion.div key={sel.code} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="glass rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative grid grid-cols-[minmax(0,1fr)_auto] gap-4 items-center">
              <div className="min-w-0">
                <div className="font-mono text-[10px] tracking-widest text-[#E10600]">◆ DRIVER PROFILE</div>
                <h2 className="mt-1 font-display font-black text-4xl text-white truncate">{sel.name}</h2>
                <div className="mt-1 flex flex-wrap gap-2 text-[11px] font-mono text-white/60">
                  <span>{sel.nat}</span><span>·</span><span>{sel.team}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[10px] tracking-widest text-white/40">SCORE</div>
                <div className="font-display font-black text-5xl text-[#E10600] neon-red">{sel.score}</div>
              </div>
            </div>
            <div className="relative mt-6 grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[
                { l: "WINS", v: sel.wins, icon: Trophy },
                { l: "PODIUMS", v: sel.podiums, icon: Award },
                { l: "TITLES", v: sel.champs, icon: Flag },
                { l: "AVG FIN", v: `P${sel.avgFinish}`, icon: GaugeIcon },
                { l: "AVG GRID", v: `P${sel.avgGrid}`, icon: GaugeIcon },
                { l: "BEST LAP", v: sel.bestLap, icon: Timer },
              ].map((s) => (
                <div key={s.l} className="rounded-xl bg-white/[0.04] p-3">
                  <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-white/40">
                    <s.icon className="h-3 w-3 text-[#E10600]" />{s.l}
                  </div>
                  <div className="mt-1 font-display font-black text-white text-lg">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="glass rounded-2xl p-5">
            <SectionHeader
              eyebrow="HEAD TO HEAD"
              title={`${sel.code} vs ${cmp.code}`}
              right={
                <div className="flex flex-wrap gap-1.5">
                  {DRIVERS.filter((d)=>d.code!==sel.code).slice(0,6).map((d)=>(
                    <button key={d.code} onClick={()=>setCmp(d)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest ${cmp.code===d.code ? "bg-[#E10600] text-white" : "glass text-white/70"}`}>
                      {d.code}
                    </button>
                  ))}
                </div>
              }
            />
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="h-72">
                <ResponsiveContainer>
                  <RadarChart data={radar}>
                    <PolarGrid stroke="rgba(255,255,255,0.08)" />
                    <PolarAngleAxis dataKey="k" stroke="rgba(255,255,255,0.6)" fontSize={11} />
                    <Radar name={sel.code} dataKey="A" stroke="#E10600" fill="#E10600" fillOpacity={0.35} />
                    <Radar name={cmp.code} dataKey="B" stroke="#27F4D2" fill="#27F4D2" fillOpacity={0.2} />
                    <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="h-72">
                <ResponsiveContainer>
                  <LineChart data={trend}>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="r" stroke="rgba(255,255,255,0.35)" fontSize={11} />
                    <YAxis reversed domain={[1, 15]} stroke="rgba(255,255,255,0.35)" fontSize={11} />
                    <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} />
                    <Line type="monotone" dataKey={sel.code} stroke="#E10600" strokeWidth={2.5} dot={{ r: 3, fill: "#E10600" }} />
                    <Line type="monotone" dataKey={cmp.code} stroke="#27F4D2" strokeWidth={2.5} dot={{ r: 3, fill: "#27F4D2" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}