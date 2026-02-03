import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, ChevronRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EntrepreneurNav } from "@/components/layout/EntrepreneurNav";
import { cn } from "@/lib/utils";

const missions = [
  {
    id: "1",
    title: "Foto da Fachada",
    description: "Tire uma foto profissional da fachada do seu negócio",
    difficulty: "Fácil",
    difficultyColor: "bg-success text-success-foreground",
    time: "10 min",
    icon: "📸",
    gradient: "from-primary to-accent",
    completed: false,
  },
  {
    id: "2",
    title: "Descreva seu Negócio",
    description: "Crie uma descrição atraente para seu estabelecimento",
    difficulty: "Fácil",
    difficultyColor: "bg-success text-success-foreground",
    time: "15 min",
    icon: "✍️",
    gradient: "from-secondary to-earth",
    completed: false,
  },
  {
    id: "3",
    title: "Defina seus Preços",
    description: "Aprenda a calcular o preço ideal dos seus produtos",
    difficulty: "Médio",
    difficultyColor: "bg-warning text-warning-foreground",
    time: "20 min",
    icon: "💰",
    gradient: "from-warning to-primary",
    completed: false,
  },
  {
    id: "4",
    title: "Crie seu Cardápio",
    description: "Monte um cardápio digital para seus clientes",
    difficulty: "Médio",
    difficultyColor: "bg-warning text-warning-foreground",
    time: "30 min",
    icon: "📋",
    gradient: "from-accent to-success",
    completed: true,
  },
];

export default function EntrepreneurMissions() {
  const [activeTab, setActiveTab] = useState<"available" | "completed">("available");

  const filteredMissions = missions.filter(m => 
    activeTab === "completed" ? m.completed : !m.completed
  );

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
        {filteredMissions.map((mission) => (
          <div
            key={mission.id}
            className={cn(
              "p-4 rounded-2xl bg-gradient-to-br text-primary-foreground",
              mission.gradient
            )}
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center text-2xl flex-shrink-0">
                {mission.completed ? <CheckCircle size={24} /> : mission.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", mission.difficultyColor)}>
                    {mission.difficulty}
                  </span>
                  <div className="flex items-center gap-1 text-xs opacity-80">
                    <Clock size={12} />
                    <span>{mission.time}</span>
                  </div>
                </div>
                <h3 className="font-display font-bold">{mission.title}</h3>
                <p className="text-sm opacity-90 mb-3 line-clamp-2">{mission.description}</p>

                {mission.completed ? (
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
        ))}
      </div>

      <EntrepreneurNav activeTab="missions" />
    </div>
  );
}
