import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ConsumerHome from "./pages/consumer/Home";
import ConsumerMissions from "./pages/consumer/Missions";
import ConsumerProfile from "./pages/consumer/Profile";
import ConsumerRewards from "./pages/consumer/Rewards";
import ConsumerScratchCard from "./pages/consumer/ScratchCard";
import ConsumerMapPage from "./pages/consumer/MapPage";
import BusinessProfile from "./pages/consumer/BusinessProfile";
import EntrepreneurDashboard from "./pages/entrepreneur/Dashboard";
import EntrepreneurMissions from "./pages/entrepreneur/Missions";
import EntrepreneurMissionDetail from "./pages/entrepreneur/MissionDetail";
import EntrepreneurProfile from "./pages/entrepreneur/Profile";
import EntrepreneurBusinessEdit from "./pages/entrepreneur/BusinessEdit";
import BusinessList from "./pages/entrepreneur/BusinessList";
import EntrepreneurAnalytics from "./pages/entrepreneur/Analytics";
import EntrepreneurCommunity from "./pages/entrepreneur/Community";
import EntrepreneurPost from "./pages/entrepreneur/Post";
import EntrepreneurManagement from "./pages/entrepreneur/Management";
import Notifications from "./pages/shared/Notifications";
import Settings from "./pages/shared/Settings";
import NotFound from "./pages/NotFound";
import BoasVindas from "./pages/BoasVindas";
import TermosDeUso from "./pages/TermosDeUso";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          {/* Auth */}
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/termos-de-uso" element={<TermosDeUso />} />
          <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/boas-vindas" element={<BoasVindas />} />
          
          {/* Consumer Routes */}
          <Route path="/consumidor" element={<ConsumerHome />} />
          <Route path="/consumidor/missoes" element={<ConsumerMissions />} />
          <Route path="/consumidor/perfil" element={<ConsumerProfile />} />
          <Route path="/consumidor/recompensas" element={<ConsumerRewards />} />
          <Route path="/consumidor/raspadinha" element={<ConsumerScratchCard />} />
          <Route path="/consumidor/mapa" element={<ConsumerMapPage />} />
          <Route path="/negocio/:id" element={<BusinessProfile />} />
          
          {/* Entrepreneur Routes */}
          <Route path="/empreendedor" element={<EntrepreneurDashboard />} />
          <Route path="/empreendedor/missoes" element={<EntrepreneurMissions />} />
          <Route path="/empreendedor/missao/:id" element={<EntrepreneurMissionDetail />} />
          <Route path="/empreendedor/perfil" element={<EntrepreneurProfile />} />
          <Route path="/empreendedor/negocios" element={<BusinessList />} />
          <Route path="/empreendedor/negocio" element={<EntrepreneurBusinessEdit />} />
          <Route path="/empreendedor/negocio/:id" element={<EntrepreneurBusinessEdit />} />
          <Route path="/empreendedor/analytics" element={<EntrepreneurAnalytics />} />
          <Route path="/empreendedor/comunidade" element={<EntrepreneurCommunity />} />
          <Route path="/empreendedor/postar" element={<EntrepreneurPost />} />
          <Route path="/empreendedor/gestao" element={<EntrepreneurManagement />} />
          
          {/* Shared Routes */}
          <Route path="/notificacoes" element={<Notifications />} />
          <Route path="/configuracoes" element={<Settings />} />
          
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
