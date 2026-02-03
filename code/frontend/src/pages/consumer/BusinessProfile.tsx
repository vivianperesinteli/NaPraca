import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Star, MapPin, Clock, Phone, Navigation, MessageCircle, ShoppingBag, ChevronRight, ThumbsUp, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import businessBakery from "@/assets/business-bakery.jpg";
import businessCafe from "@/assets/business-cafe.jpg";

// Mock data
const business = {
  id: "1",
  name: "Padaria Sabor & Arte",
  category: "Padaria",
  rating: 4.8,
  reviewCount: 127,
  isOpen: true,
  address: "Rua das Flores, 123 - Centro",
  phone: "(11) 99999-9999",
  hours: "06:00 - 20:00",
  description: "A melhor padaria do bairro! Pães fresquinhos todos os dias, doces artesanais e café especial. Venha nos visitar!",
  image: businessBakery,
  owner: {
    name: "Carlos Souza",
    avatar: "👨‍🍳",
    since: "2018",
    description: "Padeiro há 15 anos, apaixonado por criar receitas que trazem memórias afetivas.",
  },
  products: [
    { id: "p1", name: "Pão Francês", price: 0.80, image: "🥖", category: "Pães" },
    { id: "p2", name: "Croissant", price: 5.50, image: "🥐", category: "Pães" },
    { id: "p3", name: "Bolo de Chocolate", price: 8.00, image: "🍰", category: "Doces" },
    { id: "p4", name: "Café Expresso", price: 4.50, image: "☕", category: "Bebidas" },
    { id: "p5", name: "Sonho de Creme", price: 6.00, image: "🍩", category: "Doces" },
    { id: "p6", name: "Pão de Queijo", price: 3.50, image: "🧀", category: "Salgados" },
  ],
  reviews: [
    { id: "r1", user: "Ana M.", avatar: "👩", rating: 5, date: "2 dias atrás", text: "Melhor pão francês da região! Sempre fresquinho e crocante.", likes: 12 },
    { id: "r2", user: "João P.", avatar: "👨", rating: 4, date: "1 semana atrás", text: "Ótimo atendimento, preços justos. Só acho que poderia abrir mais cedo.", likes: 5 },
    { id: "r3", user: "Maria L.", avatar: "👩‍🦱", rating: 5, date: "2 semanas atrás", text: "O bolo de chocolate é divino! Já encomendei para aniversários.", likes: 8 },
  ],
  posts: [
    { id: "post1", image: businessBakery, text: "Hoje temos pão italiano fresquinho! 🥖", likes: 45, comments: 12, time: "3h atrás" },
    { id: "post2", image: businessCafe, text: "Novo café especial da casa! Venha experimentar ☕", likes: 32, comments: 8, time: "1d atrás" },
  ],
};

const productCategories = ["Todos", "Pães", "Doces", "Salgados", "Bebidas"];

