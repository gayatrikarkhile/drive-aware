import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Users, Plus, Search, Eye, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type RiskLevel } from "@/hooks/useFatigueSimulation";

interface Driver {
  id: string;
  name: string;
  license: string;
  status: "Active" | "Off Duty" | "Resting";
  currentRisk: RiskLevel;
  totalTrips: number;
  totalHours: number;
  avgScore: number;
  lastActive: string;
}

const mockDrivers: Driver[] = [
  { id: "1", name: "Ahmed K.", license: "DL-29834", status: "Active", currentRisk: "Safe", totalTrips: 142, totalHours: 820, avgScore: 24, lastActive: "Now" },
  { id: "2", name: "Sara M.", license: "DL-18273", status: "Active", currentRisk: "Moderate", totalTrips: 98, totalHours: 540, avgScore: 38, lastActive: "Now" },
  { id: "3", name: "Omar R.", license: "DL-44821", status: "Off Duty", currentRisk: "Safe", totalTrips: 210, totalHours: 1100, avgScore: 19, lastActive: "2h ago" },
  { id: "4", name: "Fatima A.", license: "DL-55190", status: "Resting", currentRisk: "High Risk", totalTrips: 67, totalHours: 350, avgScore: 55, lastActive: "30m ago" },
  { id: "5", name: "Youssef B.", license: "DL-33102", status: "Active", currentRisk: "Safe", totalTrips: 305, totalHours: 1580, avgScore: 15, lastActive: "Now" },
];

const riskBadge: Record<RiskLevel, string> = {
  Safe: "bg-safe/15 text-safe",
  Moderate: "bg-moderate/15 text-moderate",
  "High Risk": "bg-danger/15 text-danger",
};

const statusBadge: Record<string, string> = {
  Active: "bg-safe/15 text-safe",
  "Off Duty": "bg-muted text-muted-foreground",
  Resting: "bg-moderate/15 text-moderate",
};

export default function DriversPage() {
  const [search, setSearch] = useState("");
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const filtered = mockDrivers.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background scanline">
      <Navbar />
      <main className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground">Drivers</h1>
            <p className="text-sm text-muted-foreground">Manage and monitor registered drivers</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search drivers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-card border-border"
              />
            </div>
            <Button className="bg-primary text-primary-foreground gap-2">
              <Plus className="w-4 h-4" /> Add Driver
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((driver) => (
            <div
              key={driver.id}
              onClick={() => setSelectedDriver(selectedDriver?.id === driver.id ? null : driver)}
              className={`rounded-2xl bg-card border p-5 cursor-pointer transition-all hover:border-primary/30 ${
                selectedDriver?.id === driver.id ? "border-primary glow-primary" : "border-border"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary font-display">
                    {driver.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{driver.name}</p>
                    <p className="text-xs text-muted-foreground font-display">{driver.license}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusBadge[driver.status]}`}>
                  {driver.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Risk: </span>
                  <span className={`font-semibold ${riskBadge[driver.currentRisk].split(" ")[1]}`}>{driver.currentRisk}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Avg: <span className="font-display text-foreground">{driver.avgScore}</span></span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-3.5 h-3.5" />
                  <span><span className="font-display text-foreground">{driver.totalTrips}</span> trips</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span><span className="font-display text-foreground">{driver.totalHours}</span>h driven</span>
                </div>
              </div>

              {selectedDriver?.id === driver.id && (
                <div className="mt-4 pt-4 border-t border-border flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-xs">View History</Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs">Start Monitor</Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
