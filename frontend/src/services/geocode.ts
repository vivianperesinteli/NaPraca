/**
 * Geocoding com Nominatim (OpenStreetMap) - gratuito, sem API key.
 * Respeitar: https://operations.osmfoundation.org/policies/nominatim/ (1 req/seg, User-Agent)
 */

const NOMINATIM_SEARCH = "https://nominatim.openstreetmap.org/search";
const NOMINATIM_REVERSE = "https://nominatim.openstreetmap.org/reverse";
const USER_AGENT = "NaPraca/1.0 (contato@napraca.app)";

export interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
  type?: string;
}

export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  const params = new URLSearchParams({
    q: address,
    format: "json",
    limit: "1",
  });
  try {
    const res = await fetch(`${NOMINATIM_SEARCH}?${params}`, {
      headers: { "User-Agent": USER_AGENT },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as NominatimResult[];
    if (!data?.length) return null;
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  } catch {
    return null;
  }
}

/** Resposta do reverse: address contém neighbourhood, suburb, city, etc. */
interface NominatimReverseAddress {
  neighbourhood?: string;
  suburb?: string;
  village?: string;
  city?: string;
  town?: string;
  municipality?: string;
  state?: string;
  country?: string;
}

export interface ReverseGeocodeResult {
  neighborhood: string;
  city: string;
}

/**
 * Converte coordenadas em bairro e cidade (geocodificação reversa).
 * Usa Nominatim (gratuito). Chamar apenas quando tiver a localização do usuário.
 */
export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<ReverseGeocodeResult | null> {
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lng),
    format: "json",
    addressdetails: "1",
  });
  try {
    const res = await fetch(`${NOMINATIM_REVERSE}?${params}`, {
      headers: { "User-Agent": USER_AGENT },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { address?: NominatimReverseAddress };
    const addr = data?.address;
    if (!addr) return null;
    const neighborhood =
      addr.neighbourhood ?? addr.suburb ?? addr.village ?? addr.municipality ?? "";
    const city =
      addr.city ?? addr.town ?? addr.municipality ?? addr.state ?? addr.country ?? "";
    return {
      neighborhood: neighborhood || "Sua região",
      city: city || "—",
    };
  } catch {
    return null;
  }
}
