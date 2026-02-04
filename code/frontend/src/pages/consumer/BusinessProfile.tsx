import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Star, MapPin, Clock, Phone, Navigation, ShoppingBag, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  getBusinessById,
  recordBusinessEvent,
  getCatalogByBusiness,
  getPostsByBusiness,
  getReviewsByBusiness,
  getReviewStatsByBusiness,
} from "@/services/api";
import type { BusinessModel } from "@backend/data/models/BusinessModel";
import type { CatalogItemModel } from "@backend/data/models/CatalogItemModel";
import type { BusinessPostModel } from "@backend/data/models/BusinessPostModel";
import type { BusinessReviewModel } from "@backend/data/models/BusinessReviewModel";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import businessBakery from "@/assets/business-bakery.jpg";

export default function BusinessProfile() {
  const { id } = useParams();
  const { profile } = useAuth();
  const [business, setBusiness] = useState<BusinessModel | null>(null);
  const [catalog, setCatalog] = useState<CatalogItemModel[]>([]);
  const [posts, setPosts] = useState<BusinessPostModel[]>([]);
  const [reviews, setReviews] = useState<BusinessReviewModel[]>([]);
  const [reviewStats, setReviewStats] = useState({ averageRating: 0, count: 0 });
  const [activeTab, setActiveTab] = useState<"about" | "catalog" | "reviews" | "feed">("about");
  const [activeProductCategory, setActiveProductCategory] = useState("Todos");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!id) return;
    getBusinessById(id).then((b) => {
      setBusiness(b ?? null);
      if (b) recordBusinessEvent(b.id, "view", profile?.id);
    });
  }, [id, profile?.id]);

  useEffect(() => {
    if (!id) return;
    getCatalogByBusiness(id).then(setCatalog);
    getPostsByBusiness(id).then(setPosts);
    getReviewsByBusiness(id).then(setReviews);
    getReviewStatsByBusiness(id).then(setReviewStats);
  }, [id]);

  const productCategories = useMemo(() => {
    const cats = Array.from(new Set(catalog.map((p) => p.category).filter(Boolean)));
    return ["Todos", ...cats.sort()];
  }, [catalog]);

  const filteredProducts = activeProductCategory === "Todos"
    ? catalog
    : catalog.filter((p) => p.category === activeProductCategory);

  const display = business
    ? {
        name: business.name,
        category: business.category,
        rating: reviewStats.averageRating,
        reviewCount: reviewStats.count,
        isOpen: business.is_active,
        address: business.address,
        phone: business.phone ?? "—",
        hours: "06:00 - 20:00",
        description: business.description,
        image: business.cover_image_url || business.logo_url || businessBakery,
      }
    : null;

  if (!display) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  const heroImage = typeof display.image === "string" && display.image.startsWith("http")
    ? display.image
    : businessBakery;

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Hero Image */}
      <div className="relative h-56">
        <img
          src={heroImage}
          alt={display.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />

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
              onClick={() => {
                const next = !isFavorite;
                setIsFavorite(next);
                if (next && business) recordBusinessEvent(business.id, "favorite", profile?.id);
              }}
              className="w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center"
            >
              <Heart size={20} className={isFavorite ? "text-destructive fill-destructive" : "text-foreground"} />
            </button>
          </div>
        </div>

        <div className="absolute -bottom-12 left-4">
          <div className="w-24 h-24 rounded-2xl bg-card border-4 border-background shadow-lg overflow-hidden">
            <img src={heroImage} alt={display.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-16">
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
              {display.category}
            </span>
            <h1 className="font-display font-bold text-xl text-foreground">{display.name}</h1>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            display.isOpen ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
          }`}>
            {display.isOpen ? "Aberto" : "Fechado"}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-warning fill-warning" />
            <span className="font-bold text-foreground">{display.rating}</span>
            <span className="text-muted-foreground">({display.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin size={14} />
            <span className="text-sm">—</span>
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
            <div className="p-4 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                  🏪
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Negócio</p>
                  <h4 className="font-display font-bold text-foreground">{display.name}</h4>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{display.description}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                <MapPin size={20} className="text-secondary" />
                <span className="text-foreground text-sm">{display.address}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                <Clock size={20} className="text-secondary" />
                <span className="text-foreground text-sm">{display.hours}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                <Phone size={20} className="text-secondary" />
                <span className="text-foreground text-sm">{display.phone}</span>
              </div>
            </div>

            <div>
              <h3 className="font-display font-bold text-foreground mb-2">Sobre</h3>
              <p className="text-muted-foreground text-sm">{display.description}</p>
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
              {filteredProducts.length === 0 ? (
                <p className="text-muted-foreground text-sm py-4 text-center">Nenhum item no catálogo.</p>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center text-3xl overflow-hidden shrink-0">
                      {product.image_url ? (
                        <img src={product.image_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        "📦"
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground">{product.name}</h4>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                      <p className="font-bold text-primary mt-1">
                        R$ {Number(product.price).toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="rounded-full shrink-0">
                      <ShoppingBag size={16} />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-card border border-border flex items-center gap-4">
              <div className="text-center">
                <p className="text-4xl font-bold text-foreground">
                  {display.reviewCount > 0 ? display.rating.toFixed(1) : "—"}
                </p>
                <div className="flex gap-0.5 justify-center my-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={
                        display.reviewCount > 0 && star <= Math.round(display.rating)
                          ? "text-warning fill-warning"
                          : "text-muted"
                      }
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{display.reviewCount} avaliações</p>
              </div>
              <div className="flex-1">
                <Button className="w-full">
                  <Star size={16} className="mr-2" />
                  Avaliar
                </Button>
              </div>
            </div>

            {reviews.length === 0 ? (
              <p className="text-muted-foreground text-sm py-4">Nenhuma avaliação ainda.</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="p-4 rounded-2xl bg-card border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={10}
                          className={star <= review.rating ? "text-warning fill-warning" : "text-muted"}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(review.created_at), { addSuffix: true, locale: ptBR })}
                    </span>
                  </div>
                  {review.text && <p className="text-sm text-muted-foreground">{review.text}</p>}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "feed" && (
          <div className="space-y-4">
            {posts.length === 0 ? (
              <p className="text-muted-foreground text-sm py-4 text-center">Nenhuma publicação no feed.</p>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="rounded-2xl bg-card border border-border overflow-hidden">
                  {post.image_url && (
                    <img src={post.image_url} alt="" className="w-full h-40 object-cover" />
                  )}
                  <div className="p-4">
                    <p className="text-foreground text-sm mb-3 whitespace-pre-wrap">{post.text}</p>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ptBR })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Action Buttons - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border">
        <div className="grid grid-cols-2 gap-3">
          <a href={business?.phone ? `tel:${business.phone}` : "#"}>
            <Button variant="outline" className="h-12 rounded-xl border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground w-full">
              <Phone size={18} className="mr-2" />
              Ligar
            </Button>
          </a>
          <Button className="h-12 rounded-xl">
            <Navigation size={18} className="mr-2" />
            Como Chegar
          </Button>
        </div>
      </div>
    </div>
  );
}
