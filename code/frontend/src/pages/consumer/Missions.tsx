import { useState } from "react";
import { Link } from "react-router-dom";
import { Target, Gift, Trophy, ChevronRight, MapPin, Star, Lock, CheckCircle } from "lucide-react";
import { ConsumerNav } from "@/components/layout/ConsumerNav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Mock missions data
const missions = [
  {
    id: "m1",
    title: "Explorador Local",
    description: "Visite 5 negócios diferentes no seu bairro",
    progress: 3,
    total: 5,
    reward: "50 pts + Insígnia Explorador",
    category: "discovery",
    icon: "🗺️",
    badge: { name: "Explorador", tier: "bronze", color: "from-amber-500 to-amber-600" },
    suggestedPlaces: ["Padaria Sabor & Arte", "Café do Bairro", "Mercadinho Popular"],
    benefits: ["Desconto de 10% em parceiros", "Acesso a ofertas exclusivas"],
  },
  {
    id: "m2",
    title: "Avaliador Amigo",
    description: "Deixe 3 avaliações em negócios visitados",
    progress: 1,
    total: 3,
    reward: "30 pts + Selo Crítico",
    category: "engagement",
    icon: "⭐",
    badge: { name: "Crítico", tier: "bronze", color: "from-secondary to-secondary/80" },
    suggestedPlaces: ["Qualquer negócio visitado"],
    benefits: ["Seu perfil ganha destaque", "Prioridade em promoções"],
  },
  {
    id: "m3",
    title: "Comprador Fiel",
    description: "Faça compras em 3 negócios locais",
    progress: 2,
    total: 3,
    reward: "40 pts + Badge Apoiador",
    category: "purchase",
    icon: "🛒",
    badge: { name: "Apoiador", tier: "silver", color: "from-zinc-400 to-zinc-500" },
    suggestedPlaces: ["Padaria Sabor & Arte", "Salão da Maria"],
    benefits: ["Cashback de 5%", "Brindes especiais"],
  },
  {
    id: "m4",
    title: "Embaixador do Bairro",
    description: "Indique 5 amigos para a plataforma",
    progress: 0,
    total: 5,
    reward: "100 pts + Título Embaixador",
    category: "social",
    icon: "🎖️",
    badge: { name: "Embaixador", tier: "gold", color: "from-yellow-400 to-yellow-500" },
    suggestedPlaces: [],
    benefits: ["Status VIP", "Acesso antecipado a novos negócios", "Sorteios exclusivos"],
    locked: true,
  },
];

const badges = [
  { id: "b1", name: "Explorador", icon: "🗺️", unlocked: true, tier: "bronze" },
  { id: "b2", name: "Crítico", icon: "⭐", unlocked: false, tier: "bronze" },
  { id: "b3", name: "Apoiador", icon: "🛒", unlocked: true, tier: "silver" },
  { id: "b4", name: "Embaixador", icon: "🎖️", unlocked: false, tier: "gold" },
  { id: "b5", name: "Vizinho", icon: "🏠", unlocked: true, tier: "bronze" },
  { id: "b6", name: "Patrono", icon: "👑", unlocked: false, tier: "diamond" },
];

const tierColors = {
  bronze: "from-amber-500/20 to-amber-600/20 border-amber-500/50",
  silver: "from-zinc-400/20 to-zinc-500/20 border-zinc-400/50",
  gold: "from-yellow-400/20 to-yellow-500/20 border-yellow-400/50",
  diamond: "from-cyan-400/20 to-cyan-500/20 border-cyan-400/50",
};

