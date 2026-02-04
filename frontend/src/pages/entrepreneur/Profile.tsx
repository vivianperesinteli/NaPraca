import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, BarChart3, Users, HelpCircle, Settings, LogOut, ChevronRight, Target, MessageSquare, Package, Plus } from "lucide-react";
import { EntrepreneurNav } from "@/components/layout/EntrepreneurNav";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { getBusinessesByEntrepreneur, getMissionsByEntrepreneur } from "@/services/api";

const menuItems = [
  { id: "businesses", label: "Meus Negócios", icon: Store, href: "/empreendedor/negocios", color: "text-primary" },
  { id: "business", label: "Cadastro de Negócios", icon: Package, href: "/empreendedor/negocio", color: "text-primary" },
  { id: "stats", label: "Estatísticas", icon: BarChart3, href: "/empreendedor/analytics", color: "text-secondary" },
  { id: "community", label: "Comunidade", icon: Users, href: "/empreendedor/comunidade", color: "text-success" },
  { id: "help", label: "Ajuda", icon: HelpCircle, href: "#", color: "text-accent" },
  { id: "settings", label: "Configurações", icon: Settings, href: "/configuracoes", color: "text-muted-foreground" },
];

export default function EntrepreneurProfile() {
  const navigate = useNavigate();
  const { profile, signOut, displayFullName } = useAuth();
  const [businesses, setBusinesses] = useState<{ name: string }[]>([]);
  const [missions, setMissions] = useState<{ isCompleted: boolean }[]>([]);

  const entrepreneurId = profile?.profile_type === "entrepreneur" ? profile?.id : null;
  useEffect(() => {
    if (!entrepreneurId) return;
    getBusinessesByEntrepreneur(entrepreneurId).then((list) => setBusinesses(list));
    getMissionsByEntrepreneur(entrepreneurId).then((list) => setMissions(list));
  }, [entrepreneurId]);

  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  const completedMissions = missions.filter((m) => m.isCompleted).length;
  const totalMissions = missions.length;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 px-4 py-8 text-primary-foreground">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full border-4 border-primary-foreground/30 bg-primary-foreground/20 flex items-center justify-center text-4xl">
              👨‍💼
            </div>
          </div>
          <h1 className="font-display font-bold text-xl">{displayFullName}</h1>
          <p className="text-sm opacity-80">Empreendedor</p>
        </div>
      </div>

      {/* Business Card - Link para Meus Negócios */}
      <div className="px-4 -mt-6 space-y-3">
        <Link to="/empreendedor/negocios">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-secondary to-earth text-secondary-foreground">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary-foreground/20 flex items-center justify-center">
                <Store size={24} />
              </div>
              <div className="flex-1">
                <p className="text-xs opacity-80">Meus Negócios</p>
                <h3 className="font-display font-bold">
                  {businesses.length > 0 
                    ? `${businesses.length} ${businesses.length === 1 ? 'negócio' : 'negócios'} cadastrado${businesses.length === 1 ? '' : 's'}`
                    : "Nenhum negócio cadastrado"}
                </h3>
              </div>
              <ChevronRight size={20} />
            </div>
          </div>
        </Link>

        {/* Botão para cadastrar novo negócio */}
        <Link to="/empreendedor/negocio">
          <div className="p-4 rounded-2xl bg-card border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Plus size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm">Cadastrar Novo Negócio</p>
                <p className="text-xs text-muted-foreground truncate">Adicionar um novo negócio ao seu perfil</p>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
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
            <p className="text-2xl font-bold text-foreground">{completedMissions}/{totalMissions || "—"}</p>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: totalMissions ? `${(completedMissions / totalMissions) * 100}%` : "0%" }}
              />
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 size={18} className="text-success" />
              <span className="text-sm text-muted-foreground">Nível</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{profile?.level ?? "Iniciante"}</p>
            <p className="text-xs text-muted-foreground mt-1">Continue completando missões</p>
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
        <Button
          variant="outline"
          className="w-full mt-4 h-12 rounded-xl border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          onClick={handleLogout}
        >
          <LogOut size={18} className="mr-2" />
          Sair
        </Button>
      </div>

      <EntrepreneurNav activeTab="profile" />
    </div>
  );
}
