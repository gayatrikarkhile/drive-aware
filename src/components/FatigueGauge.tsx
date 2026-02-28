import { type RiskLevel } from "@/hooks/useFatigueSimulation";

interface Props {
  score: number;
  riskLevel: RiskLevel;
}

const riskConfig = {
  Safe: { color: "text-safe", glow: "glow-safe", ring: "stroke-safe" },
  Moderate: { color: "text-moderate", glow: "glow-moderate", ring: "stroke-moderate" },
  "High Risk": { color: "text-danger", glow: "glow-danger", ring: "stroke-danger" },
};

export default function FatigueGauge({ score, riskLevel }: Props) {
  const config = riskConfig[riskLevel];
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`relative flex flex-col items-center justify-center rounded-2xl bg-card border border-border p-8 ${config.glow}`}>
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-display">Fatigue Score</p>
      <svg width="160" height="160" className="-rotate-90">
        <circle cx="80" cy="80" r="54" fill="none" strokeWidth="8" className="stroke-muted" />
        <circle
          cx="80" cy="80" r="54" fill="none" strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${config.ring} transition-all duration-700 ease-out`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
        <span className={`text-5xl font-bold font-display ${config.color} transition-colors duration-500`}>
          {score}
        </span>
        <span className={`text-sm font-semibold mt-1 ${config.color} transition-colors duration-500`}>
          {riskLevel.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