export default function ConsumerMissions() {
  const [selectedMission, setSelectedMission] = useState<typeof missions[0] | null>(null);
  const userPoints = 150;
  const completedMissions = 5;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-secondary to-secondary/90 px-4 pt-6 pb-8">
        <h1 className="font-display font-bold text-2xl text-secondary-foreground mb-4">Suas Missões</h1>
        
        {/* Stats */}
        <div className="flex gap-3">
          <div className="flex-1 p-4 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <Star size={24} className="mb-2" />
            <p className="text-2xl font-bold">{userPoints}</p>
            <p className="text-sm opacity-90">Pontos</p>
          </div>
          <div className="flex-1 p-4 rounded-2xl bg-gradient-to-br from-earth to-earth/80 text-earth-foreground">
            <Trophy size={24} className="mb-2" />
            <p className="text-2xl font-bold">{completedMissions}</p>
            <p className="text-sm opacity-90">Concluídas</p>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-foreground">Suas Insígnias</h3>
          <Link to="/consumidor/insignias" className="text-sm text-primary font-medium flex items-center gap-1">
            Ver todas <ChevronRight size={16} />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={cn(
                "flex-shrink-0 w-20 p-3 rounded-2xl border-2 text-center transition-all",
                badge.unlocked 
                  ? `bg-gradient-to-br ${tierColors[badge.tier as keyof typeof tierColors]}`
                  : "bg-muted/50 border-border opacity-50"
              )}
            >
              <div className="text-2xl mb-1">{badge.unlocked ? badge.icon : "🔒"}</div>
              <p className="text-xs font-medium text-foreground truncate">{badge.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Missions List */}
      <div className="px-4">
        <h3 className="font-display font-bold text-foreground mb-3">Desafios Ativos</h3>
        <div className="space-y-3">
          {missions.map((mission) => (
            <button
              key={mission.id}
              onClick={() => setSelectedMission(mission)}
              disabled={mission.locked}
              className={cn(
                "w-full p-4 rounded-2xl border text-left transition-all",
                mission.locked
                  ? "bg-muted/50 border-border opacity-60"
                  : "bg-card border-border hover:border-primary/30"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center text-2xl",
                  mission.locked ? "bg-muted" : `bg-gradient-to-br ${mission.badge.color}/20`
                )}>
                  {mission.locked ? <Lock size={20} className="text-muted-foreground" /> : mission.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-display font-bold text-foreground">{mission.title}</h4>
                    {mission.progress === mission.total && (
                      <CheckCircle size={16} className="text-success" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{mission.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className="font-semibold text-primary">{mission.progress}/{mission.total}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all",
                          `bg-gradient-to-r ${mission.badge.color}`
                        )}
                        style={{ width: `${(mission.progress / mission.total) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Reward Preview */}
                  <div className="flex items-center gap-2">
                    <Gift size={14} className="text-primary" />
                    <span className="text-xs text-primary font-medium">{mission.reward}</span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-muted-foreground flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Mission Detail Modal */}
      {selectedMission && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-end justify-center">
          <div className="bg-background rounded-t-3xl w-full max-h-[85vh] overflow-y-auto animate-slide-up">
            <div className="p-4">
              {/* Handle */}
              <div className="w-12 h-1 bg-border rounded-full mx-auto mb-4" />
              
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl",
                  `bg-gradient-to-br ${selectedMission.badge.color}/20`
                )}>
                  {selectedMission.icon}
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-foreground">{selectedMission.title}</h2>
                  <p className="text-muted-foreground">{selectedMission.description}</p>
                </div>
              </div>

              {/* Progress */}
              <div className="p-4 rounded-2xl bg-muted/50 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-foreground">Progresso</span>
                  <span className="font-bold text-primary">{selectedMission.progress}/{selectedMission.total}</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full", `bg-gradient-to-r ${selectedMission.badge.color}`)}
                    style={{ width: `${(selectedMission.progress / selectedMission.total) * 100}%` }}
                  />
                </div>
              </div>

              {/* Badge to Unlock */}
              <div className="p-4 rounded-2xl border border-border mb-4">
                <h4 className="font-semibold text-foreground mb-2">Insígnia a Desbloquear</h4>
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center text-2xl",
                    `bg-gradient-to-br ${selectedMission.badge.color}/20`
                  )}>
                    {selectedMission.icon}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{selectedMission.badge.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{selectedMission.badge.tier}</p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-4">
                <h4 className="font-semibold text-foreground mb-2">Benefícios</h4>
                <div className="space-y-2">
                  {selectedMission.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 rounded-xl bg-success/10">
                      <CheckCircle size={16} className="text-success" />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested Places */}
              {selectedMission.suggestedPlaces.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-2">Onde completar</h4>
                  <div className="space-y-2">
                    {selectedMission.suggestedPlaces.map((place, index) => (
                      <Link 
                        key={index}
                        to="/negocio/1"
                        className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                      >
                        <MapPin size={16} className="text-primary" />
                        <span className="text-sm text-foreground">{place}</span>
                        <ChevronRight size={16} className="text-muted-foreground ml-auto" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setSelectedMission(null)}
                >
                  Fechar
                </Button>
                <Button className="flex-1">
                  Ver no Mapa
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConsumerNav activeTab="missions" />
    </div>
  );
}
