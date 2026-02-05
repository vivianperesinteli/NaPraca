# Guia de Configuração - NaPraça

## 📋 Pré-requisitos

1. Node.js 18+ instalado
2. Conta no [Supabase](https://supabase.com)
3. Conta no [Google Cloud Platform](https://console.cloud.google.com) para Google Maps API

## 🔧 Passo a Passo

### 1. Instalar Dependências

**IMPORTANTE: Use apenas npm (não use pnpm, yarn ou bun)**

Na raiz do diretório `code/`:

```bash
cd code
npm run install:all
```

Este comando instala as dependências na raiz, backend e frontend automaticamente.

**Alternativa (instalação manual em cada pasta):**
```bash
cd code
npm install
cd backend
npm install
cd ../frontend
npm install
```

### 2. Configurar Supabase

1. Crie um novo projeto no [Supabase Dashboard](https://app.supabase.com)
2. Acesse **Settings** → **API**
3. Copie a **URL** e a **anon key**
4. No Supabase, vá em **SQL Editor**
5. **Execute o script SQL completo do arquivo `DATABASE_SCHEMA.md`** (inclui tabelas, índices, triggers e políticas RLS)
6. **Importante**: O script habilita Row Level Security (RLS) em todas as tabelas para garantir segurança dos dados

#### Desativar confirmação de e-mail (entrar sem confirmar)

Para que o usuário possa **entrar na conta logo após o cadastro**, sem precisar clicar no link de confirmação por e-mail:

1. No [Supabase Dashboard](https://app.supabase.com), abra seu projeto
2. Vá em **Authentication** → **Providers** → **Email**
3. Desative a opção **"Confirm email"** (toggle off)
4. Salve

Assim, o login funciona imediatamente após o cadastro.

### 3. Configurar Google Maps API

1. Acesse o [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto ou selecione um existente
3. Ative a **Maps JavaScript API**
4. Vá em **APIs & Services** → **Credentials**
5. Crie uma **API Key** (ou use uma existente)
6. Configure restrições de segurança (recomendado)

### 4. Criar Arquivo .env

Na pasta `code/frontend/`, crie um arquivo `.env` com o seguinte conteúdo:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
VITE_GOOGLE_MAPS_API_KEY=sua_chave_do_google_maps_aqui
```

**⚠️ Importante**: 
- Nunca commite o arquivo `.env` no Git
- O arquivo `.env` já está no `.gitignore`

### 5. Executar o Projeto

Na raiz do diretório `code/`:

```bash
cd code
npm run dev
```

O projeto estará disponível em `http://localhost:5173` (ou a porta que o Vite indicar)

## ✅ Verificação

Após seguir os passos acima, você deve conseguir:

1. ✅ Acessar a tela de autenticação
2. ✅ Criar uma conta (Consumidor ou Empreendedor)
3. ✅ Fazer login
4. ✅ Ver o mapa (se houver negócios cadastrados)
5. ✅ Navegar entre as telas

## 🐛 Problemas Comuns

### Erro: "Missing Supabase environment variables"
- Verifique se o arquivo `.env` existe na raiz do projeto
- Confirme que as variáveis começam com `VITE_`
- Reinicie o servidor após criar/editar o `.env`

### Mapa não carrega
- Verifique se a Google Maps API Key está correta
- Confirme que a **Maps JavaScript API** está ativada
- Verifique o console do navegador para erros específicos

### Erro ao criar conta
- Verifique se as tabelas foram criadas no Supabase
- Confirme que o script SQL foi executado completamente (incluindo políticas RLS)
- Verifique os logs no Supabase Dashboard
- Certifique-se de que as políticas RLS estão habilitadas nas tabelas

### Erro de permissão (RLS)
- Verifique se todas as políticas RLS foram criadas corretamente
- Confirme que a função `get_user_profile_id()` foi criada
- Verifique se o usuário está autenticado antes de fazer operações
- Consulte os logs do Supabase para ver qual política está bloqueando a operação

### Erro de CORS
- No Supabase, vá em **Settings** → **API**
- Adicione `http://localhost:5173` nas URLs permitidas

## 📚 Próximos Passos

1. Cadastre alguns negócios de teste através do Supabase Dashboard
2. Crie missões de exemplo para testar o dashboard
3. Personalize as cores e estilos no `tailwind.config.js`
4. Configure Row Level Security (RLS) no Supabase conforme necessário

## 🆘 Suporte

Para mais informações, consulte:
- [README_TECNICO.md](./README_TECNICO.md) - Documentação técnica completa
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) - Estrutura do banco de dados

