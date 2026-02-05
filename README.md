# NaPraça 🏪

Plataforma que conecta consumidores e empreendedores locais, fortalecendo a economia de bairro.

## Estrutura do repositório

```
NaPraca/
├── backend/          # Lógica de negócio e acesso a dados (Supabase)
│   ├── src/
│   │   ├── data/     # Repositórios, modelos, serviços (supabaseClient)
│   │   └── domain/   # Entidades e use cases
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
├── .env              # Variáveis de ambiente (raiz; Vite carrega daqui)
├── DATABASE_SCHEMA.md
├── package.json      # Scripts raiz (dev, build, lint, check, test)
└── README.md
```

## Início rápido

### 1. Variáveis de ambiente

Na **raiz** do projeto, crie `.env`:

```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key
VITE_GOOGLE_MAPS_API_KEY=sua-chave-google-maps
```

O frontend (Vite) está configurado para carregar o `.env` da raiz.

### 2. Instalar dependências

Na raiz:

```bash
npm run install:all
```

Ou em cada pasta:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. Rodar o projeto (desenvolvimento)

Na raiz:

```bash
npm run dev
```

Acesse: **http://localhost:8080**

### 4. Build, lint e testes

```bash
npm run build   # backend + frontend
npm run lint    # backend + frontend
npm run check   # type check
npm run test    # testes do frontend
```

## Integração frontend ↔ backend

- O **frontend** importa o backend pelo alias `@backend` (em `frontend/vite.config.ts` e `frontend/tsconfig.app.json`).
- O cliente Supabase no frontend é criado em `frontend/src/lib/supabase.ts` com `import.meta.env.VITE_SUPABASE_*`.
- Os repositórios do backend recebem o cliente Supabase por construtor; o frontend instancia os repositórios e usa em `AuthContext` e nas páginas (Login, Cadastro).

## Tecnologias

- **Frontend:** React 18, TypeScript, Vite, Tailwind, Shadcn UI, React Query, React Router.
- **Backend (camada de dados/domínio):** TypeScript, Supabase (Auth + PostgreSQL).
- **Banco:** PostgreSQL no Supabase; schema e RLS em `DATABASE_SCHEMA.md`.

## Documentação

- [Schema do Banco de Dados](./DATABASE_SCHEMA.md)
- [Documentação Técnica](./README_TECNICO.md)
- [Setup](./SETUP.md)
