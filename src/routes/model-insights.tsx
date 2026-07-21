import { createFileRoute } from "@tanstack/react-router";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";
import { PageHeader, SectionHeader } from "../components/f1/visuals";
import { FEATURE_IMPORTANCE } from "../components/f1/data";

export const Route = createFileRoute("/model-insights")({
  head: () => ({ meta: [
    { title: "Model Insights — APEX AI" },
    { name: "description", content: "ML performance benchmarks, ROC curves, confusion matrices and feature importance for F1 prediction models." },
    { property: "og:title", content: "ML Model Insights — APEX AI" },
    { property: "og:description", content: "ROC, confusion matrix and benchmarks for F1 prediction models." },
  ]}),
  component: ModelInsights,
});

const roc = Array.from({length:21},(_,i)=>{ const x=i/20; return { fpr:x, tpr: Math.min(1, Math.pow(x, 0.35)), base:x }; });
const bench = [
  { name:"XGBoost", acc:0.887 },{ name:"LightGBM", acc:0.872 },{ name:"Random Forest", acc:0.841 },
  { name:"Neural Net", acc:0.859 },{ name:"Ensemble", acc:0.921 },{ name:"Logistic", acc:0.762 },
];
const CM = [[184,7,2,1],[9,142,11,3],[3,12,128,8],[1,4,9,157]];
const CM_LABELS = ["Win","Podium","Points","No Points"];

function ModelInsights() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 py-8">
      <PageHeader eyebrow="ML OPS · v4.2" title="Model Insights" desc="Benchmarks, ROC curves, confusion matrices and feature importance across production models." />

      <div className="grid gap-4 sm:grid-cols-4 mb-6">
        {[{l:"ACCURACY",v:"92.1%"},{l:"F1 SCORE",v:"0.897"},{l:"AUC-ROC",v:"0.954"},{l:"LATENCY",v:"38ms"}].map(k=>(
          <div key={k.l} className="glass rounded-2xl p-5">
            <div className="text-[10px] font-mono tracking-widest text-white/50">{k.l}</div>
            <div className="mt-2 font-display font-black text-3xl neon-red">{k.v}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <SectionHeader eyebrow="ROC CURVE" title="Winner classifier" />
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={roc}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="fpr" stroke="rgba(255,255,255,0.35)" fontSize={11} />
                <YAxis stroke="rgba(255,255,255,0.35)" fontSize={11} />
                <Tooltip contentStyle={{ background:"#0a0a0a", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, fontSize:12 }} />
                <Line dataKey="tpr" stroke="#E10600" strokeWidth={3} dot={false} />
                <Line dataKey="base" stroke="rgba(255,255,255,0.3)" strokeWidth={1} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <SectionHeader eyebrow="CONFUSION MATRIX" title="4-class" />
          <div className="grid gap-1" style={{ gridTemplateColumns:"80px repeat(4, minmax(0,1fr))" }}>
            <div />
            {CM_LABELS.map(l=><div key={l} className="text-center font-mono text-[10px] text-white/50 py-1">{l}</div>)}
            {CM.map((row,i)=>(
              <>
                <div key={`l${i}`} className="font-mono text-[10px] text-white/50 self-center">{CM_LABELS[i]}</div>
                {row.map((v,j)=>{ const max=Math.max(...row); const int=v/max;
                  return <div key={j} className="aspect-square rounded grid place-items-center font-display font-black text-white text-sm" style={{ background:`oklch(0.4 ${i===j?0.24:0.06} 27 / ${0.15+int*0.85})`, boxShadow: i===j && int>0.8 ? "0 0 12px #E10600" : undefined }}>{v}</div>;
                })}
              </>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="glass rounded-2xl p-5">
          <SectionHeader eyebrow="BENCHMARKS" title="Model accuracy" />
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={bench} layout="vertical" margin={{left:8}}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" domain={[0.7,1]} stroke="rgba(255,255,255,0.35)" fontSize={11} tickFormatter={(v)=>`${Math.round(v*100)}%`}/>
                <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,0.6)" fontSize={11} width={100}/>
                <Tooltip contentStyle={{ background:"#0a0a0a", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, fontSize:12 }} formatter={(v:number)=>`${(v*100).toFixed(1)}%`} />
                <Bar dataKey="acc" fill="#E10600" radius={[0,6,6,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <SectionHeader eyebrow="FEATURE IMPORTANCE" title="Global SHAP values" />
          <div className="space-y-2 mt-2">
            {FEATURE_IMPORTANCE.map((r,i)=>(
              <div key={r.feature}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/80 truncate">{r.feature}</span>
                  <span className="font-mono text-white/60">{r.value.toFixed(3)}</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#E10600] to-[#ff8a00]" style={{ width:`${r.value*100*3.4}%`, animationDelay:`${i*40}ms` }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 glass rounded-2xl p-5">
        <SectionHeader eyebrow="PIPELINE" title="Training architecture" />
        <div className="grid gap-3 sm:grid-cols-5 font-mono text-[11px]">
          {["Ingest · FastF1","Feature Eng","Train · XGB","Ensemble","Serve · Edge"].map((s,i)=>(
            <div key={s} className="glass rounded-lg p-4">
              <div className="text-[9px] text-[#E10600] tracking-widest">STAGE {i+1}</div>
              <div className="mt-1 text-white font-bold">{s}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}