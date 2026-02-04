import { MapPin, Navigation, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapPreviewProps {
  onExpand?: () => void;
}

export function MapPreview({ onExpand }: MapPreviewProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-secondary/5 border border-border">
      {/* Map Background */}
      <div className="aspect-video bg-gradient-to-br from-secondary/10 via-accent/10 to-primary/10 relative">
        {/* Simulated Map Grid */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-secondary" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Sample Markers */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Central User Location */}
            <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
              <div className="w-4 h-4 bg-primary rounded-full shadow-glow animate-pulse-glow" />
              <div className="absolute inset-0 w-4 h-4 bg-primary/30 rounded-full animate-ping" />
            </div>

            {/* Nearby Business Markers */}
            <BusinessMarker className="-top-12 left-8" color="bg-success" />
            <BusinessMarker className="top-4 -left-16" color="bg-accent" />
            <BusinessMarker className="-top-8 -left-8" color="bg-warning" />
            <BusinessMarker className="top-8 left-12" color="bg-primary" />
            <BusinessMarker className="-top-4 left-20" color="bg-secondary" />
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      </div>

      {/* Controls */}
      <div className="absolute top-3 right-3 flex flex-col gap-2">
        <button className="w-8 h-8 bg-card/90 backdrop-blur-sm rounded-lg shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <ZoomIn size={16} />
        </button>
        <button className="w-8 h-8 bg-card/90 backdrop-blur-sm rounded-lg shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <Navigation size={16} />
        </button>
      </div>

      {/* Bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between">
        <div className="text-sm">
          <p className="font-display font-bold text-foreground">12 negócios</p>
          <p className="text-xs text-muted-foreground">próximos a você</p>
        </div>
        <Button size="sm" onClick={onExpand}>
          Ver mapa
        </Button>
      </div>
    </div>
  );
}

function BusinessMarker({ className, color }: { className: string; color: string }) {
  return (
    <div className={cn("absolute", className)}>
      <div className={cn("w-8 h-8 rounded-xl shadow-md flex items-center justify-center", color)}>
        <MapPin size={14} className="text-white" />
      </div>
    </div>
  );
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
