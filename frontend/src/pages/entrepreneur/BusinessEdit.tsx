import { useState, useEffect } from "react";
import { Link, useSearchParams, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Store,
  MapPin,
  Phone,
  FileText,
  Loader2,
  Package,
  MessageSquare,
  Star,
  Plus,
  Pencil,
  Trash2,
  ImagePlus,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/contexts/AuthContext";
import {
  getBusinessesByEntrepreneur,
  createBusiness,
  updateBusiness,
  ensureMyProfileId,
  getCatalogByBusiness,
  createCatalogItem,
  updateCatalogItem,
  deleteCatalogItem,
  getPostsByBusiness,
  createBusinessPost,
  updateBusinessPost,
  deleteBusinessPost,
  getReviewsByBusiness,
  getReviewStatsByBusiness,
} from "@/services/api";
import { geocodeAddress } from "@/services/geocode";
import { uploadBusinessImage } from "@/services/upload";
import { MapView } from "@/components/map/MapView";
import { cn } from "@/lib/utils";
import type { BusinessModel } from "@backend/data/models/BusinessModel";
import type { CatalogItemModel } from "@backend/data/models/CatalogItemModel";
import type { BusinessPostModel } from "@backend/data/models/BusinessPostModel";
import type { BusinessReviewModel } from "@backend/data/models/BusinessReviewModel";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

const DEFAULT_LAT = -23.5505;
const DEFAULT_LNG = -46.6333;

type TabId = "dados" | "catalog" | "feed" | "reviews";

export default function EntrepreneurBusinessEdit() {
  const { profile, loading: authLoading } = useAuth();
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [business, setBusiness] = useState<BusinessModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const tabFromUrl = searchParams.get("tab") as TabId | null;
  const [activeTab, setActiveTab] = useState<TabId>(
    tabFromUrl && ["dados", "catalog", "feed", "reviews"].includes(tabFromUrl) ? tabFromUrl : "dados"
  );

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(DEFAULT_LAT);
  const [longitude, setLongitude] = useState(DEFAULT_LNG);
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  const [catalog, setCatalog] = useState<CatalogItemModel[]>([]);
  const [posts, setPosts] = useState<BusinessPostModel[]>([]);
  const [reviews, setReviews] = useState<BusinessReviewModel[]>([]);
  const [reviewStats, setReviewStats] = useState({ averageRating: 0, count: 0 });

  const [catalogDialogOpen, setCatalogDialogOpen] = useState(false);
  const [editingCatalogItem, setEditingCatalogItem] = useState<CatalogItemModel | null>(null);
  const [catalogForm, setCatalogForm] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    category: "Geral",
  });
  const [catalogSaving, setCatalogSaving] = useState(false);
  const [catalogImageUploading, setCatalogImageUploading] = useState(false);
  const [deleteCatalogId, setDeleteCatalogId] = useState<string | null>(null);

  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BusinessPostModel | null>(null);
  const [postForm, setPostForm] = useState({ text: "", image_url: "" });
  const [postSaving, setPostSaving] = useState(false);
  const [postImageUploading, setPostImageUploading] = useState(false);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);

  const entrepreneurId = profile?.profile_type === "entrepreneur" ? profile?.id : null;

  useEffect(() => {
    const tab = searchParams.get("tab") as TabId | null;
    if (tab && ["dados", "catalog", "feed", "reviews"].includes(tab)) setActiveTab(tab);
  }, [searchParams]);

  useEffect(() => {
    // Aguardar o profile carregar antes de executar qualquer lógica
    if (authLoading) return;
    
    // Se há ID na URL, carregar esse negócio específico
    if (id) {
      // Só executar se tiver entrepreneurId
      if (!entrepreneurId) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      getBusinessesByEntrepreneur(entrepreneurId)
        .then((list) => {
          const found = list.find((b) => b.id === id);
          if (found) {
            setBusiness(found);
            setName(found.name);
            setCategory(found.category);
            setAddress(found.address);
            setLatitude(Number(found.latitude));
            setLongitude(Number(found.longitude));
            setPhone(found.phone ?? "");
            setDescription(found.description);
          }
        })
        .catch((error) => {
          console.error("Erro ao carregar negócio:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // Sem ID na URL = modo cadastro, não carregar nenhum negócio
      setBusiness(null);
      setName("");
      setCategory("");
      setAddress("");
      setLatitude(DEFAULT_LAT);
      setLongitude(DEFAULT_LNG);
      setPhone("");
      setDescription("");
      setLoading(false);
    }
  }, [entrepreneurId, id, authLoading]);

  const loadCatalog = () => {
    if (!business?.id) return;
    getCatalogByBusiness(business.id).then(setCatalog);
  };

  const loadPosts = () => {
    if (!business?.id) return;
    getPostsByBusiness(business.id).then(setPosts);
  };

  const loadReviews = () => {
    if (!business?.id) return;
    getReviewsByBusiness(business.id).then(setReviews);
    getReviewStatsByBusiness(business.id).then(setReviewStats);
  };

  useEffect(() => {
    if (!business?.id) return;
    loadCatalog();
  }, [business?.id]);

  useEffect(() => {
    if (!business?.id) return;
    loadPosts();
  }, [business?.id]);

  useEffect(() => {
    if (!business?.id) return;
    loadReviews();
  }, [business?.id]);

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

  const handleSaveBusiness = async () => {
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
        if (profile?.profile_type === "consumer") {
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
          toast.success("Dados do negócio atualizados.");
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
          toast.success("Negócio cadastrado! Agora você pode editar catálogo e feed.");
          // Redirecionar para a página de edição do negócio criado
          navigate(`/empreendedor/negocio/${created.id}`);
        } else {
          toast.error(createError ?? "Não foi possível cadastrar. Verifique os dados e tente novamente.");
        }
      }
    } finally {
      setSaving(false);
    }
  };

  const openCatalogDialog = (item?: CatalogItemModel) => {
    if (item) {
      setEditingCatalogItem(item);
      setCatalogForm({
        name: item.name,
        description: item.description ?? "",
        price: String(item.price),
        image_url: item.image_url ?? "",
        category: item.category,
      });
    } else {
      setEditingCatalogItem(null);
      setCatalogForm({
        name: "",
        description: "",
        price: "",
        image_url: "",
        category: "Geral",
      });
    }
    setCatalogDialogOpen(true);
  };

  const handleCatalogImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !business?.id) return;
    e.target.value = "";
    setCatalogImageUploading(true);
    try {
      const url = await uploadBusinessImage(file, business.id, "catalog");
      if (url) setCatalogForm((f) => ({ ...f, image_url: url }));
      else toast.error("Falha ao enviar imagem.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao enviar imagem.");
    } finally {
      setCatalogImageUploading(false);
    }
  };

  const saveCatalogItem = async () => {
    if (!business?.id) return;
    const price = parseFloat(catalogForm.price.replace(",", "."));
    if (!catalogForm.name.trim() || isNaN(price) || price < 0) {
      toast.error("Preencha nome e preço válido.");
      return;
    }
    setCatalogSaving(true);
    try {
      if (editingCatalogItem) {
        const { data, error } = await updateCatalogItem(editingCatalogItem.id, {
          name: catalogForm.name.trim(),
          description: catalogForm.description.trim() || undefined,
          price,
          image_url: catalogForm.image_url.trim() || undefined,
          category: catalogForm.category.trim() || "Geral",
        });
        if (data) {
          loadCatalog();
          setCatalogDialogOpen(false);
          toast.success("Item atualizado.");
        } else toast.error(error ?? "Erro ao atualizar.");
      } else {
        const { data, error } = await createCatalogItem(business.id, {
          name: catalogForm.name.trim(),
          description: catalogForm.description.trim() || undefined,
          price,
          image_url: catalogForm.image_url.trim() || undefined,
          category: catalogForm.category.trim() || "Geral",
        });
        if (data) {
          loadCatalog();
          setCatalogDialogOpen(false);
          toast.success("Item adicionado ao catálogo.");
        } else toast.error(error ?? "Erro ao adicionar.");
      }
    } finally {
      setCatalogSaving(false);
    }
  };

  const confirmDeleteCatalog = (id: string) => setDeleteCatalogId(id);
  const doDeleteCatalog = async () => {
    if (!deleteCatalogId) return;
    const { error } = await deleteCatalogItem(deleteCatalogId);
    setDeleteCatalogId(null);
    if (!error) {
      loadCatalog();
      toast.success("Item removido.");
    } else toast.error(error);
  };

  const openPostDialog = (post?: BusinessPostModel) => {
    if (post) {
      setEditingPost(post);
      setPostForm({ text: post.text, image_url: post.image_url ?? "" });
    } else {
      setEditingPost(null);
      setPostForm({ text: "", image_url: "" });
    }
    setPostDialogOpen(true);
  };

  const handlePostImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !business?.id) return;
    e.target.value = "";
    setPostImageUploading(true);
    try {
      const url = await uploadBusinessImage(file, business.id, "posts");
      if (url) setPostForm((f) => ({ ...f, image_url: url }));
      else toast.error("Falha ao enviar imagem.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao enviar imagem.");
    } finally {
      setPostImageUploading(false);
    }
  };

  const savePost = async () => {
    if (!business?.id) return;
    if (!postForm.text.trim()) {
      toast.error("Escreva o texto da publicação.");
      return;
    }
    setPostSaving(true);
    try {
      if (editingPost) {
        const { data, error } = await updateBusinessPost(editingPost.id, {
          text: postForm.text.trim(),
          image_url: postForm.image_url.trim() || undefined,
        });
        if (data) {
          loadPosts();
          setPostDialogOpen(false);
          toast.success("Publicação atualizada.");
        } else toast.error(error ?? "Erro ao atualizar.");
      } else {
        const { data, error } = await createBusinessPost(business.id, {
          text: postForm.text.trim(),
          image_url: postForm.image_url.trim() || undefined,
        });
        if (data) {
          loadPosts();
          setPostDialogOpen(false);
          toast.success("Publicação criada.");
        } else toast.error(error ?? "Erro ao publicar.");
      }
    } finally {
      setPostSaving(false);
    }
  };

  const confirmDeletePost = (id: string) => setDeletePostId(id);
  const doDeletePost = async () => {
    if (!deletePostId) return;
    const { error } = await deleteBusinessPost(deletePostId);
    setDeletePostId(null);
    if (!error) {
      loadPosts();
      toast.success("Publicação removida.");
    } else toast.error(error);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "dados", label: "Dados", icon: <Store size={16} /> },
    { id: "catalog", label: "Catálogo", icon: <Package size={16} /> },
    { id: "feed", label: "Feed", icon: <MessageSquare size={16} /> },
    { id: "reviews", label: "Avaliações", icon: <Star size={16} /> },
  ];

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

      <div className="px-4 py-4">
        {!entrepreneurId && profile?.profile_type === "consumer" && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-4">
            <p className="text-sm font-medium text-foreground">
              Você está logado como consumidor. Para cadastrar um negócio, saia e entre com uma conta empreendedor.
            </p>
          </div>
        )}

        {business && (
          <div className="flex gap-1 p-1 bg-muted rounded-xl mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold transition-all",
                  activeTab === tab.id
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {(activeTab === "dados" || !business) && (
          <div className="space-y-4">
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
              <p className="text-xs text-muted-foreground mt-1">Clique em &quot;Buscar&quot; para localizar no mapa ou arraste o marcador.</p>
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
            <Button type="button" className="w-full h-12 rounded-xl text-base font-bold" onClick={handleSaveBusiness} disabled={saving}>
              {saving ? <Loader2 size={20} className="animate-spin mx-auto" /> : business ? "SALVAR DADOS DO NEGÓCIO" : "CADASTRAR NEGÓCIO"}
            </Button>
          </div>
        )}

        {business && activeTab === "catalog" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-display font-bold text-foreground">Catálogo de produtos/serviços</h3>
              <Button size="sm" className="rounded-xl" onClick={() => openCatalogDialog()}>
                <Plus size={18} className="mr-1" />
                Adicionar
              </Button>
            </div>
            {catalog.length === 0 ? (
              <p className="text-muted-foreground text-sm py-6 text-center">Nenhum item no catálogo. Adicione produtos ou serviços.</p>
            ) : (
              <div className="space-y-2">
                {catalog.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border"
                  >
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl overflow-hidden">
                      {item.image_url ? (
                        <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        "📦"
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                      <p className="font-bold text-primary text-sm">R$ {Number(item.price).toFixed(2).replace(".", ",")}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="rounded-full" onClick={() => openCatalogDialog(item)}>
                        <Pencil size={16} />
                      </Button>
                      <Button size="icon" variant="ghost" className="rounded-full text-destructive hover:text-destructive" onClick={() => confirmDeleteCatalog(item.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {business && activeTab === "feed" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-display font-bold text-foreground">Publicações no feed</h3>
              <Button size="sm" className="rounded-xl" onClick={() => openPostDialog()}>
                <Plus size={18} className="mr-1" />
                Nova publicação
              </Button>
            </div>
            {posts.length === 0 ? (
              <p className="text-muted-foreground text-sm py-6 text-center">Nenhuma publicação. Crie posts para aparecer no feed do negócio.</p>
            ) : (
              <div className="space-y-3">
                {posts.map((post) => (
                  <div key={post.id} className="rounded-2xl bg-card border border-border overflow-hidden">
                    {post.image_url && (
                      <img src={post.image_url} alt="" className="w-full h-40 object-cover" />
                    )}
                    <div className="p-4">
                      <p className="text-foreground text-sm whitespace-pre-wrap">{post.text}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ptBR })}
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="rounded-full" onClick={() => openPostDialog(post)}>
                          <Pencil size={14} className="mr-1" />
                          Editar
                        </Button>
                        <Button size="sm" variant="outline" className="rounded-full text-destructive hover:text-destructive" onClick={() => confirmDeletePost(post.id)}>
                          <Trash2 size={14} className="mr-1" />
                          Excluir
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {business && activeTab === "reviews" && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-muted/50 border border-border">
              <p className="text-sm text-muted-foreground">
                As avaliações são feitas pelos consumidores. Você não pode editá-las; aqui você só visualiza.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border flex items-center gap-4">
              <div className="text-center">
                <p className="text-4xl font-bold text-foreground">
                  {reviewStats.count > 0 ? reviewStats.averageRating.toFixed(1) : "—"}
                </p>
                <div className="flex gap-0.5 justify-center my-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={
                        star <= Math.round(reviewStats.averageRating || 0)
                          ? "text-warning fill-warning"
                          : "text-muted"
                      }
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{reviewStats.count} avaliações</p>
              </div>
            </div>
            {reviews.length === 0 ? (
              <p className="text-muted-foreground text-sm py-4 text-center">Nenhuma avaliação ainda.</p>
            ) : (
              <div className="space-y-3">
                {reviews.map((review) => (
                  <div key={review.id} className="p-4 rounded-2xl bg-card border border-border">
                    <div className="flex gap-0.5 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={12}
                          className={star <= review.rating ? "text-warning fill-warning" : "text-muted"}
                        />
                      ))}
                    </div>
                    {review.text && <p className="text-sm text-muted-foreground">{review.text}</p>}
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatDistanceToNow(new Date(review.created_at), { addSuffix: true, locale: ptBR })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Dialog: Adicionar/Editar item do catálogo */}
      <Dialog open={catalogDialogOpen} onOpenChange={setCatalogDialogOpen}>
        <DialogContent className="rounded-2xl max-w-md">
          <DialogHeader>
            <DialogTitle>{editingCatalogItem ? "Editar item" : "Adicionar ao catálogo"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-1 block">Nome</label>
              <Input
                value={catalogForm.name}
                onChange={(e) => setCatalogForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Ex: Pão Francês"
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Categoria</label>
              <Input
                value={catalogForm.category}
                onChange={(e) => setCatalogForm((f) => ({ ...f, category: e.target.value }))}
                placeholder="Ex: Pães"
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Preço (R$)</label>
              <Input
                value={catalogForm.price}
                onChange={(e) => setCatalogForm((f) => ({ ...f, price: e.target.value }))}
                placeholder="0,00"
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Descrição (opcional)</label>
              <Input
                value={catalogForm.description}
                onChange={(e) => setCatalogForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Breve descrição"
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Imagem (opcional)</label>
              {catalogForm.image_url ? (
                <div className="space-y-2">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-muted border border-border">
                    <img src={catalogForm.image_url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <label className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-muted/50 text-sm font-medium cursor-pointer hover:bg-muted">
                      {catalogImageUploading ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
                      <span>{catalogImageUploading ? "Enviando..." : "Trocar imagem"}</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        className="sr-only"
                        disabled={catalogImageUploading}
                        onChange={handleCatalogImageFile}
                      />
                    </label>
                    <Button type="button" variant="ghost" size="sm" className="rounded-xl" onClick={() => setCatalogForm((f) => ({ ...f, image_url: "" }))}>
                      Remover
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="flex items-center justify-center gap-2 w-full px-3 py-4 rounded-xl border border-dashed border-border bg-muted/30 text-sm text-muted-foreground cursor-pointer hover:bg-muted/50 transition-colors">
                    {catalogImageUploading ? <Loader2 size={20} className="animate-spin" /> : <ImagePlus size={20} />}
                    <span>{catalogImageUploading ? "Enviando imagem..." : "Enviar imagem do dispositivo"}</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="sr-only"
                      disabled={catalogImageUploading}
                      onChange={handleCatalogImageFile}
                    />
                  </label>
                  <p className="text-xs text-muted-foreground">JPG, PNG, WebP ou GIF. Máx. 5 MB.</p>
                </div>
              )}
              <Input
                value={catalogForm.image_url}
                onChange={(e) => setCatalogForm((f) => ({ ...f, image_url: e.target.value }))}
                placeholder="Ou cole a URL da imagem"
                className="rounded-xl mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCatalogDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={saveCatalogItem} disabled={catalogSaving}>
              {catalogSaving ? <Loader2 size={18} className="animate-spin" /> : editingCatalogItem ? "Salvar" : "Adicionar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Adicionar/Editar publicação */}
      <Dialog open={postDialogOpen} onOpenChange={setPostDialogOpen}>
        <DialogContent className="rounded-2xl max-w-md">
          <DialogHeader>
            <DialogTitle>{editingPost ? "Editar publicação" : "Nova publicação"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-1 block">Texto</label>
              <Textarea
                value={postForm.text}
                onChange={(e) => setPostForm((f) => ({ ...f, text: e.target.value }))}
                placeholder="O que você quer compartilhar?"
                className="min-h-[100px] rounded-xl resize-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Imagem (opcional)</label>
              {postForm.image_url ? (
                <div className="space-y-2">
                  <div className="relative w-full h-36 rounded-xl overflow-hidden bg-muted border border-border">
                    <img src={postForm.image_url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <label className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-muted/50 text-sm font-medium cursor-pointer hover:bg-muted">
                      {postImageUploading ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
                      <span>{postImageUploading ? "Enviando..." : "Trocar imagem"}</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        className="sr-only"
                        disabled={postImageUploading}
                        onChange={handlePostImageFile}
                      />
                    </label>
                    <Button type="button" variant="ghost" size="sm" className="rounded-xl" onClick={() => setPostForm((f) => ({ ...f, image_url: "" }))}>
                      Remover
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="flex items-center justify-center gap-2 w-full px-3 py-4 rounded-xl border border-dashed border-border bg-muted/30 text-sm text-muted-foreground cursor-pointer hover:bg-muted/50 transition-colors">
                    {postImageUploading ? <Loader2 size={20} className="animate-spin" /> : <ImagePlus size={20} />}
                    <span>{postImageUploading ? "Enviando imagem..." : "Enviar imagem do dispositivo"}</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="sr-only"
                      disabled={postImageUploading}
                      onChange={handlePostImageFile}
                    />
                  </label>
                  <p className="text-xs text-muted-foreground">JPG, PNG, WebP ou GIF. Máx. 5 MB.</p>
                </div>
              )}
              <Input
                value={postForm.image_url}
                onChange={(e) => setPostForm((f) => ({ ...f, image_url: e.target.value }))}
                placeholder="Ou cole a URL da imagem"
                className="rounded-xl mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPostDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={savePost} disabled={postSaving}>
              {postSaving ? <Loader2 size={18} className="animate-spin" /> : editingPost ? "Salvar" : "Publicar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AlertDialog: Confirmar exclusão item catálogo */}
      <AlertDialog open={!!deleteCatalogId} onOpenChange={(open) => !open && setDeleteCatalogId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover item do catálogo?</AlertDialogTitle>
            <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={doDeleteCatalog} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* AlertDialog: Confirmar exclusão publicação */}
      <AlertDialog open={!!deletePostId} onOpenChange={(open) => !open && setDeletePostId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir publicação?</AlertDialogTitle>
            <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={doDeletePost} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
