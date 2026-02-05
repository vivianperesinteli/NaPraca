import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

const DEFAULT_CENTER: [number, number] = [-23.5505, -46.6333];
const DEFAULT_ZOOM = 13;

// Corrige ícones do Leaflet em bundlers (Vite/Webpack)
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

const userLocationIcon = L.divIcon({
  className: "user-location-marker",
  html: `<div style="
    width: 20px; height: 20px;
    background: #0d9488;
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  "></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  subtitle?: string;
}

interface MapViewProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  userLocation?: { lat: number; lng: number } | null;
  className?: string;
  height?: string;
  onMarkerClick?: (id: string) => void;
  /** Se definido, clicar no mapa define a localização (ex.: empreendedor) */
  onMapClick?: (lat: number, lng: number) => void;
  /** Marcador único arrastável (ex.: empreendedor definindo endereço) */
  singleMarker?: { lat: number; lng: number } | null;
  onSingleMarkerMove?: (lat: number, lng: number) => void;
}

function MapResizeFix() {
  const map = useMap();
  useEffect(() => {
    const t = setTimeout(() => {
      map.invalidateSize();
    }, 100);
    return () => clearTimeout(t);
  }, [map]);
  return null;
}

function FitBounds({ markers, userLocation }: { markers?: MapMarker[]; userLocation?: { lat: number; lng: number } | null }) {
  const map = useMap();
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    const points: [number, number][] = [];
    if (userLocation) points.push([userLocation.lat, userLocation.lng]);
    markers?.forEach((m) => points.push([m.lat, m.lng]));
    if (points.length < 2) return;
    done.current = true;
    map.fitBounds(points, { padding: [40, 40], maxZoom: 15 });
  }, [map, markers, userLocation]);
  return null;
}

function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  const map = useMap();
  useEffect(() => {
    const handler = (e: L.LeafletMouseEvent) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    };
    map.on("click", handler);
    return () => map.off("click", handler);
  }, [map, onMapClick]);
  return null;
}

export function MapView({
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  markers = [],
  userLocation = null,
  className = "",
  height = "300px",
  onMarkerClick,
  onMapClick,
  singleMarker,
  onSingleMarkerMove,
}: MapViewProps) {
  const hasUserLoc = userLocation != null;
  const hasMarkers = markers.length > 0 || singleMarker;
  const mapCenter: [number, number] =
    hasUserLoc ? [userLocation.lat, userLocation.lng] : singleMarker ? [singleMarker.lat, singleMarker.lng] : markers[0] ? [markers[0].lat, markers[0].lng] : center;

  return (
    <div className={className} style={{ height, minHeight: 300 }}>
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        style={{ height: "100%", width: "100%", borderRadius: "1rem" }}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapResizeFix />
        {!singleMarker && (markers.length > 0 || userLocation) && (
          <FitBounds markers={markers} userLocation={userLocation} />
        )}

        {onMapClick && <MapClickHandler onMapClick={onMapClick} />}

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userLocationIcon} zIndexOffset={1000}>
            <Popup>Sua localização</Popup>
          </Marker>
        )}

        {singleMarker && onSingleMarkerMove && (
          <DraggableMarker position={singleMarker} onMove={onSingleMarkerMove} />
        )}

        {!singleMarker &&
          markers.map((m) => (
            <Marker
              key={m.id}
              position={[m.lat, m.lng]}
              eventHandlers={
                onMarkerClick
                  ? {
                      click: () => onMarkerClick(m.id),
                    }
                  : undefined
              }
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold">{m.title}</p>
                  {m.subtitle && <p className="text-muted-foreground">{m.subtitle}</p>}
                  {onMarkerClick && (
                    <button
                      type="button"
                      className="mt-1 text-primary font-medium"
                      onClick={() => onMarkerClick(m.id)}
                    >
                      Ver detalhes
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

function DraggableMarker({
  position,
  onMove,
}: {
  position: { lat: number; lng: number };
  onMove: (lat: number, lng: number) => void;
}) {
  const markerRef = useRef<L.Marker>(null);
  const eventHandlers = useRef({
    dragend() {
      const m = markerRef.current;
      if (m) {
        const latlng = m.getLatLng();
        onMove(latlng.lat, latlng.lng);
      }
    },
  });
  return (
    <Marker
      ref={markerRef}
      position={[position.lat, position.lng]}
      draggable
      eventHandlers={eventHandlers.current}
    >
      <Popup>Arraste para ajustar a localização do seu negócio</Popup>
    </Marker>
  );
}
