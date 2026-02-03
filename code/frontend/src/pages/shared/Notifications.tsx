import { useState } from "react";
import { ArrowLeft, Bell, MessageSquare, Star, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const notifications = [
  {
    id: "1",
    type: "message",
    title: "Nova avaliação",
    description: "João deixou uma avaliação de 5 estrelas!",
    time: "2 min atrás",
    read: false,
    icon: Star,
    iconColor: "text-warning",
    iconBg: "bg-warning/10",
  },
  {
    id: "2",
    type: "mission",
    title: "Missão disponível",
    description: "Complete a missão 'Foto da Fachada' e ganhe 50 XP!",
    time: "1h atrás",
    read: false,
    icon: Gift,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    id: "3",
    type: "community",
    title: "Nova resposta",
    description: "Maria respondeu à sua pergunta no fórum",
    time: "3h atrás",
    read: true,
    icon: MessageSquare,
    iconColor: "text-secondary",
    iconBg: "bg-secondary/10",
  },
];

export default function Notifications() {
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  const filteredNotifications = notifications.filter(n =>
    activeTab === "unread" ? !n.read : true
  );

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-secondary hover:text-secondary/80 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="font-display font-bold text-xl text-foreground">Notificações</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 py-4">
        <div className="flex gap-2 bg-muted p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("all")}
            className={cn(
              "flex-1 py-2 rounded-lg text-sm font-semibold transition-all",
              activeTab === "all"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            )}
          >
            Todas
          </button>
          <button
            onClick={() => setActiveTab("unread")}
            className={cn(
              "flex-1 py-2 rounded-lg text-sm font-semibold transition-all",
              activeTab === "unread"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            )}
          >
            Não Lidas
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-4 space-y-3">
        {filteredNotifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className={cn(
                "p-4 rounded-2xl border transition-colors cursor-pointer",
                notification.read
                  ? "bg-card border-border"
                  : "bg-primary/5 border-primary/20"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", notification.iconBg)}>
                  <Icon size={20} className={notification.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{notification.title}</h3>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
