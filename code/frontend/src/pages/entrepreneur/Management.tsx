import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, Users, Eye, Star, Target, CheckCircle, Lock, ChevronRight, BarChart3, Calendar, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const businessMetrics = {
  profileViews: 127,
  profileViewsTrend: "+12%",
  followers: 45,
  followersTrend: "+8",
  rating: 4.8,
  reviews: 23,
  completionLevel: 65,
};

const structureAreas = [
  { id: "s1", name: "Informações Básicas", completion: 100, icon: "📋", locked: false },
  { id: "s2", name: "Fotos do Negócio", completion: 80, icon: "📸", locked: false },
  { id: "s3", name: "Catálogo de Produtos", completion: 60, icon: "🛍️", locked: false },
  { id: "s4", name: "Horários e Contato", completion: 100, icon: "🕐", locked: false },
  { id: "s5", name: "Descrição Completa", completion: 40, icon: "📝", locked: false },
  { id: "s6", name: "Redes Sociais", completion: 0, icon: "📱", locked: true },
  { id: "s7", name: "Delivery/Entrega", completion: 0, icon: "🚚", locked: true },
  { id: "s8", name: "Pagamentos", completion: 0, icon: "💳", locked: true },
];

const recentActivity = [
  { id: "a1", event: "Novo seguidor", detail: "Ana Silva começou a seguir você", time: "2h atrás", type: "follower" },
  { id: "a2", event: "Nova avaliação", detail: "5 estrelas - 'Ótimo atendimento!'", time: "5h atrás", type: "review" },
  { id: "a3", event: "Missão concluída", detail: "+25 pts por atualizar fotos", time: "1d atrás", type: "mission" },
];

const weeklyInsights = [
  { label: "Seg", value: 12 },
  { label: "Ter", value: 18 },
  { label: "Qua", value: 25 },
  { label: "Qui", value: 20 },
  { label: "Sex", value: 35 },
  { label: "Sab", value: 42 },
  { label: "Dom", value: 28 },
];

export default function EntrepreneurManagement() {
  const maxValue = Math.max(...weeklyInsights.map(d => d.value));

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-secondary to-secondary/90 px-4 pt-6 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/empreendedor" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="font-display font-bold text-xl text-secondary-foreground">Gestão do Negócio</h1>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-2xl bg-secondary-foreground/10">
            <Eye size={18} className="text-secondary-foreground/80 mb-1" />
            <p className="text-xl font-bold text-secondary-foreground">{businessMetrics.profileViews}</p>
            <p className="text-xs text-secondary-foreground/70">Visualizações</p>
            <span className="text-xs text-success font-medium">{businessMetrics.profileViewsTrend}</span>
          </div>
          <div className="p-3 rounded-2xl bg-secondary-foreground/10">
            <Users size={18} className="text-secondary-foreground/80 mb-1" />
            <p className="text-xl font-bold text-secondary-foreground">{businessMetrics.followers}</p>
            <p className="text-xs text-secondary-foreground/70">Seguidores</p>
            <span className="text-xs text-success font-medium">+{businessMetrics.followersTrend}</span>
          </div>
          <div className="p-3 rounded-2xl bg-secondary-foreground/10">
            <Star size={18} className="text-secondary-foreground/80 mb-1" />
            <p className="text-xl font-bold text-secondary-foreground">{businessMetrics.rating}</p>
            <p className="text-xs text-secondary-foreground/70">Avaliação</p>
            <span className="text-xs text-secondary-foreground/60">{businessMetrics.reviews} reviews</span>
          </div>
        </div>
      </div>

      {/* Business Completion */}
      <div className="px-4 py-4">
        <div className="p-4 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-bold text-foreground">Estruturação do Negócio</h3>
            <span className="text-2xl font-bold text-primary">{businessMetrics.completionLevel}%</span>
          </div>
          
          <div className="h-3 bg-muted rounded-full overflow-hidden mb-4">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
              style={{ width: `${businessMetrics.completionLevel}%` }}
            />
          </div>

          <div className="space-y-2">
            {structureAreas.map((area) => (
              <Link
                key={area.id}
                to={area.locked ? "#" : "/empreendedor/negocio"}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-colors",
                  area.locked 
                    ? "bg-muted/50 opacity-60" 
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                <div className="text-xl">{area.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground text-sm">{area.name}</span>
                    {area.locked && <Lock size={12} className="text-muted-foreground" />}
                  </div>
                  <div className="h-1.5 bg-border rounded-full mt-1 overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full",
                        area.completion === 100 ? "bg-success" : "bg-primary"
                      )}
                      style={{ width: `${area.completion}%` }}
                    />
                  </div>
                </div>
                {area.completion === 100 ? (
                  <CheckCircle size={16} className="text-success" />
                ) : !area.locked ? (
                  <ChevronRight size={16} className="text-muted-foreground" />
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="px-4 mb-4">
        <div className="p-4 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-primary" />
              <h3 className="font-display font-bold text-foreground">Visualizações da Semana</h3>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar size={14} />
              <span>Últimos 7 dias</span>
            </div>
          </div>

          <div className="flex items-end justify-between h-24 gap-2">
            {weeklyInsights.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-1">
                <div 
                  className="w-full bg-gradient-to-t from-primary to-primary/60 rounded-t"
                  style={{ height: `${(day.value / maxValue) * 100}%` }}
                />
                <span className="text-xs text-muted-foreground">{day.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-4">
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
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                activity.type === "follower" && "bg-secondary/10",
                activity.type === "review" && "bg-warning/10",
                activity.type === "mission" && "bg-primary/10"
              )}>
                {activity.type === "follower" && <Users size={18} className="text-secondary" />}
                {activity.type === "review" && <Star size={18} className="text-warning" />}
                {activity.type === "mission" && <Zap size={18} className="text-primary" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm">{activity.event}</p>
                <p className="text-xs text-muted-foreground truncate">{activity.detail}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-6">
        <div className="grid grid-cols-2 gap-3">
          <Link 
            to="/empreendedor/analytics"
            className="p-4 rounded-2xl bg-primary/10 border border-primary/20 hover:border-primary/40 transition-colors"
          >
            <TrendingUp size={24} className="text-primary mb-2" />
            <h4 className="font-semibold text-foreground">Analytics</h4>
            <p className="text-xs text-muted-foreground">Ver estatísticas detalhadas</p>
          </Link>
          <Link 
            to="/empreendedor/negocio"
            className="p-4 rounded-2xl bg-secondary/10 border border-secondary/20 hover:border-secondary/40 transition-colors"
          >
            <Target size={24} className="text-secondary mb-2" />
            <h4 className="font-semibold text-foreground">Editar Negócio</h4>
            <p className="text-xs text-muted-foreground">Atualizar informações</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
