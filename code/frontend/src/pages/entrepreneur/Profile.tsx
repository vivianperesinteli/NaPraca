import { Link } from "react-router-dom";
import { Store, BarChart3, Users, HelpCircle, Settings, LogOut, ChevronRight, Target } from "lucide-react";
import { EntrepreneurNav } from "@/components/layout/EntrepreneurNav";
import { Button } from "@/components/ui/button";

const menuItems = [
  { id: "business", label: "Meu Negócio", icon: Store, href: "/empreendedor/negocio", color: "text-primary" },
  { id: "stats", label: "Estatísticas", icon: BarChart3, href: "/empreendedor/analytics", color: "text-secondary" },
  { id: "community", label: "Comunidade", icon: Users, href: "/empreendedor/comunidade", color: "text-success" },
  { id: "help", label: "Ajuda", icon: HelpCircle, href: "#", color: "text-accent" },
  { id: "settings", label: "Configurações", icon: Settings, href: "/configuracoes", color: "text-muted-foreground" },
];

export default function EntrepreneurProfile() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 px-4 py-8 text-primary-foreground">
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full border-4 border-primary-foreground/30 bg-primary-foreground/20 flex items-center justify-center text-4xl">
              👨‍💼
            </div>
          </div>
          <h1 className="font-display font-bold text-xl">Carlos Silva</h1>
          <p className="text-sm opacity-80">Empreendedor desde Janeiro 2026</p>
        </div>
      </div>

      {/* Business Card */}
      <div className="px-4 -mt-6">
        <Link to="/empreendedor/negocio">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-secondary to-earth text-secondary-foreground">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary-foreground/20 flex items-center justify-center">
                <Store size={24} />
              </div>
              <div className="flex-1">
                <p className="text-xs opacity-80">Seu Negócio</p>
                <h3 className="font-display font-bold">Padaria do Carlos</h3>
              </div>
              <ChevronRight size={20} />
            </div>
          </div>
        </Link>
      </div>

      {/* Stats */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Target size={18} className="text-primary" />
              <span className="text-sm text-muted-foreground">Missões</span>
            </div>
            <p className="text-2xl font-bold text-foreground">3/10</p>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "30%" }} />
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 size={18} className="text-success" />
              <span className="text-sm text-muted-foreground">Nível</span>
            </div>
            <p className="text-2xl font-bold text-foreground">Iniciante</p>
            <p className="text-xs text-muted-foreground mt-1">70 XP para o próximo</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="px-4">
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
                  <Icon size={20} className={item.color} />
                </div>
                <span className="flex-1 font-medium text-foreground">{item.label}</span>
                <ChevronRight size={20} className="text-muted-foreground" />
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <Button variant="outline" className="w-full mt-4 h-12 rounded-xl border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
          <LogOut size={18} className="mr-2" />
          Sair
        </Button>
      </div>

      <EntrepreneurNav activeTab="profile" />
    </div>
  );
}
