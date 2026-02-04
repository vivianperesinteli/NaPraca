import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MapPin, Target, Sparkles, Store, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo-napraca.png";

const WELCOME_DONE_KEY = "napraca_welcome_done";

const consumerSlides = [
  {
    icon: MapPin,
    title: "Descubra seu bairro",
    text: "Explore o mapa e encontre negócios perto de você. Padarias, cafés, serviços e muito mais.",
  },
  {
    icon: Sparkles,
    title: "Apoie o comércio local",
    text: "Ganhe pontos e recompensas ao visitar e apoiar os pequenos negócios do seu bairro.",
  },
  {
    icon: Target,
    title: "Missões e desafios",
    text: "Participe de missões divertidas, descubra lugares novos e conecte-se com a comunidade.",
  },
];

const entrepreneurSlides = [
  {
    icon: Store,
    title: "Seu perfil já está no ar",
    text: "O cadastro foi fácil. Agora você já aparece para quem busca negócios no bairro.",
  },
  {
    icon: Target,
    title: "Missões que melhoram seu negócio",
    text: "Tarefas simples, como completar seu perfil ou adicionar uma foto, fazem você aparecer mais no mapa.",
  },
  {
    icon: Sparkles,
    title: "Feito para você",
    text: "Sem complicação. Cada missão concluída traz mais visibilidade e mais clientes.",
  },
];

export default function BoasVindas() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile } = useAuth();

  const profileType =
    (location.state as { profileType?: "consumer" | "entrepreneur" })?.profileType ??
    profile?.profileType ??
    (user?.user_metadata?.profile_type as "consumer" | "entrepreneur" | undefined) ??
    "consumer";
  const slides = profileType === "entrepreneur" ? entrepreneurSlides : consumerSlides;
  const homePath = profileType === "entrepreneur" ? "/empreendedor" : "/consumidor";

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
      return;
    }
    if (localStorage.getItem(WELCOME_DONE_KEY) === "1") {
      navigate(homePath, { replace: true });
    }
  }, [user, navigate, homePath]);

  const handleComecar = () => {
    localStorage.setItem(WELCOME_DONE_KEY, "1");
    navigate(homePath, { replace: true });
  };

  if (localStorage.getItem(WELCOME_DONE_KEY) === "1") {
    return null;
  }

  const SlideIcon = slides[step].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <img src={logo} alt="NaPraça" className="w-24 h-auto mb-8" />
        <h1 className="font-display font-bold text-2xl text-center text-foreground mb-2">
          Bem-vindo ao NaPraça!
        </h1>
        <p className="text-muted-foreground text-center text-sm mb-10">
          {step + 1} de {slides.length}
        </p>

        <div className="w-full max-w-sm rounded-2xl bg-card border border-border p-6 shadow-sm">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <SlideIcon className="w-7 h-7 text-primary" />
            </div>
          </div>
          <h2 className="font-display font-bold text-lg text-center text-foreground mb-3">
            {slides[step].title}
          </h2>
          <p className="text-muted-foreground text-center text-sm leading-relaxed">
            {slides[step].text}
          </p>
        </div>

        <div className="flex gap-2 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setStep(i)}
              className={`h-2 rounded-full transition-all ${
                i === step ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-6 pb-10">
        {step < slides.length - 1 ? (
          <Button
            className="w-full h-12 rounded-xl font-semibold"
            onClick={() => setStep((s) => s + 1)}
          >
            Próximo
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        ) : (
          <Button
            className="w-full h-12 rounded-xl font-semibold"
            onClick={handleComecar}
          >
            Começar
          </Button>
        )}
      </div>
    </div>
  );
}
