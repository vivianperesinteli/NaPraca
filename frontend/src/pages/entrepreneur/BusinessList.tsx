import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, Plus, Pencil, MapPin, Phone, ChevronRight, Loader2 } from "lucide-react";
import { EntrepreneurNav } from "@/components/layout/EntrepreneurNav";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { getBusinessesByEntrepreneur } from "@/services/api";
import type { BusinessModel } from "@backend/data/models/BusinessModel";

export default function BusinessList() {
  const navigate = useNavigate();
  const { profile, loading: authLoading } = useAuth();
  const [businesses, setBusinesses] = useState<BusinessModel[]>([]);
  const [loading, setLoading] = useState(true);

  const entrepreneurId = profile?.profile_type === "entrepreneur" ? profile?.id : null;

  const loadBusinesses = useCallback(async () => {
    // Não executar se ainda estiver carregando o profile
    if (authLoading) return;
    
    // Não executar se não houver entrepreneurId
    if (!entrepreneurId) {
      setLoading(false);
      setBusinesses([]);
      return;
    }
    
    try {
      setLoading(true);
      const list = await getBusinessesByEntrepreneur(entrepreneurId);
      setBusinesses(list);
    } catch (error) {
      console.error("Erro ao carregar negócios:", error);
      setBusinesses([]);
    } finally {
      setLoading(false);
    }
  }, [entrepreneurId, authLoading]);

  useEffect(() => {
    // Aguardar o carregamento do perfil antes de buscar negócios
    loadBusinesses();
  }, [loadBusinesses]);

  // Recarregar quando um negócio for criado ou atualizado
  useEffect(() => {
    if (!entrepreneurId) return;

    const handleBusinessCreated = () => {
      loadBusinesses();
    };

    window.addEventListener('businessCreated', handleBusinessCreated);
    window.addEventListener('businessUpdated', handleBusinessCreated);
    window.addEventListener('focus', loadBusinesses);

    return () => {
      window.removeEventListener('businessCreated', handleBusinessCreated);
      window.removeEventListener('businessUpdated', handleBusinessCreated);
      window.removeEventListener('focus', loadBusinesses);
    };
  }, [entrepreneurId, loadBusinesses]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 px-4 py-6 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-xl">Meus Negócios</h1>
            <p className="text-sm opacity-80 mt-1">
              {businesses.length} {businesses.length === 1 ? "negócio cadastrado" : "negócios cadastrados"}
            </p>
          </div>
          <Link to="/empreendedor/negocio">
            <Button
              size="sm"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl"
            >
              <Plus size={18} className="mr-1" />
              Novo
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {businesses.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Store size={40} className="text-muted-foreground" />
            </div>
            <h3 className="font-display font-bold text-lg text-foreground mb-2">
              Nenhum negócio cadastrado
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Comece cadastrando seu primeiro negócio para aparecer no mapa
            </p>
            <Link to="/empreendedor/negocio">
              <Button className="rounded-xl">
                <Plus size={18} className="mr-2" />
                Cadastrar Primeiro Negócio
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {businesses.map((business) => (
              <div
                key={business.id}
                className="p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-earth flex items-center justify-center flex-shrink-0">
                    <Store size={28} className="text-secondary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-foreground text-lg truncate">
                          {business.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{business.category}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        business.is_active
                          ? "bg-success/20 text-success"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {business.is_active ? "Ativo" : "Inativo"}
                      </div>
                    </div>
                    
                    <div className="space-y-1.5 mt-3">
                      {business.address && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin size={14} />
                          <span className="truncate">{business.address}</span>
                        </div>
                      )}
                      {business.phone && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Phone size={14} />
                          <span>{business.phone}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Link
                        to={`/empreendedor/negocio/${business.id}`}
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          className="w-full rounded-xl"
                        >
                          <Pencil size={16} className="mr-2" />
                          Editar
                        </Button>
                      </Link>
                      <Link
                        to={`/negocio/${business.id}`}
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          className="w-full rounded-xl"
                        >
                          <Store size={16} className="mr-2" />
                          Ver Página
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <EntrepreneurNav activeTab="business" />
    </div>
  );
}
