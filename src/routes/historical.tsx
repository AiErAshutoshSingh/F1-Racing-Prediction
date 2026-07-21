import { createFileRoute } from "@tanstack/react-router";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Treemap, LineChart, Line } from "recharts";
import { PageHeader, SectionHeader } from "../components/f1/visuals";
import { SEASONS_TREND, CONSTRUCTORS } from "../components/f1/data";

export const Route = createFileRoute("/historical")({
  head: () => ({ meta: [
    { title: "Historical Trends — APEX AI" },
    { name: "description", content: "Compare F1 seasons, constructors and eras across 75 years of racing history." },
    { property: "og:title", content: "F1 Historical Trends — APEX AI" },
    { property: "og:description", content: "Compare seasons and constructors across 75 years of F1." },
  ]}),
  component: Historical,
});

const timeline = [
  {y:2010,ch:"VET"},{y:2011,ch:"VET"},{y:2012,ch:"VET"},{y:2013,ch:"VET"},
  {y:2014,ch:"HAM"},{y:2015,ch:"HAM"},{y:2016,ch:"ROS"},{y:2017,ch:"HAM"},
  {y:2018,ch:"HAM"},{y:2019,ch:"HAM"},{y:2020,ch:"HAM"},{y:2021,ch:"VER"},
  {y:2022,ch:"VER"},{y:2023,ch:"VER"},{y:2024,ch:"VER"},{y:2025,ch:"NOR"},
];
const tmap = CONSTRUCTORS.map((c)=>({ name: c.name, size: c.pts, fill: c.color }));
const drivers = ["VER","HAM","NOR","LEC","PIA","RUS"];
const circuits = ["MON","SIL","SUZ","SPA","MZA","YAS","COT","SGP","INT"];
const HEAT = drivers.map((_,i)=>circuits.map((_,j)=>Math.abs(Math.sin(i+j)*(1-((i+j)%4)/6))));

function Historical() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 py-8">
      <PageHeader eyebrow="HISTORICAL ANALYTICS" title="Era Explorer" desc="Compare seasons, constructors and eras across 75 years of Formula 1." />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <SectionHeader eyebrow="CONSTRUCTORS" title="Championship trajectory · 2010→2025" />
          <div className="h-80">
            <ResponsiveContainer>
              <AreaChart data={SEASONS_TREND}>
                <defs>{["Mercedes","RedBull","Ferrari","McLaren"].map((k,i)=>(
                  <linearGradient key={k} id={`h${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={["#27F4D2","#3671C6","#E80020","#FF8000"][i]} stopOpacity={0.5}/>
                    <stop offset="100%" stopColor={["#27F4D2","#3671C6","#E80020","#FF8000"][i]} stopOpacity={0}/>
                  </linearGradient>
                ))}</defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" stroke="rgba(255,255,255,0.35)" fontSize={11}/>
                <YAxis stroke="rgba(255,255,255,0.35)" fontSize={11}/>
                <Tooltip contentStyle={{ background:"#0a0a0a", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, fontSize:12 }} />
                <Area type="monotone" dataKey="Mercedes" stroke="#27F4D2" fill="url(#h0)" strokeWidth={2}/>
                <Area type="monotone" dataKey="RedBull" stroke="#3671C6" fill="url(#h1)" strokeWidth={2}/>
                <Area type="monotone" dataKey="Ferrari" stroke="#E80020" fill="url(#h2)" strokeWidth={2}/>
                <Area type="monotone" dataKey="McLaren" stroke="#FF8000" fill="url(#h3)" strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <SectionHeader eyebrow="TREEMAP" title="All-time points" />
          <div className="h-80">
            <ResponsiveContainer>
              <Treemap data={tmap} dataKey="size" stroke="rgba(0,0,0,0.4)" isAnimationActive />
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 glass rounded-2xl p-5">
        <SectionHeader eyebrow="CHAMPIONSHIP TIMELINE" title="Drivers champions" />
        <div className="overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max py-4">
            {timeline.map((t,i)=>(
              <div key={t.y} className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <div className={`h-14 w-14 rounded-lg grid place-items-center font-display font-black text-white text-xs ${t.ch==="VER"?"bg-[#3671C6]":t.ch==="HAM"||t.ch==="ROS"?"bg-[#27F4D2] text-black":t.ch==="VET"?"bg-[#3671C6]":"bg-[#FF8000]"}`}>{t.ch}</div>
                  <div className="mt-1 font-mono text-[10px] text-white/60">{t.y}</div>
                </div>
                {i<timeline.length-1 && <div className="h-px w-6 bg-[#E10600]/50" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="glass rounded-2xl p-5">
          <SectionHeader eyebrow="HEATMAP" title="Driver wins × circuit" />
          <div className="overflow-x-auto">
            <div className="min-w-[480px] space-y-1">
              <div className="grid gap-1" style={{ gridTemplateColumns:`60px repeat(${circuits.length},minmax(0,1fr))` }}>
                <div />
                {circuits.map(c=><div key={c} className="text-center font-mono text-[10px] text-white/40">{c}</div>)}
              </div>
              {drivers.map((d,i)=>(
                <div key={d} className="grid gap-1 items-center" style={{ gridTemplateColumns:`60px repeat(${circuits.length},minmax(0,1fr))` }}>
                  <div className="font-mono text-xs text-white/60">{d}</div>
                  {HEAT[i].map((v,j)=>(
                    <div key={j} className="aspect-square rounded" style={{ background:`oklch(0.4 ${0.24*v} 27 / ${0.15+v*0.85})`, boxShadow: v>0.6?"0 0 10px #E10600":undefined }}/>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <SectionHeader eyebrow="SEASON COMPARE" title="Points velocity" />
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={SEASONS_TREND}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" stroke="rgba(255,255,255,0.35)" fontSize={11}/>
                <YAxis stroke="rgba(255,255,255,0.35)" fontSize={11}/>
                <Tooltip contentStyle={{ background:"#0a0a0a", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, fontSize:12 }} />
                <Line type="monotone" dataKey="Mercedes" stroke="#27F4D2" strokeWidth={2} dot={false}/>
                <Line type="monotone" dataKey="RedBull" stroke="#3671C6" strokeWidth={2} dot={false}/>
                <Line type="monotone" dataKey="Ferrari" stroke="#E80020" strokeWidth={2} dot={false}/>
                <Line type="monotone" dataKey="McLaren" stroke="#FF8000" strokeWidth={2} dot={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}