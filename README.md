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
=======
# Napraça 🏪

> Conectando consumidores e empreendedores locais, fortalecendo a economia de bairro

[![CI](https://github.com/napraca/napraca/workflows/CI/badge.svg)](https://github.com/napraca/napraca/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## 📖 Sobre o Projeto

O Napraça é uma plataforma mobile híbrida que funciona como uma "escola de negócios" gamificada para microempreendedores (MEIs) e pequenas empresas, conectando-os com consumidores locais através de um mapa inteligente.

**Missão:** Fortalecer a economia de bairro, conectando consumidores e empreendedores locais de forma educativa e engajadora.

**Visão:** Ser a principal plataforma de suporte e conexão para microempreendedores no Brasil, promovendo o desenvolvimento sustentável de comunidades locais.

### 🎯 Funcionalidades Principais

O Napraça oferece uma experiência completa tanto para consumidores quanto para empreendedores:

**Para Consumidores:**
- 🗺️ **Mapa Interativo:** Descubra negócios locais por categoria e localização
- 🎁 **Sistema de Recompensas:** Ganhe pontos e badges por engajamento
- ⭐ **Avaliações:** Avalie e favorite seus negócios preferidos
- 👥 **Comunidade:** Participe de discussões e compartilhe experiências

**Para Empreendedores:**
- 📚 **Missões Educativas:** Aprenda gestão de negócios de forma gamificada
- 📊 **Analytics:** Acompanhe o desempenho do seu negócio em tempo real
- 🎯 **Dashboard Gamificado:** Visualize seu progresso e conquistas
- 💬 **Comunidade:** Conecte-se com outros empreendedores e troque experiências

## 🚀 Quick Start

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js 22+ ([Download](https://nodejs.org/))
- pnpm 10+ (`npm install -g pnpm`)
- MySQL 8+ ou TiDB ([Download](https://dev.mysql.com/downloads/))
- Git ([Download](https://git-scm.com/))

### Instalação

```bash
# Clone o repositório
git clone https://github.com/napraca/napraca.git
cd napraca

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais

# Execute as migrations
pnpm db:push

# (Opcional) Popule o banco com dados de teste
node scripts/seed-db.js

# Inicie o desenvolvimento
pnpm dev
```

Acesse a aplicação:
- **Web:** http://localhost:3000
- **Mobile:** Escaneie o QR code com o Expo Go app

## 📚 Documentação

Toda a documentação do projeto está organizada na pasta `docs/`:

- [Getting Started](docs/getting-started.md) - Guia de início rápido
- [Arquitetura](docs/architecture.md) - Visão geral da arquitetura
- [API Reference](docs/api/README.md) - Documentação completa da API
- [Design System](docs/design/design-system.md) - Sistema de design e componentes
- [Guia de Contribuição](CONTRIBUTING.md) - Como contribuir com o projeto
- [Guia de Desenvolvimento](docs/guides/development.md) - Boas práticas de desenvolvimento
- [Guia de Testes](docs/guides/testing.md) - Como escrever e executar testes
- [Troubleshooting](docs/guides/troubleshooting.md) - Resolução de problemas comuns

## 🛠️ Stack Tecnológico

O Napraça utiliza tecnologias modernas e robustas:

**Frontend:**
- React 19 - Biblioteca UI
- React Native + Expo - Mobile
- Tailwind CSS 4 - Estilização
- Vite - Build tool
- tRPC 11 - Type-safe API client

**Backend:**
- Express 4 - Web framework
- tRPC 11 - Type-safe API
- Drizzle ORM - Database ORM
- Zod - Validação de schemas

**Database:**
- MySQL 8 / TiDB - Banco de dados relacional

**Infraestrutura:**
- Manus OAuth - Autenticação
- AWS S3 - Armazenamento de arquivos
- Google Maps API - Mapas e geolocalização

## 📁 Estrutura do Projeto

```
napraca/
├── apps/
│   ├── web/          # Aplicação web (React + Vite)
│   ├── mobile/       # Aplicação mobile (React Native + Expo)
│   └── admin/        # Painel administrativo
├── packages/
│   ├── ui/           # Componentes compartilhados
│   ├── api/          # Cliente da API
│   └── utils/        # Utilitários compartilhados
├── docs/             # Documentação completa
├── scripts/          # Scripts utilitários
└── .github/          # Templates e workflows do GitHub
```

## 🤝 Contribuindo

Contribuições são muito bem-vindas! O Napraça é um projeto open source e sua ajuda é essencial para torná-lo melhor.

### Como Contribuir

1. Leia nosso [Guia de Contribuição](CONTRIBUTING.md)
2. Fork o projeto
3. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
4. Commit suas mudanças (`git commit -m 'feat: Add MinhaFeature'`)
5. Push para a branch (`git push origin feature/MinhaFeature`)
6. Abra um Pull Request

### Código de Conduta

Este projeto segue o [Código de Conduta do Contributor Covenant](CODE_OF_CONDUCT.md). Ao participar, você concorda em seguir suas diretrizes.

## 🧪 Testes

Execute os testes com:

```bash
# Todos os testes
pnpm test

# Testes com coverage
pnpm test:coverage

# Testes em watch mode
pnpm test:watch
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Time

- **Vivian Peres** - Product Owner & Developer
- **Anne** - Developer
- **Raiane** - Developer

## 📧 Contato

- **Website:** https://napraca.com
- **Email:** contato@napraca.com
- **Instagram:** [@napraca](https://instagram.com/napraca)
- **Discord:** [Napraça Community](https://discord.gg/napraca)

## 🙏 Agradecimentos

- [Campus Mobile](https://campusmobile.com.br/) pela oportunidade e suporte
- Comunidade open source por todas as ferramentas incríveis
- Todos os contribuidores que ajudam a tornar o Napraça melhor

## 🗺️ Roadmap

### v1.0.0 - MVP (Campus Mobile) ✅
- Sistema de autenticação
- Mapa com negócios locais
- Dashboard básico para empreendedores
- Sistema de missões educativas
- Perfil do usuário

### v1.1.0 - Comunidade 🚧
- Fórum/posts da comunidade
- Sistema de comentários
- Sistema de likes e interações

### v1.2.0 - Analytics 📅
- Dashboard de analytics avançado
- Relatórios personalizados
- Gráficos e visualizações

### v2.0.0 - Escala 🔮
- Notificações push
- Chat em tempo real
- Integração com redes sociais
- App nativo (iOS/Android)

---

<div align="center">
  <p>Feito com ❤️ pelo time Napraça</p>
  <p>
    <a href="https://napraca.com">Website</a> •
    <a href="https://github.com/napraca/napraca/issues">Issues</a> •
    <a href="https://discord.gg/napraca">Discord</a>
  </p>
</div>
>>>>>>> c8459834d405d342aa0e6b7328131493c085ccb3
