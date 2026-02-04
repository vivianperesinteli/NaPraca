import { Bell, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  userName?: string;
  coins?: number;
  level?: number;
}

export function Header({ userName = "Empreendedor", coins = 150, level = 3 }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md">
            <span className="text-primary-foreground font-display font-bold text-lg">N</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display font-bold text-lg text-foreground leading-tight">Napraça</h1>
            <p className="text-xs text-muted-foreground">Olá, {userName}!</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          {/* Level Badge */}
          <div className="flex items-center gap-1.5 bg-secondary/10 px-3 py-1.5 rounded-full">
            <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-xs font-bold text-secondary-foreground">{level}</span>
            </div>
            <span className="text-xs font-medium text-secondary">Nível</span>
          </div>

          {/* Coins */}
          <div className="flex items-center gap-1.5 bg-warning/10 px-3 py-1.5 rounded-full">
            <Coins size={16} className="text-warning" />
            <span className="text-sm font-semibold text-warning">{coins}</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-xl hover:bg-muted transition-colors">
            <Bell size={20} className="text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
