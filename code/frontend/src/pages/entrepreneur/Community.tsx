import { useState } from "react";
import { ArrowLeft, Search, Plus, MessageCircle, Heart, TrendingUp, Crown, Store, Users, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const topCreators = [
  { id: "c1", name: "Maria Santos", avatar: "👩", posts: 45, followers: 234, badge: "🔥" },
  { id: "c2", name: "João Oliveira", avatar: "👨", posts: 38, followers: 189, badge: "⭐" },
  { id: "c3", name: "Ana Costa", avatar: "👩‍🦱", posts: 32, followers: 156, badge: "💎" },
];

const topBusinesses = [
  { id: "b1", name: "Padaria Sabor & Arte", category: "Padaria", mentions: 89, avatar: "🥖" },
  { id: "b2", name: "Café do Bairro", category: "Cafeteria", mentions: 67, avatar: "☕" },
  { id: "b3", name: "Salão da Maria", category: "Beleza", mentions: 54, avatar: "💇" },
];

const posts = [
  {
    id: "1",
    author: "Maria Santos",
    avatar: "👩",
    badge: "🔥",
    title: "Dica de atendimento ao cliente",
    preview: "Descobri uma forma incrível de fidelizar clientes usando um simples caderno de anotações...",
    comments: 12,
    likes: 45,
    time: "2h atrás",
    category: "Dica",
  },
  {
    id: "2",
    author: "João Oliveira",
    avatar: "👨",
    badge: "⭐",
    title: "Como precificar seus produtos",
    preview: "Estava tendo dificuldade com preços até encontrar esse método simples que mudou meu negócio...",
    comments: 8,
    likes: 32,
    time: "5h atrás",
    category: "Tutorial",
  },
  {
    id: "3",
    author: "Ana Costa",
    avatar: "👩‍🦱",
    badge: "💎",
    title: "Alguém mais teve problema com fornecedor?",
    preview: "Preciso de indicações de fornecedores confiáveis para produtos de beleza na região...",
    comments: 15,
    likes: 28,
    time: "1d atrás",
    category: "Pergunta",
  },
  {
    id: "4",
    author: "Carlos Souza",
    avatar: "👨‍🍳",
    title: "Receita de sucesso: Pão artesanal",
    preview: "Compartilhando minha receita de pão que mais vende! Fermentação natural de 24h...",
    comments: 23,
    likes: 78,
    time: "2d atrás",
    category: "Receita",
  },
];

const categoryColors = {
  "Dica": "bg-primary/10 text-primary",
  "Tutorial": "bg-secondary/10 text-secondary",
  "Pergunta": "bg-warning/10 text-warning",
  "Receita": "bg-success/10 text-success",
};

export default function EntrepreneurCommunity() {
  const [activeTab, setActiveTab] = useState<"forum" | "tips" | "support">("forum");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/empreendedor" className="text-secondary hover:text-secondary/80 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="font-display font-bold text-xl text-foreground">Comunidade</h1>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Buscar na comunidade..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 rounded-xl"
          />
        </div>
      </div>

      {/* Top Creators */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Crown size={18} className="text-warning" />
            <h3 className="font-display font-bold text-foreground">Top Creators</h3>
          </div>
          <Link to="#" className="text-sm text-primary font-medium flex items-center gap-1">
            Ver todos <ChevronRight size={16} />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {topCreators.map((creator, index) => (
            <div
              key={creator.id}
              className="flex-shrink-0 w-28 p-3 rounded-2xl bg-card border border-border text-center"
            >
              <div className="relative inline-block mb-2">
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-2xl">
                  {creator.avatar}
                </div>
                <div className="absolute -top-1 -right-1 text-lg">{creator.badge}</div>
                {index === 0 && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-warning text-warning-foreground text-[10px] font-bold">
                    #1
                  </div>
                )}
              </div>
              <p className="font-semibold text-foreground text-sm truncate">{creator.name}</p>
              <p className="text-xs text-muted-foreground">{creator.followers} seguidores</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Businesses */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Store size={18} className="text-primary" />
            <h3 className="font-display font-bold text-foreground">Negócios em Alta</h3>
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {topBusinesses.map((business) => (
            <div
              key={business.id}
              className="flex-shrink-0 p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center text-xl">
                {business.avatar}
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{business.name}</p>
                <div className="flex items-center gap-1 text-xs text-primary">
                  <TrendingUp size={12} />
                  <span>{business.mentions} menções</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 bg-muted p-1 rounded-xl">
          {[
            { id: "forum", label: "Fórum" },
            { id: "tips", label: "Dicas" },
            { id: "support", label: "Suporte" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "flex-1 py-2 rounded-lg text-sm font-semibold transition-all",
                activeTab === tab.id
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="px-4 space-y-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 rounded-2xl bg-card border border-border hover:border-primary/20 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xl">
                  {post.avatar}
                </div>
                {post.badge && (
                  <div className="absolute -bottom-1 -right-1 text-sm">{post.badge}</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-semibold text-foreground text-sm">{post.author}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{post.time}</span>
                  {post.category && (
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium",
                      categoryColors[post.category as keyof typeof categoryColors]
                    )}>
                      {post.category}
                    </span>
                  )}
                </div>
                <h3 className="font-display font-bold text-foreground mb-1">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.preview}</p>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Heart size={14} />
                    <span className="text-xs">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <MessageCircle size={14} />
                    <span className="text-xs">{post.comments}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAB */}
      <Link 
        to="/empreendedor/postar"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
      >
        <Plus size={24} />
      </Link>
    </div>
  );
}
