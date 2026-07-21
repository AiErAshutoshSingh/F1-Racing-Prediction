import { createFileRoute } from "@tanstack/react-router";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter, ZAxis } from "recharts";
import { PageHeader, SectionHeader } from "../components/f1/visuals";
import { LAP_DELTAS, DRIVERS } from "../components/f1/data";

export const Route = createFileRoute("/race-analytics")({
  head: () => ({ meta: [
    { title: "Race Analytics — APEX AI" },
    { name: "description", content: "Deep F1 race telemetry: lap-time analysis, pit stops, qualifying gaps and race position changes." },
    { property: "og:title", content: "F1 Race Analytics — APEX AI" },
    { property: "og:description", content: "Lap times, pit stops, qualifying gaps and race position changes." },
  ]}),
  component: RaceAnalytics,
});

const pit = DRIVERS.slice(0,8).map((d,i)=>({ code: d.code, s: 2.1 + (i%5)*0.15 + (i===3?0.6:0) }));
const positionChanges = Array.from({length:58},(_,i)=>({ lap:i+1, VER:1+(i>12&&i<20?1:0), NOR:2+Math.round(Math.sin(i/5)), LEC:3+Math.round(Math.cos(i/6)), HAM:5+Math.round(Math.sin(i/8)*2), PIA:4+Math.round(Math.cos(i/7)*2)}));
const paceScatter = DRIVERS.map((d,i)=>({ x:d.avgGrid, y:d.avgFinish, z:100+i*10, name:d.code }));
const HEAT = Array.from({length:10},(_,y)=>Array.from({length:20},(_,x)=>Math.abs(Math.sin((x+y)/2))*(1-y/20)));

function RaceAnalytics() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 py-8">
      <PageHeader eyebrow="RACE ANALYTICS" title="Telemetry Lab" desc="Lap times, pit stops, qualifying, grid analysis and race position changes." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {[{l:"FASTEST LAP",v:"1:24.113",d:"NOR · L47"},{l:"AVG SPEED",v:"223 km/h",d:"Race average"},{l:"TOTAL PIT TIME",v:"48.2s",d:"Winner strategy"},{l:"OVERTAKES",v:"37",d:"Turns 6, 9, 11"}].map(k=>(
          <div key={k.l} className="glass rounded-2xl p-5">
            <div className="text-[10px] font-mono tracking-widest text-white/50">{k.l}</div>
            <div className="mt-2 font-display font-black text-3xl text-white">{k.v}</div>
            <div className="mt-1 text-xs text-white/50">{k.d}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 glass rounded-2xl p-5">
          <SectionHeader eyebrow="POSITION TRACKER" title="Race position changes" />
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={positionChanges}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="lap" stroke="rgba(255,255,255,0.35)" fontSize={11} />
                <YAxis reversed domain={[1,15]} stroke="rgba(255,255,255,0.35)" fontSize={11} />
                <Tooltip contentStyle={{ background:"#0a0a0a", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, fontSize:12 }} />
                <Line type="monotone" dataKey="VER" stroke="#E10600" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="NOR" stroke="#FF8000" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="LEC" stroke="#E80020" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="PIA" stroke="#FFA500" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="HAM" stroke="#ffffff" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <SectionHeader eyebrow="PIT STOPS" title="Stationary time" />
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={pit} layout="vertical" margin={{left:8}}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.35)" fontSize={11} />
                <YAxis type="category" dataKey="code" stroke="rgba(255,255,255,0.6)" fontSize={11} width={40} />
                <Tooltip contentStyle={{ background:"#0a0a0a", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, fontSize:12 }} formatter={(v:number)=>`${v}s`} />
                <Bar dataKey="s" fill="#E10600" radius={[0,6,6,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <SectionHeader eyebrow="LAP TIME · ROLLING" title="All contenders" />
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={LAP_DELTAS}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="lap" stroke="rgba(255,255,255,0.35)" fontSize={11} />
                <YAxis stroke="rgba(255,255,255,0.35)" fontSize={11} />
                <Tooltip contentStyle={{ background:"#0a0a0a", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, fontSize:12 }} />
                <Line type="monotone" dataKey="VER" stroke="#E10600" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="NOR" stroke="#FF8000" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="LEC" stroke="#E80020" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="HAM" stroke="#27F4D2" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <SectionHeader eyebrow="GRID VS FINISH" title="Pace scatter" />
          <div className="h-72">
            <ResponsiveContainer>
              <ScatterChart>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" dataKey="x" name="Grid" stroke="rgba(255,255,255,0.35)" fontSize={11} />
                <YAxis reversed type="number" dataKey="y" name="Finish" stroke="rgba(255,255,255,0.35)" fontSize={11} />
                <ZAxis dataKey="z" range={[80,300]} />
                <Tooltip cursor={{ stroke:"#E10600" }} contentStyle={{ background:"#0a0a0a", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, fontSize:12 }} />
                <Scatter data={paceScatter} fill="#E10600" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 glass rounded-2xl p-5">
        <SectionHeader eyebrow="SECTOR HEATMAP" title="Driver pace across race" />
        <div className="overflow-x-auto">
          <div className="min-w-[720px] space-y-1">
            {HEAT.map((row, y) => (
              <div key={y} className="grid gap-1 items-center" style={{ gridTemplateColumns: `60px repeat(20, minmax(0,1fr))` }}>
                <div className="font-mono text-xs text-white/60">{DRIVERS[y]?.code}</div>
                {row.map((v, x) => (
                  <div key={x} className="h-6 rounded" style={{ background: `oklch(0.4 ${0.2*v} 27 / ${0.15 + v*0.85})`, boxShadow: v>0.7 ? "0 0 10px #E10600" : undefined }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 glass rounded-2xl p-5">
        <SectionHeader eyebrow="RACE REPLAY" title="Timeline scrubber" />
        <div className="relative h-16 rounded-xl bg-white/[0.04] overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-[#E10600]/70 to-[#E10600]/10" />
          <div className="absolute inset-y-0 left-2/3 w-1 bg-white shadow-[0_0_20px_#fff]" />
          {[10,22,35,47].map((p)=>(<div key={p} className="absolute top-2 h-3 w-3 rounded-full bg-[#E10600] ring-red" style={{ left: `${p}%` }} />))}
          <div className="absolute inset-x-4 bottom-2 flex justify-between font-mono text-[10px] text-white/40">
            <span>LAP 1</span><span>LAP 15</span><span>LAP 30</span><span>LAP 45</span><span>LAP 58</span>
          </div>
        </div>
      </div>
    </div>
  );
}