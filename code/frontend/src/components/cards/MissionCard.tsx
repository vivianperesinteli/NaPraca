import { CheckCircle, Clock, Coins, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MissionCardProps {
  title: string;
  description: string;
  reward: number;
  progress: number;
  maxProgress: number;
  category: "marketing" | "financas" | "vendas" | "gestao";
  isCompleted?: boolean;
  onClick?: () => void;
}

const categoryColors = {
  marketing: "bg-pink-100 text-pink-700 border-pink-200",
  financas: "bg-emerald-100 text-emerald-700 border-emerald-200",
  vendas: "bg-blue-100 text-blue-700 border-blue-200",
  gestao: "bg-purple-100 text-purple-700 border-purple-200",
};

const categoryLabels = {
  marketing: "Marketing",
  financas: "Finanças",
  vendas: "Vendas",
  gestao: "Gestão",
};

export function MissionCard({
  title,
  description,
  reward,
  progress,
  maxProgress,
  category,
  isCompleted = false,
  onClick,
}: MissionCardProps) {
  const progressPercent = Math.min((progress / maxProgress) * 100, 100);

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-2xl bg-card border border-border shadow-sm transition-all duration-200",
        "hover:shadow-md hover:border-primary/20 active:scale-[0.99]",
        isCompleted && "opacity-75 bg-success/5 border-success/20"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Status Icon */}
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
            isCompleted ? "bg-success/20" : "bg-primary/10"
          )}
        >
          {isCompleted ? (
            <CheckCircle size={20} className="text-success" />
          ) : (
            <Clock size={20} className="text-primary" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full border",
                categoryColors[category]
              )}
            >
              {categoryLabels[category]}
            </span>
          </div>

          <h3 className="font-display font-bold text-foreground mb-1 truncate">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {description}
          </p>

          {/* Progress Bar */}
          {!isCompleted && (
            <div className="mb-2">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full gradient-primary rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {progress}/{maxProgress} concluído
              </p>
            </div>
          )}

          {/* Reward */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-warning">
              <Coins size={14} />
              <span className="text-sm font-semibold">+{reward}</span>
            </div>
            <ChevronRight size={18} className="text-muted-foreground" />
          </div>
        </div>
      </div>
    </button>
  );
}
