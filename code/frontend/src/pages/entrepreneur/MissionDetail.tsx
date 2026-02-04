import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Upload, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getMissionById, completeMission } from "@/services/api";
import type { Mission } from "@backend/domain/entities/Mission";

export default function EntrepreneurMissionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mission, setMission] = useState<Mission | null>(null);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    getMissionById(id).then(setMission);
  }, [id]);

  const handleComplete = async () => {
    if (!id || !photoUploaded || submitting) return;
    setSubmitting(true);
    try {
      await completeMission(id);
      navigate("/empreendedor/missoes");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-4 py-4">
        <div className="flex items-center gap-4">
          <Link to="/empreendedor/missoes" className="hover:opacity-80 transition-opacity">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="font-display font-bold text-lg">
            {mission ? mission.title : (id ? "Carregando..." : "Missão")}
          </h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-6">
        {/* Video Section */}
        <div>
          <h2 className="font-display font-bold text-foreground mb-3">📹 Assista primeiro</h2>
          <div className="relative aspect-video rounded-2xl bg-muted overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                <Play size={28} className="text-primary-foreground ml-1" />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur rounded-xl p-3">
              <p className="text-sm font-medium text-foreground">Como tirar uma foto profissional</p>
              <p className="text-xs text-muted-foreground">2 min de duração</p>
            </div>
          </div>
        </div>

        {/* Step 1 */}
        <div className="p-4 rounded-2xl bg-card border border-border">
          <h3 className="font-display font-bold text-foreground mb-2">
            <span className="text-primary">Passo 1:</span> A Lição
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Uma boa foto da fachada é o primeiro contato do cliente com seu negócio. 
            Ela deve ser clara, bem iluminada e mostrar o nome do estabelecimento de forma visível.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span>Tire a foto durante o dia, com luz natural</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span>Centralize a entrada principal</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span>Mantenha a fachada limpa e organizada</span>
            </li>
          </ul>
        </div>

        {/* Step 2 */}
        <div className="p-4 rounded-2xl bg-card border border-border">
          <h3 className="font-display font-bold text-foreground mb-2">
            <span className="text-primary">Passo 2:</span> Sua Vez!
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            {mission
              ? "Agora é hora de praticar! Siga as dicas acima e envie sua foto."
              : "Complete a etapa abaixo para concluir a missão."}
          </p>

          {/* Upload Area */}
          <div 
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer ${
              photoUploaded 
                ? "border-success bg-success/5" 
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => setPhotoUploaded(true)}
          >
            {photoUploaded ? (
              <div className="space-y-2">
                <CheckCircle size={40} className="mx-auto text-success" />
                <p className="font-semibold text-foreground">Foto enviada!</p>
                <p className="text-sm text-muted-foreground">fachada_loja.jpg</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload size={40} className="mx-auto text-muted-foreground" />
                <p className="font-semibold text-foreground">Clique para enviar sua foto</p>
                <p className="text-sm text-muted-foreground">JPG ou PNG, máx. 5MB</p>
              </div>
            )}
          </div>
        </div>

        {/* Complete Button */}
        <Button
          className="w-full h-12 rounded-xl text-base font-bold"
          disabled={!photoUploaded || submitting}
          onClick={handleComplete}
        >
          {submitting ? "Salvando..." : "CONCLUIR MISSÃO"}
        </Button>
      </div>
    </div>
  );
}
