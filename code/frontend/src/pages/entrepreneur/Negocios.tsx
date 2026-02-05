import { Link } from "react-router-dom";
import { useState } from "react";
import {
  DollarSign,
  ShoppingBag,
  Package,
  Bell,
  BarChart3,
  TrendingUp,
  Calendar,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Target,
  TriangleAlert,
  Users,
  Repeat,
  Star,
  Clock,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EntrepreneurNav } from "@/components/layout/EntrepreneurNav";

type StockStatus = "ok" | "low" | "critical";

const ESTOQUE_ITEMS: { name: string; min: number; qty: number; status: StockStatus }[] = [
  { name: "Produto A", min: 10, qty: 45, status: "ok" },
  { name: "Produto B", min: 15, qty: 8, status: "low" },
  { name: "Produto C", min: 5, qty: 2, status: "critical" },
  { name: "Insumo X", min: 50, qty: 120, status: "ok" },
  { name: "Embalagem", min: 20, qty: 15, status: "low" },
];

const LOW_STOCK_COUNT = ESTOQUE_ITEMS.filter((i) => i.status === "low" || i.status === "critical").length;

const MELHORES_CLIENTES: { name: string; visitas: number; ultimaVisita: string; gastoTotal: number }[] = [
  { name: "Maria Silva", visitas: 12, ultimaVisita: "Há 2 dias", gastoTotal: 890 },
  { name: "João Santos", visitas: 8, ultimaVisita: "Há 1 semana", gastoTotal: 650 },
  { name: "Ana Costa", visitas: 6, ultimaVisita: "Ontem", gastoTotal: 420 },
  { name: "Pedro Lima", visitas: 5, ultimaVisita: "Há 3 dias", gastoTotal: 380 },
];

const TAREFAS_GESTAO: { id: string; title: string; quando: string; prioridade: "destructive" | "warning" | null; completed: boolean }[] = [
  { id: "t1", title: "Pagar fornecedor XYZ", quando: "Amanhã", prioridade: "destructive", completed: false },
  { id: "t2", title: "Renovar alvará", quando: "15/02", prioridade: "destructive", completed: false },
  { id: "t3", title: "Fazer pedido de estoque", quando: "10/02", prioridade: "warning", completed: false },
  { id: "t4", title: "Postar promoção", quando: "Hoje", prioridade: null, completed: true },
];

const DESPESAS_GESTAO = [
  { label: "Fornecedores", pct: 45, bar: "bg-primary" },
  { label: "Aluguel", pct: 25, bar: "bg-secondary" },
  { label: "Marketing", pct: 15, bar: "bg-accent" },
  { label: "Outros", pct: 15, bar: "bg-muted-foreground" },
];

function stockStatusStyles(status: StockStatus) {
  switch (status) {
    case "ok":
      return { card: "bg-muted/50", icon: "bg-success/20 text-success" };
    case "low":
      return { card: "bg-warning/10", icon: "bg-warning/20 text-warning" };
    case "critical":
      return { card: "bg-destructive/10", icon: "bg-destructive/20 text-destructive" };
  }
}

function stockQtyStyles(status: StockStatus) {
  switch (status) {
    case "ok":
      return "text-success";
    case "low":
      return "text-warning";
    case "critical":
      return "text-destructive";
  }
}

