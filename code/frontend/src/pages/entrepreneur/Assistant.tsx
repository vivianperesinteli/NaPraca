import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bot, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { sendToAssistant } from "@/services/assistant";
import {
  ensureMyProfileId,
  getAssistantMessages,
  insertAssistantMessage,
} from "@/services/api";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type MessageRole = "user" | "assistant";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  time: string;
}

const initialMessage: Message = {
  id: "0",
  role: "assistant",
  content: "Olá, estou aqui para te ajudar! 👋\n\nEu analiso suas estatísticas e defino quais serão suas próximas missões do negócio. Fale comigo para tirar dúvidas, entender os próximos passos da sua gestão e como escalar no digital enquanto você encontra consumidores no nosso app.\n\nEm que posso ajudar agora?",
  time: "Agora",
};

function formatTime() {
  return new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatCreatedAt(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

function rowToMessage(row: {
  id: string;
  role: string;
  content: string;
  created_at: string;
}): Message {
  return {
    id: row.id,
    role: row.role as MessageRole,
    content: row.content,
    time: formatCreatedAt(row.created_at),
  };
}

const FALLBACK_REPLIES = [
  "Entendi! Estou aqui para ajudar. Use a aba Gestão para acompanhar seu negócio e as Missões para ganhar pontos.",
  "Ótima pergunta! Anotei. Use a aba Gestão e Missões para os próximos passos do seu negócio.",
  "Obrigado por falar comigo. Fale comigo sempre que quiser tirar dúvidas sobre gestão e missões!",
];

export default function EntrepreneurAssistant() {
  const { profile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const listEndRef = useRef<HTMLDivElement>(null);
  const loadedForUserRef = useRef<string | null>(null);

  const scrollToBottom = () => listEndRef.current?.scrollIntoView({ behavior: "smooth" });

  // Carregar histórico do Supabase (usar o mesmo id que o backend usa para RLS)
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const userId = (await ensureMyProfileId()) ?? profile?.id;
      if (!userId) {
        setLoadingHistory(false);
        return;
      }
      if (loadedForUserRef.current === userId) return;
      loadedForUserRef.current = userId;
      setLoadingHistory(true);
      try {
        const rows = await getAssistantMessages(userId);
        if (cancelled) return;
        if (rows.length === 0) {
          setMessages([initialMessage]);
        } else {
          setMessages(rows.map(rowToMessage));
        }
      } catch {
        if (!cancelled) setMessages([initialMessage]);
      } finally {
        if (!cancelled) setLoadingHistory(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [profile?.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async () => {
    const text = inputValue.trim();
    if (!text) return;

    // Usar sempre o id retornado pelo Supabase (ensure_my_profile) para o insert passar no RLS
    const profileId = (await ensureMyProfileId()) ?? profile?.id;
    if (!profileId) {
      toast({
        title: "Não foi possível enviar",
        description: "Perfil não carregado. Recarregue a página ou faça login novamente.",
        variant: "destructive",
      });
      return;
    }

    setInputValue("");
    setIsTyping(true);

    try {
      // Insere mensagem do usuário no Supabase e adiciona no estado
      const userRow = await insertAssistantMessage(profileId, "user", text);
      if (!userRow) {
        toast({
          title: "Conversa não salva",
          description: "Não foi possível salvar no servidor. Verifique sua conexão e tente novamente.",
          variant: "destructive",
        });
      }
      const userMsg: Message = {
        id: userRow?.id ?? `u-${Date.now()}`,
        role: "user",
        content: text,
        time: userRow ? formatCreatedAt(userRow.created_at) : formatTime(),
      };
      setMessages((prev) => [...prev, userMsg]);

      // Histórico recente para o n8n
      const history = messages.slice(-10).map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

      const reply = await sendToAssistant({
        message: text,
        userId: profileId,
        history,
      });

      const assistantContent =
        reply?.trim() ||
        FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];

      // Insere resposta do assistente no Supabase e adiciona no estado
      const assistantRow = await insertAssistantMessage(
        profileId,
        "assistant",
        assistantContent
      );
      if (!assistantRow && userRow) {
        toast({
          title: "Resposta não salva",
          description: "Sua mensagem foi salva, mas a resposta não. Tente recarregar o histórico depois.",
          variant: "destructive",
        });
      }
      const assistantMsg: Message = {
        id: assistantRow?.id ?? `a-${Date.now()}`,
        role: "assistant",
        content: assistantContent,
        time: assistantRow ? formatCreatedAt(assistantRow.created_at) : formatTime(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      toast({
        title: "Erro ao enviar",
        description: "Não foi possível enviar a mensagem. Tente novamente.",
        variant: "destructive",
      });
      setMessages((prev) => [
        ...prev,
        {
          id: `u-${Date.now()}`,
          role: "user" as const,
          content: text,
          time: formatTime(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header fixo no topo */}
      <div className="sticky top-0 z-10 flex-shrink-0 bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-4">
          <Link
            to="/empreendedor"
            className="text-muted-foreground hover:text-foreground transition-colors p-1 -m-1"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex items-center gap-2 flex-1">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bot size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-foreground">Assistente</h1>
              <p className="text-xs text-muted-foreground">Sempre disponível para você</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {loadingHistory && (
          <p className="text-sm text-muted-foreground text-center py-4">
            Carregando histórico...
          </p>
        )}
        {!loadingHistory && messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex gap-2 max-w-[85%]",
              msg.role === "user" ? "ml-auto flex-row-reverse" : ""
            )}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-primary" />
              </div>
            )}
            <div
              className={cn(
                "rounded-2xl px-4 py-3",
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-muted text-foreground rounded-bl-md"
              )}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              <p
                className={cn(
                  "text-[10px] mt-1",
                  msg.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                )}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        {!loadingHistory && isTyping && (
          <div className="flex gap-2 max-w-[85%]">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Bot size={16} className="text-primary" />
            </div>
            <div className="rounded-2xl rounded-bl-md px-4 py-3 bg-muted">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" />
              </div>
            </div>
          </div>
        )}
        <div ref={listEndRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 bg-card border-t border-border p-4 pb-6">
        <div className="flex gap-2">
          <Input
            placeholder="Digite sua mensagem..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="rounded-xl flex-1"
            disabled={isTyping}
          />
          <Button
            type="button"
            onClick={sendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="rounded-xl px-4 shrink-0"
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
