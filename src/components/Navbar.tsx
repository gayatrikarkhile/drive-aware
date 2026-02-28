import { Brain, LayoutDashboard, Users, Bell, BarChart3, Settings, Shield } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Drivers", icon: Users, path: "/drivers" },
  { label: "Alerts", icon: Bell, path: "/alerts", badge: 3 },
  { label: "Analytics", icon: BarChart3, path: "/analytics" },
  { label: "Fleet Safety", icon: Shield, path: "/fleet-safety" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div className="leading-tight">
            <h1 className="text-sm font-bold text-gradient-primary font-display">DriveSafe AI</h1>
            <p className="text-[10px] text-muted-foreground">Fatigue Detection</p>
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{item.label}</span>
                  {item.badge && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-danger text-danger-foreground text-[10px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-safe animate-pulse" />
            <span className="text-xs text-muted-foreground font-display">LIVE</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-border">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary font-display">
              AK
            </div>
            <span className="text-xs text-muted-foreground hidden lg:inline">Ahmed K.</span>
          </div>
        </div>
      </div>

      <div className="md:hidden flex items-center gap-1 px-4 pb-2 overflow-x-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="w-3.5 h-3.5" />
              {item.label}
              {item.badge && (
                <span className="w-4 h-4 rounded-full bg-danger text-danger-foreground text-[10px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
