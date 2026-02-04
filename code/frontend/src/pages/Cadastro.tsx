import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Lock, Store, ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo-napraca.png";

type UserType = "entrepreneur" | "consumer" | null;

export default function Cadastro() {
  const [userType, setUserType] = useState<UserType>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { signUp, isConfigured } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }
    if (!userType) return;
    setSubmitting(true);
    const { error: err } = await signUp({
      email,
      password,
      fullName: name,
      profileType: userType,
    });
    setSubmitting(false);
    if (err) {
      setError(err);
      return;
    }
    navigate("/boas-vindas", { state: { profileType: userType } });
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/" className="text-secondary hover:text-secondary/80 transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="font-display font-bold text-xl text-foreground">Criar Conta</h1>
      </div>

      <div className="flex justify-center mb-6">
        <img src={logo} alt="Na Praça" className="w-20 h-auto" />
      </div>

      {!isConfigured && (
        <div className="mb-4 p-3 rounded-lg bg-amber-100 border border-amber-300 text-amber-800 text-sm">
          Para o cadastro funcionar, crie o arquivo <strong>.env</strong> na pasta <strong>frontend</strong> com
          VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY (copie do .env.example).
        </div>
      )}

      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-3 text-center">Selecione seu perfil:</p>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setUserType("entrepreneur")}
            className={cn(
              "p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all",
              userType === "entrepreneur"
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center",
              userType === "entrepreneur" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              <Store size={24} />
            </div>
            <span className="font-semibold text-foreground">Sou Empreendedor</span>
            <span className="text-xs text-muted-foreground text-center">Quero divulgar meu negócio</span>
          </button>

          <button
            type="button"
            onClick={() => setUserType("consumer")}
            className={cn(
              "p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all",
              userType === "consumer"
                ? "border-secondary bg-secondary/10"
                : "border-border bg-card hover:border-secondary/50"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center",
              userType === "consumer" ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
            )}>
              <ShoppingBag size={24} />
            </div>
            <span className="font-semibold text-foreground">Sou Consumidor</span>
            <span className="text-xs text-muted-foreground text-center">Quero descobrir o bairro</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
            {error}
          </div>
        )}
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            type="text"
            placeholder="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-10 h-12 rounded-xl bg-card border-border"
            required
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 h-12 rounded-xl bg-card border-border"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 h-12 rounded-xl bg-card border-border"
            required
            minLength={6}
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            type="password"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-10 h-12 rounded-xl bg-card border-border"
            required
          />
        </div>

        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => setAcceptTerms(!acceptTerms)}
            className={cn(
              "w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-colors",
              acceptTerms ? "bg-primary border-primary" : "border-border"
            )}
          >
            {acceptTerms && <Check size={14} className="text-primary-foreground" />}
          </button>
          <span className="text-sm text-muted-foreground">
            Li e aceito os{" "}
            <button type="button" className="text-primary hover:underline">
              Termos de Uso
            </button>{" "}
            e a{" "}
            <button type="button" className="text-primary hover:underline">
              Política de Privacidade
            </button>
          </span>
        </div>

        <Button
          type="submit"
          disabled={!userType || !acceptTerms || submitting}
          className="w-full h-12 rounded-xl text-base font-bold"
        >
          {submitting ? "Criando conta..." : "CRIAR CONTA"}
        </Button>
      </form>

      <p className="text-center mt-6 text-muted-foreground">
        Já tem conta?{" "}
        <Link to="/" className="text-primary font-semibold hover:underline">
          Entrar
        </Link>
      </p>
    </div>
  );
}
