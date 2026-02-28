import Navbar from "@/components/Navbar";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";

const weeklyData = [
  { day: "Mon", safe: 18, moderate: 5, high: 1 },
  { day: "Tue", safe: 22, moderate: 3, high: 0 },
  { day: "Wed", safe: 15, moderate: 8, high: 3 },
  { day: "Thu", safe: 20, moderate: 4, high: 2 },
  { day: "Fri", safe: 12, moderate: 9, high: 4 },
  { day: "Sat", safe: 25, moderate: 2, high: 0 },
  { day: "Sun", safe: 19, moderate: 6, high: 1 },
];

const hourlyFatigue = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  avgScore: Math.round(15 + Math.sin((i - 6) * 0.3) * 20 + (i > 18 ? (i - 18) * 5 : 0) + Math.random() * 8),
}));

const riskDistribution = [
  { name: "Safe", value: 68, color: "hsl(145,70%,45%)" },
  { name: "Moderate", value: 24, color: "hsl(38,92%,55%)" },
  { name: "High Risk", value: 8, color: "hsl(0,72%,55%)" },
];

const driverComparison = [
  { name: "Ahmed K.", score: 24 },
  { name: "Sara M.", score: 38 },
  { name: "Omar R.", score: 19 },
  { name: "Fatima A.", score: 55 },
  { name: "Youssef B.", score: 15 },
];

const StatCard = ({ label, value, sub }: { label: string; value: string; sub: string }) => (
  <div className="rounded-xl bg-card border border-border p-5">
    <p className="text-xs text-muted-foreground uppercase tracking-wider font-display">{label}</p>
    <p className="text-3xl font-bold font-display text-foreground mt-1">{value}</p>
    <p className="text-xs text-muted-foreground mt-1">{sub}</p>
  </div>
);

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background scanline">
      <Navbar />
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold font-display text-foreground mb-1">Analytics</h1>
        <p className="text-sm text-muted-foreground mb-6">Fleet-wide fatigue insights and trends</p>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Sessions" value="822" sub="This month" />
          <StatCard label="Avg Fatigue Score" value="27.3" sub="↓ 4.2 from last month" />
          <StatCard label="High Risk Events" value="31" sub="↓ 12% improvement" />
          <StatCard label="Active Drivers" value="5" sub="3 currently driving" />
        </div>

        {/* Charts row 1 */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="rounded-2xl bg-card border border-border p-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-display">Weekly Risk Distribution</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
                  <XAxis dataKey="day" tick={{ fill: "hsl(215,12%,50%)", fontSize: 11 }} axisLine={false} />
                  <YAxis tick={{ fill: "hsl(215,12%,50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "hsl(220,18%,12%)", border: "1px solid hsl(220,14%,18%)", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="safe" stackId="a" fill="hsl(145,70%,45%)" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="moderate" stackId="a" fill="hsl(38,92%,55%)" />
                  <Bar dataKey="high" stackId="a" fill="hsl(0,72%,55%)" radius={[4, 4, 0, 0]} />
                  <Legend wrapperStyle={{ fontSize: 11, color: "hsl(215,12%,50%)" }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl bg-card border border-border p-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-display">Fatigue by Hour of Day</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyFatigue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
                  <XAxis dataKey="hour" tick={{ fill: "hsl(215,12%,50%)", fontSize: 10 }} axisLine={false} interval={3} />
                  <YAxis domain={[0, 100]} tick={{ fill: "hsl(215,12%,50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "hsl(220,18%,12%)", border: "1px solid hsl(220,14%,18%)", borderRadius: 8, fontSize: 12 }} />
                  <Line type="monotone" dataKey="avgScore" stroke="hsl(170,80%,45%)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-card border border-border p-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-display">Overall Risk Distribution</p>
            <div className="h-56 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                    {riskDistribution.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(220,18%,12%)", border: "1px solid hsl(220,14%,18%)", borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl bg-card border border-border p-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-display">Driver Avg Fatigue Score</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={driverComparison} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: "hsl(215,12%,50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" tick={{ fill: "hsl(215,12%,50%)", fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                  <Tooltip contentStyle={{ background: "hsl(220,18%,12%)", border: "1px solid hsl(220,14%,18%)", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="score" fill="hsl(170,80%,45%)" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
