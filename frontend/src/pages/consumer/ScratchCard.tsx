import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, MapPin, Lock, CheckCircle, Gift, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock neighborhood businesses for scratch card
const neighborhoodBusinesses = [
  { id: "1", name: "Padaria Sabor & Arte", category: "Padaria", discovered: true, avatar: "🥖" },
  { id: "2", name: "Café do Bairro", category: "Cafeteria", discovered: true, avatar: "☕" },
  { id: "3", name: "Salão da Maria", category: "Beleza", discovered: true, avatar: "💇" },
  { id: "4", name: "Mercadinho Popular", category: "Mercado", discovered: false, scratched: false, avatar: "🛒" },
  { id: "5", name: "Pet Shop Amigo", category: "Pet", discovered: false, scratched: false, avatar: "🐕" },
  { id: "6", name: "Farmácia Vida", category: "Saúde", discovered: false, scratched: false, avatar: "💊" },
  { id: "7", name: "Barbearia Estilo", category: "Beleza", discovered: false, scratched: true, avatar: "✂️" },
  { id: "8", name: "Lanchonete do Zé", category: "Comida", discovered: false, scratched: false, avatar: "🍔" },
  { id: "9", name: "Floricultura Rosa", category: "Varejo", discovered: false, scratched: false, avatar: "🌸" },
  { id: "10", name: "Oficina do Carlos", category: "Serviços", discovered: false, scratched: false, avatar: "🔧" },
  { id: "11", name: "Papelaria Central", category: "Varejo", discovered: false, scratched: false, avatar: "📚" },
  { id: "12", name: "Açougue Bom Corte", category: "Mercado", discovered: false, scratched: false, avatar: "🥩" },
];

const rewards = [
  { id: "r1", title: "Desconto de 15%", description: "Em qualquer negócio parceiro", threshold: 5, icon: "🎫" },
  { id: "r2", title: "Frete Grátis", description: "Na primeira entrega local", threshold: 10, icon: "🚚" },
  { id: "r3", title: "Brinde Exclusivo", description: "Produto surpresa do bairro", threshold: 15, icon: "🎁" },
  { id: "r4", title: "Status VIP", description: "Acesso antecipado a promoções", threshold: 20, icon: "👑" },
];

export default function ConsumerScratchCard() {
  const [scratchedCards, setScratchedCards] = useState<string[]>(["7"]);
  const discoveredCount = neighborhoodBusinesses.filter(b => b.discovered).length;
  const totalCount = neighborhoodBusinesses.length;
  const neighborhood = "Vila Madalena";

  const handleScratch = (id: string) => {
    if (!scratchedCards.includes(id)) {
      setScratchedCards([...scratchedCards, id]);
    }
  };

  const getRewardProgress = (threshold: number) => {
    return Math.min((discoveredCount / threshold) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-accent px-4 py-6">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/consumidor" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="font-display font-bold text-xl text-primary-foreground">Raspadinha do Bairro</h1>
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <MapPin size={18} className="text-primary-foreground/80" />
          <span className="text-primary-foreground">{neighborhood}</span>
        </div>

        {/* Progress Card */}
        <div className="p-4 rounded-2xl bg-primary-foreground/20 backdrop-blur">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
              <Sparkles size={32} className="text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-primary-foreground/80 text-sm">Negócios descobertos</p>
              <p className="text-3xl font-bold text-primary-foreground">{discoveredCount}/{totalCount}</p>
              <div className="h-2 bg-primary-foreground/20 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-primary-foreground rounded-full transition-all"
                  style={{ width: `${(discoveredCount / totalCount) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards to Unlock */}
      <div className="px-4 py-4">
        <h3 className="font-display font-bold text-foreground mb-3">Recompensas por Descobertas</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {rewards.map((reward) => {
            const isUnlocked = discoveredCount >= reward.threshold;
            const progress = getRewardProgress(reward.threshold);
            
            return (
              <div
                key={reward.id}
                className={cn(
                  "flex-shrink-0 w-40 p-4 rounded-2xl border-2 transition-all",
                  isUnlocked 
                    ? "bg-success/10 border-success" 
                    : "bg-card border-border"
                )}
              >
                <div className="text-2xl mb-2">{reward.icon}</div>
                <h4 className="font-semibold text-foreground text-sm">{reward.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{reward.description}</p>
                
                {isUnlocked ? (
                  <div className="flex items-center gap-1 text-success">
                    <CheckCircle size={14} />
                    <span className="text-xs font-medium">Desbloqueado!</span>
                  </div>
                ) : (
                  <div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-1">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {discoveredCount}/{reward.threshold} descobertas
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Scratch Card Grid */}
      <div className="px-4">
        <h3 className="font-display font-bold text-foreground mb-3">Negócios do Bairro</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Visite os negócios para "raspar" e descobrir! Quanto mais você explora, mais recompensas desbloqueia.
        </p>
        
        <div className="grid grid-cols-3 gap-3">
          {neighborhoodBusinesses.map((business) => {
            const isScratched = scratchedCards.includes(business.id) || business.scratched;
            const isDiscovered = business.discovered;
            
            return (
              <button
                key={business.id}
                onClick={() => !isDiscovered && handleScratch(business.id)}
                disabled={isDiscovered}
                className={cn(
                  "aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-2 transition-all",
                  isDiscovered 
                    ? "bg-success/10 border-success"
                    : isScratched
                      ? "bg-card border-primary/50 hover:border-primary"
                      : "bg-gradient-to-br from-muted to-muted/50 border-border hover:border-primary/30"
                )}
              >
                {isDiscovered ? (
                  <>
                    <div className="text-2xl mb-1">{business.avatar}</div>
                    <p className="text-xs font-medium text-foreground text-center line-clamp-2">{business.name}</p>
                    <CheckCircle size={12} className="text-success mt-1" />
                  </>
                ) : isScratched ? (
                  <>
                    <div className="text-2xl mb-1">{business.avatar}</div>
                    <p className="text-xs font-medium text-foreground text-center line-clamp-2">{business.name}</p>
                    <p className="text-[10px] text-primary mt-1">Visite para descobrir!</p>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-xl bg-muted-foreground/20 flex items-center justify-center mb-1">
                      <Sparkles size={20} className="text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">Toque para raspar</p>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-4 mt-6">
        <Link to="/consumidor">
          <Button className="w-full h-12 rounded-xl">
            <MapPin size={18} className="mr-2" />
            Ver no Mapa
          </Button>
        </Link>
      </div>
    </div>
  );
}
