import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts";
import { type FatigueData } from "@/hooks/useFatigueSimulation";

interface Props {
  data: FatigueData[];
}

export default function TrendChart({ data }: Props) {
  const chartData = data.map((d, i) => ({
    t: i,
    score: d.fatigue_score,
  }));

  return (
    <div className="rounded-2xl bg-card border border-border p-6">
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-display">Fatigue Trend</p>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
            <defs>
              <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(170,80%,45%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(170,80%,45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
            <XAxis dataKey="t" tick={false} axisLine={false} />
            <YAxis domain={[0, 100]} tick={{ fill: "hsl(215,12%,50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <ReferenceLine y={40} stroke="hsl(38,92%,55%)" strokeDasharray="4 4" strokeOpacity={0.5} />
            <ReferenceLine y={70} stroke="hsl(0,72%,55%)" strokeDasharray="4 4" strokeOpacity={0.5} />
            <Area
              type="monotone"
              dataKey="score"
              stroke="hsl(170,80%,45%)"
              strokeWidth={2}
              fill="url(#scoreGrad)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-moderate inline-block" /> Moderate (40)</span>
        <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-danger inline-block" /> High Risk (70)</span>
      </div>
    </div>
  );
}
