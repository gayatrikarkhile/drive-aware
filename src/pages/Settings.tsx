import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    moderateThreshold: 40,
    highThreshold: 70,
    audioAlarm: true,
    popupAlarm: true,
    autoBreakReminder: true,
    breakIntervalMin: 120,
    apiEndpoint: "http://localhost:5000/api/detect",
    refreshRate: 2,
    driverName: "Ahmed K.",
    vehicleId: "TRK-2847",
  });

  const update = <K extends keyof typeof settings>(key: K, value: typeof settings[K]) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const save = () => toast.success("Settings saved successfully");

  return (
    <div className="min-h-screen bg-background scanline">
      <Navbar />
      <main className="max-w-3xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground">Configure detection thresholds and system preferences</p>
          </div>
          <Button onClick={save} className="bg-primary text-primary-foreground gap-2">
            <Save className="w-4 h-4" /> Save
          </Button>
        </div>

        <div className="flex flex-col gap-6">
          {/* Driver & Vehicle */}
          <section className="rounded-2xl bg-card border border-border p-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-display">Driver & Vehicle</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground">Driver Name</Label>
                <Input value={settings.driverName} onChange={(e) => update("driverName", e.target.value)} className="mt-1 bg-secondary border-border" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Vehicle ID</Label>
                <Input value={settings.vehicleId} onChange={(e) => update("vehicleId", e.target.value)} className="mt-1 bg-secondary border-border" />
              </div>
            </div>
          </section>

          {/* Thresholds */}
          <section className="rounded-2xl bg-card border border-border p-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-display">Fatigue Thresholds</p>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Moderate Risk Threshold</span>
                  <span className="font-display text-moderate font-bold">{settings.moderateThreshold}</span>
                </div>
                <Slider
                  value={[settings.moderateThreshold]}
                  onValueChange={([v]) => update("moderateThreshold", v)}
                  min={10} max={60} step={5}
                  className="[&_[role=slider]]:bg-moderate"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">High Risk Threshold</span>
                  <span className="font-display text-danger font-bold">{settings.highThreshold}</span>
                </div>
                <Slider
                  value={[settings.highThreshold]}
                  onValueChange={([v]) => update("highThreshold", v)}
                  min={50} max={95} step={5}
                  className="[&_[role=slider]]:bg-danger"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Break Reminder Interval</span>
                  <span className="font-display text-foreground font-bold">{settings.breakIntervalMin} min</span>
                </div>
                <Slider
                  value={[settings.breakIntervalMin]}
                  onValueChange={([v]) => update("breakIntervalMin", v)}
                  min={30} max={300} step={15}
                />
              </div>
            </div>
          </section>

          {/* Alerts */}
          <section className="rounded-2xl bg-card border border-border p-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-display">Alert Preferences</p>
            <div className="space-y-4">
              {[
                { key: "audioAlarm" as const, label: "Audio Alarm", desc: "Play alarm sound on high fatigue" },
                { key: "popupAlarm" as const, label: "Popup Alert", desc: "Show fullscreen alert popup" },
                { key: "autoBreakReminder" as const, label: "Auto Break Reminder", desc: "Remind driver to take breaks" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={settings[item.key] as boolean}
                    onCheckedChange={(v) => update(item.key, v)}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* API Config */}
          <section className="rounded-2xl bg-card border border-border p-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-display">API Configuration</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground">Python AI Endpoint</Label>
                <Input value={settings.apiEndpoint} onChange={(e) => update("apiEndpoint", e.target.value)} className="mt-1 bg-secondary border-border font-display text-xs" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Refresh Rate (seconds)</Label>
                <Input type="number" value={settings.refreshRate} onChange={(e) => update("refreshRate", Number(e.target.value))} className="mt-1 bg-secondary border-border font-display" />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
