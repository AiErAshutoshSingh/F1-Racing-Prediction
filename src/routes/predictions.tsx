import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trophy, Flag, ShieldAlert, CloudRain, Sparkles, Cpu, Zap } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Gauge, PageHeader, SectionHeader } from "../components/f1/visuals";
import { WINNER_PROBS, FEATURE_IMPORTANCE, DRIVERS } from "../components/f1/data";

export const Route = createFileRoute("/predictions")({
  head: () => ({ meta: [
    { title: "AI Race Predictions — APEX AI" },
    { name: "description", content: "Winner, podium, DNF and top-10 probabilities for the next F1 Grand Prix with SHAP explanations." },
    { property: "og:title", content: "AI Race Predictions — APEX AI" },
    { property: "og:description", content: "Winner, podium, DNF and top-10 probabilities with SHAP explanations." },
  ]}),
  component: Predictions,
});

const podium = WINNER_PROBS.slice(0, 3);
const top10 = WINNER_PROBS.slice(0, 9);
const dnf = [{name:"SAI",val:22},{name:"TSU",val:18},{name:"GAS",val:16},{name:"ALO",val:14},{name:"STR",val:12},{name:"HAM",val:8}];
const pieColors = ["#E10600","#FF8000","#E80020","#FFA500","#EED12F","#27F4D2","#64C4FF","#229971","#6692FF"];

