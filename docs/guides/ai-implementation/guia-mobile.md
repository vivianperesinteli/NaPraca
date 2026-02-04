# Napraça - Guia Completo de Desenvolvimento Mobile

**Versão:** 1.0  
**Data:** Janeiro 2026  
**Autor:** Manus AI  
**Plataforma:** React Native + Expo  
**Público:** Desenvolvedores e Agentes de IA

---

## Sumário Executivo

Este documento fornece instruções completas e detalhadas para implementar a **Napraça**, uma plataforma mobile híbrida que conecta consumidores e empreendedores locais, fortalecendo a economia de bairro através de gamificação e educação. O guia foi estruturado para permitir que qualquer desenvolvedor ou agente de IA replique o projeto do zero, com todas as especificações técnicas, código-fonte e decisões arquiteturais documentadas.

**Objetivo da Plataforma:** Criar um ecossistema colaborativo onde consumidores descobrem negócios locais através de um mapa interativo, enquanto empreendedores recebem suporte educativo gamificado para melhorar suas habilidades de gestão.

**Tecnologias Principais:**
- **Frontend:** React Native 0.73+ com Expo SDK 50+
- **Backend:** Node.js + Express + tRPC
- **Banco de Dados:** MySQL/TiDB
- **Autenticação:** OAuth 2.0 (Manus Auth)
- **Mapas:** Google Maps API
- **Storage:** AWS S3

---

## 1. Visão Geral da Arquitetura

### 1.1 Arquitetura de Alto Nível

A Napraça segue uma arquitetura cliente-servidor moderna com separação clara de responsabilidades:

```
┌─────────────────────────────────────────────────────────────┐
│                     CAMADA DE APRESENTAÇÃO                   │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Consumidor  │  │ Empreendedor │  │    Admin     │      │
│  │   (Mobile)   │  │   (Mobile)   │  │    (Web)     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│           │                │                  │              │
│           └────────────────┴──────────────────┘              │
│                            │                                 │
└────────────────────────────┼─────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   API Gateway   │
                    │   (tRPC/HTTP)   │
                    └────────┬────────┘
                             │
┌────────────────────────────┼─────────────────────────────────┐
│                     CAMADA DE APLICAÇÃO                       │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │     Auth     │  │   Business   │  │   Missions   │      │
│  │   Service    │  │   Service    │  │   Service    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Community   │  │  Analytics   │  │Notifications │      │
│  │   Service    │  │   Service    │  │   Service    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                            │                                 │
└────────────────────────────┼─────────────────────────────────┘
                             │
┌────────────────────────────┼─────────────────────────────────┐
│                     CAMADA DE DADOS                           │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    MySQL     │  │   AWS S3     │  │    Redis     │      │
│  │  (Database)  │  │  (Storage)   │  │   (Cache)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

### 1.2 Fluxo de Dados

**Autenticação:**
1. Usuário inicia login via OAuth
2. Redirecionamento para Manus Auth
3. Callback com token JWT
4. Armazenamento seguro no dispositivo
5. Inclusão em todas as requisições

**Operações CRUD:**
1. Cliente faz requisição tRPC
2. Middleware valida autenticação
3. Procedure executa lógica de negócio
4. Acesso ao banco de dados via Drizzle ORM
5. Resposta tipada retorna ao cliente

**Upload de Arquivos:**
1. Cliente seleciona arquivo
2. Upload para servidor via multipart/form-data
3. Servidor valida e processa
4. Upload para S3 com chave única
5. URL pública retorna ao cliente
6. Metadados salvos no banco

### 1.3 Decisões Arquiteturais

**Por que React Native + Expo?**
- **Cross-platform:** Um código para iOS e Android
- **Hot Reload:** Desenvolvimento rápido
- **OTA Updates:** Atualizações sem app store
- **Ecosystem:** Bibliotecas maduras e comunidade ativa

**Por que tRPC?**
- **Type Safety:** Tipos compartilhados end-to-end
- **DX:** Autocompletion e validação em tempo real
- **Performance:** Serialização otimizada com SuperJSON
- **Simplicidade:** Sem necessidade de codegen

**Por que MySQL/TiDB?**
- **Relacional:** Dados estruturados com relacionamentos
- **ACID:** Garantias de consistência
- **Escalabilidade:** TiDB oferece sharding horizontal
- **Compatibilidade:** MySQL é amplamente suportado

---

## 2. Configuração do Ambiente

### 2.1 Pré-requisitos

**Software Necessário:**
- Node.js 18+ (recomendado: 20.x LTS)
- npm 9+ ou pnpm 8+
- Expo CLI: `npm install -g expo-cli`
- Git 2.x+
- Editor: VS Code (recomendado)

**Contas e Credenciais:**
- Conta Expo (para builds e OTA)
- Conta Google Cloud (para Maps API)
- Conta AWS (para S3)
- Conta Manus (para OAuth)

**Extensões VS Code Recomendadas:**
- ESLint
- Prettier
- React Native Tools
- TypeScript and JavaScript Language Features

### 2.2 Inicialização do Projeto

**Passo 1: Criar Projeto Expo**

```bash
# Criar novo projeto com TypeScript
npx create-expo-app napraca-mobile --template expo-template-blank-typescript

# Navegar para o diretório
cd napraca-mobile

# Instalar dependências adicionais
npx expo install expo-router expo-constants expo-linking expo-status-bar
```

**Passo 2: Instalar Dependências Core**

```bash
# Navegação e UI
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context

# Estado e Dados
npm install @tanstack/react-query @trpc/client @trpc/react-query
npm install zod superjson

# Maps
npm install react-native-maps

# Autenticação
npm install expo-auth-session expo-web-browser expo-secure-store

# UI Components
npm install react-native-paper react-native-vector-icons
npm install react-native-svg

# Utilities
npm install date-fns axios
```

**Passo 3: Configurar TypeScript**

Criar `tsconfig.json`:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@screens/*": ["./src/screens/*"],
      "@services/*": ["./src/services/*"],
      "@utils/*": ["./src/utils/*"],
      "@types/*": ["./src/types/*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}
```

### 2.3 Estrutura de Pastas

