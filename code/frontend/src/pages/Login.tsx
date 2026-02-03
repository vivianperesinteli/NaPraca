import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo-napraca.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const { error: err } = await signIn(email, password);
    setSubmitting(false);
    if (err) {
      setError(err);
      return;
    }
    const isEntrepreneur = profile?.profileType === "entrepreneur";
    navigate(isEntrepreneur ? "/empreendedor" : "/consumidor");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-8">
      <div className="mb-8 animate-fade-in">
        <img src={logo} alt="Na Praça" className="w-32 h-auto mx-auto" />
      </div>

      <p className="text-muted-foreground text-center mb-8 text-sm animate-fade-in" style={{ animationDelay: "0.1s" }}>
        Conectando o bairro, fortalecendo o comércio
      </p>

      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
        {error && (
          <div className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
            {error}
          </div>
        )}
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
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-10 h-12 rounded-xl bg-card border-border"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="text-right">
          <button type="button" className="text-sm text-primary hover:underline">
            Esqueci minha senha
          </button>
        </div>

        <Button type="submit" className="w-full h-12 rounded-xl text-base font-bold" disabled={submitting}>
          {submitting ? "Entrando..." : "ENTRAR"}
        </Button>
      </form>

      <div className="flex items-center gap-4 my-8 w-full max-w-sm">
        <div className="flex-1 h-px bg-border" />
        <span className="text-muted-foreground text-sm">ou</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <Link to="/cadastro" className="w-full max-w-sm">
        <Button variant="outline" className="w-full h-12 rounded-xl text-base font-bold border-2">
          QUERO ME CADASTRAR
        </Button>
      </Link>
    </div>
  );
}
