import { Star, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface BusinessCardProps {
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  distance: string;
  isOpen: boolean;
  image: string;
  onClick?: () => void;
}

export function BusinessCard({
  name,
  category,
  rating,
  reviewCount,
  distance,
  isOpen,
  image,
  onClick,
}: BusinessCardProps) {
  return (
    <button
      onClick={onClick}
      className="group flex-shrink-0 w-40 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-2 shadow-sm">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          className={cn(
            "absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium",
            isOpen
              ? "bg-success/90 text-success-foreground"
              : "bg-muted/90 text-muted-foreground"
          )}
        >
          {isOpen ? "Aberto" : "Fechado"}
        </div>
      </div>

      {/* Info */}
      <div>
        <h3 className="font-display font-bold text-foreground truncate mb-0.5">
          {name}
        </h3>
        <p className="text-xs text-muted-foreground mb-1.5">{category}</p>

        <div className="flex items-center gap-2 text-xs">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star size={12} className="text-warning fill-warning" />
            <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({reviewCount})</span>
          </div>

          <span className="text-muted-foreground">•</span>

          {/* Distance */}
          <div className="flex items-center gap-0.5 text-muted-foreground">
            <MapPin size={10} />
            <span>{distance}</span>
          </div>
        </div>
      </div>
    </button>
  );
}