```
napraca-mobile/
├── app/                          # Expo Router (file-based routing)
│   ├── (auth)/                   # Auth group
│   │   ├── login.tsx
│   │   └── select-profile.tsx
│   ├── (consumer)/               # Consumer group
│   │   ├── map.tsx
│   │   ├── missions.tsx
│   │   ├── profile.tsx
│   │   └── rewards.tsx
│   ├── (entrepreneur)/           # Entrepreneur group
│   │   ├── dashboard.tsx
│   │   ├── business/
│   │   │   ├── [id].tsx
│   │   │   └── new.tsx
│   │   ├── missions.tsx
│   │   ├── analytics.tsx
│   │   └── community.tsx
│   ├── _layout.tsx               # Root layout
│   └── index.tsx                 # Entry point
├── src/
│   ├── components/               # Reusable components
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Loading.tsx
│   │   ├── business/
│   │   │   ├── BusinessCard.tsx
│   │   │   └── BusinessDetail.tsx
│   │   ├── mission/
│   │   │   ├── MissionCard.tsx
│   │   │   └── MissionProgress.tsx
│   │   └── map/
│   │       ├── MapView.tsx
│   │       └── BusinessMarker.tsx
│   ├── services/                 # API and business logic
│   │   ├── api/
│   │   │   ├── trpc.ts
│   │   │   └── client.ts
│   │   ├── auth/
│   │   │   ├── authService.ts
│   │   │   └── storage.ts
│   │   └── storage/
│   │       └── s3Service.ts
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useBusiness.ts
│   │   ├── useMissions.ts
│   │   └── useLocation.ts
│   ├── utils/                    # Utility functions
│   │   ├── validation.ts
│   │   ├── formatting.ts
│   │   └── constants.ts
│   ├── types/                    # TypeScript types
│   │   ├── user.ts
│   │   ├── business.ts
│   │   ├── mission.ts
│   │   └── index.ts
│   └── theme/                    # Design system
│       ├── colors.ts
│       ├── typography.ts
│       └── spacing.ts
├── assets/                       # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
├── .env.example                  # Environment variables template
├── .env                          # Environment variables (gitignored)
├── app.json                      # Expo configuration
├── package.json
└── README.md
```

### 2.4 Configuração de Variáveis de Ambiente

Criar `.env`:

```bash
# API
API_URL=https://api.napraca.com
API_KEY=your_api_key_here

# OAuth
OAUTH_CLIENT_ID=your_manus_client_id
OAUTH_REDIRECT_URI=exp://localhost:8081/--/auth/callback

# Maps
GOOGLE_MAPS_API_KEY=your_google_maps_key

# S3
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=napraca-uploads

# Analytics (optional)
ANALYTICS_ID=your_analytics_id
```

Criar `.env.example` (sem valores sensíveis):

```bash
API_URL=
API_KEY=
OAUTH_CLIENT_ID=
OAUTH_REDIRECT_URI=
GOOGLE_MAPS_API_KEY=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=
ANALYTICS_ID=
```

---

## 3. Schema do Banco de Dados

### 3.1 Modelagem Completa

O banco de dados da Napraça foi projetado para suportar dois perfis de usuário distintos (consumidor e empreendedor) com funcionalidades específicas para cada um. A estrutura relacional garante integridade referencial e permite consultas eficientes.

**Diagrama ER (Entidade-Relacionamento):**

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│    users    │◄────────│  businesses  │────────►│   views     │
│             │  1:N    │              │  1:N    │             │
│ - id (PK)   │         │ - id (PK)    │         │ - id (PK)   │
│ - openId    │         │ - ownerId(FK)│         │ - businessId│
│ - userType  │         │ - name       │         │ - userId    │
│ - points    │         │ - category   │         │ - viewedAt  │
│ - level     │         │ - latitude   │         └─────────────┘
└─────────────┘         │ - longitude  │
      │                 └──────────────┘
      │                        │
      │                        │ 1:N
      │                        ▼
      │                 ┌──────────────┐
      │                 │    clicks    │
      │                 │              │
      │                 │ - id (PK)    │
      │                 │ - businessId │
      │                 │ - clickType  │
      │                 └──────────────┘
      │
      │ 1:N
      ▼
┌─────────────────┐         ┌──────────────────┐
│    missions     │         │ missionProgress  │
│                 │◄────────│                  │
│ - id (PK)       │  1:N    │ - id (PK)        │
│ - title         │         │ - userId (FK)    │
│ - difficulty    │         │ - missionId (FK) │
│ - xpReward      │         │ - status         │
└─────────────────┘         │ - proofUrl       │
                            └──────────────────┘
```

### 3.2 Tabelas Detalhadas

**Tabela: users**

Armazena informações de todos os usuários da plataforma, sejam consumidores ou empreendedores.

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  openId VARCHAR(64) NOT NULL UNIQUE,
  name TEXT,
  email VARCHAR(320),
  loginMethod VARCHAR(64),
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  userType ENUM('consumer', 'entrepreneur') NOT NULL,
  avatar TEXT,
  phone VARCHAR(20),
  points INT NOT NULL DEFAULT 0,
  level INT NOT NULL DEFAULT 1,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  lastSignedIn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_openId (openId),
  INDEX idx_userType (userType),
  INDEX idx_points (points DESC)
);
```

**Campos Principais:**
- `openId`: Identificador único do OAuth (Manus)
- `userType`: Define se é consumidor ou empreendedor
- `points`: Pontos acumulados (gamificação)
- `level`: Nível do usuário baseado em XP

**Tabela: businesses**

Armazena informações dos negócios cadastrados por empreendedores.

```sql
CREATE TABLE businesses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ownerId INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  category ENUM('food', 'services', 'retail') NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(320),
  coverImage TEXT,
  profileImage TEXT,
  gallery JSON,
  businessHours JSON,
  isOpen BOOLEAN NOT NULL DEFAULT TRUE,
  isActive BOOLEAN NOT NULL DEFAULT TRUE,
  viewCount INT NOT NULL DEFAULT 0,
  clickCount INT NOT NULL DEFAULT 0,
  favoriteCount INT NOT NULL DEFAULT 0,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (ownerId) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_category (category),
  INDEX idx_location (latitude, longitude),
  INDEX idx_isActive (isActive)
);
```

