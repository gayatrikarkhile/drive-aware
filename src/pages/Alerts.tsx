import { useState } from "react";
import Navbar from "@/components/Navbar";
import { AlertTriangle, CheckCircle, Clock, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type RiskLevel } from "@/hooks/useFatigueSimulation";

interface Alert {
  id: string;
  driver: string;
  type: "High Fatigue" | "Yawning Detected" | "Eyes Closing" | "Head Nodding" | "Long Drive";
  riskLevel: RiskLevel;
  score: number;
  time: string;
  acknowledged: boolean;
}

const mockAlerts: Alert[] = [
  { id: "1", driver: "Ahmed K.", type: "High Fatigue", riskLevel: "High Risk", score: 82, time: "2 min ago", acknowledged: false },
  { id: "2", driver: "Sara M.", type: "Yawning Detected", riskLevel: "Moderate", score: 55, time: "8 min ago", acknowledged: false },
  { id: "3", driver: "Fatima A.", type: "Eyes Closing", riskLevel: "High Risk", score: 91, time: "15 min ago", acknowledged: false },
  { id: "4", driver: "Ahmed K.", type: "Head Nodding", riskLevel: "Moderate", score: 48, time: "32 min ago", acknowledged: true },
  { id: "5", driver: "Omar R.", type: "Long Drive", riskLevel: "Moderate", score: 45, time: "1h ago", acknowledged: true },
  { id: "6", driver: "Youssef B.", type: "Yawning Detected", riskLevel: "Safe", score: 32, time: "2h ago", acknowledged: true },
  { id: "7", driver: "Sara M.", type: "High Fatigue", riskLevel: "High Risk", score: 78, time: "3h ago", acknowledged: true },
  { id: "8", driver: "Ahmed K.", type: "Eyes Closing", riskLevel: "High Risk", score: 85, time: "5h ago", acknowledged: true },
];

const riskColor: Record<RiskLevel, string> = {
  Safe: "text-safe",
  Moderate: "text-moderate",
  "High Risk": "text-danger",
};

const riskBg: Record<RiskLevel, string> = {
  Safe: "bg-safe/10 border-safe/20",
  Moderate: "bg-moderate/10 border-moderate/20",
  "High Risk": "bg-danger/10 border-danger/20",
};

type FilterType = "all" | "unacknowledged" | "high";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState<FilterType>("all");

  const acknowledge = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)));
  };

  const acknowledgeAll = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, acknowledged: true })));
  };

  const filtered = alerts.filter((a) => {
    if (filter === "unacknowledged") return !a.acknowledged;
    if (filter === "high") return a.riskLevel === "High Risk";
    return true;
  });

  const unackCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <div className="min-h-screen bg-background scanline">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground">Alerts</h1>
            <p className="text-sm text-muted-foreground">
              {unackCount > 0 ? (
                <span><span className="text-danger font-semibold">{unackCount}</span> unacknowledged alerts</span>
              ) : (
                "All alerts acknowledged"
              )}
            </p>
          </div>
          <div className="flex gap-2">
            {(["all", "unacknowledged", "high"] as FilterType[]).map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
                className={`text-xs capitalize ${filter === f ? "bg-primary text-primary-foreground" : ""}`}
              >
                {f === "high" ? "High Risk" : f}
              </Button>
            ))}
            {unackCount > 0 && (
              <Button size="sm" variant="outline" onClick={acknowledgeAll} className="text-xs gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Ack All
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Filter className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>No alerts match the current filter</p>
            </div>
          )}
          {filtered.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-xl border p-4 flex items-start gap-4 transition-all ${
                alert.acknowledged ? "bg-card border-border opacity-60" : riskBg[alert.riskLevel]
              }`}
            >
              <div className={`p-2 rounded-lg ${alert.acknowledged ? "bg-muted" : "bg-card"}`}>
                <AlertTriangle className={`w-5 h-5 ${alert.acknowledged ? "text-muted-foreground" : riskColor[alert.riskLevel]}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-foreground text-sm">{alert.type}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${riskColor[alert.riskLevel]} bg-card`}>
                    {alert.riskLevel}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-foreground font-medium">{alert.driver}</span> — Score: <span className="font-display">{alert.score}</span>
                </p>
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" /> {alert.time}
                </div>
              </div>
              {!alert.acknowledged && (
                <Button size="sm" variant="outline" onClick={() => acknowledge(alert.id)} className="text-xs shrink-0">
                  Acknowledge
                </Button>
              )}
              {alert.acknowledged && (
                <CheckCircle className="w-5 h-5 text-safe shrink-0 mt-1" />
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
