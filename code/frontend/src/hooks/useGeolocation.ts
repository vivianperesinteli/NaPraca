import { useState, useEffect, useCallback } from "react";

export interface GeoPosition {
  lat: number;
  lng: number;
  accuracy?: number;
}

export interface UseGeolocationResult {
  position: GeoPosition | null;
  loading: boolean;
  error: string | null;
  requestLocation: () => void;
}

/** Hook para obter a localização atual do dispositivo (navegador). Sem API key. */
export function useGeolocation(options?: { enableHighAccuracy?: boolean }): UseGeolocationResult {
  const [position, setPosition] = useState<GeoPosition | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Seu navegador não suporta geolocalização.");
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
        setLoading(false);
      },
      (err) => {
        const message =
          err.code === 1
            ? "Permissão de localização negada. Ative no navegador para ver o mapa."
            : err.code === 2
              ? "Localização indisponível."
              : "Não foi possível obter sua localização.";
        setError(message);
        setLoading(false);
      },
      { enableHighAccuracy: options?.enableHighAccuracy ?? true, timeout: 10000, maximumAge: 60000 }
    );
  }, [options?.enableHighAccuracy]);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  return { position, loading, error, requestLocation };
}