**Campos JSON:**
- `gallery`: Array de URLs de imagens `["url1", "url2"]`
- `businessHours`: Objeto com horários `{"monday": "9:00-18:00", "tuesday": "9:00-18:00"}`

**Tabela: missions**

Missões educativas para empreendedores aprenderem sobre gestão de negócios.

```sql
CREATE TABLE missions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  difficulty ENUM('easy', 'medium', 'hard') NOT NULL,
  estimatedTime INT NOT NULL COMMENT 'in minutes',
  videoUrl TEXT,
  content TEXT NOT NULL COMMENT 'markdown or HTML',
  requiresPhoto BOOLEAN NOT NULL DEFAULT FALSE,
  xpReward INT NOT NULL DEFAULT 0,
  orderIndex INT NOT NULL DEFAULT 0,
  isActive BOOLEAN NOT NULL DEFAULT TRUE,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_difficulty (difficulty),
  INDEX idx_orderIndex (orderIndex)
);
```

**Tabela: missionProgress**

Rastreia o progresso dos empreendedores nas missões.

```sql
CREATE TABLE missionProgress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  missionId INT NOT NULL,
  status ENUM('not_started', 'in_progress', 'completed') NOT NULL DEFAULT 'not_started',
  proofUrl TEXT COMMENT 'URL of uploaded proof photo',
  completedAt TIMESTAMP NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (missionId) REFERENCES missions(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_mission (userId, missionId),
  INDEX idx_status (status)
);
```

**Tabela: consumerMissions**

Missões para consumidores (visitar negócios, fazer check-ins, etc.).

```sql
CREATE TABLE consumerMissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  type ENUM('visit', 'checkin', 'review', 'share') NOT NULL,
  pointsReward INT NOT NULL DEFAULT 0,
  targetCount INT NOT NULL DEFAULT 1 COMMENT 'e.g., visit 3 businesses',
  isActive BOOLEAN NOT NULL DEFAULT TRUE,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_type (type)
);
```

**Tabela: consumerMissionProgress**

Rastreia o progresso dos consumidores nas missões.

```sql
CREATE TABLE consumerMissionProgress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  missionId INT NOT NULL,
  currentCount INT NOT NULL DEFAULT 0,
  status ENUM('in_progress', 'completed') NOT NULL DEFAULT 'in_progress',
  completedAt TIMESTAMP NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (missionId) REFERENCES consumerMissions(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_consumer_mission (userId, missionId)
);
```

**Tabela: rewards**

Recompensas que consumidores podem resgatar com pontos.

```sql
CREATE TABLE rewards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  pointsCost INT NOT NULL,
  type ENUM('discount', 'freebie', 'badge') NOT NULL,
  imageUrl TEXT,
  isActive BOOLEAN NOT NULL DEFAULT TRUE,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_pointsCost (pointsCost)
);
```

**Tabela: rewardRedemptions**

Histórico de resgates de recompensas.

```sql
CREATE TABLE rewardRedemptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  rewardId INT NOT NULL,
  redeemedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (rewardId) REFERENCES rewards(id) ON DELETE CASCADE,
  INDEX idx_userId (userId),
  INDEX idx_redeemedAt (redeemedAt DESC)
);
```

**Tabela: communityPosts**

Posts na comunidade de empreendedores.

```sql
CREATE TABLE communityPosts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  authorId INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category ENUM('tips', 'forum', 'support') NOT NULL,
  images JSON COMMENT 'Array of image URLs',
  viewCount INT NOT NULL DEFAULT 0,
  commentCount INT NOT NULL DEFAULT 0,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (authorId) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_category (category),
  INDEX idx_createdAt (createdAt DESC)
);
```

**Tabela: comments**

Comentários nos posts da comunidade.

```sql
CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  postId INT NOT NULL,
  authorId INT NOT NULL,
  content TEXT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (postId) REFERENCES communityPosts(id) ON DELETE CASCADE,
  FOREIGN KEY (authorId) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_postId (postId),
  INDEX idx_createdAt (createdAt)
);
```

**Tabela: notifications**

Notificações para usuários.

```sql
CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type ENUM('mission', 'reward', 'business', 'community', 'system') NOT NULL,
  isRead BOOLEAN NOT NULL DEFAULT FALSE,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_userId_isRead (userId, isRead),
  INDEX idx_createdAt (createdAt DESC)
);
```

**Tabela: favorites**

Negócios favoritados por consumidores.

```sql
CREATE TABLE favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  businessId INT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (businessId) REFERENCES businesses(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_business_favorite (userId, businessId),
  INDEX idx_userId (userId)
);
```

**Tabela: views**

Rastreamento de visualizações de negócios.

```sql
CREATE TABLE views (
  id INT AUTO_INCREMENT PRIMARY KEY,
  businessId INT NOT NULL,
  userId INT NULL COMMENT 'NULL for anonymous views',
  viewedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (businessId) REFERENCES businesses(id) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_businessId (businessId),
  INDEX idx_viewedAt (viewedAt DESC)
);
```

**Tabela: clicks**

Rastreamento de cliques em ações (ligar, direções, site).

```sql
CREATE TABLE clicks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  businessId INT NOT NULL,
  userId INT NULL,
  clickType ENUM('call', 'directions', 'website') NOT NULL,
  clickedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (businessId) REFERENCES businesses(id) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_businessId (businessId),
  INDEX idx_clickType (clickType)
);
```

### 3.3 Migrations e Seeds

**Script de Migration (Drizzle ORM):**