export default function EntrepreneurNegocios() {
  const [entradaProduto, setEntradaProduto] = useState("");
  const [entradaQty, setEntradaQty] = useState("");
  const [entradaCusto, setEntradaCusto] = useState("");
  const [clienteNome, setClienteNome] = useState("");
  const [clienteWhatsapp, setClienteWhatsapp] = useState("");
  const [tarefasCompletas, setTarefasCompletas] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(TAREFAS_GESTAO.map((t) => [t.id, t.completed]))
  );

  const handleRegistrarEntrada = () => {
    setEntradaProduto("");
    setEntradaQty("");
    setEntradaCusto("");
  };

  const handleSalvarCliente = () => {
    setClienteNome("");
    setClienteWhatsapp("");
  };

  const toggleTarefa = (id: string) => {
    setTarefasCompletas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 px-4 pt-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display font-bold text-xl text-primary-foreground">Meu Negócio</h1>
          <Link
            to="/empreendedor/analytics"
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary-foreground/20 text-primary-foreground text-sm font-medium hover:bg-primary-foreground/30 transition-colors"
          >
            <BarChart3 size={16} />
            Analytics
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="p-4 rounded-2xl bg-primary-foreground/10">
            <DollarSign size={16} className="text-primary-foreground/80 mb-1" />
            <p className="text-lg font-bold text-primary-foreground">7.1k</p>
            <p className="text-xs text-primary-foreground/70">Receita</p>
          </div>
          <div className="p-4 rounded-2xl bg-primary-foreground/10">
            <ShoppingBag size={16} className="text-primary-foreground/80 mb-1" />
            <p className="text-lg font-bold text-primary-foreground">47</p>
            <p className="text-xs text-primary-foreground/70">Vendas</p>
          </div>
          <div className="p-4 rounded-2xl bg-primary-foreground/10">
            <Package size={16} className="text-primary-foreground/80 mb-1" />
            <p className="text-lg font-bold text-primary-foreground">3</p>
            <p className="text-xs text-primary-foreground/70">Estoque ⚠️</p>
          </div>
          <div className="p-4 rounded-2xl bg-primary-foreground/10">
            <Bell size={16} className="text-primary-foreground/80 mb-1" />
            <p className="text-lg font-bold text-primary-foreground">3</p>
            <p className="text-xs text-primary-foreground/70">Tarefas</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        <Tabs defaultValue="financeiro" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4 h-10">
            <TabsTrigger value="financeiro" className="text-xs">
              💰 Finanças
            </TabsTrigger>
            <TabsTrigger value="estoque" className="text-xs">
              📦 Estoque
            </TabsTrigger>
            <TabsTrigger value="clientes" className="text-xs">
              👥 Clientes
            </TabsTrigger>
            <TabsTrigger value="gestao" className="text-xs">
              📋 Gestão
            </TabsTrigger>
          </TabsList>

          {/* Aba Finanças */}
          <TabsContent value="financeiro" className="space-y-4 mt-0">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 size={18} className="text-primary" />
                  Resumo Financeiro
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-success/10">
                    <p className="text-xs text-muted-foreground mb-1">Receita Total</p>
                    <p className="text-lg font-bold text-success">R$ 34.200</p>
                  </div>
                  <div className="p-3 rounded-xl bg-destructive/10">
                    <p className="text-xs text-muted-foreground mb-1">Despesas</p>
                    <p className="text-lg font-bold text-destructive">R$ 18.500</p>
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10">
                    <p className="text-xs text-muted-foreground mb-1">Lucro</p>
                    <p className="text-lg font-bold text-primary">R$ 15.700</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-muted">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Margem de Lucro</span>
                    <span className="text-sm font-bold text-primary">45.9%</span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      style={{ width: "45.9%" }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp size={18} className="text-secondary" />
                    Histórico de Vendas
                  </CardTitle>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar size={12} />
                    Últimos 6 meses
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-end justify-between h-32 gap-2">
                  {[
                    { label: "Jan", value: 4200, pct: 47 },
                    { label: "Fev", value: 5100, pct: 57 },
                    { label: "Mar", value: 4800, pct: 54 },
                    { label: "Abr", value: 6200, pct: 70 },
                    { label: "Mai", value: 7100, pct: 80 },
                    { label: "Jun", value: 6800, pct: 77 },
                  ].map((m) => (
                    <div key={m.label} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs font-medium text-foreground">
                        {(m.value / 1000).toFixed(1)}k
                      </span>
                      <div
                        className="w-full bg-gradient-to-t from-secondary to-secondary/60 rounded-t transition-all"
                        style={{ height: `${m.pct}%` }}
                      />
                      <span className="text-xs text-muted-foreground">{m.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-xl bg-accent/10 border border-accent/20">
                  <div className="flex items-center gap-2">
                    <Target size={16} className="text-accent" />
                    <span className="text-sm font-medium text-foreground">Projeção Jul:</span>
                    <span className="text-sm font-bold text-accent">R$ 7.800</span>
                    <span className="text-xs text-muted-foreground">(+10%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar size={18} className="text-primary" />
                  Fluxo de Caixa - Fevereiro
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {[
                    { day: "05", desc: "Aluguel", type: "Saída", value: "-R$ 800", positive: false },
                    { day: "10", desc: "Recebimento cartão", type: "Entrada", value: "+R$ 2500", positive: true },
                    { day: "15", desc: "Fornecedor", type: "Saída", value: "-R$ 450", positive: false },
                    { day: "20", desc: "Salários", type: "Saída", value: "-R$ 1200", positive: false },
                    { day: "25", desc: "Recebimento PIX", type: "Entrada", value: "+R$ 1800", positive: true },
                  ].map((item) => (
                    <div
                      key={`${item.day}-${item.desc}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <span className="text-sm font-bold text-foreground">{item.day}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.desc}</p>
                          <p className="text-xs text-muted-foreground">{item.type}</p>
                        </div>
                      </div>
                      <span
                        className={`font-semibold ${item.positive ? "text-success" : "text-destructive"}`}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText size={18} className="text-primary" />
                    Movimentações Recentes
                  </CardTitle>
                  <Button variant="outline" size="sm" className="text-xs border-2 border-primary">
                    <Plus size={14} className="mr-1" />
                    Adicionar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {[
                    { desc: "Venda - Produto A", when: "Hoje", value: "+R$ 150", positive: true },
                    { desc: "Fornecedor - Insumos", when: "Ontem", value: "R$ 320", positive: false },
                    { desc: "Venda - Serviço B", when: "Ontem", value: "+R$ 280", positive: true },
                    { desc: "Aluguel", when: "01/02", value: "R$ 800", positive: false },
                  ].map((item) => (
                    <div
                      key={`${item.desc}-${item.when}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.positive ? "bg-success/10" : "bg-destructive/10"}`}
                        >
                          {item.positive ? (
                            <ArrowUpRight size={16} className="text-success" />
                          ) : (
                            <ArrowDownRight size={16} className="text-destructive" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.desc}</p>
                          <p className="text-xs text-muted-foreground">{item.when}</p>
                        </div>
                      </div>
                      <span
                        className={`font-semibold ${item.positive ? "text-success" : "text-destructive"}`}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Estoque */}
          <TabsContent value="estoque" className="space-y-4 mt-0">
            {LOW_STOCK_COUNT > 0 && (
              <div className="p-4 rounded-2xl bg-warning/10 border border-warning/20">
                <div className="flex items-center gap-3">
                  <TriangleAlert size={20} className="text-warning flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">
                      {LOW_STOCK_COUNT} itens com estoque baixo
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Revise seu estoque para evitar rupturas
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Package size={18} className="text-secondary" />
                    Controle de Estoque
                  </CardTitle>
                  <Button variant="outline" size="sm" className="text-xs border-2 border-primary h-8">
                    <Plus size={14} className="mr-1" />
                    Novo Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {ESTOQUE_ITEMS.map((item) => {
                    const styles = stockStatusStyles(item.status);
                    const qtyClass = stockQtyStyles(item.status);
                    return (
                      <div
                        key={item.name}
                        className={`flex items-center justify-between p-3 rounded-xl ${styles.card}`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${styles.icon}`}
                          >
                            <Package size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Mín: {item.min} un.</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-bold ${qtyClass}`}>{item.qty}</p>
                          <p className="text-xs text-muted-foreground">unidades</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold tracking-tight">
                  Entrada Rápida de Estoque
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Produto</Label>
                  <Input
                    placeholder="Selecione ou digite o produto"
                    value={entradaProduto}
                    onChange={(e) => setEntradaProduto(e.target.value)}
                    className="h-9"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Quantidade</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={entradaQty}
                      onChange={(e) => setEntradaQty(e.target.value)}
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Custo (R$)</Label>
                    <Input
                      type="number"
                      placeholder="0,00"
                      value={entradaCusto}
                      onChange={(e) => setEntradaCusto(e.target.value)}
                      className="h-9"
                    />
                  </div>
                </div>
                <Button
                  className="w-full h-9 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleRegistrarEntrada}
                >
                  Registrar Entrada
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Clientes */}
          <TabsContent value="clientes" className="space-y-4 mt-0">
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-primary/10 text-center">
                <Users size={20} className="mx-auto text-primary mb-1" />
                <p className="text-xl font-bold text-foreground">124</p>
                <p className="text-xs text-muted-foreground">Total Clientes</p>
              </div>
              <div className="p-4 rounded-2xl bg-secondary/10 text-center">
                <Repeat size={20} className="mx-auto text-secondary mb-1" />
                <p className="text-xl font-bold text-foreground">68%</p>
                <p className="text-xs text-muted-foreground">Recorrentes</p>
              </div>
              <div className="p-4 rounded-2xl bg-accent/10 text-center">
                <Star size={20} className="mx-auto text-accent mb-1" />
                <p className="text-xl font-bold text-foreground">4.8</p>
                <p className="text-xs text-muted-foreground">Avaliação</p>
              </div>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Star size={18} className="text-warning" />
                  Melhores Clientes
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {MELHORES_CLIENTES.map((cliente, index) => (
                    <div
                      key={cliente.name}
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{cliente.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {cliente.visitas} visitas • {cliente.ultimaVisita}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-primary">
                          R$ {cliente.gastoTotal.toLocaleString("pt-BR")}
                        </p>
                        <p className="text-xs text-muted-foreground">gasto total</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold tracking-tight">
                  Adicionar Cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Nome</Label>
                  <Input
                    placeholder="Nome do cliente"
                    value={clienteNome}
                    onChange={(e) => setClienteNome(e.target.value)}
                    className="h-9"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">WhatsApp</Label>
                  <Input
                    placeholder="(11) 99999-9999"
                    value={clienteWhatsapp}
                    onChange={(e) => setClienteWhatsapp(e.target.value)}
                    className="h-9"
                  />
                </div>
                <Button
                  className="w-full h-9 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleSalvarCliente}
                >
                  Salvar Cliente
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Gestão */}
          <TabsContent value="gestao" className="space-y-4 mt-0">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Target size={18} className="text-primary" />
                  Metas do Mês
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-foreground">Vendas do mês</span>
                    <span className="font-semibold text-primary">R$ 7.100 / R$ 10.000</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: "71%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-foreground">Novos clientes</span>
                    <span className="font-semibold text-primary">12 / 20</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-warning transition-all" style={{ width: "60%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-foreground">Avaliações 5★</span>
                    <span className="font-semibold text-primary">8 / 15</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-warning transition-all" style={{ width: "53.33%" }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Bell size={18} className="text-secondary" />
                    Lembretes e Tarefas
                  </CardTitle>
                  <Button variant="outline" size="sm" className="text-xs border-2 border-primary h-8">
                    <Plus size={14} className="mr-1" />
                    Nova
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {TAREFAS_GESTAO.map((tarefa) => {
                    const completed = tarefasCompletas[tarefa.id] ?? tarefa.completed;
                    return (
                      <div
                        key={tarefa.id}
                        className={`flex items-center gap-3 p-3 rounded-xl ${completed ? "bg-muted/30 opacity-60" : "bg-muted/50"}`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleTarefa(tarefa.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                            completed ? "bg-success border-success" : "border-muted-foreground"
                          }`}
                        >
                          {completed && <Check size={14} className="text-success-foreground" strokeWidth={3} />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${completed ? "text-muted-foreground line-through" : "text-foreground"}`}>
                            {tarefa.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock size={12} className="text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{tarefa.quando}</span>
                          </div>
                        </div>
                        {!completed && tarefa.prioridade && (
                          <div
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${
                              tarefa.prioridade === "destructive" ? "bg-destructive" : "bg-warning"
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold tracking-tight">
                  Distribuição de Despesas
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {DESPESAS_GESTAO.map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground">{item.label}</span>
                        <span className="text-muted-foreground">{item.pct}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.bar}`}
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/empreendedor/gestao"
                className="p-4 rounded-2xl bg-secondary/10 border border-secondary/20 hover:border-secondary/40 transition-colors"
              >
                <Target size={24} className="text-secondary mb-2" />
                <h4 className="font-semibold text-foreground text-sm">Estruturação</h4>
                <p className="text-xs text-muted-foreground">Completar perfil</p>
              </Link>
              <Link
                to="/empreendedor/negocio"
                className="p-4 rounded-2xl bg-primary/10 border border-primary/20 hover:border-primary/40 transition-colors"
              >
                <FileText size={24} className="text-primary mb-2" />
                <h4 className="font-semibold text-foreground text-sm">Editar Perfil</h4>
                <p className="text-xs text-muted-foreground">Atualizar dados</p>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <EntrepreneurNav activeTab="negocios" />
    </div>
  );
}
