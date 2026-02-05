# Estrutura do Repositório NaPraça

Este documento descreve a organização do repositório NaPraça.

## Visão geral

```
NaPraca/
├── .github/                    # Configurações do GitHub
│   ├── ISSUE_TEMPLATE/          # Templates de issues
│   ├── workflows/               # GitHub Actions (CI)
│   └── PULL_REQUEST_TEMPLATE.md
│
├── backend/                     # Backend (Supabase + TypeScript)
│   ├── src/
│   │   ├── data/                # Repositórios, modelos, serviços
│   │   └── domain/              # Entidades e use cases
│   ├── DATABASE_SCHEMA.md
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                    # Aplicação web (React + Vite + Shadcn)
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
│
├── docs/                        # Documentação
│   ├── business/                # Documentos de negócio
│   ├── design/
│   ├── guides/
│   └── technical/
│
├── .env                         # Variáveis de ambiente (não commitado)
├── DATABASE_SCHEMA.md            # Schema e scripts SQL
├── package.json                 # Scripts raiz (dev, build, lint, check, test)
├── SETUP.md
├── README.md
├── README_TECNICO.md
├── ESTRUTURA_REPOSITORIO.md
├── supabase-*.sql               # Migrações e scripts Supabase
└── ...
```

## O que é usado ao rodar o projeto

- **`npm run dev`**: sobe o frontend (Vite) em `frontend/`; o frontend importa o backend via alias `@backend`.
- **`npm run build`**: compila o backend e o frontend.
- **`.env`** na raiz: carregado pelo Vite (configurado em `frontend/vite.config.ts` com `envDir`).

## Documentação

- [README.md](./README.md) – Início rápido e estrutura
- [SETUP.md](./SETUP.md) – Configuração passo a passo
- [README_TECNICO.md](./README_TECNICO.md) – Documentação técnica
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) – Schema do banco e RLS