```typescript
// drizzle/schema.ts
import { mysqlTable, int, varchar, text, timestamp, mysqlEnum, boolean, decimal, json } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: int('id').autoincrement().primaryKey(),
  openId: varchar('openId', { length: 64 }).notNull().unique(),
  name: text('name'),
  email: varchar('email', { length: 320 }),
  loginMethod: varchar('loginMethod', { length: 64 }),
  role: mysqlEnum('role', ['user', 'admin']).default('user').notNull(),
  userType: mysqlEnum('userType', ['consumer', 'entrepreneur']).notNull(),
  avatar: text('avatar'),
  phone: varchar('phone', { length: 20 }),
  points: int('points').default(0).notNull(),
  level: int('level').default(1).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp('lastSignedIn').defaultNow().notNull(),
});

export const businesses = mysqlTable('businesses', {
  id: int('id').autoincrement().primaryKey(),
  ownerId: int('ownerId').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  category: mysqlEnum('category', ['food', 'services', 'retail']).notNull(),
  description: text('description'),
  address: text('address').notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 7 }).notNull(),
  longitude: decimal('longitude', { precision: 10, scale: 7 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  email: varchar('email', { length: 320 }),
  coverImage: text('coverImage'),
  profileImage: text('profileImage'),
  gallery: json('gallery').$type<string[]>(),
  businessHours: json('businessHours').$type<Record<string, string>>(),
  isOpen: boolean('isOpen').default(true).notNull(),
  isActive: boolean('isActive').default(true).notNull(),
  viewCount: int('viewCount').default(0).notNull(),
  clickCount: int('clickCount').default(0).notNull(),
  favoriteCount: int('favoriteCount').default(0).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

// ... (outras tabelas seguem o mesmo padrão)
```

**Script de Seed (dados de exemplo):**

```typescript
// scripts/seed.ts
import { db } from '../server/db';
import { users, businesses, missions } from '../drizzle/schema';

async function seed() {
  // Criar usuários de exemplo
  await db.insert(users).values([
    {
      openId: 'consumer-1',
      name: 'Maria Silva',
      email: 'maria@example.com',
      userType: 'consumer',
      points: 150,
      level: 2,
    },
    {
      openId: 'entrepreneur-1',
      name: 'João Santos',
      email: 'joao@example.com',
      userType: 'entrepreneur',
      points: 0,
      level: 1,
    },
  ]);

  // Criar negócios de exemplo
  await db.insert(businesses).values([
    {
      ownerId: 2,
      name: 'Padaria do Bairro',
      category: 'food',
      description: 'Pães frescos todos os dias',
      address: 'Rua das Flores, 123',
      latitude: '-23.550520',
      longitude: '-46.633308',
      phone: '(11) 98765-4321',
      isOpen: true,
      isActive: true,
    },
  ]);

  // Criar missões de exemplo
  await db.insert(missions).values([
    {
      title: 'Defina sua Proposta de Valor',
      description: 'Aprenda a criar uma proposta de valor clara',
      difficulty: 'easy',
      estimatedTime: 15,
      content: '# Proposta de Valor\n\nSua proposta de valor...',
      xpReward: 50,
      orderIndex: 1,
      isActive: true,
    },
  ]);

  console.log('✅ Seed completed!');
}

seed();
```

---

## 4. Backend (API tRPC)

### 4.1 Configuração do tRPC

**Arquivo: server/trpc.ts**

```typescript
import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from './context';
import superjson from 'superjson';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

// Middleware de autenticação
const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthenticated);

// Middleware para empreendedores
const isEntrepreneur = t.middleware(({ ctx, next }) => {
  if (!ctx.user || ctx.user.userType !== 'entrepreneur') {
    throw new TRPCError({ code: 'FORBIDDEN' });
  }
  return next({ ctx });
});

export const entrepreneurProcedure = protectedProcedure.use(isEntrepreneur);

// Middleware para consumidores
const isConsumer = t.middleware(({ ctx, next }) => {
  if (!ctx.user || ctx.user.userType !== 'consumer') {
    throw new TRPCError({ code: 'FORBIDDEN' });
  }
  return next({ ctx });
});

export const consumerProcedure = protectedProcedure.use(isConsumer);
```

### 4.2 Routers Principais

**Arquivo: server/routers/auth.ts**

```typescript
import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { upsertUser, getUserByOpenId } from '../db';

export const authRouter = router({
  me: publicProcedure.query(({ ctx }) => {
    return ctx.user || null;
  }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        userType: z.enum(['consumer', 'entrepreneur']).optional(),
        avatar: z.string().nullable().optional(),
        phone: z.string().nullable().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await upsertUser({
        openId: ctx.user.openId,
        userType: input.userType || ctx.user.userType,
        avatar: input.avatar,
        phone: input.phone,
      });
      return { success: true };
    }),

  logout: protectedProcedure.mutation(() => {
    return { success: true };
  }),
});
```

**Arquivo: server/routers/businesses.ts**

```typescript
import { z } from 'zod';
import { router, publicProcedure, protectedProcedure, entrepreneurProcedure } from '../trpc';
import * as db from '../db';

export const businessesRouter = router({
  list: publicProcedure
    .input(
      z
        .object({
          category: z.enum(['food', 'services', 'retail']).optional(),
          isActive: z.boolean().optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      return db.getAllBusinesses(input);
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return db.getBusinessById(input.id);
    }),

  getMyBusinesses: entrepreneurProcedure.query(async ({ ctx }) => {
    return db.getBusinessesByOwnerId(ctx.user.id);
  }),

  create: entrepreneurProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string(),
        category: z.enum(['food', 'services', 'retail']),
        address: z.string(),
        latitude: z.number(),
        longitude: z.number(),
        phone: z.string().optional(),
        website: z.string().optional(),
        gallery: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await db.createBusiness({
        ...input,
        ownerId: ctx.user.id,
        latitude: input.latitude.toString(),
        longitude: input.longitude.toString(),
        gallery: input.gallery || null,
      });
      return { success: true };
    }),

  update: entrepreneurProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        category: z.enum(['food', 'services', 'retail']).optional(),
        address: z.string().optional(),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
        phone: z.string().optional(),
        website: z.string().optional(),
        gallery: z.array(z.string()).optional(),
        isActive: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      // Verify ownership
      const business = await db.getBusinessById(id);
      if (!business || business.ownerId !== ctx.user.id) {
        throw new Error('Unauthorized');
      }

      await db.updateBusiness(id, {
        ...data,
        latitude: data.latitude ? data.latitude.toString() : undefined,
        longitude: data.longitude ? data.longitude.toString() : undefined,
        gallery: data.gallery || undefined,
      });
      return { success: true };
    }),

  trackView: publicProcedure
    .input(z.object({ businessId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await db.trackView(input.businessId, ctx.user?.id || null);
      return { success: true };
    }),

  trackClick: publicProcedure
    .input(
      z.object({
        businessId: z.number(),
        clickType: z.enum(['call', 'directions', 'website']),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await db.trackClick(input.businessId, ctx.user?.id || null, input.clickType);
      return { success: true };
    }),

  getAnalytics: entrepreneurProcedure
    .input(z.object({ businessId: z.number() }))
    .query(async ({ ctx, input }) => {
      // Verify ownership
      const business = await db.getBusinessById(input.businessId);
      if (!business || business.ownerId !== ctx.user.id) {
        throw new Error('Unauthorized');
      }

      return db.getBusinessAnalytics(input.businessId);
    }),
});
```

