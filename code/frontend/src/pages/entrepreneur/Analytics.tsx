import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, TrendingUp, Eye, MousePointer, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getBusinessesByEntrepreneur, getEventCountsForEntrepreneur } from "@/services/api";

export default function EntrepreneurAnalytics() {
  const { profile } = useAuth();
  const [period, setPeriod] = useState("30");
  const [views, setViews] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [favorites, setFavorites] = useState(0);

  const entrepreneurId = profile?.profileType === "entrepreneur" ? profile?.id : null;
  const periodNum = parseInt(period, 10) || 30;

  useEffect(() => {
    if (!entrepreneurId) return;
    getBusinessesByEntrepreneur(entrepreneurId).then((list) => {
      const ids = list.map((b) => b.id);
      if (ids.length === 0) return;
      getEventCountsForEntrepreneur(ids, periodNum).then((counts) => {
        setViews(counts.views);
        setClicks(counts.clicks);
        setFavorites(counts.favorites);
      });
    });
  }, [entrepreneurId, periodNum]);

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-4">
          <Link to="/empreendedor/perfil" className="text-secondary hover:text-secondary/80 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="font-display font-bold text-xl text-foreground">Estatísticas</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Period Selector */}
        <div className="flex items-center justify-between bg-card rounded-2xl border border-border p-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar size={18} />
            <span className="text-sm">Período</span>
          </div>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-muted text-foreground text-sm font-medium px-3 py-1.5 rounded-lg border-0 outline-none"
          >
            <option value="7">Últimos 7 dias</option>
            <option value="30">Últimos 30 dias</option>
            <option value="90">Últimos 90 dias</option>
          </select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-center">
            <Eye size={20} className="mx-auto mb-1" />
            <p className="text-2xl font-bold">{views}</p>
            <p className="text-xs opacity-90">Visualizações</p>
          </div>
          <div className="p-4 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground text-center">
            <MousePointer size={20} className="mx-auto mb-1" />
            <p className="text-2xl font-bold">{clicks}</p>
            <p className="text-xs opacity-90">Cliques</p>
          </div>
          <div className="p-4 rounded-2xl bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground text-center">
            <Heart size={20} className="mx-auto mb-1" />
            <p className="text-2xl font-bold">{favorites}</p>
            <p className="text-xs opacity-90">Favoritos</p>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="p-4 rounded-2xl bg-card border border-border">
          <h3 className="font-display font-bold text-foreground mb-4">Visualizações por dia</h3>
          <div className="h-40 flex items-end justify-between gap-2">
            {[40, 65, 45, 80, 60, 90, 75].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-primary to-primary/50 rounded-t-lg transition-all"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-muted-foreground">
                  {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Hours */}
        <div className="p-4 rounded-2xl bg-card border border-border">
          <h3 className="font-display font-bold text-foreground mb-4">Horários de Pico</h3>
          <div className="space-y-3">
            {[
              { hour: "12:00 - 14:00", percent: 85 },
              { hour: "18:00 - 20:00", percent: 70 },
              { hour: "08:00 - 10:00", percent: 45 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground">{item.hour}</span>
                  <span className="text-muted-foreground">{item.percent}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary rounded-full transition-all"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trend */}
        <div className="p-4 rounded-2xl bg-success/10 border border-success/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
              <TrendingUp size={20} className="text-success" />
            </div>
            <div>
              <p className="font-semibold text-foreground">+23% de crescimento</p>
              <p className="text-sm text-muted-foreground">Comparado ao mês anterior</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
