import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Navigation, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsumerNav } from "@/components/layout/ConsumerNav";
import { MapView, type MapMarker } from "@/components/map/MapView";
import { useGeolocation } from "@/hooks/useGeolocation";
import { getAllBusinesses } from "@/services/api";
import type { BusinessModel } from "@backend/data/models/BusinessModel";

export default function ConsumerMapPage() {
  const navigate = useNavigate();
  const { position: userPosition, loading: locLoading, error: locError, requestLocation } = useGeolocation();
  const [businesses, setBusinesses] = useState<BusinessModel[]>([]);

  useEffect(() => {
    getAllBusinesses().then(setBusinesses);
  }, []);

  const markers: MapMarker[] = businesses
    .filter((b) => b.latitude != null && b.longitude != null && b.latitude !== 0 && b.longitude !== 0)
    .map((b) => ({
      id: b.id,
      lat: Number(b.latitude),
      lng: Number(b.longitude),
      title: b.name,
      subtitle: b.category,
    }));

  return (
    <div className="min-h-screen bg-background pb-24 flex flex-col">
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between shrink-0">
        <Link to="/consumidor" className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft size={24} className="text-foreground" />
        </Link>
        <h1 className="font-display font-bold text-lg text-foreground">Mapa</h1>
        <button
          type="button"
          onClick={requestLocation}
          disabled={locLoading}
          className="p-2 rounded-xl hover:bg-muted transition-colors"
          title="Atualizar minha localização"
        >
          <RefreshCw size={20} className={locLoading ? "animate-spin text-muted-foreground" : "text-foreground"} />
        </button>
      </div>

      {locError && (
        <div className="mx-4 mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-800 dark:text-amber-200">
          {locError}
          <Button variant="outline" size="sm" className="mt-2 w-full" onClick={requestLocation}>
            Tentar novamente
          </Button>
        </div>
      )}

      <div className="flex-1 min-h-[400px] px-4 py-4">
        <MapView
          className="min-h-[400px]"
          height="100%"
          userLocation={userPosition}
          markers={markers}
          onMarkerClick={(id) => navigate(`/negocio/${id}`)}
        />
      </div>

      <div className="px-4 pb-2 shrink-0">
        <p className="text-xs text-muted-foreground text-center">
          {markers.length} negócios no mapa • Sua localização em verde
        </p>
      </div>

      <ConsumerNav activeTab="map" />
    </div>
  );
}
