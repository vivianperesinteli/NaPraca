import { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Navigation, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EntrepreneurNav } from "@/components/layout/EntrepreneurNav";
import { MapView, type MapMarker } from "@/components/map/MapView";
import { useGeolocation } from "@/hooks/useGeolocation";
import { getBusinessesByEntrepreneur } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import type { BusinessModel } from "@backend/data/models/BusinessModel";

export default function EntrepreneurMapPage() {
  const navigate = useNavigate();
  const { profile, loading: authLoading } = useAuth();
  const { position: userPosition, loading: locLoading, error: locError, requestLocation } = useGeolocation();
  const [businesses, setBusinesses] = useState<BusinessModel[]>([]);

  const entrepreneurId = profile?.profile_type === "entrepreneur" ? profile?.id : null;

  const loadBusinesses = useCallback(async () => {
    // Não executar se ainda estiver carregando o profile
    if (authLoading) return;
    
    // Não executar se não houver entrepreneurId
    if (!entrepreneurId) {
      setBusinesses([]);
      return;
    }
    
    try {
      const list = await getBusinessesByEntrepreneur(entrepreneurId);
      setBusinesses(list);
    } catch (error) {
      console.error("Erro ao carregar negócios para o mapa:", error);
      setBusinesses([]);
    }
  }, [entrepreneurId, authLoading]);

  useEffect(() => {
    // Aguardar o profile carregar antes de buscar negócios
    loadBusinesses();
  }, [loadBusinesses]);

  // Recarregar quando a página receber foco ou quando um negócio for criado/atualizado
  useEffect(() => {
    if (!entrepreneurId) return;
    
    const handleFocus = () => {
      loadBusinesses();
    };
    
    const handleBusinessCreated = () => {
      loadBusinesses();
    };
    
    window.addEventListener('focus', handleFocus);
    window.addEventListener('businessCreated', handleBusinessCreated);
    window.addEventListener('businessUpdated', handleBusinessCreated);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('businessCreated', handleBusinessCreated);
      window.removeEventListener('businessUpdated', handleBusinessCreated);
    };
  }, [entrepreneurId, loadBusinesses]);

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
        <Link to="/empreendedor" className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors">
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
        {businesses.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground text-center">
              Você ainda não tem negócios cadastrados.<br />
              <Link to="/empreendedor/negocio" className="text-primary underline">
                Cadastre seu primeiro negócio
              </Link>
            </p>
          </div>
        ) : (
          <MapView
            className="min-h-[400px]"
            height="100%"
            center={markers.length > 0 ? undefined : [-23.5505, -46.6333]}
            zoom={markers.length > 0 ? undefined : 13}
            userLocation={userPosition}
            markers={markers}
            onMarkerClick={(id) => navigate(`/empreendedor/negocio/${id}`)}
          />
        )}
      </div>

      <div className="px-4 pb-2 shrink-0">
        <p className="text-xs text-muted-foreground text-center">
          {markers.length} {markers.length === 1 ? "negócio" : "negócios"} no mapa • Sua localização em verde
        </p>
      </div>

      <EntrepreneurNav activeTab="map" />
    </div>
  );
}
