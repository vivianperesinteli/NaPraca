import { Link, useLocation } from "react-router-dom";
import { Home, Map, Target, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "home", label: "Início", icon: Home, href: "/consumidor" },
  { id: "map", label: "Mapa", icon: Map, href: "/consumidor/mapa" },
  { id: "missions", label: "Missões", icon: Target, href: "/consumidor/missoes" },
  { id: "profile", label: "Perfil", icon: User, href: "/consumidor/perfil" },
];

interface ConsumerNavProps {
  activeTab?: string;
}

export function ConsumerNav({ activeTab }: ConsumerNavProps) {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg">
      <div className="flex items-center justify-around px-4 py-3 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id || location.pathname === item.href;
          
          return (
            <Link
              key={item.id}
              to={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon 
                size={24} 
                className={cn(
                  "transition-transform duration-200",
                  isActive && "scale-110"
                )} 
              />
              <span className={cn(
                "text-xs font-medium",
                isActive && "font-semibold"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
