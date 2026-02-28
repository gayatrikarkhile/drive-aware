import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Shield, CheckCircle, AlertTriangle, XCircle, TrendingUp, TrendingDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface SafetyRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  threshold: number;
  violations: number;
}

const initialRules: SafetyRule[] = [
  { id: "1", name: "Max Fatigue Score", description: "Alert when fatigue score exceeds threshold", enabled: true, threshold: 70, violations: 12 },
  { id: "2", name: "Max Continuous Driving", description: "Alert after continuous driving duration (minutes)", enabled: true, threshold: 240, violations: 5 },
  { id: "3", name: "Yawn Frequency", description: "Alert when yawn count per 10min exceeds threshold", enabled: true, threshold: 5, violations: 8 },
  { id: "4", name: "Eye Closure Duration", description: "Alert when eyes closed for more than N seconds", enabled: true, threshold: 3, violations: 3 },
  { id: "5", name: "Head Tilt Angle", description: "Alert when head tilt exceeds degrees", enabled: false, threshold: 25, violations: 0 },
];

const complianceMetrics = [
  { label: "Fleet Safety Score", value: 87, trend: "up" as const },
  { label: "Policy Compliance", value: 94, trend: "up" as const },
  { label: "Alert Response Rate", value: 78, trend: "down" as const },
  { label: "Rest Compliance", value: 91, trend: "up" as const },
];

export default function FleetSafetyPage() {
  const [rules, setRules] = useState(initialRules);

  const toggleRule = (id: string) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));
  };

  return (
    <div className="min-h-screen bg-background scanline">
      <Navbar />
      <main className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold font-display text-foreground mb-1">Fleet Safety</h1>
        <p className="text-sm text-muted-foreground mb-6">Safety policies, compliance metrics & rules management</p>

        {/* Compliance overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {complianceMetrics.map((m) => (
            <div key={m.label} className="rounded-xl bg-card border border-border p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-display">{m.label}</p>
              <div className="flex items-end gap-2 mt-2">
                <span className="text-3xl font-bold font-display text-foreground">{m.value}%</span>
                {m.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-safe mb-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-danger mb-1" />
                )}
              </div>
              <Progress value={m.value} className="mt-3 h-1.5" />
            </div>
          ))}
        </div>

        {/* Safety Rules */}
        <div className="rounded-2xl bg-card border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-display">Safety Rules</p>
            <span className="text-xs text-muted-foreground">{rules.filter((r) => r.enabled).length} of {rules.length} active</span>
          </div>
          <div className="flex flex-col gap-3">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className={`rounded-xl border p-4 flex items-center gap-4 transition-all ${
                  rule.enabled ? "border-border bg-card" : "border-border/50 bg-muted/30 opacity-60"
                }`}
              >
                <button
                  onClick={() => toggleRule(rule.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    rule.enabled ? "bg-safe/15 text-safe" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {rule.enabled ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground text-sm">{rule.name}</p>
                    <span className="text-xs font-display text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      Threshold: {rule.threshold}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{rule.description}</p>
                </div>
                {rule.violations > 0 && (
                  <div className="flex items-center gap-1 text-xs text-moderate shrink-0">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span className="font-display">{rule.violations}</span> violations
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
