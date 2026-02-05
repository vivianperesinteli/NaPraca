# NaPraça - Documentação Técnica

## 📋 Visão Geral 

NaPraça é uma plataforma web responsiva (Mobile-First) que funciona como uma "escola de negócios" gamificada para microempreendedores e um mapa inteligente para consumidores locais. O projeto foi desenvolvido seguindo os princípios da **Clean Architecture** com padrão **MVVM**.

## 🏗️ Arquitetura

O projeto segue rigorosamente a **Clean Architecture** com separação em três camadas principais:

### 1. Presentation Layer (`src/presentation/`)

**Responsabilidade**: Interface do usuário, componentes visuais e lógica de apresentação.

**Estrutura**:
- `screens/`: Telas principais da aplicação
- `components/`: Componentes reutilizáveis
- `viewmodels/`: ViewModels que gerenciam estado e validações
- `stores/`: Estado global (Zustand)

**Regra de Ouro**: As telas e componentes **NÃO** devem acessar diretamente Services ou Supabase. Eles devem usar apenas ViewModels e UseCases.

**Exemplo**:
```typescript
// ✅ CORRETO - Tela usando ViewModel
const businessViewModel = new BusinessViewModel(businessUseCase)
const result = await businessViewModel.loadAllBusinesses()

// ❌ ERRADO - Tela acessando Repository diretamente
const repository = new BusinessRepository()
const businesses = await repository.getAll()
```

### 2. Domain Layer (`src/domain/`)

**Responsabilidade**: Regras de negócio e entidades do domínio.

**Estrutura**:
- `entities/`: Entidades de domínio (Profile, Business, Mission)
- `usecases/`: Casos de uso que orquestram a lógica de negócio

**Características**:
- Independente de frameworks
- Não conhece detalhes de implementação (Supabase, React, etc.)
- Contém apenas lógica de negócio pura

### 3. Data Layer (`src/data/`)

**Responsabilidade**: Acesso a dados e integração com serviços externos.

**Estrutura**:
- `models/`: Modelos de dados (interfaces que refletem a estrutura do banco)
- `repositories/`: Implementações de repositórios (acesso ao Supabase)
- `services/`: Serviços externos (cliente Supabase)

**Características**:
- Implementa interfaces definidas pela Domain Layer
- Lida com detalhes de infraestrutura (Supabase, APIs externas)
- Converte Models em Entities quando necessário

## 📁 Estrutura de Pastas

```
napraca/
├── src/
│   ├── presentation/          # Camada de Apresentação
│   │   ├── screens/           # Telas principais
│   │   │   ├── AuthScreen.tsx
│   │   │   ├── MapScreen.tsx
│   │   │   ├── BusinessProfileScreen.tsx
│   │   │   ├── EntrepreneurDashboardScreen.tsx
│   │   │   └── CreatorsScreen.tsx
│   │   ├── components/        # Componentes reutilizáveis
│   │   │   ├── BottomNavigation.tsx
│   │   │   ├── Header.tsx
│   │   │   └── BusinessCard.tsx
│   │   ├── viewmodels/        # ViewModels (MVVM)
│   │   │   ├── AuthViewModel.ts
│   │   │   ├── BusinessViewModel.ts
│   │   │   └── MissionViewModel.ts
│   │   └── stores/            # Estado global
│   │       └── authStore.ts
│   ├── domain/                # Camada de Domínio
│   │   ├── entities/          # Entidades de negócio
│   │   │   ├── Profile.ts
│   │   │   ├── Business.ts
│   │   │   └── Mission.ts
│   │   └── usecases/          # Casos de uso
│   │       ├── AuthUseCase.ts
│   │       ├── BusinessUseCase.ts
│   │       └── MissionUseCase.ts
│   ├── data/                  # Camada de Dados
│   │   ├── models/            # Modelos de dados
│   │   │   ├── ProfileModel.ts
│   │   │   ├── BusinessModel.ts
│   │   │   └── MissionModel.ts
│   │   ├── repositories/     # Repositórios
│   │   │   ├── AuthRepository.ts
│   │   │   ├── BusinessRepository.ts
│   │   │   └── MissionRepository.ts
│   │   └── services/          # Serviços externos
│   │       └── supabaseClient.ts
│   ├── App.tsx                # Componente raiz
│   ├── main.tsx               # Ponto de entrada
│   └── index.css              # Estilos globais
├── public/                    # Arquivos estáticos
├── index.html                 # HTML principal
├── package.json               # Dependências
├── vite.config.ts             # Configuração do Vite
├── tsconfig.json              # Configuração TypeScript
├── tailwind.config.js         # Configuração Tailwind
├── DATABASE_SCHEMA.md         # Schema do banco de dados
└── README_TECNICO.md          # Este arquivo
```