**Arquivo: server/routers/missions.ts**

```typescript
import { z } from 'zod';
import { router, entrepreneurProcedure } from '../trpc';
import * as db from '../db';

export const missionsRouter = router({
  list: entrepreneurProcedure.query(async () => {
    return db.getAllMissions();
  }),

  getProgress: entrepreneurProcedure.query(async ({ ctx }) => {
    return db.getMissionProgress(ctx.user.id);
  }),

  updateProgress: entrepreneurProcedure
    .input(
      z.object({
        missionId: z.number(),
        status: z.enum(['not_started', 'in_progress', 'completed']),
        proofUrl: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { missionId, ...data } = input;
      await db.updateMissionProgress(ctx.user.id, missionId, data);
      return { success: true };
    }),
});
```

**Arquivo: server/routers/index.ts (App Router)**

```typescript
import { router } from '../trpc';
import { authRouter } from './auth';
import { businessesRouter } from './businesses';
import { missionsRouter } from './missions';
import { consumerMissionsRouter } from './consumerMissions';
import { communityRouter } from './community';
import { notificationsRouter } from './notifications';

export const appRouter = router({
  auth: authRouter,
  businesses: businessesRouter,
  missions: missionsRouter,
  consumerMissions: consumerMissionsRouter,
  community: communityRouter,
  notifications: notificationsRouter,
});

export type AppRouter = typeof appRouter;
```

### 4.3 Database Helpers

**Arquivo: server/db.ts (principais funções)**

```typescript
import { eq, and, desc, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/mysql2';
import { users, businesses, missions, missionProgress } from '../drizzle/schema';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn('[Database] Failed to connect:', error);
      _db = null;
    }
  }
  return _db;
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllBusinesses(filters?: {
  category?: 'food' | 'services' | 'retail';
  isActive?: boolean;
}) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(businesses);

  const conditions = [];
  if (filters?.category) {
    conditions.push(eq(businesses.category, filters.category));
  }
  if (filters?.isActive !== undefined) {
    conditions.push(eq(businesses.isActive, filters.isActive));
  }

  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as any;
  }

  return query;
}

export async function getBusinessAnalytics(businessId: number) {
  const db = await getDb();
  if (!db) return null;

  const viewCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(views)
    .where(eq(views.businessId, businessId));

  const clickCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(clicks)
    .where(eq(clicks.businessId, businessId));

  const favoriteCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(favorites)
    .where(eq(favorites.businessId, businessId));

  return {
    views: Number(viewCount[0]?.count || 0),
    clicks: Number(clickCount[0]?.count || 0),
    favorites: Number(favoriteCount[0]?.count || 0),
  };
}

// ... (outras funções seguem o mesmo padrão)
```

---

## 5. Frontend Mobile (React Native)

### 5.1 Configuração do Cliente tRPC

**Arquivo: src/services/api/trpc.ts**

```typescript
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../server/routers';

export const trpc = createTRPCReact<AppRouter>();
```

**Arquivo: src/services/api/client.ts**

```typescript
import { httpBatchLink } from '@trpc/client';
import { QueryClient } from '@tanstack/react-query';
import { trpc } from './trpc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${API_URL}/api/trpc`,
      async headers() {
        const token = await AsyncStorage.getItem('auth_token');
        return {
          authorization: token ? `Bearer ${token}` : '',
        };
      },
    }),
  ],
});
```

### 5.2 Autenticação

**Arquivo: src/services/auth/authService.ts**

```typescript
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();

const OAUTH_CLIENT_ID = Constants.expoConfig?.extra?.oauthClientId;
const OAUTH_REDIRECT_URI = AuthSession.makeRedirectUri({
  scheme: 'napraca',
  path: 'auth/callback',
});

const discovery = {
  authorizationEndpoint: 'https://auth.manus.im/oauth/authorize',
  tokenEndpoint: 'https://auth.manus.im/oauth/token',
};

export const useAuthRequest = () => {
  return AuthSession.useAuthRequest(
    {
      clientId: OAUTH_CLIENT_ID!,
      redirectUri: OAUTH_REDIRECT_URI,
      scopes: ['openid', 'profile', 'email'],
    },
    discovery
  );
};

export const exchangeCodeForToken = async (code: string) => {
  const response = await fetch(discovery.tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code,
      client_id: OAUTH_CLIENT_ID,
      redirect_uri: OAUTH_REDIRECT_URI,
    }),
  });

  const data = await response.json();
  return data.access_token;
};

export const storeToken = async (token: string) => {
  await AsyncStorage.setItem('auth_token', token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem('auth_token');
};

export const removeToken = async () => {
  await AsyncStorage.removeItem('auth_token');
};
```

**Arquivo: src/hooks/useAuth.ts**

```typescript
import { useEffect, useState } from 'react';
import { trpc } from '../services/api/trpc';
import { removeToken } from '../services/auth/authService';
import { useRouter } from 'expo-router';

export const useAuth = () => {
  const router = useRouter();
  const { data: user, isLoading, error, refetch } = trpc.auth.me.useQuery();
  const logoutMutation = trpc.auth.logout.useMutation();

  const logout = async () => {
    await logoutMutation.mutateAsync();
    await removeToken();
    router.replace('/login');
  };

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    logout,
    refetch,
  };
};
```

### 5.3 Telas Principais

**Arquivo: app/(auth)/login.tsx**

```typescript
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthRequest, exchangeCodeForToken, storeToken } from '../../src/services/auth/authService';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/hooks/useAuth';

