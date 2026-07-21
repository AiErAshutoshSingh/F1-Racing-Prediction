import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";
import { PageHeader, SectionHeader } from "../components/f1/visuals";
import { CONSTRUCTORS } from "../components/f1/data";

export const Route = createFileRoute("/constructors")({
  head: () => ({ meta: [
    { title: "Constructor Analytics — APEX AI" },
    { name: "description", content: "Formula 1 team standings, win rate, reliability and pit-stop efficiency across all constructors." },
    { property: "og:title", content: "F1 Constructor Analytics — APEX AI" },
    { property: "og:description", content: "Team standings, reliability and pit-stop efficiency across the F1 grid." },
  ]}),
  component: Constructors,
});

function Constructors() {
  const sorted = [...CONSTRUCTORS].sort((a, b) => b.pts - a.pts);
  return (
    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 py-8">
      <PageHeader
        eyebrow="CONSTRUCTOR STANDINGS"
        title="Teams"
        desc="Every team on the 2026 grid. Points, wins, reliability, pit-stop efficiency."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {sorted.slice(0, 3).map((c, i) => (
          <motion.div key={c.name} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08}}
            className="relative overflow-hidden rounded-2xl glass p-6">
            <div className="absolute inset-0 opacity-40" style={{ background: `radial-gradient(circle at 100% 0%, ${c.color}55, transparent 60%)` }} />
            <div className="relative flex items-start justify-between">
              <div>
                <div className="font-mono text-[10px] tracking-widest text-white/50">P{i+1} · CONSTRUCTOR</div>
                <div className="mt-1 font-display font-black text-2xl text-white">{c.name}</div>
              </div>
              <div className="h-12 w-1.5 rounded-full" style={{ background: c.color, boxShadow: `0 0 20px ${c.color}` }} />
            </div>
            <div className="relative mt-4 font-display font-black text-5xl text-white">
              {c.pts}<span className="ml-1 text-sm font-mono tracking-widest text-white/50">PTS</span>
            </div>
            <div className="relative mt-4 grid grid-cols-4 gap-2 text-center">
              {[
                { l: "WIN", v: c.wins }, { l: "POD", v: c.podiums }, { l: "REL", v: `${c.reliability}%` }, { l: "PIT", v: `${c.pitAvg}s` },
              ].map((s)=>(
                <div key={s.l} className="rounded-lg bg-white/[0.04] p-2">
                  <div className="text-[9px] font-mono text-white/40 tracking-widest">{s.l}</div>
                  <div className="font-display font-black text-white text-sm">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 glass rounded-2xl p-5">
        <SectionHeader eyebrow="POINTS · 2026" title="Constructor championship" />
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={sorted}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.35)" fontSize={11} />
              <YAxis stroke="rgba(255,255,255,0.35)" fontSize={11} />
              <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="pts" radius={[6, 6, 0, 0]}>
                {sorted.map((c) => <Cell key={c.name} fill={c.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 glass rounded-2xl p-5 overflow-hidden">
        <SectionHeader eyebrow="RANKING TABLE" title="Full standings" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] font-mono tracking-widest text-white/40 border-b border-white/[0.06]">
                {["#","TEAM","PTS","WINS","PODIUMS","AVG FIN","WIN %","RELIABILITY","PIT AVG"].map(h=>(
                  <th key={h} className="text-left py-3 px-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((c, i) => (
                <motion.tr key={c.name} initial={{opacity:0,x:-8}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.03}}
                  className="border-b border-white/[0.04] hover:bg-white/[0.03]">
                  <td className="py-3 px-3 font-display font-black text-white">{i+1}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="h-4 w-1 rounded-full" style={{ background: c.color, boxShadow: `0 0 10px ${c.color}` }} />
                      <span className="font-semibold text-white truncate">{c.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-display font-black text-white">{c.pts}</td>
                  <td className="py-3 px-3 text-white/70">{c.wins}</td>
                  <td className="py-3 px-3 text-white/70">{c.podiums}</td>
                  <td className="py-3 px-3 text-white/70 font-mono">P{c.avgFinish}</td>
                  <td className="py-3 px-3 text-white/70">{c.winRate}%</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full bg-emerald-400" style={{ width: `${c.reliability}%` }} />
                      </div>
                      <span className="text-white/70 font-mono text-xs">{c.reliability}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono text-[#E10600]">{c.pitAvg}s</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}