## 🛠️ Stack Tecnológica

- **Framework**: React 18.2
- **Build Tool**: Vite 5.0
- **Linguagem**: TypeScript 5.2
- **Estilização**: Tailwind CSS 3.3
- **Roteamento**: React Router DOM 6.21
- **Estado Global**: Zustand 4.4
- **Backend**: Supabase (PostgreSQL + Auth)
- **Mapas**: Google Maps JavaScript API (@react-google-maps/api)
- **Ícones**: Lucide React

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase
- Chave da API do Google Maps

### Passo 1: Instalar Dependências

```bash
cd napraca
npm install
```

### Passo 2: Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
VITE_GOOGLE_MAPS_API_KEY=sua_chave_da_api_do_google_maps
```

**Como obter as credenciais**:
- **Supabase**: Acesse seu projeto no Supabase Dashboard → Settings → API
- **Google Maps**: Acesse [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials

### Passo 3: Configurar o Banco de Dados

1. Acesse o Supabase Dashboard
2. Vá em SQL Editor
3. Execute o script SQL completo disponível em `DATABASE_SCHEMA.md`

### Passo 4: Executar o Projeto

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 📱 Telas da Aplicação

### 1. Autenticação (`/auth`)
- Login e cadastro de usuários
- Seleção de perfil (Consumidor ou Empreendedor)
- Validação de formulários

### 2. Mapa (`/map`)
- Mapa interativo com Google Maps
- Pins customizados para negócios
- Barra de busca e filtros por categoria
- Card flutuante com detalhes do negócio

### 3. Perfil de Negócio (`/business/:id`)
- Detalhes completos do negócio
- Ações rápidas (WhatsApp, Ligar, Email)
- Informações de contato e localização

### 4. Dashboard Empreendedor (`/dashboard`)
- Progresso de missões gamificadas
- Pontuação total
- Taxa de conclusão
- Lista de missões com ações

### 5. Página de Criadores (`/creators`)
- Informações sobre a equipe
- Links de contato

## 🎨 Design Mobile-First

O projeto foi desenvolvido com foco em dispositivos móveis:

- **Layout**: Simula experiência de app mobile com navegação inferior fixa
- **Largura Máxima**: Container limitado a `max-w-md` (448px)
- **Responsividade**: Totalmente responsivo usando Tailwind CSS
- **Touch-Friendly**: Botões e elementos otimizados para toque

## 🔐 Autenticação

A autenticação é gerenciada pelo Supabase Auth:

- **Cadastro**: Cria usuário no Supabase Auth e perfil na tabela `profiles`
- **Login**: Autenticação via email/senha
- **Sessão**: Gerenciada automaticamente pelo Supabase
- **Proteção de Rotas**: Rotas protegidas verificam autenticação via Zustand store

## 🔒 Row Level Security (RLS)

O projeto implementa **Row Level Security (RLS)** no Supabase para garantir segurança dos dados:

### Políticas Implementadas

1. **profiles**
   - Usuários podem ler, atualizar e deletar apenas seu próprio perfil
   - Usuários podem criar apenas um perfil vinculado ao seu `user_id`

2. **businesses**
   - **Leitura**: Todos podem ler negócios ativos (`is_active = true`)
   - **Leitura própria**: Empreendedores podem ler todos os seus negócios (mesmo inativos)
   - **Criação/Atualização/Deleção**: Apenas o dono do negócio pode modificar

3. **missions**
   - Empreendedores podem ler, criar, atualizar e deletar apenas suas próprias missões
   - Políticas verificam `entrepreneur_id` através da função `get_user_profile_id()`

### Função Helper

O banco de dados inclui a função `get_user_profile_id()` que retorna o `profile_id` do usuário autenticado atual. Esta função é usada pelas políticas RLS para verificar ownership.

### Importante

- **Profile ID vs User ID**: O código usa `profile_id` (da tabela `profiles`) para relacionamentos, não `user_id` (do Supabase Auth)
- **Autenticação Necessária**: Todas as operações de escrita requerem autenticação
- **Políticas Automáticas**: As políticas RLS são aplicadas automaticamente pelo Supabase em todas as queries

Para mais detalhes, consulte o arquivo `DATABASE_SCHEMA.md`.

## 🗺️ Integração com Google Maps

A integração com Google Maps utiliza a biblioteca `@react-google-maps/api`:

- **Componente Principal**: `GoogleMap` do `@react-google-maps/api`
- **Marcadores**: Pins customizados para cada negócio
- **InfoWindow**: Card flutuante com informações ao clicar no pin
- **Geolocalização**: Detecta localização do usuário automaticamente

## 📊 Fluxo de Dados

```
Screen → ViewModel → UseCase → Repository → Supabase
         ↓
      Store (Zustand)
