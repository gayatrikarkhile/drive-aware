import { useState, useEffect, useCallback, useRef } from "react";

export type RiskLevel = "Safe" | "Moderate" | "High Risk";

export interface FatigueData {
  fatigue_score: number;
  risk_level: RiskLevel;
  ear: number;
  mar: number;
  head_tilt: number;
  driving_duration_min: number;
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  driver: string;
  date: string;
  duration: string;
  avg_score: number;
  max_risk: RiskLevel;
  alerts: number;
}

const getRiskLevel = (score: number): RiskLevel => {
  if (score < 40) return "Safe";
  if (score < 70) return "Moderate";
  return "High Risk";
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const mockHistory: HistoryEntry[] = [
  { id: "1", driver: "Ahmed K.", date: "2026-02-27", duration: "4h 12m", avg_score: 28, max_risk: "Safe", alerts: 0 },
  { id: "2", driver: "Ahmed K.", date: "2026-02-26", duration: "6h 45m", avg_score: 52, max_risk: "Moderate", alerts: 3 },
  { id: "3", driver: "Ahmed K.", date: "2026-02-25", duration: "8h 03m", avg_score: 74, max_risk: "High Risk", alerts: 7 },
  { id: "4", driver: "Sara M.", date: "2026-02-27", duration: "3h 30m", avg_score: 18, max_risk: "Safe", alerts: 0 },
  { id: "5", driver: "Sara M.", date: "2026-02-26", duration: "5h 55m", avg_score: 61, max_risk: "Moderate", alerts: 2 },
];

export function useFatigueSimulation() {
  const [current, setCurrent] = useState<FatigueData>({
    fatigue_score: 15,
    risk_level: "Safe",
    ear: 0.32,
    mar: 0.25,
    head_tilt: 2,
    driving_duration_min: 0,
    timestamp: Date.now(),
  });
  const [trend, setTrend] = useState<FatigueData[]>([]);
  const [alertActive, setAlertActive] = useState(false);
  const scoreRef = useRef(15);
  const startTime = useRef(Date.now());

  const dismissAlert = useCallback(() => setAlertActive(false), []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate gradual fatigue increase with randomness
      const drift = (Math.random() - 0.35) * 6; // slight upward bias
      scoreRef.current = clamp(scoreRef.current + drift, 0, 100);
      const score = Math.round(scoreRef.current);
      const risk = getRiskLevel(score);
      const durationMin = Math.round((Date.now() - startTime.current) / 60000);

      const data: FatigueData = {
        fatigue_score: score,
        risk_level: risk,
        ear: clamp(0.35 - score * 0.002 + (Math.random() - 0.5) * 0.03, 0.1, 0.4),
        mar: clamp(0.2 + score * 0.004 + (Math.random() - 0.5) * 0.05, 0.1, 0.8),
        head_tilt: clamp(score * 0.3 + (Math.random() - 0.5) * 5, 0, 35),
        driving_duration_min: durationMin,
        timestamp: Date.now(),
      };

      setCurrent(data);
      setTrend((prev) => [...prev.slice(-59), data]);

      if (risk === "High Risk") setAlertActive(true);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return { current, trend, history: mockHistory, alertActive, dismissAlert };
}
