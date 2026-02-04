import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Store, MapPin, Phone, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { getBusinessesByEntrepreneur, createBusiness, updateBusiness, ensureMyProfileId } from "@/services/api";
import { geocodeAddress } from "@/services/geocode";
import { MapView } from "@/components/map/MapView";
import type { BusinessModel } from "@backend/data/models/BusinessModel";

const DEFAULT_LAT = -23.5505;
const DEFAULT_LNG = -46.6333;

export default function EntrepreneurBusinessEdit() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [business, setBusiness] = useState<BusinessModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [geocoding, setGeocoding] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(DEFAULT_LAT);
  const [longitude, setLongitude] = useState(DEFAULT_LNG);
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  const entrepreneurId = profile?.profileType === "entrepreneur" ? profile?.id : null;

  useEffect(() => {
    if (!entrepreneurId) {
      setLoading(false);
      return;
    }
    getBusinessesByEntrepreneur(entrepreneurId).then((list) => {
      setLoading(false);
      const first = list[0] ?? null;
      setBusiness(first);
      if (first) {
        setName(first.name);
        setCategory(first.category);
        setAddress(first.address);
        setLatitude(Number(first.latitude));
        setLongitude(Number(first.longitude));
        setPhone(first.phone ?? "");
        setDescription(first.description);
      }
    });
  }, [entrepreneurId]);

  const handleGeocode = async () => {
    if (!address.trim()) return;
    setGeocoding(true);
    const coords = await geocodeAddress(address.trim());
    setGeocoding(false);
    if (coords) {
      setLatitude(coords.lat);
      setLongitude(coords.lng);
    }
  };

  const handleMapClick = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  const handleMarkerMove = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  const handleSave = async () => {
    if (!name.trim() || !category.trim() || !address.trim()) {
      toast.error("Preencha nome, categoria e endereço.");
      return;
    }
    let effectiveEntrepreneurId = entrepreneurId;
    if (!effectiveEntrepreneurId) {
      setSaving(true);
      const profileId = await ensureMyProfileId();
      setSaving(false);
      if (!profileId) {
        if (profile?.profileType === "consumer") {
          toast.error("Você está logado como consumidor. Saia e entre com uma conta empreendedor.");
        } else {
          toast.error("Não foi possível identificar sua conta. Execute o SQL do projeto (supabase-ensure-profile-rpc.sql) no Supabase e tente de novo.");
        }
        return;
      }
      effectiveEntrepreneurId = profileId;
    }
    setSaving(true);
    try {
      if (business) {
        const { data: updated, error: updateError } = await updateBusiness(business.id, {
          name: name.trim(),
          category: category.trim(),
          address: address.trim(),
          latitude,
          longitude,
          phone: phone.trim() || undefined,
          description: description.trim(),
        });
        if (updated) {
          setBusiness(updated);
          toast.success("Negócio atualizado! As alterações já aparecem no mapa para os consumidores.");
          navigate("/empreendedor/perfil");
        } else {
          toast.error(updateError ?? "Não foi possível salvar. Tente novamente.");
        }
      } else {
        const { data: created, error: createError } = await createBusiness(effectiveEntrepreneurId, {
          name: name.trim(),
          description: description.trim() || "Sem descrição",
          category: category.trim(),
          address: address.trim(),
          latitude,
          longitude,
          phone: phone.trim() || undefined,
        });
        if (created) {
          setBusiness(created);
          toast.success("Negócio cadastrado! Ele já aparece no mapa para os consumidores.");
          navigate("/empreendedor/perfil");
        } else {
          toast.error(createError ?? "Não foi possível cadastrar. Verifique os dados e tente novamente.");
        }
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="relative h-40 bg-gradient-to-br from-muted to-muted/50">
        <Link
          to="/empreendedor/perfil"
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </Link>
        <div className="absolute bottom-4 right-4 text-sm text-muted-foreground">
          {business ? "Editar negócio" : "Cadastrar negócio"}
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {!entrepreneurId && profile?.profileType === "consumer" && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <p className="text-sm font-medium text-foreground">
              Você está logado como consumidor. Para cadastrar um negócio, saia e entre com uma conta empreendedor.
            </p>
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Nome do Negócio</label>
          <div className="relative">
            <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input value={name} onChange={(e) => setName(e.target.value)} className="pl-10 h-12 rounded-xl" placeholder="Ex: Padaria do Bairro" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Categoria</label>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input value={category} onChange={(e) => setCategory(e.target.value)} className="pl-10 h-12 rounded-xl" placeholder="Ex: Padaria, Cafeteria" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Endereço</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input value={address} onChange={(e) => setAddress(e.target.value)} className="pl-10 h-12 rounded-xl" placeholder="Rua, número, bairro, cidade" />
            </div>
            <Button type="button" variant="outline" className="shrink-0 h-12 rounded-xl" onClick={handleGeocode} disabled={geocoding || !address.trim()}>
              {geocoding ? <Loader2 size={18} className="animate-spin" /> : "Buscar"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Clique em &quot;Buscar&quot; para localizar no mapa ou arraste o marcador no mapa.</p>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Localização no mapa</label>
          <MapView
            height="220px"
            className="rounded-2xl border border-border overflow-hidden"
            center={[latitude, longitude]}
            zoom={15}
            singleMarker={{ lat: latitude, lng: longitude }}
            onSingleMarkerMove={handleMarkerMove}
            onMapClick={handleMapClick}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Telefone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-10 h-12 rounded-xl" placeholder="(11) 99999-9999" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Descrição</label>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-[100px] rounded-xl resize-none" placeholder="Descreva seu negócio..." />
        </div>

        <Button type="button" className="w-full h-12 rounded-xl text-base font-bold" onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 size={20} className="animate-spin mx-auto" /> : business ? "SALVAR ALTERAÇÕES" : "CADASTRAR NEGÓCIO"}
        </Button>
      </div>
    </div>
  );
}