export default function LoginScreen() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [request, response, promptAsync] = useAuthRequest();

  useEffect(() => {
    if (user) {
      if (!user.userType) {
        router.replace('/select-profile');
      } else if (user.userType === 'consumer') {
        router.replace('/(consumer)/map');
      } else {
        router.replace('/(entrepreneur)/dashboard');
      }
    }
  }, [user]);

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      exchangeCodeForToken(code).then((token) => {
        storeToken(token);
        router.replace('/select-profile');
      });
    }
  }, [response]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Napraça</Text>
      <Text style={styles.subtitle}>
        Conectando consumidores e empreendedores locais
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <Text style={styles.buttonText}>Entrar com Manus</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF6B35',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
```

**Arquivo: app/(auth)/select-profile.tsx**

```typescript
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { trpc } from '../../src/services/api/trpc';

export default function SelectProfileScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<'consumer' | 'entrepreneur' | null>(null);

  const updateProfileMutation = trpc.auth.updateProfile.useMutation({
    onSuccess: () => {
      if (selectedType === 'entrepreneur') {
        router.replace('/(entrepreneur)/dashboard');
      } else {
        router.replace('/(consumer)/map');
      }
    },
  });

  const handleSelectType = (type: 'consumer' | 'entrepreneur') => {
    setSelectedType(type);
    updateProfileMutation.mutate({ userType: type });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha seu perfil</Text>
      <Text style={styles.subtitle}>Como você quer usar a Napraça?</Text>

      <TouchableOpacity
        style={[styles.card, selectedType === 'consumer' && styles.cardSelected]}
        onPress={() => handleSelectType('consumer')}
        disabled={updateProfileMutation.isPending}
      >
        <Text style={styles.cardIcon}>🛍️</Text>
        <Text style={styles.cardTitle}>Consumidor</Text>
        <Text style={styles.cardDescription}>
          Descubra e apoie negócios locais
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, selectedType === 'entrepreneur' && styles.cardSelected]}
        onPress={() => handleSelectType('entrepreneur')}
        disabled={updateProfileMutation.isPending}
      >
        <Text style={styles.cardIcon}>🏪</Text>
        <Text style={styles.cardTitle}>Empreendedor</Text>
        <Text style={styles.cardDescription}>
          Cadastre seu negócio e aprenda
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  card: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardSelected: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFF5F2',
  },
  cardIcon: {
    fontSize: 48,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
```

**Arquivo: app/(consumer)/map.tsx**

```typescript
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { trpc } from '../../src/services/api/trpc';
import { useAuth } from '../../src/hooks/useAuth';

export default function MapScreen() {
  const { user } = useAuth();
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const [filter, setFilter] = useState<'all' | 'food' | 'services' | 'retail'>('all');

  const { data: businesses, isLoading } = trpc.businesses.list.useQuery(
    filter === 'all' ? {} : { category: filter }
  );

  const trackViewMutation = trpc.businesses.trackView.useMutation();

  const handleBusinessPress = (business: any) => {
    setSelectedBusiness(business);
    trackViewMutation.mutate({ businessId: business.id });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.5505,
          longitude: -46.6333,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {businesses?.map((business: any) => (
          <Marker
            key={business.id}
            coordinate={{
              latitude: parseFloat(business.latitude),
              longitude: parseFloat(business.longitude),
            }}
            onPress={() => handleBusinessPress(business)}
          />
        ))}
      </MapView>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={styles.filterText}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'food' && styles.filterButtonActive]}
          onPress={() => setFilter('food')}
        >
          <Text style={styles.filterText}>🍔 Alimentação</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'services' && styles.filterButtonActive]}
          onPress={() => setFilter('services')}
        >
          <Text style={styles.filterText}>🔧 Serviços</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'retail' && styles.filterButtonActive]}
          onPress={() => setFilter('retail')}
        >
          <Text style={styles.filterText}>🛍️ Varejo</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={!!selectedBusiness} animationType="slide">
        {selectedBusiness && (
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedBusiness.name}</Text>
            <Text style={styles.modalDescription}>{selectedBusiness.description}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedBusiness(null)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#FF6B35',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#FF6B35',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

**Arquivo: app/(entrepreneur)/dashboard.tsx**

```typescript
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { trpc } from '../../src/services/api/trpc';
import { useAuth } from '../../src/hooks/useAuth';

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const { data: myBusinesses, isLoading: loadingBusinesses } = trpc.businesses.getMyBusinesses.useQuery();
  const { data: missions, isLoading: loadingMissions } = trpc.missions.list.useQuery();
  const { data: progress, isLoading: loadingProgress } = trpc.missions.getProgress.useQuery();

  const completedMissions = progress?.filter((p) => p.status === 'completed').length || 0;
  const totalMissions = missions?.length || 0;
  const progressPercentage = totalMissions > 0 ? (completedMissions / totalMissions) * 100 : 0;

  const mainBusiness = myBusinesses?.[0];

  if (loadingBusinesses || loadingMissions || loadingProgress) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Bem-vindo, {user?.name?.split(' ')[0]}!</Text>
      </View>

      {mainBusiness ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{mainBusiness.name}</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{mainBusiness.viewCount || 0}</Text>
              <Text style={styles.statLabel}>Visualizações</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{mainBusiness.clickCount || 0}</Text>
              <Text style={styles.statLabel}>Cliques</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{mainBusiness.favoriteCount || 0}</Text>
              <Text style={styles.statLabel}>Favoritos</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Cadastre seu negócio</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/(entrepreneur)/business/new')}
          >
            <Text style={styles.buttonText}>Cadastrar Agora</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Seu Aprendizado</Text>
        <Text style={styles.progressText}>
          {completedMissions} de {totalMissions} missões concluídas ({Math.round(progressPercentage)}%)
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/(entrepreneur)/missions')}
        >
          <Text style={styles.buttonText}>Ver Missões</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FF6B35',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

### 5.4 Componentes Reutilizáveis

**Arquivo: src/components/common/Button.tsx**

```typescript
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'outline' && styles.outline,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#FF6B35' : '#fff'} />
      ) : (
        <Text
          style={[
            styles.text,
            variant === 'primary' && styles.primaryText,
            variant === 'secondary' && styles.secondaryText,
            variant === 'outline' && styles.outlineText,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#FF6B35',
  },
  secondary: {
    backgroundColor: '#004E64',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#fff',
  },
  outlineText: {
    color: '#FF6B35',
  },
});
```

**Arquivo: src/components/business/BusinessCard.tsx**

```typescript
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface BusinessCardProps {
  business: {
    id: number;
    name: string;
    category: string;
    description: string;
    address: string;
    profileImage?: string;
  };
  onPress: () => void;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business, onPress }) => {
  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'food':
        return '🍔';
      case 'services':
        return '🔧';
      case 'retail':
        return '🛍️';
      default:
        return '🏪';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {business.profileImage && (
        <Image source={{ uri: business.profileImage }} style={styles.image} />
      )}
      <View style={styles.content}>
        <Text style={styles.name}>{business.name}</Text>
        <Text style={styles.category}>
          {getCategoryEmoji(business.category)} {business.category}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {business.description}
        </Text>
        <Text style={styles.address} numberOfLines={1}>
          📍 {business.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  address: {
    fontSize: 12,
    color: '#999',
  },
});
```

---

## 6. Design System e Tema

### 6.1 Paleta de Cores

A Napraça utiliza uma paleta de cores moderna e acessível que transmite energia, confiança e comunidade.

```typescript
// src/theme/colors.ts
export const colors = {
  // Primary (Laranja vibrante)
  primary: {
    50: '#FFF5F2',
    100: '#FFE8E0',
    200: '#FFD1C1',
    300: '#FFBA9F',
    400: '#FF9770',
    500: '#FF6B35', // Main
    600: '#E65A2B',
    700: '#CC4A21',
    800: '#B33A17',
    900: '#992A0D',
  },

  // Secondary (Azul petróleo)
  secondary: {
    50: '#E6F2F5',
    100: '#CCE5EB',
    200: '#99CBD7',
    300: '#66B1C3',
    400: '#3397AF',
    500: '#004E64', // Main
    600: '#003E50',
    700: '#002E3C',
    800: '#001E28',
    900: '#000E14',
  },

  // Neutrals
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Semantic
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Background
  background: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',

  // Text
  text: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
};
```

### 6.2 Tipografia

```typescript
// src/theme/typography.ts
export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },

  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },

  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};
