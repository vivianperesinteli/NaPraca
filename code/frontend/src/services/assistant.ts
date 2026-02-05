/**
 * Serviço do Assistente do empreendedor.
 * Envia mensagens para um webhook do n8n e retorna a resposta.
 *
 * Configuração:
 * 1. No frontend, crie/edite o .env e defina:
 *    VITE_N8N_ASSISTANT_WEBHOOK_URL=https://seu-n8n.com/webhook/xxxx
 * 2. No n8n, crie um workflow com:
 *    - Trigger: Webhook (POST, JSON)
 *    - Corpo esperado: { "message": "texto do usuário", "userId": "opcional" }
 *    - Respond to Webhook: envie JSON com campo "reply" ou "message" (texto da resposta)
 */

const WEBHOOK_URL = (import.meta.env.VITE_N8N_ASSISTANT_WEBHOOK_URL as string)?.trim() || "";

export interface AssistantPayload {
  message: string;
  userId?: string;
  /** Últimas N mensagens para contexto (opcional) */
  history?: { role: "user" | "assistant"; content: string }[];
}

export interface AssistantResponse {
  reply?: string;
  message?: string;
  response?: string;
  output?: string;
  text?: string;
  result?: string;
  answer?: string;
  content?: string;
  data?: { reply?: string; message?: string; output?: string; text?: string };
}

function getText(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value.trim();
  return null;
}

function getReplyFromBody(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  const direct =
    getText(o.reply) ??
    getText(o.message) ??
    getText(o.response) ??
    getText(o.output) ??
    getText(o.text) ??
    getText(o.result) ??
    getText(o.answer) ??
    getText(o.content);
  if (direct) return direct;
  if (o.data && typeof o.data === "object") {
    const d = o.data as Record<string, unknown>;
    return (
      getText(d.reply) ??
      getText(d.message) ??
      getText(d.output) ??
      getText(d.text) ??
      null
    );
  }
  return null;
}

/**
 * Envia a mensagem do usuário para o webhook do n8n e retorna o texto da resposta.
 * Se a URL não estiver configurada ou a requisição falhar, retorna null.
 */
export async function sendToAssistant(
  payload: AssistantPayload
): Promise<string | null> {
  if (!WEBHOOK_URL) return null;

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return null;

    const data: unknown = await res.json();
    return getReplyFromBody(data);
  } catch {
    return null;
  }
}

export function isAssistantConfigured(): boolean {
  return WEBHOOK_URL.length > 0;
}
