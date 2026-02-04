import { Link, useNavigate } from "react-router-dom";
import { Settings, Heart, Clock, Gift, ChevronRight, Star, Target, TrendingUp, Store, Award, MapPin, LogOut } from "lucide-react";
import { ConsumerNav } from "@/components/layout/ConsumerNav";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const menuItems = [
  { id: "favorites", label: "Meus Favoritos", icon: Heart, href: "#", count: 8 },
  { id: "history", label: "Histórico de Visitas", icon: Clock, href: "#", count: 23 },
  { id: "rewards", label: "Recompensas", icon: Gift, href: "/consumidor/recompensas" },
  { id: "settings", label: "Configurações", icon: Settings, href: "/configuracoes" },
];

const supportedBusinesses = [
  { id: "1", name: "Padaria Sabor & Arte", visits: 12, spent: "R$ 156,00", avatar: "🥖" },
  { id: "2", name: "Café do Bairro", visits: 8, spent: "R$ 89,50", avatar: "☕" },
  { id: "3", name: "Mercadinho Popular", visits: 5, spent: "R$ 234,00", avatar: "🛒" },
];

const recentActivity = [
  { id: "a1", action: "Visitou", business: "Padaria Sabor & Arte", time: "Hoje", points: "+10" },
  { id: "a2", action: "Avaliou", business: "Café do Bairro", time: "Ontem", points: "+15" },
  { id: "a3", action: "Comprou em", business: "Mercadinho Popular", time: "3 dias atrás", points: "+25" },
];

export default function ConsumerProfile() {
  const navigate = useNavigate();
  const { profile, signOut, displayFullName } = useAuth();

  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  const userStats = {
    points: profile?.points ?? 0,
    missions: 8,
    impact: 320,
    level: profile?.level ?? "Iniciante",
    neighborhood: profile?.neighborhood ?? "Seu Bairro",
    businessesSupported: 12,
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-secondary to-secondary/80 px-4 py-8 text-secondary-foreground">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-primary-foreground/20 flex items-center justify-center text-4xl">
              👤
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Settings size={14} className="text-primary-foreground" />
            </button>
          </div>
          <h1 className="font-display font-bold text-xl">{displayFullName}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Award size={14} className="text-primary" />
            <span className="text-sm opacity-90">{userStats.level}</span>
          </div>
          <div className="flex items-center gap-1 mt-1 opacity-80">
            <MapPin size={12} />
            <span className="text-xs">{userStats.neighborhood}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 -mt-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-center">
            <Star size={20} className="mx-auto mb-1" />
            <p className="text-xl font-bold">{userStats.points}</p>
            <p className="text-xs opacity-90">Pontos</p>
          </div>
          <div className="p-4 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground text-center">
            <Target size={20} className="mx-auto mb-1" />
            <p className="text-xl font-bold">{userStats.missions}</p>
            <p className="text-xs opacity-90">Missões</p>
          </div>
          <div className="p-4 rounded-2xl bg-gradient-to-br from-earth to-earth/80 text-earth-foreground text-center">
            <TrendingUp size={20} className="mx-auto mb-1" />
            <p className="text-xl font-bold">R${userStats.impact}</p>
            <p className="text-xs opacity-90">Impacto</p>
          </div>
        </div>
      </div>

      {/* Businesses Supported */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-foreground">Negócios Apoiados</h3>
          <span className="text-sm text-primary font-medium">{userStats.businessesSupported} total</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {supportedBusinesses.map((business) => (
            <Link
              key={business.id}
              to={`/negocio/${business.id}`}
              className="flex-shrink-0 w-36 p-3 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl mb-2">
                {business.avatar}
              </div>
              <h4 className="font-semibold text-foreground text-sm truncate">{business.name}</h4>
              <p className="text-xs text-muted-foreground">{business.visits} visitas</p>
              <p className="text-xs text-primary font-medium">{business.spent}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-4 mt-6">
        <h3 className="font-display font-bold text-foreground mb-3">Atividade Recente</h3>
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {recentActivity.map((activity, index) => (
            <div 
              key={activity.id}
              className={cn(
                "flex items-center gap-3 p-4",
                index !== recentActivity.length - 1 && "border-b border-border"
              )}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Store size={18} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.action}</span> {activity.business}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <span className="text-sm font-semibold text-success">{activity.points}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 mt-6">
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.href}
                className={`flex items-center gap-4 p-4 hover:bg-muted transition-colors ${
                  index !== menuItems.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Icon size={20} className="text-secondary" />
                </div>
                <span className="flex-1 font-medium text-foreground">{item.label}</span>
                {item.count && (
                  <span className="text-sm text-muted-foreground">{item.count}</span>
                )}
                <ChevronRight size={20} className="text-muted-foreground" />
              </Link>
            );
          })}
        </div>

        {/* Sair */}
        <Button
          variant="outline"
          className="w-full mt-4 h-12 rounded-xl border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          onClick={handleLogout}
        >
          <LogOut size={18} className="mr-2" />
          Sair
        </Button>
      </div>

      <ConsumerNav activeTab="profile" />
    </div>
  );
}
