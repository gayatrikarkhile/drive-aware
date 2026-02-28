import { Eye, Activity, Timer, Brain } from "lucide-react";
import { useFatigueSimulation } from "@/hooks/useFatigueSimulation";
import FatigueGauge from "@/components/FatigueGauge";
import MetricCard from "@/components/MetricCard";
import TrendChart from "@/components/TrendChart";
import DrivingHistory from "@/components/DrivingHistory";
import AlarmPopup from "@/components/AlarmPopup";
import Navbar from "@/components/Navbar";

const Index = () => {
  const { current, trend, history, alertActive, dismissAlert } = useFatigueSimulation();

  return (
    <div className="min-h-screen bg-background scanline">
      <Navbar />

      {/* Main grid */}
      <main className="max-w-7xl mx-auto p-6 grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          <FatigueGauge score={current.fatigue_score} riskLevel={current.risk_level} />

          <MetricCard
            label="Eye Aspect Ratio"
            value={current.ear.toFixed(2)}
            icon={<Eye className="w-4 h-4" />}
            subtitle={current.ear < 0.2 ? "Eyes closing" : "Normal"}
          />
          <MetricCard
            label="Mouth Ratio"
            value={current.mar.toFixed(2)}
            icon={<Activity className="w-4 h-4" />}
            subtitle={current.mar > 0.5 ? "Yawning" : "Normal"}
          />
          <MetricCard
            label="Head Tilt"
            value={`${current.head_tilt.toFixed(1)}°`}
            icon={<Brain className="w-4 h-4" />}
            subtitle={current.head_tilt > 20 ? "Nodding" : "Upright"}
          />
          <MetricCard
            label="Driving Time"
            value={`${current.driving_duration_min}m`}
            icon={<Timer className="w-4 h-4" />}
          />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <TrendChart data={trend} />
          <DrivingHistory history={history} />
        </div>
      </main>

      <AlarmPopup open={alertActive} onDismiss={dismissAlert} score={current.fatigue_score} />
    </div>
  );
};

export default Index;
