# Estrutura Completa do Repositório Napraça

Este documento descreve a organização completa do repositório Napraça, incluindo código, documentação de negócio, documentação técnica e assets de design.

## 📁 Visão Geral da Estrutura

```
napraca/
├── .github/                    # Configurações do GitHub
│   ├── ISSUE_TEMPLATE/         # Templates de issues
│   ├── workflows/              # GitHub Actions (CI/CD)
│   └── PULL_REQUEST_TEMPLATE.md
│
├── docs/                       # 📚 Documentação Completa
│   ├── business/               # Documentos de Negócio
│   │   ├── README.md
│   │   ├── plano-de-negocios.md
│   │   ├── canvas/
│   │   │   ├── proposta-de-valor.md
│   │   │   ├── business-model-canvas.md
│   │   │   └── mvp-canvas.md
│   │   ├── personas/
│   │   │   ├── consumidor.md
│   │   │   └── empreendedor.md
│   │   ├── jornadas/
│   │   │   ├── jornada-consumidor.md
│   │   │   └── jornada-empreendedor.md
│   │   ├── pesquisa/
│   │   │   ├── validacao-problema.md
│   │   │   ├── validacao-solucao.md
│   │   │   └── analise-mercado.md
│   │   └── viabilidade/
│   │       ├── modelo-financeiro.md
│   │       ├── go-to-market.md
│   │       └── roadmap.md
│   │
│   ├── technical/              # Documentação Técnica
│   │   ├── README.md
│   │   ├── architecture.md
│   │   ├── database-schema.md
│   │   ├── api-design.md
│   │   └── security.md
│   │
│   ├── design/                 # Design System e Assets
│   │   ├── README.md
│   │   ├── design-system.md
│   │   ├── brand-guidelines.md
│   │   ├── wireframes/
│   │   │   ├── baixa-fidelidade/
│   │   │   └── alta-fidelidade/
│   │   ├── mockups/
│   │   └── assets/
│   │       ├── logos/
│   │       ├── icons/
│   │       └── images/
│   │
│   ├── guides/                 # Guias de Desenvolvimento
│   │   ├── README.md
│   │   ├── getting-started.md
│   │   ├── development.md
│   │   ├── testing.md
│   │   ├── deployment.md
│   │   ├── troubleshooting.md
│   │   └── ai-implementation/
│   │       ├── lovable-guide.md
│   │       ├── v0-guide.md
│   │       └── cursor-guide.md
│   │
│   └── api/                    # Documentação da API
│       ├── README.md
│       ├── authentication.md
│       ├── businesses.md
│       ├── missions.md
│       ├── community.md
│       └── analytics.md
│
├── apps/                       # 💻 Aplicações
│   ├── web/                    # Aplicação Web
│   │   ├── client/
│   │   ├── server/
│   │   ├── drizzle/
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── mobile/                 # Aplicação Mobile
│   │   ├── src/
│   │   ├── app.json
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── admin/                  # Painel Administrativo (futuro)
│       └── README.md
│
├── packages/                   # 📦 Pacotes Compartilhados
│   ├── ui/                     # Componentes UI
│   │   ├── src/
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── api/                    # Cliente da API
│   │   ├── src/
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── utils/                  # Utilitários
│       ├── src/
│       ├── package.json
│       └── README.md
│
├── scripts/                    # 🛠️ Scripts Utilitários
│   ├── setup.sh
│   ├── seed-db.js
│   └── README.md
│
├── .gitignore
├── .env.example
├── LICENSE
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## 📚 Documentação de Negócio (`docs/business/`)

Esta seção contém toda a documentação estratégica e de negócio do Napraça, essencial para entender a visão, missão e proposta de valor do projeto.

### Plano de Negócios
Documento completo com análise de mercado, modelo de negócio, estratégia de go-to-market e projeções financeiras.

### Canvas
Três canvas estratégicos que definem a proposta de valor, modelo de negócio e MVP:
- **Proposta de Valor Canvas**: Define o valor entregue para cada segmento
- **Business Model Canvas**: Modelo de negócio completo
- **MVP Canvas**: Definição do produto mínimo viável

### Personas
Perfis detalhados dos usuários-alvo com informações demográficas, comportamentais, dores e objetivos:
- **Persona Consumidor**: Perfil do usuário que busca negócios locais
- **Persona Empreendedor**: Perfil do MEI/pequeno empresário

### Jornadas do Cliente
Mapeamento completo da experiência do usuário desde o primeiro contato até a fidelização:
- **Jornada do Consumidor**: Descoberta → Exploração → Engajamento → Fidelização
- **Jornada do Empreendedor**: Cadastro → Aprendizado → Crescimento → Escala

### Pesquisa e Validação
Documentação de pesquisas realizadas para validar problema e solução:
- Validação do problema (qualitativa e quantitativa)
- Validação da solução (testes de usabilidade, feedback)
- Análise de mercado (concorrentes, oportunidades)

### Viabilidade
Análise de viabilidade financeira e estratégia de crescimento:
- Modelo financeiro e projeções
- Estratégia de go-to-market
- Roadmap de produto

## 🔧 Documentação Técnica (`docs/technical/`)

Documentação técnica detalhada sobre arquitetura, banco de dados, APIs e segurança.

### Arquitetura
Visão geral da arquitetura do sistema, incluindo diagramas de componentes, fluxo de dados e decisões arquiteturais.

### Database Schema
Esquema completo do banco de dados com todas as tabelas, relacionamentos e índices. Inclui migrations e seeds.

### API Design
Design da API REST/tRPC com endpoints, payloads, responses e exemplos de uso.

### Security
Práticas de segurança implementadas, autenticação, autorização e proteção de dados.

## 🎨 Design (`docs/design/`)

Sistema de design completo, wireframes, mockups e assets visuais.

### Design System
Definição completa do design system com cores, tipografia, espaçamentos, componentes e padrões de interface.

### Brand Guidelines
Diretrizes da marca incluindo logo, paleta de cores, tom de voz e aplicações.

### Wireframes
Wireframes de baixa e alta fidelidade de todas as telas principais do aplicativo.

### Mockups
Mockups finais das interfaces com design aplicado.

### Assets
Todos os assets visuais do projeto (logos, ícones, imagens).

## 📖 Guias (`docs/guides/`)

Guias práticos para desenvolvedores e contribuidores.

### Getting Started
Guia de início rápido para configurar o ambiente de desenvolvimento.

### Development
Boas práticas de desenvolvimento, convenções de código e workflows.

### Testing
Guia completo de testes (unitários, integração, E2E).

### Deployment
Instruções para deploy em produção.

### Troubleshooting
Soluções para problemas comuns.

### AI Implementation
Guias específicos para IAs implementarem o Napraça:
- Guia para Lovable
- Guia para V0
- Guia para Cursor

## 🔌 API (`docs/api/`)

Documentação completa da API com exemplos de uso.

Cada módulo da API é documentado separadamente:
- Authentication (login, logout, OAuth)
- Businesses (CRUD, analytics, tracking)
- Missions (list, progress, completion)
- Community (posts, comments, likes)
- Analytics (dashboard, reports)

## 💻 Aplicações (`apps/`)

Código das aplicações web, mobile e admin.

### Web
Aplicação web desenvolvida com React 19, Vite, Tailwind CSS 4 e tRPC.

### Mobile
Aplicação mobile desenvolvida com React Native e Expo.

### Admin
Painel administrativo para gerenciar a plataforma (futuro).

## 📦 Pacotes (`packages/`)

Código compartilhado entre as aplicações.

### UI
Componentes de interface reutilizáveis.

### API
Cliente da API para comunicação com o backend.

### Utils
Funções utilitárias compartilhadas.

## 🛠️ Scripts (`scripts/`)

Scripts utilitários para automação de tarefas.

- `setup.sh`: Configuração inicial do ambiente
- `seed-db.js`: Popular banco de dados com dados de teste

## 📋 Arquivos Raiz

### README.md
Documento principal do repositório com overview do projeto, quick start e links para documentação.

### CONTRIBUTING.md
Guia de contribuição com instruções para colaboradores.

### CODE_OF_CONDUCT.md
Código de conduta para a comunidade.

### LICENSE
Licença do projeto (MIT).

### package.json
Configuração do workspace raiz.

### pnpm-workspace.yaml
Configuração do workspace do pnpm.

### turbo.json
Configuração do Turborepo para builds otimizados.

## 🎯 Como Usar Esta Estrutura

1. **Clone o repositório**
2. **Navegue pela documentação** começando pelo README.md
3. **Leia os documentos de negócio** em `docs/business/` para entender a visão
4. **Consulte os guias** em `docs/guides/` para começar a desenvolver
5. **Explore o código** em `apps/` e `packages/`
6. **Contribua** seguindo o CONTRIBUTING.md

## 🔄 Manutenção da Documentação

A documentação deve ser mantida atualizada conforme o projeto evolui. Toda mudança significativa no código deve ser acompanhada de atualização na documentação correspondente.

---

**Última atualização:** Janeiro 2026  
**Versão:** 1.0.0
