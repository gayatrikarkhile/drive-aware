import { type HistoryEntry, type RiskLevel } from "@/hooks/useFatigueSimulation";

interface Props {
  history: HistoryEntry[];
}

const riskBadge: Record<RiskLevel, string> = {
  Safe: "bg-safe/15 text-safe",
  Moderate: "bg-moderate/15 text-moderate",
  "High Risk": "bg-danger/15 text-danger",
};

export default function DrivingHistory({ history }: Props) {
  return (
    <div className="rounded-2xl bg-card border border-border p-6 overflow-x-auto">
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-display">Driving History</p>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-muted-foreground text-xs uppercase tracking-wider border-b border-border">
            <th className="text-left pb-3 font-medium">Driver</th>
            <th className="text-left pb-3 font-medium">Date</th>
            <th className="text-left pb-3 font-medium">Duration</th>
            <th className="text-left pb-3 font-medium">Avg Score</th>
            <th className="text-left pb-3 font-medium">Max Risk</th>
            <th className="text-right pb-3 font-medium">Alerts</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h) => (
            <tr key={h.id} className="border-b border-border/50 last:border-0">
              <td className="py-3 font-medium text-foreground">{h.driver}</td>
              <td className="py-3 text-muted-foreground font-display text-xs">{h.date}</td>
              <td className="py-3 text-muted-foreground">{h.duration}</td>
              <td className="py-3 font-display">{h.avg_score}</td>
              <td className="py-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${riskBadge[h.max_risk]}`}>
                  {h.max_risk}
                </span>
              </td>
              <td className="py-3 text-right font-display">{h.alerts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
