import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Gauge as GaugeIcon, Sparkles, Users, TrendingUp, Radio, Timer, Cpu, Zap } from "lucide-react";
import { Counter, F1Car, Particles, TrackSVG, Gauge } from "../components/f1/visuals";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-70" />
        <Particles count={60} />
        {/* speed streaks */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px w-[40%] bg-gradient-to-r from-transparent via-[#E10600] to-transparent animate-speed-lines"
              style={{ top: `${15 + i * 12}%`, animationDelay: `${i * 0.4}s`, animationDuration: `${2 + i * 0.3}s` }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-[1600px] px-6 pt-14 pb-24 sm:pt-24 sm:pb-32">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] items-center">
            {/* left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#E10600] animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-white/70">MODEL v4.2 · LIVE · GP #22</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-6 font-display font-black text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.95] text-white"
              >
                Predict Every Race<br />
                <span className="relative">
                  <span className="neon-red text-[#E10600]">Before It Starts.</span>
                  <svg className="absolute -bottom-3 left-0 w-full" height="10" viewBox="0 0 400 10">
                    <path d="M0 5 Q100 0 200 5 T400 5" stroke="#E10600" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-8 max-w-xl text-base sm:text-lg text-white/70 leading-relaxed"
              >
                AI-powered Formula 1 analytics using machine learning and 70+ years of historical race data.
                Winner probabilities. Podium models. Live telemetry. Race control, reimagined.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-10 flex flex-wrap gap-3"
              >
                <Link to="/dashboard" className="group relative inline-flex items-center gap-2 rounded-full bg-[#E10600] px-6 py-3 font-display font-bold tracking-wider text-white text-sm ring-red overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#ff2b1f] to-[#E10600] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative">EXPLORE DASHBOARD</span>
                  <ArrowRight className="relative h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/predictions" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-display font-bold tracking-wider text-white text-sm hover:bg-white/[0.08] transition-colors">
                  <Sparkles className="h-4 w-4 text-[#E10600]" /> RACE PREDICTIONS
                </Link>
                <Link to="/drivers" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-display font-bold tracking-wider text-white text-sm hover:bg-white/[0.08] transition-colors">
                  <Users className="h-4 w-4 text-[#E10600]" /> DRIVER ANALYTICS
                </Link>
              </motion.div>

              {/* live mini telemetry */}
              <div className="mt-12 grid grid-cols-3 gap-3 max-w-xl">
                {[
                  { label: "SPEED", val: "327", unit: "km/h", icon: GaugeIcon },
                  { label: "GAP LDR", val: "+0.184", unit: "sec", icon: Timer },
                  { label: "CONF", val: "94.6", unit: "%", icon: Cpu },
                ].map((s) => (
                  <div key={s.label} className="glass rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-white/50">
                      <s.icon className="h-3 w-3 text-[#E10600]" /> {s.label}
                    </div>
                    <div className="mt-1 font-display font-black text-xl text-white">{s.val}<span className="text-[10px] text-white/50 ml-1 font-mono">{s.unit}</span></div>
                  </div>
                ))}
              </div>
            </div>

            {/* right — car + rings */}
            <div className="relative aspect-[4/3] w-full">
              <div className="absolute inset-0 grid place-items-center">
                {/* concentric rotating rings */}
                <div className="relative w-full max-w-[560px] aspect-square">
                  <div className="absolute inset-0 rounded-full border border-[#E10600]/20 animate-spin-slow" />
                  <div className="absolute inset-6 rounded-full border border-[#E10600]/15 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "30s" }} />
                  <div className="absolute inset-16 rounded-full border border-dashed border-[#E10600]/25 animate-spin-slow" style={{ animationDuration: "60s" }} />
                  <div className="absolute inset-24 rounded-full border border-[#E10600]/10" />
                  {/* HUD marks */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                    <div key={deg} className="absolute inset-0" style={{ transform: `rotate(${deg}deg)` }}>
                      <div className="absolute left-1/2 -translate-x-1/2 -top-1 h-2 w-px bg-[#E10600]" />
                    </div>
                  ))}
                  {/* center gauge */}
                  <div className="absolute inset-0 grid place-items-center">
                    <Gauge value={94.6} label="AI CONFIDENCE" size={240} />
                  </div>
                </div>
              </div>
              {/* floating car */}
              <motion.div
                initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute inset-x-0 bottom-4 animate-float-y"
              >
                <F1Car className="w-full drop-shadow-[0_20px_40px_rgba(225,6,0,0.35)]" />
              </motion.div>

              {/* floating HUD chips */}
              <motion.div
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="absolute left-2 top-4 glass rounded-lg px-3 py-2 hidden sm:block"
              >
                <div className="text-[9px] font-mono tracking-widest text-[#E10600]">SECTOR 2</div>
                <div className="font-display font-black text-white text-sm">28.612</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                className="absolute right-2 top-10 glass rounded-lg px-3 py-2 hidden sm:block"
              >
                <div className="text-[9px] font-mono tracking-widest text-[#E10600]">TYRE</div>
                <div className="font-display font-black text-white text-sm flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-yellow-400" /> MEDIUM · L14
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- STATS BAND ---------- */}
      <section className="relative">
        <div className="mx-auto max-w-[1600px] px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { n: 500, s: "+", label: "RACES ANALYZED" },
              { n: 1000, s: "+", label: "DRIVERS TRACKED" },
              { n: 70, s: "+", label: "CIRCUITS" },
              { n: 95, s: "%", label: "PREDICTION ACCURACY" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-6 relative overflow-hidden"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#E10600]/10 blur-2xl" />
                <div className="font-display font-black text-4xl sm:text-5xl text-white">
                  <Counter to={s.n} suffix={s.s} />
                </div>
                <div className="mt-2 font-mono text-[10px] tracking-[0.25em] text-white/50">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FEATURE GRID ---------- */}
      <section className="relative mt-24">
        <div className="mx-auto max-w-[1600px] px-6">
          <div className="text-center mb-14">
            <div className="font-mono text-[10px] tracking-[0.3em] text-[#E10600] mb-3">◆ RACE CONTROL SYSTEMS</div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white">Everything you need,<br /><span className="text-white/50">before the lights go out.</span></h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: Sparkles, title: "AI Race Predictions", desc: "Winner, podium, DNF and top-10 probabilities powered by XGBoost + SHAP explanations.", to: "/predictions" },
              { icon: Users, title: "Driver Analytics", desc: "Career stats, radar comparisons, form curves and performance scores for every driver.", to: "/drivers" },
              { icon: TrendingUp, title: "Race Telemetry", desc: "Lap deltas, pit windows, sector heatmaps and full race replay timelines.", to: "/race-analytics" },
              { icon: Radio, title: "Live Timing HUD", desc: "Race-control style ticker with sector splits, gaps and safety-car probability.", to: "/dashboard" },
              { icon: Cpu, title: "Model Insights", desc: "ROC curves, confusion matrix, feature importance and multi-model benchmarks.", to: "/model-insights" },
              { icon: Zap, title: "Historical Trends", desc: "Compare seasons, constructors and eras with championship timelines and heatmaps.", to: "/historical" },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="group relative glass rounded-2xl p-6 overflow-hidden"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#E10600]/10 blur-3xl group-hover:bg-[#E10600]/25 transition-colors" />
                <div className="relative">
                  <div className="h-11 w-11 rounded-xl glass-red grid place-items-center">
                    <f.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-5 font-display font-bold text-xl text-white">{f.title}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{f.desc}</p>
                  <Link to={f.to} className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-[#E10600] group-hover:gap-3 transition-all">
                    OPEN MODULE <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- TRACK + AI EXPLAIN ---------- */}
      <section className="relative mt-28">
        <div className="mx-auto max-w-[1600px] px-6">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="relative glass rounded-3xl p-6 sm:p-8 overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div className="relative">
                <div className="font-mono text-[10px] tracking-[0.3em] text-[#E10600] mb-2">◆ CIRCUIT INTELLIGENCE</div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white">Every corner, sector and DRS zone — modelled.</h3>
                <TrackSVG className="mt-6 w-full" />
              </div>
            </div>

            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-[#E10600] mb-3">◆ SHAP EXPLANATION</div>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-white leading-tight">
                Not a black box.<br /><span className="text-white/50">Every prediction, explained.</span>
              </h3>
              <p className="mt-4 text-white/60 max-w-lg">
                The model predicts <b className="text-white">Verstappen has an 82% chance of winning</b> due to excellent qualifying pace,
                strong historical performance at this circuit, and superior constructor reliability.
              </p>
              <div className="mt-6 space-y-2">
                {[
                  { f: "Qualifying P1", w: 0.28, dir: "+" },
                  { f: "Constructor Form (5R)", w: 0.19, dir: "+" },
                  { f: "Circuit History (4W)", w: 0.13, dir: "+" },
                  { f: "Tyre Deg Index", w: 0.08, dir: "−" },
                  { f: "Rain Probability 22%", w: 0.07, dir: "−" },
                ].map((row) => (
                  <div key={row.f} className="glass rounded-lg px-3 py-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/80 truncate">{row.f}</span>
                        <span className={`font-mono text-[10px] ${row.dir === "+" ? "text-emerald-400" : "text-[#E10600]"}`}>{row.dir}{Math.round(row.w * 100)}%</span>
                      </div>
                      <div className="mt-1 h-1 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }} whileInView={{ width: `${row.w * 100 * 3}%` }} viewport={{ once: true }}
                          transition={{ duration: 1 }}
                          className={`h-full ${row.dir === "+" ? "bg-emerald-400" : "bg-[#E10600]"}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/model-insights" className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-widest text-white/80 hover:text-[#E10600]">
                VIEW FULL MODEL <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="relative mt-28">
        <div className="mx-auto max-w-[1600px] px-6">
          <div className="relative overflow-hidden rounded-3xl glass-red p-10 sm:p-16 text-center">
            <div className="absolute inset-0 grid-bg opacity-60" />
            <Particles count={30} />
            <div className="relative">
              <div className="font-mono text-[10px] tracking-[0.3em] text-white/80 mb-4">◆ LIGHTS OUT · AND AWAY WE GO</div>
              <h2 className="font-display font-black text-4xl sm:text-6xl text-white neon-red">Take a seat in Race Control.</h2>
              <p className="mt-4 text-white/80 max-w-xl mx-auto">Launch the full command deck and start predicting the next Grand Prix.</p>
              <Link to="/dashboard" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white text-[#E10600] px-8 py-3.5 font-display font-black tracking-widest text-sm hover:bg-white/90 transition-colors">
                LAUNCH DASHBOARD <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}