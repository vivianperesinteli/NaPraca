import { ArrowLeft, User, Lock, Shield, Globe, Palette, Bell, Mail, MessageSquare, LogOut, ChevronRight, Info, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Settings() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={cn(
        "w-12 h-7 rounded-full transition-colors relative",
        enabled ? "bg-primary" : "bg-muted"
      )}
    >
      <div
        className={cn(
          "w-5 h-5 rounded-full bg-primary-foreground absolute top-1 transition-all",
          enabled ? "left-6" : "left-1"
        )}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-secondary hover:text-secondary/80 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="font-display font-bold text-xl text-foreground">Configurações</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-6">
        {/* Account Section */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Conta</h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <Link to="#" className="flex items-center gap-4 p-4 hover:bg-muted transition-colors border-b border-border">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <User size={20} className="text-primary" />
              </div>
              <span className="flex-1 font-medium text-foreground">Editar Perfil</span>
              <ChevronRight size={20} className="text-muted-foreground" />
            </Link>
            <Link to="#" className="flex items-center gap-4 p-4 hover:bg-muted transition-colors border-b border-border">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Lock size={20} className="text-secondary" />
              </div>
              <span className="flex-1 font-medium text-foreground">Alterar Senha</span>
              <ChevronRight size={20} className="text-muted-foreground" />
            </Link>
            <Link to="#" className="flex items-center gap-4 p-4 hover:bg-muted transition-colors">
              <div className="w-10 h-10 rounded-xl bg-earth/10 flex items-center justify-center">
                <Shield size={20} className="text-earth" />
              </div>
              <span className="flex-1 font-medium text-foreground">Privacidade</span>
              <ChevronRight size={20} className="text-muted-foreground" />
            </Link>
          </div>
        </div>

        {/* Notifications Section */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Notificações</h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="flex items-center gap-4 p-4 border-b border-border">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Bell size={20} className="text-primary" />
              </div>
              <span className="flex-1 font-medium text-foreground">Notificações Push</span>
              <Toggle enabled={pushEnabled} onToggle={() => setPushEnabled(!pushEnabled)} />
            </div>
            <div className="flex items-center gap-4 p-4 border-b border-border">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Mail size={20} className="text-secondary" />
              </div>
              <span className="flex-1 font-medium text-foreground">E-mail</span>
              <Toggle enabled={emailEnabled} onToggle={() => setEmailEnabled(!emailEnabled)} />
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                <MessageSquare size={20} className="text-success" />
              </div>
              <span className="flex-1 font-medium text-foreground">SMS</span>
              <Toggle enabled={smsEnabled} onToggle={() => setSmsEnabled(!smsEnabled)} />
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Preferências</h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <Link to="#" className="flex items-center gap-4 p-4 hover:bg-muted transition-colors border-b border-border">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Globe size={20} className="text-accent" />
              </div>
              <span className="flex-1 font-medium text-foreground">Idioma</span>
              <span className="text-muted-foreground text-sm">Português</span>
              <ChevronRight size={20} className="text-muted-foreground" />
            </Link>
            <Link to="#" className="flex items-center gap-4 p-4 hover:bg-muted transition-colors">
              <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                <Palette size={20} className="text-warning" />
              </div>
              <span className="flex-1 font-medium text-foreground">Tema</span>
              <span className="text-muted-foreground text-sm">Claro</span>
              <ChevronRight size={20} className="text-muted-foreground" />
            </Link>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Sobre</h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <Link to="#" className="flex items-center gap-4 p-4 hover:bg-muted transition-colors border-b border-border">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <Info size={20} className="text-muted-foreground" />
              </div>
              <span className="flex-1 font-medium text-foreground">Versão</span>
              <span className="text-muted-foreground text-sm">1.0.0</span>
            </Link>
            <Link to="#" className="flex items-center gap-4 p-4 hover:bg-muted transition-colors border-b border-border">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <FileText size={20} className="text-muted-foreground" />
              </div>
              <span className="flex-1 font-medium text-foreground">Termos de Uso</span>
              <ChevronRight size={20} className="text-muted-foreground" />
            </Link>
            <Link to="#" className="flex items-center gap-4 p-4 hover:bg-muted transition-colors">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <Shield size={20} className="text-muted-foreground" />
              </div>
              <span className="flex-1 font-medium text-foreground">Política de Privacidade</span>
              <ChevronRight size={20} className="text-muted-foreground" />
            </Link>
          </div>
        </div>

        {/* Logout */}
        <Button variant="outline" className="w-full h-12 rounded-xl border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
          <LogOut size={18} className="mr-2" />
          Sair
        </Button>
      </div>
    </div>
  );
}
