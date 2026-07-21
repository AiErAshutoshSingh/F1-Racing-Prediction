import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CloudSun, Wind, Thermometer, Trophy, MapPin } from "lucide-react";
import { PageHeader, SectionHeader, TrackSVG } from "../components/f1/visuals";
import { CIRCUITS } from "../components/f1/data";

export const Route = createFileRoute("/circuits")({
  head: () => ({ meta: [
    { title: "F1 Circuits — APEX AI" },
    { name: "description", content: "Interactive Formula 1 circuit cards with country, length, corner counts, lap records and historical winners." },
    { property: "og:title", content: "F1 Circuits — APEX AI" },
    { property: "og:description", content: "Explore every F1 circuit: length, corners, lap records and weather." },
  ]}),
  component: Circuits,
});

function Circuits() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 py-8">
      <PageHeader eyebrow="CIRCUIT INTELLIGENCE" title="Circuits" desc="Every circuit on the calendar — geometry, records and the AI's memory of every winner." />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] mb-8">
        <div className="glass rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <div className="min-w-0">
              <div className="font-mono text-[10px] tracking-widest text-[#E10600]">◆ NEXT ROUND</div>
              <h2 className="mt-1 font-display font-black text-4xl text-white">Yas Marina Circuit</h2>
              <div className="mt-1 text-white/60">🇦🇪 Abu Dhabi · GP #22 · 58 laps</div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {[{ l: "LENGTH", v: "5.281 km" }, { l: "CORNERS", v: "16" }, { l: "LAP REC.", v: "1:26.103" }].map(s=>(
                  <div key={s.l} className="rounded-lg bg-white/[0.04] p-2.5">
                    <div className="text-[9px] font-mono text-white/40 tracking-widest">{s.l}</div>
                    <div className="font-display font-black text-white">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
            <TrackSVG className="w-72" />
          </div>
        </div>

        <div className="glass rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="font-mono text-[10px] tracking-widest text-[#E10600]">◆ TRACK WEATHER</div>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <div className="font-display font-black text-6xl text-white">27°</div>
              <div className="text-white/60">Clear · Wind 8kt NE</div>
            </div>
            <CloudSun className="h-24 w-24 text-yellow-400/70" />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[{ l: "TRACK", v: "42°C", icon: Thermometer },{ l: "HUMIDITY", v: "48%", icon: CloudSun },{ l: "WIND", v: "8 kt", icon: Wind }].map(s=>(
              <div key={s.l} className="rounded-lg bg-white/[0.04] p-2.5">
                <div className="flex items-center gap-1 text-[9px] font-mono text-white/40 tracking-widest">
                  <s.icon className="h-3 w-3 text-[#E10600]" />{s.l}
                </div>
                <div className="font-display font-black text-white">{s.v}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 text-xs text-white/50">Rain probability: <b className="text-white">8%</b>. Safety-car base rate: 26%.</div>
        </div>
      </div>

      <SectionHeader eyebrow="CALENDAR" title="All circuits" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CIRCUITS.map((c, i) => (
          <motion.div key={c.name} initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.05}}
            whileHover={{y:-4}} className="group glass rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#E10600]/10 blur-2xl group-hover:bg-[#E10600]/25 transition-colors" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-[10px] tracking-widest text-[#E10600] flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {c.country}
                  </div>
                  <div className="mt-1 font-display font-black text-xl text-white">{c.name}</div>
                </div>
                <div className="text-[10px] font-mono text-white/40">R{i+1}</div>
              </div>
              <TrackSVG className="w-full h-32 my-3" />
              <div className="grid grid-cols-3 gap-2 text-center">
                {[{ l: "LENGTH", v: `${c.length}km` },{ l: "CORNERS", v: c.corners },{ l: "REC", v: c.lapRecord }].map(s=>(
                  <div key={s.l} className="rounded-lg bg-white/[0.04] p-2">
                    <div className="text-[9px] font-mono text-white/40 tracking-widest">{s.l}</div>
                    <div className="font-display font-black text-white text-xs">{s.v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-white/60">
                <Trophy className="h-3.5 w-3.5 text-[#E10600]" /> Last winner · <b className="text-white">{c.winner}</b>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}