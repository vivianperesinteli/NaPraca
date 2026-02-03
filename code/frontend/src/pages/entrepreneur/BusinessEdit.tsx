import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Camera, Store, MapPin, Phone, Clock, FileText, Plus, Trash2, ChevronRight, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const mockProducts = [
  { id: "p1", name: "Pão Francês", price: 0.80, image: "🥖", category: "Pães" },
  { id: "p2", name: "Croissant", price: 5.50, image: "🥐", category: "Pães" },
  { id: "p3", name: "Bolo de Chocolate", price: 8.00, image: "🍰", category: "Doces" },
  { id: "p4", name: "Café Expresso", price: 4.50, image: "☕", category: "Bebidas" },
];

export default function EntrepreneurBusinessEdit() {
  const [activeTab, setActiveTab] = useState<"info" | "catalog" | "photos">("info");
  const [businessName, setBusinessName] = useState("Padaria do Carlos");
  const [category, setCategory] = useState("Padaria");
  const [address, setAddress] = useState("Rua das Flores, 123 - Centro");
  const [phone, setPhone] = useState("(11) 99999-9999");
  const [hours, setHours] = useState("06:00 - 20:00");
  const [description, setDescription] = useState("A melhor padaria do bairro! Pães fresquinhos todos os dias.");
  const [products, setProducts] = useState(mockProducts);

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Cover Image */}
      <div className="relative h-40 bg-gradient-to-br from-muted to-muted/50">
        <button className="absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-card/90 backdrop-blur text-sm font-medium text-foreground flex items-center gap-2 hover:bg-card transition-colors">
          <Camera size={16} />
          Alterar Foto
        </button>
        
        {/* Back Button */}
        <Link 
          to="/empreendedor/perfil" 
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </Link>
      </div>

      {/* Profile Photo */}
      <div className="relative px-4 -mt-12">
        <div className="relative w-24 h-24 rounded-2xl bg-card border-4 border-background shadow-lg overflow-hidden">
          <div className="w-full h-full bg-muted flex items-center justify-center text-4xl">
            🏪
          </div>
          <button className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center">
            <Camera size={12} className="text-primary-foreground" />
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="px-4 py-4">
        <h1 className="font-display font-bold text-xl text-foreground">Editar Negócio</h1>
        <p className="text-sm text-muted-foreground">Atualize as informações do seu negócio</p>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex gap-1 p-1 bg-muted rounded-xl">
          {[
            { id: "info", label: "Informações" },
            { id: "catalog", label: "Catálogo" },
            { id: "photos", label: "Fotos" },
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
      </div>

      {/* Tab Content */}
      <div className="px-4">
        {activeTab === "info" && (
          <div className="space-y-4">
            {/* Business Name */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Nome do Negócio</label>
              <div className="relative">
                <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="pl-10 h-12 rounded-xl"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Categoria</label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="pl-10 h-12 rounded-xl"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Endereço</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="pl-10 h-12 rounded-xl"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Telefone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 h-12 rounded-xl"
                />
              </div>
            </div>

            {/* Hours */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Horário de Funcionamento</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="pl-10 h-12 rounded-xl"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Descrição</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[120px] rounded-xl resize-none"
                placeholder="Descreva seu negócio..."
              />
            </div>

            {/* Save Button */}
            <Button className="w-full h-12 rounded-xl text-base font-bold">
              SALVAR ALTERAÇÕES
            </Button>
          </div>
        )}

        {activeTab === "catalog" && (
          <div className="space-y-4">
            {/* Add Product Button */}
            <Button variant="outline" className="w-full h-12 rounded-xl border-dashed">
              <Plus size={18} className="mr-2" />
              Adicionar Produto
            </Button>

            {/* Product List */}
            <div className="space-y-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border"
                >
                  <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center text-2xl">
                    {product.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground">{product.name}</h4>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                    <p className="text-sm font-bold text-primary">
                      R$ {product.price.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
                      <ChevronRight size={18} className="text-muted-foreground" />
                    </button>
                    <button className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center hover:bg-destructive/20 transition-colors">
                      <Trash2 size={18} className="text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Tip Card */}
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
              <p className="text-sm text-foreground">
                💡 <strong>Dica:</strong> Adicione fotos reais dos seus produtos para atrair mais clientes!
              </p>
            </div>
          </div>
        )}

        {activeTab === "photos" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Adicione fotos do seu estabelecimento, produtos e ambiente para atrair mais clientes.
            </p>

            {/* Photo Grid */}
            <div className="grid grid-cols-3 gap-3">
              {/* Existing photos */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-xl bg-muted relative overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    📸
                  </div>
                  <button className="absolute top-1 right-1 w-6 h-6 rounded-full bg-destructive flex items-center justify-center">
                    <Trash2 size={12} className="text-destructive-foreground" />
                  </button>
                </div>
              ))}
              
              {/* Add photo button */}
              <button className="aspect-square rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 hover:border-primary/50 transition-colors">
                <Plus size={24} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Adicionar</span>
              </button>
            </div>

            {/* Photo Categories */}
            <div className="mt-6">
              <h4 className="font-semibold text-foreground mb-3">Categorias de Fotos</h4>
              <div className="space-y-2">
                {[
                  { label: "Fachada", count: 1, icon: "🏪" },
                  { label: "Produtos", count: 2, icon: "📦" },
                  { label: "Ambiente", count: 0, icon: "🪑" },
                  { label: "Equipe", count: 0, icon: "👥" },
                ].map((cat) => (
                  <div
                    key={cat.label}
                    className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"
                  >
                    <div className="text-xl">{cat.icon}</div>
                    <span className="flex-1 font-medium text-foreground">{cat.label}</span>
                    <span className="text-sm text-muted-foreground">{cat.count} fotos</span>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
