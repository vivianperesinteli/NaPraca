import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, ChevronRight, Lightbulb, TrendingUp, PenSquare, BarChart3, Users, Sparkles, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EntrepreneurNav } from "@/components/layout/EntrepreneurNav";
import { useAuth } from "@/contexts/AuthContext";
import {
  getBusinessesByEntrepreneur,
  getMissionsByEntrepreneur,
  getNextIncompleteMission,
  getViewsTodayForEntrepreneur,
  getEventCountsForEntrepreneur,
} from "@/services/api";
import type { Mission } from "@backend/domain/entities/Mission";
import type { BusinessModel } from "@backend/data/models/BusinessModel";

export default function EntrepreneurDashboard() {
  const { profile, displayFirstName } = useAuth();
  const [businesses, setBusinesses] = useState<BusinessModel[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [nextMission, setNextMission] = useState<Mission | null>(null);
  const [viewsToday, setViewsToday] = useState(0);
  const [eventCounts, setEventCounts] = useState({ views: 0, clicks: 0, favorites: 0 });

  const entrepreneurId = profile?.profile_type === "entrepreneur" ? profile?.id : null;

  useEffect(() => {
    if (!entrepreneurId) return;
    getBusinessesByEntrepreneur(entrepreneurId).then(setBusinesses);
    getMissionsByEntrepreneur(entrepreneurId).then(setMissions);
    getNextIncompleteMission(entrepreneurId).then(setNextMission);
  }, [entrepreneurId]);

  useEffect(() => {
    if (businesses.length === 0) return;
    const ids = businesses.map((b) => b.id);
    getViewsTodayForEntrepreneur(ids).then(setViewsToday);
    getEventCountsForEntrepreneur(ids, 30).then(setEventCounts);
  }, [businesses]);

  const completedMissions = missions.filter((m) => m.isCompleted).length;
  const totalMissions = missions.length;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-6">
        <p className="text-muted-foreground text-sm">Bem-vindo de volta,</p>
        <h1 className="font-display font-bold text-2xl text-foreground">Olá, {displayFirstName}! 👋</h1>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Status Card */}
        <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
              <Eye size={20} className="text-secondary" />
            </div>
            <div>
              <p className="text-foreground font-semibold">
                Seu perfil foi visto {viewsToday} {viewsToday === 1 ? "vez" : "vezes"} hoje!
              </p>
              <p className="text-sm text-muted-foreground">Continue assim! 🎉</p>
            </div>
          </div>
        </div>

        {/* Daily Post Mission */}
        <Link to="/empreendedor/postar" className="block">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-primary to-accent">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                <PenSquare size={24} className="text-primary-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-bold text-primary-foreground">Post do Dia</h3>
                  <span className="px-2 py-0.5 rounded-full bg-primary-foreground/20 text-xs text-primary-foreground font-medium">
                    +15 pts
                  </span>
                </div>
                <p className="text-sm text-primary-foreground/80">
                  Mostre o bastidor do seu negócio! 📸
                </p>
              </div>
              <ChevronRight size={24} className="text-primary-foreground" />
            </div>
          </div>
        </Link>

        {/* Main Mission Card - próxima missão ou CTA genérico */}
        {nextMission ? (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary-foreground/20 flex items-center justify-center">
                <Lightbulb size={24} />
              </div>
              <div>
                <span className="text-xs font-medium opacity-80">Próxima Missão</span>
                <h3 className="font-display font-bold text-lg">{nextMission.title}</h3>
              </div>
            </div>

            <p className="text-sm opacity-90 mb-4">{nextMission.description}</p>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progresso</span>
                <span>0/1</span>
              </div>
              <div className="h-2 bg-secondary-foreground/20 rounded-full overflow-hidden">
                <div className="h-full bg-secondary-foreground rounded-full w-0" />
              </div>
            </div>

            <Link to={`/empreendedor/missao/${nextMission.id}`}>
              <Button className="w-full bg-secondary-foreground text-secondary hover:bg-secondary-foreground/90">
                COMEÇAR MISSÃO
                <ChevronRight size={18} />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground">
            <div className="flex items-center gap-3">
              <Lightbulb size={24} />
              <div>
                <h3 className="font-display font-bold">Nenhuma missão pendente</h3>
                <p className="text-sm opacity-90">Acesse a aba Missões para ver o histórico.</p>
              </div>
            </div>
            <Link to="/empreendedor/missoes" className="mt-4 block">
              <Button className="w-full bg-secondary-foreground text-secondary hover:bg-secondary-foreground/90">
                VER MISSÕES
                <ChevronRight size={18} />
              </Button>
            </Link>
          </div>
        )}

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Link to="/empreendedor/analytics" className="p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={18} className="text-success" />
              <span className="text-sm text-muted-foreground">Visualizações</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{eventCounts.views}</p>
            <p className="text-xs text-success">últimos 30 dias</p>
          </Link>

          <Link to="/empreendedor/missoes" className="p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb size={18} className="text-primary" />
              <span className="text-sm text-muted-foreground">Missões</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{completedMissions}/{totalMissions}</p>
            <p className="text-xs text-primary">Continue aprendendo!</p>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link to="/empreendedor/gestao" className="p-4 rounded-2xl bg-primary/10 border border-primary/20 hover:border-primary/40 transition-colors">
            <BarChart3 size={24} className="text-primary mb-2" />
            <h4 className="font-semibold text-foreground">Gestão</h4>
            <p className="text-xs text-muted-foreground">Gerencie seu negócio</p>
          </Link>
          <Link to="/empreendedor/comunidade" className="p-4 rounded-2xl bg-secondary/10 border border-secondary/20 hover:border-secondary/40 transition-colors">
            <Users size={24} className="text-secondary mb-2" />
            <h4 className="font-semibold text-foreground">Comunidade</h4>
            <p className="text-xs text-muted-foreground">Conecte-se</p>
          </Link>
        </div>

        {/* AI Trail CTA - Bloqueado */}
        <div className="p-4 rounded-2xl bg-muted border border-border opacity-75 pointer-events-none select-none">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-muted-foreground/10 flex items-center justify-center">
              <Sparkles size={24} className="text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-muted-foreground">Trilha IA de Conteúdo</h3>
                <span className="px-2 py-0.5 rounded-md bg-muted-foreground/20 text-xs font-medium text-muted-foreground">
                  Bloqueado
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                Complete missões e desbloqueie sua trilha personalizada!
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-muted-foreground/20 flex items-center justify-center shrink-0">
              <Lock size={20} className="text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      <EntrepreneurNav activeTab="home" />
    </div>
  );
}
