import { type ReactNode } from "react";

interface Props {
  label: string;
  value: string;
  icon: ReactNode;
  subtitle?: string;
}

export default function MetricCard({ label, value, icon, subtitle }: Props) {
  return (
    <div className="rounded-xl bg-card border border-border p-4 flex items-start gap-3">
      <div className="p-2 rounded-lg bg-secondary text-primary">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-display">{label}</p>
        <p className="text-xl font-bold font-display text-foreground mt-0.5">{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}
