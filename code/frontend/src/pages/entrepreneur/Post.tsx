import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Camera, Image, Sparkles, Send, X, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const dailyMission = {
  title: "Post do Dia",
  prompt: "Mostre o bastidor do seu negócio! 📸",
  tip: "Posts que mostram o dia-a-dia geram 3x mais engajamento",
  reward: "+15 pts",
};

const postSuggestions = [
  { id: "s1", text: "Novidade fresquinha saindo do forno! 🥖", icon: "🥖" },
  { id: "s2", text: "Atendimento especial hoje! Venha conferir 🎉", icon: "🎉" },
  { id: "s3", text: "Promoção relâmpago! Só hoje ⚡", icon: "⚡" },
  { id: "s4", text: "Bastidores do nosso trabalho 👨‍🍳", icon: "👨‍🍳" },
];

export default function EntrepreneurPost() {
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSuggestionClick = (text: string) => {
    setPostText(text);
  };

  const handleGenerateWithAI = async () => {
    setIsGenerating(true);
    // Simulated AI generation
    setTimeout(() => {
      setPostText("✨ Hoje preparamos algo especial para vocês! Nosso pão artesanal com fermentação natural está pronto e esperando por você. Venha sentir esse aroma incrível! 🥖💛 #PadariaLocal #FeitoComAmor");
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/empreendedor" className="text-secondary hover:text-secondary/80 transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="font-display font-bold text-xl text-foreground">Criar Post</h1>
          </div>
          <Button disabled={!postText.trim()} className="rounded-full px-6">
            <Send size={16} className="mr-2" />
            Publicar
          </Button>
        </div>
      </div>

      {/* Daily Mission Card */}
      <div className="px-4 py-4">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-primary to-accent">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Lightbulb size={24} className="text-primary-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-display font-bold text-primary-foreground">{dailyMission.title}</h3>
                <span className="px-2 py-0.5 rounded-full bg-primary-foreground/20 text-xs text-primary-foreground font-medium">
                  {dailyMission.reward}
                </span>
              </div>
              <p className="text-primary-foreground/90 text-sm mb-2">{dailyMission.prompt}</p>
              <p className="text-primary-foreground/70 text-xs">💡 {dailyMission.tip}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Upload */}
      <div className="px-4 mb-4">
        {selectedImage ? (
          <div className="relative rounded-2xl overflow-hidden">
            <img src={selectedImage} alt="Preview" className="w-full h-48 object-cover" />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-foreground/80 flex items-center justify-center"
            >
              <X size={16} className="text-background" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <button className="h-24 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors">
              <Camera size={24} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Tirar Foto</span>
            </button>
            <button className="h-24 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors">
              <Image size={24} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Galeria</span>
            </button>
          </div>
        )}
      </div>

      {/* Text Area */}
      <div className="px-4 mb-4">
        <Textarea
          placeholder="O que você quer compartilhar com seus clientes?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          className="min-h-32 rounded-2xl resize-none"
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-muted-foreground">{postText.length}/500</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerateWithAI}
            disabled={isGenerating}
            className="rounded-full"
          >
            <Sparkles size={14} className={cn("mr-2", isGenerating && "animate-spin")} />
            {isGenerating ? "Gerando..." : "Gerar com IA"}
          </Button>
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="px-4">
        <h3 className="font-display font-bold text-foreground mb-3">Sugestões Rápidas</h3>
        <div className="flex flex-wrap gap-2">
          {postSuggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion.text)}
              className="px-4 py-2 rounded-full bg-muted text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {suggestion.icon} {suggestion.text.substring(0, 30)}...
            </button>
          ))}
        </div>
      </div>

      {/* AI Trail Info */}
      <div className="px-4 mt-6">
        <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/20">
          <div className="flex items-start gap-3">
            <Sparkles size={20} className="text-secondary mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">Trilha de Conteúdo IA</h4>
              <p className="text-sm text-muted-foreground">
                Complete suas missões de post e nossa IA vai criar uma trilha personalizada de conteúdos para o seu negócio crescer!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
