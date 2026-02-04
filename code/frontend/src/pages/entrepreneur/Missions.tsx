import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EntrepreneurNav } from "@/components/layout/EntrepreneurNav";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { getMissionsByEntrepreneur } from "@/services/api";
import type { Mission } from "@backend/domain/entities/Mission";

const missionMeta: Record<string, { icon: string; gradient: string }> = {
  learning: { icon: "📚", gradient: "from-primary to-accent" },
  marketing: { icon: "📣", gradient: "from-secondary to-earth" },
  sales: { icon: "💰", gradient: "from-warning to-primary" },
  management: { icon: "📋", gradient: "from-accent to-success" },
};

export default function EntrepreneurMissions() {
  const { profile } = useAuth();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [activeTab, setActiveTab] = useState<"available" | "completed">("available");

  const entrepreneurId = profile?.profileType === "entrepreneur" ? profile?.id : null;
  useEffect(() => {
    if (!entrepreneurId) return;
    getMissionsByEntrepreneur(entrepreneurId).then(setMissions);
  }, [entrepreneurId]);

  const filteredMissions = missions.filter((m) =>
    activeTab === "completed" ? m.isCompleted : !m.isCompleted
  );
  const meta = (type: string) => missionMeta[type] ?? { icon: "🎯", gradient: "from-primary to-accent" };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <h1 className="font-display font-bold text-2xl text-foreground">Missões</h1>
        <p className="text-muted-foreground text-sm mt-1">Aprenda e evolua seu negócio!</p>
      </div>

      {/* Tabs */}
      <div className="px-4 py-4">
        <div className="flex gap-2 bg-muted p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("available")}
            className={cn(
              "flex-1 py-2 rounded-lg text-sm font-semibold transition-all",
              activeTab === "available"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            )}
          >
            Disponíveis
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={cn(
              "flex-1 py-2 rounded-lg text-sm font-semibold transition-all",
              activeTab === "completed"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            )}
          >
            Concluídas
          </button>
        </div>
      </div>

      {/* Missions List */}
      <div className="px-4 space-y-3">
        {filteredMissions.length === 0 && (
          <p className="text-muted-foreground text-sm py-4 text-center">
            {activeTab === "completed" ? "Nenhuma missão concluída ainda." : "Nenhuma missão disponível."}
          </p>
        )}
        {filteredMissions.map((mission) => {
          const { icon, gradient } = meta(mission.missionType);
          return (
            <div
              key={mission.id}
              className={cn(
                "p-4 rounded-2xl bg-gradient-to-br text-primary-foreground",
                gradient
              )}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center text-2xl flex-shrink-0">
                  {mission.isCompleted ? <CheckCircle size={24} /> : icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary-foreground/20">
                      +{mission.points} pts
                    </span>
                  </div>
                  <h3 className="font-display font-bold">{mission.title}</h3>
                  <p className="text-sm opacity-90 mb-3 line-clamp-2">{mission.description}</p>

                  {mission.isCompleted ? (
                    <span className="inline-flex items-center gap-1 text-sm font-semibold bg-primary-foreground/20 px-3 py-1 rounded-full">
                      <CheckCircle size={14} />
                      CONCLUÍDA
                    </span>
                  ) : (
                    <Link to={`/empreendedor/missao/${mission.id}`}>
                      <Button size="sm" className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0">
                        INICIAR <ChevronRight size={16} />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <EntrepreneurNav activeTab="missions" />
    </div>
  );
}