```

**Exemplo prático**:

1. **Screen** (`MapScreen.tsx`) chama `businessViewModel.loadAllBusinesses()`
2. **ViewModel** (`BusinessViewModel.ts`) chama `businessUseCase.getAllBusinesses()`
3. **UseCase** (`BusinessUseCase.ts`) chama `businessRepository.getAll()`
4. **Repository** (`BusinessRepository.ts`) consulta o Supabase
5. Dados são convertidos de **Model** para **Entity** no UseCase
6. ViewModel retorna resultado para a Screen
7. Screen atualiza a UI

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Linting
npm run lint
```

## 🔧 Configuração de Path Aliases

O projeto utiliza path aliases para facilitar imports:

```typescript
// Configurado em vite.config.ts e tsconfig.json
import { Business } from '@domain/entities/Business'
import { BusinessViewModel } from '@presentation/viewmodels/BusinessViewModel'
import { BusinessRepository } from '@data/repositories/BusinessRepository'
```

## 📝 Convenções de Código

- **Nomenclatura**: PascalCase para componentes, camelCase para funções/variáveis
- **Arquivos**: PascalCase para componentes, camelCase para utilitários
- **TypeScript**: Tipagem estrita habilitada
- **Imports**: Sempre usar path aliases quando disponível

## 🐛 Troubleshooting

### Erro: "Missing Supabase environment variables"
- Verifique se o arquivo `.env` existe e contém as variáveis corretas
- Reinicie o servidor de desenvolvimento após criar/editar `.env`

### Erro: "Google Maps API Key não configurada"
- Adicione `VITE_GOOGLE_MAPS_API_KEY` no arquivo `.env`
- Certifique-se de que a API Key está habilitada no Google Cloud Console

### Erro: "Failed to fetch" ao carregar dados
- Verifique se as tabelas foram criadas no Supabase
- Confirme que as credenciais do Supabase estão corretas
- Verifique o console do navegador para erros específicos

## 📚 Recursos Adicionais

- [Documentação do Supabase](https://supabase.com/docs)
- [Documentação do React Google Maps](https://react-google-maps-api-docs.netlify.app/)
- [Documentação do Tailwind CSS](https://tailwindcss.com/docs)
- [Documentação do Vite](https://vitejs.dev/)

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de demonstração.

---

**Desenvolvido com ❤️ para microempreendedores e consumidores locais**