export default function BusinessProfile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"about" | "catalog" | "reviews" | "feed">("about");
  const [activeProductCategory, setActiveProductCategory] = useState("Todos");
  const [isFavorite, setIsFavorite] = useState(false);

  const filteredProducts = activeProductCategory === "Todos" 
    ? business.products 
    : business.products.filter(p => p.category === activeProductCategory);

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Hero Image */}
      <div className="relative h-56">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        
        {/* Navigation */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Link
            to="/consumidor"
            className="w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center"
          >
            <ArrowLeft size={20} className="text-foreground" />
          </Link>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center">
              <Share2 size={20} className="text-foreground" />
            </button>
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center"
            >
              <Heart size={20} className={isFavorite ? "text-destructive fill-destructive" : "text-foreground"} />
            </button>
          </div>
        </div>

        {/* Profile Image */}
        <div className="absolute -bottom-12 left-4">
          <div className="w-24 h-24 rounded-2xl bg-card border-4 border-background shadow-lg overflow-hidden">
            <img src={business.image} alt={business.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-16">
        {/* Header Info */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
              {business.category}
            </span>
            <h1 className="font-display font-bold text-xl text-foreground">{business.name}</h1>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            business.isOpen ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
          }`}>
            {business.isOpen ? "Aberto" : "Fechado"}
          </div>
        </div>

        {/* Rating & Quick Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-warning fill-warning" />
            <span className="font-bold text-foreground">{business.rating}</span>
            <span className="text-muted-foreground">({business.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin size={14} />
            <span className="text-sm">350m</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-muted rounded-xl mb-4">
          {[
            { id: "about", label: "Sobre" },
            { id: "catalog", label: "Catálogo" },
            { id: "reviews", label: "Avaliações" },
            { id: "feed", label: "Feed" },
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

        {/* Tab Content */}
        {activeTab === "about" && (
          <div className="space-y-4">
            {/* Owner/Host Card */}
            <div className="p-4 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                  {business.owner.avatar}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Administrador</p>
                  <h4 className="font-display font-bold text-foreground">{business.owner.name}</h4>
                  <p className="text-xs text-primary">Desde {business.owner.since}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{business.owner.description}</p>
            </div>

            {/* Info Cards */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                <MapPin size={20} className="text-secondary" />
                <span className="text-foreground text-sm">{business.address}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                <Clock size={20} className="text-secondary" />
                <span className="text-foreground text-sm">{business.hours}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                <Phone size={20} className="text-secondary" />
                <span className="text-foreground text-sm">{business.phone}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-display font-bold text-foreground mb-2">Sobre</h3>
              <p className="text-muted-foreground text-sm">{business.description}</p>
            </div>
          </div>
        )}

        {activeTab === "catalog" && (
          <div>
            {/* Product Categories */}
            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
              {productCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveProductCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                    activeProductCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Products Grid - iFood Style */}
            <div className="space-y-3">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center text-3xl">
                    {product.image}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{product.name}</h4>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                    <p className="font-bold text-primary mt-1">
                      R$ {product.price.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="rounded-full">
                    <ShoppingBag size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-4">
            {/* Rating Summary */}
            <div className="p-4 rounded-2xl bg-card border border-border flex items-center gap-4">
              <div className="text-center">
                <p className="text-4xl font-bold text-foreground">{business.rating}</p>
                <div className="flex gap-0.5 justify-center my-1">
                  {[1,2,3,4,5].map((star) => (
                    <Star 
                      key={star} 
                      size={14} 
                      className={star <= Math.round(business.rating) ? "text-warning fill-warning" : "text-muted"} 
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{business.reviewCount} avaliações</p>
              </div>
              <div className="flex-1">
                <Button className="w-full">
                  <Star size={16} className="mr-2" />
                  Avaliar
                </Button>
              </div>
            </div>

            {/* Reviews List */}
            {business.reviews.map((review) => (
              <div key={review.id} className="p-4 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">
                    {review.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-sm">{review.user}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((star) => (
                          <Star 
                            key={star} 
                            size={10} 
                            className={star <= review.rating ? "text-warning fill-warning" : "text-muted"} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{review.text}</p>
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <ThumbsUp size={12} />
                  <span>{review.likes}</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "feed" && (
          <div className="space-y-4">
            {business.posts.map((post) => (
              <div key={post.id} className="rounded-2xl bg-card border border-border overflow-hidden">
                <img src={post.image} alt="" className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="text-foreground text-sm mb-3">{post.text}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                        <Heart size={16} />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                        <MessageCircle size={16} />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                    </div>
                    <span className="text-xs text-muted-foreground">{post.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-12 rounded-xl border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
            <Phone size={18} className="mr-2" />
            Ligar
          </Button>
          <Button className="h-12 rounded-xl">
            <Navigation size={18} className="mr-2" />
            Como Chegar
          </Button>
        </div>
      </div>
    </div>
  );
}
