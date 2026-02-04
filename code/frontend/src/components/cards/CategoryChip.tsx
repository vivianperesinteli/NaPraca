import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryChipProps {
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
  color?: string;
}

export function CategoryChip({
  label,
  icon: Icon,
  isActive = false,
  onClick,
  color = "primary",
}: CategoryChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl transition-all duration-200 min-w-[72px]",
        isActive
          ? "bg-primary text-primary-foreground shadow-md"
          : "bg-card border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon size={20} />
      <span className="text-xs font-medium whitespace-nowrap">{label}</span>
    </button>
  );
}
