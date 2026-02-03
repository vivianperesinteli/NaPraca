import { Plus, QrCode, Megaphone, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  {
    id: "add-product",
    label: "Produto",
    icon: Plus,
    color: "bg-primary/10 text-primary",
  },
  {
    id: "qr-code",
    label: "QR Code",
    icon: QrCode,
    color: "bg-secondary/10 text-secondary",
  },
  {
    id: "promote",
    label: "Promover",
    icon: Megaphone,
    color: "bg-success/10 text-success",
  },
  {
    id: "analytics",
    label: "Relatórios",
    icon: BarChart3,
    color: "bg-accent/10 text-accent",
  },
];

interface QuickActionsProps {
  onActionClick?: (actionId: string) => void;
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.id}
            onClick={() => onActionClick?.(action.id)}
            className="flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-sm transition-all duration-200 min-w-[80px]"
          >
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", action.color)}>
              <Icon size={20} />
            </div>
            <span className="text-xs font-medium text-foreground">{action.label}</span>
          </button>
        );
      })}
    </div>
  );
}