```

### 6.3 Espaçamento

```typescript
// src/theme/spacing.ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};
```

---

## 7. Fluxos de Usuário

### 7.1 Fluxo do Consumidor

**1. Onboarding e Login**
```
Tela Inicial → Login OAuth → Seleção de Perfil (Consumidor) → Mapa
```

**2. Descoberta de Negócios**
```
Mapa → Filtrar por Categoria → Ver Negócio → Ações (Ligar, Direções, Site)
```

**3. Missões e Recompensas**
```
Perfil → Missões → Completar Missão → Ganhar Pontos → Resgatar Recompensas
```

**4. Favoritos**
```
Negócio → Favoritar → Lista de Favoritos → Revisitar
```

### 7.2 Fluxo do Empreendedor

**1. Onboarding e Cadastro**
```
Login OAuth → Seleção de Perfil (Empreendedor) → Dashboard → Cadastrar Negócio
```

**2. Gestão de Negócio**
```
Dashboard → Meu Negócio → Editar Informações → Ver Analytics
```

**3. Missões Educativas**
```
Dashboard → Missões → Selecionar Missão → Assistir Conteúdo → Completar → Ganhar XP
```

**4. Comunidade**
```
Dashboard → Comunidade → Ver Posts → Criar Post → Comentar
```

### 7.3 Diagramas de Fluxo

**Fluxo de Autenticação:**

```
┌─────────────┐
│   Início    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Login     │
│   OAuth     │
└──────┬──────┘
       │
       ▼
┌─────────────┐      ┌──────────────┐
│  Tem User   │─No──►│   Callback   │
│   Type?     │      │   & Token    │
└──────┬──────┘      └──────┬───────┘
       │Yes                 │
       │                    │
       ▼                    ▼
┌─────────────┐      ┌──────────────┐
│  Consumer?  │      │   Seleção    │
│             │      │   de Perfil  │
└──────┬──────┘      └──────────────┘
       │Yes
       │
       ▼
┌─────────────┐
│    Mapa     │
└─────────────┘
       │No
       │
       ▼
┌─────────────┐
│  Dashboard  │
└─────────────┘
```

---

## 8. Testes e Qualidade

### 8.1 Estratégia de Testes

**Pirâmide de Testes:**

```
        ┌─────────────┐
        │   E2E (5%)  │
        └─────────────┘
      ┌─────────────────┐
      │ Integration(15%)│
      └─────────────────┘
    ┌─────────────────────┐
    │    Unit (80%)       │
    └─────────────────────┘
