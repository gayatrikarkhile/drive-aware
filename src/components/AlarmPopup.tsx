import { AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onDismiss: () => void;
  score: number;
}

export default function AlarmPopup({ open, onDismiss, score }: Props) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onDismiss()}>
      <DialogContent className="bg-card border-danger/50 glow-danger max-w-sm text-center">
        <DialogTitle className="sr-only">High Fatigue Alert</DialogTitle>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="p-4 rounded-full bg-danger/20 animate-pulse">
            <AlertTriangle className="w-10 h-10 text-danger" />
          </div>
          <h2 className="text-2xl font-bold font-display text-danger">⚠ HIGH FATIGUE</h2>
          <p className="text-muted-foreground text-sm">
            Driver fatigue score reached <span className="text-danger font-bold font-display">{score}</span>.
            Immediate rest is recommended.
          </p>
          <Button
            onClick={onDismiss}
            className="w-full bg-danger hover:bg-danger/80 text-danger-foreground font-semibold"
          >
            Acknowledge & Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