function Predictions() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 py-8">
      <PageHeader eyebrow="AI ORACLE · GP #22 · ABU DHABI" title="Race Predictions" desc="Ensemble outputs across winner, podium, DNF, fastest-lap and safety-car probability models." />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="relative overflow-hidden rounded-3xl glass-red p-6 sm:p-10">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="relative grid grid-cols-[minmax(0,1fr)_auto] gap-6 items-center">
            <div className="min-w-0">
              <div className="font-mono text-[10px] tracking-[0.3em] text-white/80 mb-3">◆ PREDICTED WINNER</div>
              <h2 className="font-display font-black text-4xl sm:text-6xl text-white neon-red">Max Verstappen</h2>
              <div className="mt-2 font-mono text-sm text-white/80">RED BULL RACING · GRID P1 · #1</div>
              <p className="mt-4 text-white/80 max-w-lg">The model predicts Verstappen has an <b className="text-white">82% chance of winning</b> due to excellent qualifying pace, strong historical performance at Yas Marina, and superior constructor reliability.</p>
              <div className="mt-6 flex flex-wrap gap-2 font-mono text-[10px]">
                <span className="rounded-full glass px-3 py-1 text-white/80">POLE +0.184s</span>
                <span className="rounded-full glass px-3 py-1 text-white/80">4× WIN · YAS</span>
                <span className="rounded-full glass px-3 py-1 text-white/80">TEAM RELIAB. 94%</span>
              </div>
            </div>
            <Gauge value={82} label="WIN PROB" size={200} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Trophy, label: "PODIUM LOCK", v: "3/3", d: "VER · NOR · LEC" },
            { icon: Flag, label: "FASTEST LAP", v: "NOR", d: "31% likelihood" },
            { icon: ShieldAlert, label: "SAFETY CAR", v: "26%", d: "Base + turn 6/9" },
            { icon: CloudRain, label: "RAIN RISK", v: "8%", d: "Clear · wind NE" },
            { icon: Sparkles, label: "DOTD", v: "PIA", d: "Recovery drive" },
            { icon: Cpu, label: "CONSTR. WIN", v: "Red Bull", d: "58% probability" },
          ].map((c, i) => (
            <motion.div key={c.label} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.05}} className="glass rounded-2xl p-4">
              <div className="flex items-center gap-2 text-[9px] font-mono tracking-widest text-[#E10600]">
                <c.icon className="h-3.5 w-3.5" /> {c.label}
              </div>
              <div className="mt-2 font-display font-black text-xl text-white truncate">{c.v}</div>
              <div className="text-[11px] text-white/50 mt-0.5 truncate">{c.d}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-2xl p-5">
          <SectionHeader eyebrow="PODIUM MODEL" title="Predicted podium" />
          <div className="flex items-end justify-center gap-4 h-56 pt-4">
            {[{pos:2,d:podium[1],h:110,c:"#C0C0C0"},{pos:1,d:podium[0],h:150,c:"#E10600"},{pos:3,d:podium[2],h:80,c:"#CD7F32"}].map((p)=>(
              <div key={p.pos} className="flex flex-col items-center w-24">
                <div className="font-display font-black text-white">{p.d.driver}</div>
                <div className="text-[10px] font-mono text-white/50">{Math.round(p.d.prob*100)}%</div>
                <div className="mt-2 w-full rounded-t-lg" style={{ height: p.h, background: `linear-gradient(180deg, ${p.c}, transparent)`, boxShadow: `0 0 40px ${p.c}55` }}>
                  <div className="h-full grid place-items-center font-display font-black text-3xl text-white/90">{p.pos}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <SectionHeader eyebrow="TOP 10 FORECAST" title="Points-paying probability" />
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={top10} layout="vertical" margin={{ left: 8 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.35)" fontSize={11} tickFormatter={(v)=>`${Math.round(v*100)}%`} />
                <YAxis type="category" dataKey="driver" stroke="rgba(255,255,255,0.6)" fontSize={11} width={40} />
                <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} formatter={(v:number)=>`${Math.round(v*100)}%`} />
                <Bar dataKey="prob" fill="#E10600" radius={[0,6,6,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-2xl p-5">
          <SectionHeader eyebrow="WIN PROBABILITY" title="Distribution" />
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={WINNER_PROBS} dataKey="prob" nameKey="driver" innerRadius={55} outerRadius={95} paddingAngle={2}>
                  {WINNER_PROBS.map((_, i)=>(<Cell key={i} fill={pieColors[i % pieColors.length]}/>))}
                </Pie>
                <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} formatter={(v:number)=>`${Math.round(v*100)}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <SectionHeader eyebrow="DNF MODEL" title="Retirement risk" />
          <div className="h-64">
            <ResponsiveContainer>
              <RadialBarChart data={dnf} innerRadius="20%" outerRadius="95%" barSize={12} startAngle={90} endAngle={-270}>
                <RadialBar dataKey="val" cornerRadius={6} background={{ fill: "rgba(255,255,255,0.05)" }} fill="#E10600" />
                <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} formatter={(v:number)=>`${v}%`} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <SectionHeader eyebrow="SHAP · IMPORTANCE" title="Signal drivers" />
          <div className="space-y-2 mt-2">
            {FEATURE_IMPORTANCE.slice(0, 7).map((r, i) => (
              <div key={r.feature}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/80 truncate">{r.feature}</span>
                  <span className="font-mono text-white/60">{Math.round(r.value * 100)}%</span>
                </div>
                <div className="mt-1 h-1 rounded-full bg-white/5 overflow-hidden">
                  <motion.div initial={{width:0}} whileInView={{width:`${r.value*100*3.4}%`}} viewport={{once:true}} transition={{duration:1,delay:i*0.05}} className="h-full bg-gradient-to-r from-[#E10600] to-[#ff8a00]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 glass rounded-2xl p-5">
        <SectionHeader eyebrow="GRID · ABU DHABI GP" title="Starting order model" />
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {DRIVERS.slice(0,10).map((d, i) => (
            <div key={d.code} className="glass rounded-lg p-3 flex items-center gap-3">
              <div className="h-8 w-8 rounded bg-[#E10600] grid place-items-center font-display font-black text-white text-sm">{i+1}</div>
              <div className="min-w-0">
                <div className="font-display font-bold text-white truncate">{d.code}</div>
                <div className="text-[10px] text-white/50 truncate">{d.team}</div>
              </div>
              <Zap className="h-3.5 w-3.5 text-[#E10600] ml-auto shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}