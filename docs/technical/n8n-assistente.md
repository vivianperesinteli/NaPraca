# Assistente do empreendedor via n8n

O chat do assistente na tela **Início** do empreendedor pode ser conectado a um workflow no **n8n** para respostas com IA ou regras de negócio.

## 1. Variável de ambiente no frontend

No projeto, na pasta do frontend (`code/frontend`), crie ou edite o arquivo `.env`:

```env
VITE_N8N_ASSISTANT_WEBHOOK_URL=https://SEU_N8N/webhook/SEU_WEBHOOK_ID
```

Substitua pela URL real do webhook que você criar no n8n (ex.: `https://n8n.seudominio.com/webhook/abc123`).

Reinicie o servidor do frontend (`npm run dev` ou `bun run dev`) após alterar o `.env`.

## 2. Workflow no n8n

### Trigger: Webhook

1. Adicione um nó **Webhook**.
2. Método: **POST**.
3. **Respond to Webhook**: ative (para devolver a resposta na mesma requisição).
4. Anote a **URL do Webhook** (Production) e use em `VITE_N8N_ASSISTANT_WEBHOOK_URL`.

### Corpo enviado pelo app (JSON)

O frontend envia um POST com:

```json
{
  "message": "texto que o usuário digitou",
  "userId": "uuid-do-perfil-ou-null",
  "history": [
    { "role": "user", "content": "mensagem anterior" },
    { "role": "assistant", "content": "resposta anterior" }
  ]
}
```

- `message`: mensagem atual do usuário (obrigatório).
- `userId`: id do perfil logado (opcional).
- `history`: últimas mensagens para contexto (opcional).

### Resposta que o n8n deve devolver

O frontend espera um JSON com **um** destes campos (em ordem de prioridade):

- `reply` – texto da resposta do assistente (recomendado)
- `message` – alternativa
- `response` – alternativa

Exemplo:

```json
{
  "reply": "Olá! Com base nas suas estatísticas, recomendo a próxima missão: atualizar as fotos do negócio."
}
```

Se o n8n não devolver um desses campos ou a requisição falhar, o app mostra uma resposta padrão (fallback).

### Exemplo de fluxo no n8n

1. **Webhook** (POST) → recebe o body.
2. **Code** ou **Set** → extrair `body.message` (e opcionalmente `body.history`, `body.userId`).
3. **OpenAI** / **Anthropic** / outro nó de IA → montar o prompt com a mensagem e o histórico e obter a resposta.
4. **Respond to Webhook** → enviar `{ "reply": "texto gerado pela IA" }`.

Ou, sem IA:

1. **Webhook** → recebe.
2. **Switch** ou **IF** → regras por palavra-chave.
3. **Respond to Webhook** → `{ "reply": "resposta fixa ou montada" }`.

### Respond to Webhook

No nó **Respond to Webhook**:

- **Respond With**: JSON.
- **Response Body**: algo como:
  ```json
  {
    "reply": "{{ $json.reply }}"
  }
  ```
  (onde `reply` vem do nó anterior, por exemplo um nó de IA que coloca o resultado em `$json.reply`).

## 3. Testando

1. Configure a URL no `.env` e reinicie o frontend.
2. No app, vá em **Empreendedor → Início → Assistente** e envie uma mensagem.
3. No n8n, confira se o workflow é disparado e se a resposta aparece no chat.
4. Se a URL não estiver definida ou o n8n falhar, o chat usa respostas padrão.

## 4. CORS (se o n8n estiver em outro domínio)

Se o frontend estiver em um domínio e o n8n em outro, o n8n precisa permitir CORS para o domínio do app. Em muitos casos isso já vem habilitado; se der erro de CORS no navegador, configure o CORS no servidor/instância do n8n para aceitar a origem do frontend.
