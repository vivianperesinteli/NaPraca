import { Flame, Target, TrendingUp } from "lucide-react";

interface ProgressSectionProps {
  streak: number;
  weeklyXP: number;
  weeklyGoal: number;
}

export function ProgressSection({ streak = 7, weeklyXP = 450, weeklyGoal = 500 }: ProgressSectionProps) {
  const progressPercent = Math.min((weeklyXP / weeklyGoal) * 100, 100);

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Streak Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-warning/10 border border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Flame size={18} className="text-primary" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">Sequência</span>
        </div>
        <p className="font-display text-3xl font-bold text-foreground">{streak}</p>
        <p className="text-xs text-muted-foreground">dias seguidos</p>
      </div>

      {/* Weekly Progress Card */}
      <div className="p-4 rounded-2xl bg-card border border-border">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
            <Target size={18} className="text-success" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">Meta Semanal</span>
        </div>
        
        {/* Progress Ring */}
        <div className="relative w-16 h-16 mx-auto mb-2">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="6"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="hsl(var(--success))"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${progressPercent * 1.76} 176`}
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <TrendingUp size={18} className="text-success" />
          </div>
        </div>
        
        <p className="text-center text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{weeklyXP}</span>/{weeklyGoal} XP
        </p>
      </div>
    </div>
  );
}