```

### 8.2 Testes Unitários (Jest)

**Arquivo: src/services/auth/__tests__/authService.test.ts**

```typescript
import { exchangeCodeForToken, storeToken, getToken, removeToken } from '../authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage');

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('storeToken', () => {
    it('should store token in AsyncStorage', async () => {
      const token = 'test-token';
      await storeToken(token);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('auth_token', token);
    });
  });

  describe('getToken', () => {
    it('should retrieve token from AsyncStorage', async () => {
      const token = 'test-token';
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(token);
      const result = await getToken();
      expect(result).toBe(token);
    });
  });

  describe('removeToken', () => {
    it('should remove token from AsyncStorage', async () => {
      await removeToken();
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('auth_token');
    });
  });
});
```

### 8.3 Testes de Integração

**Arquivo: src/services/api/__tests__/trpc.integration.test.ts**

```typescript
import { trpcClient } from '../client';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
  rest.post('http://localhost:3000/api/trpc/businesses.list', (req, res, ctx) => {
    return res(
      ctx.json({
        result: {
          data: [
            {
              id: 1,
              name: 'Test Business',
              category: 'food',
            },
          ],
        },
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('tRPC Integration', () => {
  it('should fetch businesses list', async () => {
    const result = await trpcClient.businesses.list.query();
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Test Business');
  });
});
```

### 8.4 Testes E2E (Detox)

**Arquivo: e2e/login.e2e.ts**

```typescript
describe('Login Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show login screen', async () => {
    await expect(element(by.text('Bem-vindo à Napraça'))).toBeVisible();
  });

  it('should navigate to select profile after login', async () => {
    await element(by.text('Entrar com Manus')).tap();
    // Mock OAuth flow
    await expect(element(by.text('Escolha seu perfil'))).toBeVisible();
  });

  it('should navigate to map after selecting consumer', async () => {
    await element(by.text('Consumidor')).tap();
    await expect(element(by.id('map-view'))).toBeVisible();
  });
});
```

---

## 9. Deploy e Distribuição

### 9.1 Build para Produção

**Configurar app.json:**

```json
{
  "expo": {
    "name": "Napraça",
    "slug": "napraca",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.napraca.app",
      "buildNumber": "1.0.0"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.napraca.app",
      "versionCode": 1
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "apiUrl": "https://api.napraca.com",
      "oauthClientId": "your_client_id",
      "eas": {
        "projectId": "your_project_id"
      }
    }
  }
}
```

**Comandos de Build (EAS):**

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login
eas login

# Configurar projeto
eas build:configure

# Build para iOS
eas build --platform ios --profile production

# Build para Android
eas build --platform android --profile production

# Build para ambos
eas build --platform all --profile production
```

### 9.2 Over-The-Air (OTA) Updates

```bash
# Publicar update
eas update --branch production --message "Bug fixes and improvements"

# Ver updates publicados
eas update:list --branch production
```

### 9.3 Publicação nas Stores

**iOS (App Store):**
1. Criar App ID no Apple Developer Portal
2. Configurar certificados e provisioning profiles
3. Build com EAS: `eas build --platform ios --profile production`
4. Submit: `eas submit --platform ios`

**Android (Google Play):**
1. Criar app no Google Play Console
2. Gerar keystore para assinatura
3. Build com EAS: `eas build --platform android --profile production`
4. Submit: `eas submit --platform android`

---

## 10. Monitoramento e Analytics

### 10.1 Configuração do Sentry

```typescript
// app/_layout.tsx
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'your_sentry_dsn',
  enableInExpoDevelopment: true,
  debug: __DEV__,
});

export default function RootLayout() {
  return <Sentry.TouchEventBoundary>{/* ... */}</Sentry.TouchEventBoundary>;
}
```

### 10.2 Analytics Personalizados

```typescript
// src/services/analytics.ts
import * as Analytics from 'expo-firebase-analytics';

export const trackEvent = async (eventName: string, params?: Record<string, any>) => {
  await Analytics.logEvent(eventName, params);
};

export const trackScreen = async (screenName: string) => {
  await Analytics.setCurrentScreen(screenName);
};

// Uso
trackEvent('business_viewed', { businessId: 123, category: 'food' });
trackScreen('MapScreen');
```

---

## 11. Manutenção e Evolução

### 11.1 Roadmap de Funcionalidades

**Fase 1 (MVP - 3 meses):**
- ✅ Autenticação e perfis
- ✅ Mapa com negócios
- ✅ Dashboard empreendedor
- ✅ Missões básicas

**Fase 2 (6 meses):**
- Chat entre consumidores e empreendedores
- Sistema de avaliações e reviews
- Notificações push
- Programa de fidelidade avançado

**Fase 3 (12 meses):**
- Marketplace integrado
- Sistema de pagamentos
- Delivery integrado
- Expansão para outras cidades

### 11.2 Boas Práticas de Manutenção

**Code Review:**
- Todo PR deve ter pelo menos 1 aprovação
- Testes devem passar antes do merge
- Cobertura de código mínima: 80%

**Versionamento:**
- Seguir Semantic Versioning (MAJOR.MINOR.PATCH)
- Changelog atualizado a cada release
- Tags no Git para cada versão

**Documentação:**
- README atualizado
- Comentários em código complexo
- Swagger/OpenAPI para API
- Storybook para componentes

---

## 12. Troubleshooting

### 12.1 Problemas Comuns

**Erro: "Unable to resolve module"**
```bash
# Limpar cache
expo start -c
# ou
rm -rf node_modules && npm install
```

**Erro: "Network request failed"**
- Verificar se o backend está rodando
- Verificar URL da API no .env
- Verificar conexão de internet

**Erro: "OAuth redirect failed"**
- Verificar REDIRECT_URI no .env
- Verificar configuração no Manus Auth
- Verificar deep linking no app.json

### 12.2 Debug

**React Native Debugger:**
```bash
# Instalar
brew install --cask react-native-debugger

# Abrir
open "rndebugger://set-debugger-loc?host=localhost&port=8081"
```

**Flipper:**
```bash
# Instalar
brew install --cask flipper

# Usar plugins: Network, Databases, Shared Preferences
```

---

## 13. Recursos e Referências

### 13.1 Documentação Oficial

- [React Native](https://reactnative.dev/)
- [Expo](https://docs.expo.dev/)
- [tRPC](https://trpc.io/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [React Navigation](https://reactnavigation.org/)

### 13.2 Bibliotecas Utilizadas

| Biblioteca | Versão | Propósito |
|-----------|--------|-----------|
| react-native | 0.73+ | Framework mobile |
| expo | 50+ | Toolchain e SDK |
| @trpc/client | 11+ | Cliente API tipado |
| @tanstack/react-query | 5+ | Cache e estado |
| react-native-maps | 1.10+ | Mapas |
| zod | 3.22+ | Validação de schemas |
| drizzle-orm | 0.29+ | ORM TypeScript |

### 13.3 Comunidade e Suporte

- **Discord:** [Expo Community](https://chat.expo.dev/)
- **GitHub:** [Napraça Repository](https://github.com/napraca/mobile)
- **Stack Overflow:** Tag `react-native` e `expo`

---

## 14. Conclusão

Este guia fornece uma base sólida para implementar a Napraça do zero. A arquitetura proposta é escalável, mantível e segue as melhores práticas da indústria. Com este documento, qualquer desenvolvedor ou agente de IA pode replicar o projeto com confiança.

**Próximos Passos Recomendados:**

1. Configurar ambiente de desenvolvimento
2. Implementar autenticação e navegação básica
3. Criar telas principais (Mapa e Dashboard)
4. Integrar com backend tRPC
5. Adicionar testes
6. Deploy em ambiente de staging
7. Testes com usuários reais
8. Deploy em produção

**Contato e Suporte:**

Para dúvidas ou sugestões sobre este guia, entre em contato através do [repositório GitHub](https://github.com/napraca/mobile) ou [Discord da comunidade](https://discord.gg/napraca).

---

**Autor:** Manus AI  
**Versão:** 1.0  
**Última Atualização:** Janeiro 2026  
**Licença:** MIT
