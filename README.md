# NaPraça 🏪

Plataforma de escola de negócios gamificada para microempreendedores e mapa inteligente para consumidores locais.

## Estrutura do repositório `code/`

```
code/
├── backend/          # Lógica de negócio e acesso a dados (Supabase)
│   ├── src/
│   │   ├── data/     # Repositórios, modelos, serviços (supabaseClient)
│   │   └── domain/  # Entidades e use cases
│   ├── DATABASE_SCHEMA.md
│   ├── package.json
│   └── tsconfig.json
├── frontend/         # Aplicação web (React + Vite + Shadcn)
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/ # AuthContext (integra com backend)
│   │   ├── lib/      # supabase.ts (cliente com import.meta.env)
│   │   └── pages/
│   ├── package.json
│   └── vite.config.ts
├── DATABASE_SCHEMA.md
├── package.json      # Scripts raiz (dev, build)
└── README.md
```

## Início rápido

### 1. Variáveis de ambiente

No **frontend**, crie `frontend/.env`:

```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key
```

No **backend** (scripts Node), use `SUPABASE_URL` e `SUPABASE_ANON_KEY` se precisar.

### 2. Instalar dependências

Na raiz de `code/`:

```bash
npm run install:all
```

Ou em cada pasta:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. Rodar o frontend (desenvolvimento)

Na raiz de `code/`:

```bash
npm run dev
```

Ou:

```bash
cd frontend && npm run dev
```

Acesse: **http://localhost:8080**

### 4. Build

```bash
npm run build
```

## Integração frontend ↔ backend

- O **frontend** importa o backend pelo alias `@backend` (configurado em `frontend/vite.config.ts` e `frontend/tsconfig.app.json`).
- O cliente Supabase no frontend é criado em `frontend/src/lib/supabase.ts` com `import.meta.env.VITE_SUPABASE_*`.
- Os repositórios do backend recebem o cliente Supabase por construtor (injeção de dependência), então o frontend instancia `AuthRepository(supabase)`, `AuthUseCase(authRepo)` e usa em `AuthContext` e nas páginas (Login, Cadastro).
- Login e Cadastro usam autenticação real (Supabase Auth) e redirecionam conforme o tipo de perfil (consumidor → `/consumidor`, empreendedor → `/empreendedor`).

## Tecnologias

- **Frontend:** React 18, TypeScript, Vite, Tailwind, Shadcn UI, React Query, React Router.
- **Backend (camada de dados/domínio):** TypeScript, Supabase (Auth + PostgreSQL).
- **Banco:** PostgreSQL no Supabase; schema e RLS em `DATABASE_SCHEMA.md`.

## Documentação

- [Schema do Banco de Dados](./DATABASE_SCHEMA.md)
- [Documentação Técnica](./README_TECNICO.md)
- [Setup](./SETUP.md)
