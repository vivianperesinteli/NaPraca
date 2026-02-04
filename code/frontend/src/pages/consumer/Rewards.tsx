import { ArrowLeft, Lock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const rewards = [
  { id: "1", title: "Café Grátis", business: "Café do Bairro", cost: 50, image: "☕", unlocked: true },
  { id: "2", title: "10% de Desconto", business: "Padaria Sabor & Arte", cost: 30, image: "🥐", unlocked: true },
  { id: "3", title: "Corte Grátis", business: "Salão da Maria", cost: 100, image: "💇", unlocked: false },
  { id: "4", title: "Cesta de Frutas", business: "Mercadinho Popular", cost: 80, image: "🍎", unlocked: false },
];

export default function ConsumerRewards() {
  const { profile } = useAuth();
  const userPoints = profile?.points ?? 0;

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-4">
          <Link to="/consumidor/perfil" className="text-secondary hover:text-secondary/80 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="font-display font-bold text-xl text-foreground">Recompensas</h1>
        </div>
      </div>

      {/* Points Balance */}
      <div className="px-4 py-4">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground text-center">
          <Star size={32} className="mx-auto mb-2" />
          <p className="text-4xl font-bold">{userPoints}</p>
          <p className="text-sm opacity-90">Pontos Disponíveis</p>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="px-4">
        <h3 className="font-display font-bold text-foreground mb-4">Recompensas Disponíveis</h3>
        <div className="grid grid-cols-2 gap-3">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={cn(
                "p-4 rounded-2xl border transition-all",
                reward.unlocked
                  ? "bg-card border-border"
                  : "bg-muted/50 border-border opacity-60"
              )}
            >
              {/* Image/Icon */}
              <div className={cn(
                "w-full aspect-square rounded-xl mb-3 flex items-center justify-center text-4xl",
                reward.unlocked ? "bg-muted" : "bg-muted/50"
              )}>
                {reward.unlocked ? reward.image : <Lock size={24} className="text-muted-foreground" />}
              </div>

              <h4 className="font-semibold text-foreground text-sm">{reward.title}</h4>
              <p className="text-xs text-muted-foreground mb-2">{reward.business}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-primary">{reward.cost} pts</span>
                {reward.unlocked ? (
                  <Button size="sm" className="h-8 px-3 text-xs">
                    RESGATAR
                  </Button>
                ) : (
                  <span className="text-xs text-muted-foreground">Bloqueado</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
