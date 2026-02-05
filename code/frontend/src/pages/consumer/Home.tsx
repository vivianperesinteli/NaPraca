import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, Filter, MapPin, Navigation, ChevronRight, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ConsumerNav } from "@/components/layout/ConsumerNav";
import { BusinessCard } from "@/components/cards/BusinessCard";
import { CategoryChip } from "@/components/cards/CategoryChip";
import { Coffee, Utensils, Scissors, ShoppingBag, Wrench, Heart, Cake, Car, Home, MoreHorizontal } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getAllBusinesses, searchBusinesses } from "@/services/api";
import { MapView, type MapMarker } from "@/components/map/MapView";
import { useGeolocation } from "@/hooks/useGeolocation";
import { reverseGeocode } from "@/services/geocode";
import type { BusinessModel } from "@backend/data/models/BusinessModel";

import businessBakery from "@/assets/business-bakery.jpg";
import businessCafe from "@/assets/business-cafe.jpg";
import businessSalon from "@/assets/business-salon.jpg";
import businessMercado from "@/assets/business-mercado.jpg";

const mainCategories = [
  { id: "all", label: "Todos", icon: ShoppingBag },
  { id: "food", label: "Comida", icon: Utensils },
  { id: "cafe", label: "Cafés", icon: Coffee },
  { id: "beauty", label: "Beleza", icon: Scissors },
];

const moreCategories = [
  { id: "services", label: "Serviços", icon: Wrench },
  { id: "health", label: "Saúde", icon: Heart },
  { id: "bakery", label: "Padarias", icon: Cake },
  { id: "auto", label: "Auto", icon: Car },
  { id: "home", label: "Casa", icon: Home },
];

const defaultImages = [businessBakery, businessCafe, businessSalon, businessMercado];
function imageFor(business: BusinessModel, index: number) {
  return business.cover_image_url || defaultImages[index % defaultImages.length];
}

export default function ConsumerHome() {
  const { profile } = useAuth();
  const { position: userPosition } = useGeolocation();
  const [businesses, setBusinesses] = useState<BusinessModel[]>([]);
  const [locationLabel, setLocationLabel] = useState<{ neighborhood: string; city: string } | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const navigate = useNavigate();

  const mapMarkers: MapMarker[] = businesses
    .filter((b) => b.latitude != null && b.longitude != null && b.latitude !== 0 && b.longitude !== 0)
    .slice(0, 50)
    .map((b) => ({
      id: b.id,
      lat: Number(b.latitude),
      lng: Number(b.longitude),
      title: b.name,
      subtitle: b.category,
    }));

  useEffect(() => {
    if (searchQuery.trim()) {
      searchBusinesses(searchQuery, activeCategory !== "all" ? activeCategory : undefined).then(setBusinesses);
    } else {
      getAllBusinesses().then(setBusinesses);
    }
  }, [searchQuery, activeCategory]);

  useEffect(() => {
    if (!userPosition) return;
    reverseGeocode(userPosition.lat, userPosition.lng).then((result) => {
      if (result) setLocationLabel(result);
    });
  }, [userPosition]);

  const neighborhood = {
    name: locationLabel?.neighborhood ?? profile?.neighborhood ?? "Seu Bairro",
    city: locationLabel?.city ?? "—",
    businessCount: businesses.length,
    discoveredCount: Math.min(businesses.length, 12),
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header with Neighborhood */}
      <div className="bg-gradient-to-br from-secondary to-secondary/90 px-4 pt-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-secondary-foreground/80 text-sm">Você está em</p>
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-primary" />
              <h1 className="font-display font-bold text-xl text-secondary-foreground">
                {neighborhood.name}
              </h1>
            </div>
            <p className="text-secondary-foreground/70 text-xs">{neighborhood.city}</p>
          </div>
          <Link 
            to="/consumidor/raspadinha"
            className="flex flex-col items-center p-3 rounded-2xl bg-primary/20 hover:bg-primary/30 transition-colors"
          >
            <Sparkles size={24} className="text-primary mb-1" />
            <span className="text-xs text-secondary-foreground font-medium">
              {neighborhood.discoveredCount}/{neighborhood.businessCount}
            </span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            type="text"
            placeholder="O que você procura?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12 h-12 rounded-2xl bg-card border-border shadow-lg"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <Filter size={16} className="text-primary-foreground" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-foreground">Categorias</h3>
          <button 
            onClick={() => setShowMoreCategories(!showMoreCategories)}
            className="flex items-center gap-1 text-sm text-primary font-medium"
          >
            {showMoreCategories ? "Ver menos" : "Ver mais"}
            <ChevronRight size={16} className={`transition-transform ${showMoreCategories ? "rotate-90" : ""}`} />
          </button>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {mainCategories.map((cat) => (
            <CategoryChip
              key={cat.id}
              label={cat.label}
              icon={cat.icon}
              isActive={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
          {!showMoreCategories && (
            <button
              onClick={() => setShowMoreCategories(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground whitespace-nowrap hover:bg-muted/80 transition-colors"
            >
              <MoreHorizontal size={18} />
              <span className="text-sm font-medium">Mais</span>
            </button>
          )}
        </div>

        {/* Expanded categories */}
        {showMoreCategories && (
          <div className="flex gap-2 overflow-x-auto pt-2 pb-2 scrollbar-hide animate-fade-in">
            {moreCategories.map((cat) => (
              <CategoryChip
                key={cat.id}
                label={cat.label}
                icon={cat.icon}
                isActive={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Map Preview */}
      <div className="px-4 mb-4">
        <div className="relative h-40 rounded-2xl overflow-hidden border border-border">
          <MapView
            height="100%"
            className="rounded-2xl"
            center={userPosition ? [userPosition.lat, userPosition.lng] : undefined}
            zoom={14}
            userLocation={userPosition}
            markers={mapMarkers}
            onMarkerClick={(id) => navigate(`/negocio/${id}`)}
          />
          <Link
            to="/consumidor/mapa"
            className="absolute bottom-3 right-3 px-4 py-2 rounded-xl bg-card/90 backdrop-blur shadow-md flex items-center gap-2 hover:bg-card transition-colors"
          >
            <Navigation size={16} className="text-secondary" />
            <span className="text-sm font-medium text-foreground">Ver mapa</span>
          </Link>
        </div>
      </div>

      {/* Nearby List */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-foreground">Perto de você</h3>
          <span className="text-sm text-muted-foreground">{businesses.length} negócios</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {businesses.map((business, index) => (
            <BusinessCard
              key={business.id}
              name={business.name}
              category={business.category}
              rating={4.5}
              reviewCount={0}
              distance="—"
              isOpen={business.is_active}
              image={imageFor(business, index)}
              onClick={() => navigate(`/negocio/${business.id}`)}
            />
          ))}
        </div>
      </div>

      {/* Quick Discovery Banner */}
      <div className="px-4 mt-4">
        <Link 
          to="/consumidor/raspadinha"
          className="block p-4 rounded-2xl bg-gradient-to-r from-primary to-accent"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Sparkles size={24} className="text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h4 className="font-display font-bold text-primary-foreground">Raspadinha do Bairro</h4>
              <p className="text-sm text-primary-foreground/80">
                Descubra {neighborhood.businessCount - neighborhood.discoveredCount} negócios e ganhe recompensas!
              </p>
            </div>
            <ChevronRight size={24} className="text-primary-foreground" />
          </div>
        </Link>
      </div>

      <ConsumerNav activeTab="home" />
    </div>
  );
}
