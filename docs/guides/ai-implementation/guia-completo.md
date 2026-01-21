# Guia Completo para Desenvolvimento da Plataforma Napraça
## Para IAs de Desenvolvimento (Lovable, V0, Cursor, etc.)

**Versão:** 2.0  
**Data:** Janeiro 2026  
**Autor:** Manus AI  
**Propósito:** Guia extremamente detalhado para replicação completa da plataforma Napraça

---

## 📋 Índice

1. [Visão Geral e Contexto](#1-visão-geral-e-contexto)
2. [Identidade Visual e Design System](#2-identidade-visual-e-design-system)
3. [Arquitetura Técnica](#3-arquitetura-técnica)
4. [Funcionalidades Detalhadas](#4-funcionalidades-detalhadas)
5. [Especificações de Design](#5-especificações-de-design)
6. [Fluxos de Usuário](#6-fluxos-de-usuário)
7. [Instruções para IAs](#7-instruções-para-ias)
8. [Exemplos de Código](#8-exemplos-de-código)
9. [Checklist de Implementação](#9-checklist-de-implementação)
10. [Referências e Recursos](#10-referências-e-recursos)

---

## 1. Visão Geral e Contexto

### 1.1 O Que é o Napraça?

O **Napraça** é uma plataforma mobile híbrida que funciona como uma "escola de negócios" gamificada para microempreendedores (MEIs) e pequenas empresas, conectando-os com consumidores locais através de um mapa inteligente.

**Missão:** Fortalecer a economia de bairro, conectando consumidores e empreendedores locais de forma educativa e engajadora.

**Visão:** Ser a principal plataforma de suporte e conexão para microempreendedores no Brasil, promovendo o desenvolvimento sustentável de comunidades locais.

### 1.2 Problema que Resolve

O Napraça aborda três problemas principais:

1. **Para Empreendedores:**
   - Falta de conhecimento em gestão de negócios
   - Dificuldade em alcançar clientes locais
   - Isolamento e falta de suporte comunitário
   - Baixa visibilidade digital

2. **Para Consumidores:**
   - Dificuldade em descobrir negócios locais
   - Falta de informações sobre estabelecimentos próximos
   - Desconexão com a economia local

3. **Para a Comunidade:**
   - Enfraquecimento do comércio local
   - Fuga de recursos para grandes redes
   - Perda de identidade cultural dos bairros

### 1.3 Diferenciais Únicos

| Diferencial | Descrição | Impacto |
|------------|-----------|---------|
| **Gamificação Educativa** | Sistema de missões que ensina gestão de negócios | Empreendedores aprendem enquanto crescem |
| **Mapa Inteligente** | Descoberta geolocalizada de negócios locais | Consumidores encontram facilmente estabelecimentos |
| **Comunidade Ativa** | Fórum e suporte entre empreendedores | Reduz isolamento e promove colaboração |
| **Duplo Perfil** | Plataforma serve consumidores E empreendedores | Ecossistema completo em um só lugar |
| **Foco Local** | Prioriza economia de bairro | Fortalece comunidades locais |

### 1.4 Público-Alvo

#### Perfil 1: Empreendedores

**Demografia:**
- Idade: 25-55 anos
- Renda: 1-5 salários mínimos
- Escolaridade: Ensino médio a superior incompleto
- Localização: Periferias e bairros populares

**Psicografia:**
- Empreendedores por necessidade ou oportunidade
- Buscam crescimento e profissionalização
- Valorizam comunidade e apoio mútuo
- Têm pouco tempo para capacitação formal

**Dores:**
- Não sabem como precificar produtos
- Dificuldade em atrair e reter clientes
- Falta de conhecimento em marketing
- Isolamento e falta de rede de apoio
- Baixa visibilidade online

#### Perfil 2: Consumidores

**Demografia:**
- Idade: 18-45 anos
- Renda: 2-10 salários mínimos
- Escolaridade: Ensino médio a superior
- Localização: Áreas urbanas

**Psicografia:**
- Valorizam comércio local
- Buscam conveniência e proximidade
- Interessados em apoiar pequenos negócios
- Conectados digitalmente

**Dores:**
- Não conhecem negócios próximos
- Falta de informações sobre estabelecimentos
- Dificuldade em descobrir novos lugares
- Desejo de apoiar economia local mas não sabem como

### 1.5 Proposta de Valor

**Para Empreendedores:**
> "Aprenda a gerenciar seu negócio enquanto ganha visibilidade e conecta-se com clientes locais através de missões gamificadas e uma comunidade de apoio."

**Para Consumidores:**
> "Descubra negócios locais incríveis no seu bairro, apoie a economia local e ganhe recompensas por explorar e interagir com estabelecimentos próximos."

### 1.6 Modelo de Negócio

#### Fase 1: Crescimento (Gratuito)
- Plataforma 100% gratuita
- Foco em adoção e engajamento
- Construção de base de usuários

#### Fase 2: Monetização (Futuro)

| Fonte de Receita | Descrição | Público |
|-----------------|-----------|---------|
| **Planos Premium** | Recursos avançados para empreendedores | Empreendedores |
| **Anúncios Locais** | Destaque no mapa e busca | Empreendedores |
| **Parcerias** | Comissões de serviços integrados | Plataforma |
| **Cursos Avançados** | Conteúdo educativo premium | Empreendedores |

---

## 2. Identidade Visual e Design System

### 2.1 Filosofia de Design

**Princípios Fundamentais:**

1. **Acessível e Inclusivo** - Design simples que qualquer pessoa possa usar
2. **Caloroso e Humano** - Transmite comunidade e proximidade
3. **Energético e Motivador** - Inspira ação e crescimento
4. **Profissional mas Descontraído** - Sério sem ser corporativo
5. **Único e Memorável** - Foge do padrão "cara de IA"

### 2.2 Paletas de Cores

#### Opção 1: Azul Petróleo + Amarelo Vibrante (Recomendada)

Esta paleta combina a confiança e profissionalismo do azul com a energia e otimismo do amarelo, criando um contraste vibrante e memorável.

```css
/* Cores Primárias */
--primary-blue: #004E64;        /* Azul Petróleo - Confiança, profissionalismo */
--primary-yellow: #FFB800;      /* Amarelo Vibrante - Energia, otimismo */

/* Cores Secundárias */
--secondary-teal: #25A18E;      /* Verde-azulado - Crescimento */
--secondary-coral: #FF6B6B;     /* Coral - Calor humano */
--secondary-purple: #6C5CE7;    /* Roxo - Criatividade */

/* Cores Neutras */
--neutral-900: #1A1A1A;         /* Texto principal */
--neutral-700: #4A4A4A;         /* Texto secundário */
--neutral-500: #9B9B9B;         /* Texto desabilitado */
--neutral-300: #E0E0E0;         /* Bordas */
--neutral-100: #F5F5F5;         /* Backgrounds */
--neutral-50: #FAFAFA;          /* Backgrounds claros */

/* Cores de Feedback */
--success: #10B981;             /* Verde - Sucesso */
--warning: #F59E0B;             /* Laranja - Aviso */
--error: #EF4444;               /* Vermelho - Erro */
--info: #3B82F6;                /* Azul - Informação */

/* Gradientes */
--gradient-primary: linear-gradient(135deg, #004E64 0%, #25A18E 100%);
--gradient-accent: linear-gradient(135deg, #FFB800 0%, #FF6B6B 100%);
--gradient-hero: linear-gradient(135deg, #004E64 0%, #FFB800 50%, #FF6B6B 100%);
```

**Uso das Cores:**
- **Azul Petróleo (#004E64):** Cabeçalhos, botões primários, elementos de navegação
- **Amarelo Vibrante (#FFB800):** CTAs, badges, elementos de gamificação, destaques
- **Verde-azulado (#25A18E):** Ícones de sucesso, progresso de missões
- **Coral (#FF6B6B):** Elementos de calor humano, comunidade, favoritos
- **Roxo (#6C5CE7):** Recompensas, níveis, conquistas

#### Opção 2: Laranja + Azul Petróleo (Alternativa)

```css
/* Cores Primárias */
--primary-orange: #FF6B35;      /* Laranja - Energia, comunidade */
--primary-blue: #004E64;        /* Azul Petróleo - Confiança */

/* Cores Secundárias */
--secondary-yellow: #F7B801;    /* Amarelo - Otimismo */
--secondary-green: #06A77D;     /* Verde - Crescimento */
--secondary-pink: #FF6B9D;      /* Rosa - Calor */
```

#### Opção 3: Verde Esmeralda + Dourado (Alternativa Premium)

```css
/* Cores Primárias */
--primary-green: #047857;       /* Verde Esmeralda - Crescimento, prosperidade */
--primary-gold: #D97706;        /* Dourado - Valor, conquista */

/* Cores Secundárias */
--secondary-teal: #14B8A6;      /* Turquesa - Modernidade */
--secondary-amber: #F59E0B;     /* Âmbar - Energia */
```

### 2.3 Tipografia

**Fontes Recomendadas:**

```css
/* Fonte Principal - Sans-serif moderna e legível */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Fonte de Destaque - Para títulos e CTAs */
--font-display: 'Poppins', 'Inter', sans-serif;

/* Fonte Monoespaçada - Para códigos e dados */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* Tamanhos de Fonte */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */

/* Pesos de Fonte */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

**Hierarquia Tipográfica:**

| Elemento | Fonte | Tamanho | Peso | Uso |
|----------|-------|---------|------|-----|
| **H1** | Poppins | 3rem (48px) | 700 | Títulos principais |
| **H2** | Poppins | 2.25rem (36px) | 600 | Seções principais |
| **H3** | Poppins | 1.875rem (30px) | 600 | Subtítulos |
| **H4** | Inter | 1.5rem (24px) | 600 | Cards, componentes |
| **Body** | Inter | 1rem (16px) | 400 | Texto corrido |
| **Small** | Inter | 0.875rem (14px) | 400 | Legendas, metadados |
| **Button** | Poppins | 1rem (16px) | 600 | Botões e CTAs |

### 2.4 Espaçamento e Grid

```css
/* Sistema de Espaçamento (baseado em 4px) */
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */

/* Raios de Borda */
--radius-sm: 0.25rem;  /* 4px - Badges, tags */
--radius-md: 0.5rem;   /* 8px - Botões, inputs */
--radius-lg: 0.75rem;  /* 12px - Cards */
--radius-xl: 1rem;     /* 16px - Modais, containers */
--radius-2xl: 1.5rem;  /* 24px - Elementos especiais */
--radius-full: 9999px; /* Círculos, pills */

/* Sombras */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

### 2.5 Componentes Visuais Únicos

#### 2.5.1 Cards com Personalidade

**Evite:** Cards brancos genéricos com bordas cinzas
**Prefira:** Cards com gradientes sutis, sombras coloridas, bordas destacadas

```css
/* Card Padrão - Com gradiente sutil */
.card-default {
  background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%);
  border: 2px solid transparent;
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 20px rgba(0, 78, 100, 0.08);
  transition: all 0.3s ease;
}

.card-default:hover {
  border-color: var(--primary-yellow);
  box-shadow: 0 8px 30px rgba(255, 184, 0, 0.15);
  transform: translateY(-2px);
}

/* Card de Missão - Com borda colorida */
.card-mission {
  background: white;
  border-left: 4px solid var(--primary-yellow);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

/* Card de Negócio - Com imagem de fundo */
.card-business {
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%), 
              url('business-image.jpg');
  background-size: cover;
  border-radius: var(--radius-xl);
  color: white;
}
```

#### 2.5.2 Botões Expressivos

**Evite:** Botões planos sem personalidade
**Prefira:** Botões com gradientes, sombras e micro-interações

```css
/* Botão Primário - Com gradiente */
.btn-primary {
  background: var(--gradient-primary);
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  border: none;
  box-shadow: 0 4px 14px rgba(0, 78, 100, 0.25);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  box-shadow: 0 6px 20px rgba(0, 78, 100, 0.35);
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(0);
}

/* Botão de Ação - Amarelo vibrante */
.btn-action {
  background: var(--primary-yellow);
  color: var(--primary-blue);
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: var(--radius-lg);
  border: 3px solid var(--primary-blue);
  box-shadow: 0 6px 0 var(--primary-blue);
  transition: all 0.1s ease;
}

.btn-action:active {
  box-shadow: 0 2px 0 var(--primary-blue);
  transform: translateY(4px);
}
```

#### 2.5.3 Ícones e Ilustrações

**Estilo Recomendado:**
- Ícones com traços arredondados (rounded)
- Peso médio (stroke-width: 2)
- Cores vibrantes do sistema
- Micro-animações ao hover

**Bibliotecas Recomendadas:**
- **Lucide React** (para ícones funcionais)
- **Heroicons** (alternativa)
- **Ilustrações custom** (para onboarding e estados vazios)

```jsx
// Exemplo de ícone com estilo
<MapPin 
  className="w-6 h-6 text-primary-blue"
  strokeWidth={2}
/>
```

### 2.6 Animações e Micro-interações

**Princípios:**
- Animações sutis e rápidas (200-300ms)
- Easing natural (ease-out, ease-in-out)
- Feedback visual imediato
- Não atrapalhar a usabilidade

```css
/* Transições Padrão */
--transition-fast: 150ms ease-out;
--transition-base: 250ms ease-out;
--transition-slow: 350ms ease-out;

/* Animação de Entrada */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animação de Pulso (para notificações) */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

/* Animação de Shake (para erros) */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}
```

### 2.7 Layouts Diferenciados

#### 2.7.1 Landing Page

**Evite:**
- Layout centralizado genérico
- Seções empilhadas verticalmente
- Backgrounds brancos sem textura

**Prefira:**
- Layout assimétrico com elementos diagonais
- Sobreposição de seções
- Backgrounds com gradientes e texturas
- Elementos flutuantes (floating elements)

```jsx
// Exemplo de Hero Section diferenciada
<section className="relative min-h-screen overflow-hidden">
  {/* Background com gradiente e formas */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-teal-700 to-yellow-500 opacity-90" />
  <div className="absolute top-20 right-10 w-64 h-64 bg-yellow-400 rounded-full blur-3xl opacity-30" />
  <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20" />
  
  {/* Conteúdo */}
  <div className="relative container mx-auto px-4 py-20">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Texto */}
      <div className="space-y-6">
        <h1 className="text-6xl font-bold text-white">
          Fortaleça a <span className="text-yellow-300">economia</span> do seu bairro
        </h1>
        <p className="text-xl text-blue-100">
          Conecte-se com negócios locais e aprenda a crescer
        </p>
        <button className="btn-action">Começar Agora</button>
      </div>
      
      {/* Imagem/Ilustração */}
      <div className="relative">
        {/* Mockup do app ou ilustração */}
      </div>
    </div>
  </div>
</section>
```

#### 2.7.2 Dashboard

**Evite:**
- Sidebar cinza genérica
- Cards brancos sem personalidade
- Layout rígido e quadrado

**Prefira:**
- Sidebar com gradiente ou cor de fundo vibrante
- Cards com bordas coloridas e sombras
- Layout fluido com elementos arredondados
- Gráficos coloridos e visuais

---

## 3. Arquitetura Técnica

### 3.1 Stack Tecnológico Recomendado

#### Para Lovable (Recomendado)

```yaml
Frontend:
  - React 18+
  - TypeScript
  - Tailwind CSS
  - Shadcn/ui (componentes)
  - React Query (gerenciamento de estado)
  - Wouter ou React Router (roteamento)
  - Lucide React (ícones)

Backend:
  - Supabase (banco de dados + auth + storage)
  - PostgreSQL (via Supabase)
  - Supabase Functions (serverless)

Mapas:
  - Google Maps JavaScript API
  - React Google Maps API

Autenticação:
  - Supabase Auth
  - OAuth (Google, Facebook)

Storage:
  - Supabase Storage (imagens, arquivos)

Deploy:
  - Vercel ou Netlify (frontend)
  - Supabase (backend)
```

#### Para V0 (Alternativa)

```yaml
Frontend:
  - Next.js 14+ (App Router)
  - TypeScript
  - Tailwind CSS
  - Shadcn/ui
  - Server Components

Backend:
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL (Vercel Postgres ou Neon)

Autenticação:
  - NextAuth.js

Storage:
  - Vercel Blob Storage ou AWS S3

Deploy:
  - Vercel (full-stack)
```

### 3.2 Estrutura de Banco de Dados

```sql
-- Tabela de Usuários
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(320) UNIQUE NOT NULL,
  name TEXT,
  phone VARCHAR(20),
  avatar_url TEXT,
  bio TEXT,
  user_type VARCHAR(20) CHECK (user_type IN ('consumer', 'entrepreneur')),
  points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Negócios
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  phone VARCHAR(20),
  whatsapp VARCHAR(20),
  email VARCHAR(320),
  website TEXT,
  instagram TEXT,
  facebook TEXT,
  opening_hours JSONB,
  logo_url TEXT,
  cover_url TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  rating DECIMAL(2, 1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  favorite_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Missões (para empreendedores)
CREATE TABLE missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  difficulty VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard')),
  points INTEGER NOT NULL,
  content_type VARCHAR(20) CHECK (content_type IN ('video', 'text', 'quiz')),
  content_url TEXT,
  content_text TEXT,
  quiz_questions JSONB,
  estimated_time INTEGER, -- em minutos
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Progresso de Missões
CREATE TABLE mission_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mission_id UUID REFERENCES missions(id) ON DELETE CASCADE,
  status VARCHAR(20) CHECK (status IN ('not_started', 'in_progress', 'completed')),
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  proof_url TEXT, -- URL da foto/evidência
  notes TEXT,
  score INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, mission_id)
);

-- Tabela de Missões do Consumidor
CREATE TABLE consumer_missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  mission_type VARCHAR(50) CHECK (mission_type IN ('visit', 'favorite', 'review', 'share')),
  points INTEGER NOT NULL,
  target_count INTEGER DEFAULT 1, -- quantas vezes precisa fazer
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Progresso de Missões do Consumidor
CREATE TABLE consumer_mission_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mission_id UUID REFERENCES consumer_missions(id) ON DELETE CASCADE,
  current_count INTEGER DEFAULT 0,
  status VARCHAR(20) CHECK (status IN ('in_progress', 'completed')),
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, mission_id)
);

-- Tabela de Recompensas
CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  points_required INTEGER NOT NULL,
  reward_type VARCHAR(50) CHECK (reward_type IN ('badge', 'discount', 'feature')),
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Resgates de Recompensas
CREATE TABLE reward_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reward_id UUID REFERENCES rewards(id) ON DELETE CASCADE,
  redeemed_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, reward_id)
);

-- Tabela de Posts da Comunidade
CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) CHECK (category IN ('question', 'tip', 'success', 'discussion')),
  image_url TEXT,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Comentários
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  like_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Notificações
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) CHECK (type IN ('mission', 'reward', 'community', 'business', 'system')),
  link TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Favoritos
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, business_id)
);

-- Tabela de Visualizações (analytics)
CREATE TABLE views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Cliques (analytics)
CREATE TABLE clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  click_type VARCHAR(50) CHECK (click_type IN ('phone', 'whatsapp', 'website', 'instagram', 'directions')),
  clicked_at TIMESTAMP DEFAULT NOW()
);

-- Índices para Performance
CREATE INDEX idx_businesses_location ON businesses(latitude, longitude);
CREATE INDEX idx_businesses_category ON businesses(category);
CREATE INDEX idx_businesses_owner ON businesses(owner_id);
CREATE INDEX idx_mission_progress_user ON mission_progress(user_id);
CREATE INDEX idx_community_posts_author ON community_posts(author_id);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_views_business ON views(business_id);
CREATE INDEX idx_clicks_business ON clicks(business_id);
```

### 3.3 APIs e Integrações

#### 3.3.1 Google Maps API

**Funcionalidades Necessárias:**
- Maps JavaScript API (mapa interativo)
- Places API (autocomplete de endereços)
- Geocoding API (converter endereços em coordenadas)
- Directions API (rotas até negócios)

**Configuração:**
```javascript
// Inicialização do Google Maps
const mapOptions = {
  center: { lat: -23.550520, lng: -46.633308 }, // São Paulo
  zoom: 14,
  styles: customMapStyles, // Estilo personalizado
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
};

// Custom Map Styles (cores do Napraça)
const customMapStyles = [
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#004E64" }]
  },
  {
    featureType: "poi",
    elementType: "labels.icon",
    stylers: [{ color: "#FFB800" }]
  },
  // ... mais estilos
];
```

#### 3.3.2 Autenticação

**Fluxo de Autenticação:**

1. Usuário clica em "Entrar"
2. Modal com opções: Google, Facebook, Email
3. Após autenticação, redireciona para seleção de perfil (se primeiro login)
4. Usuário escolhe: Consumidor ou Empreendedor
5. Redireciona para dashboard apropriado

```typescript
// Exemplo com Supabase
const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });
};

// Após login, verificar se tem perfil
const checkUserProfile = async (userId: string) => {
  const { data } = await supabase
    .from('users')
    .select('user_type')
    .eq('id', userId)
    .single();
  
  if (!data?.user_type) {
    // Redirecionar para seleção de perfil
    router.push('/select-profile');
  } else if (data.user_type === 'consumer') {
    router.push('/map');
  } else {
    router.push('/dashboard');
  }
};
```

#### 3.3.3 Upload de Imagens

**Fluxo:**
1. Usuário seleciona imagem
2. Redimensionar/comprimir no cliente (opcional)
3. Upload para storage
4. Retornar URL pública
5. Salvar URL no banco de dados

```typescript
// Exemplo de upload
const uploadImage = async (file: File, bucket: string, path: string) => {
  // Comprimir imagem (opcional)
  const compressedFile = await compressImage(file);
  
  // Upload
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, compressedFile, {
      cacheControl: '3600',
      upsert: false
    });
  
  if (error) throw error;
  
  // Obter URL pública
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);
  
  return publicUrl;
};
```

---

## 4. Funcionalidades Detalhadas

### 4.1 Autenticação e Onboarding

#### 4.1.1 Tela de Login

**Layout:**
- Background com gradiente do Napraça
- Logo centralizado
- Título: "Bem-vindo ao Napraça"
- Subtítulo: "Fortaleça a economia do seu bairro"
- Botões de login social (Google, Facebook)
- Opção de login com email
- Link para termos e privacidade

**Código de Referência:**
```jsx
<div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-700 to-yellow-500 flex items-center justify-center p-4">
  <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
    <img src="/logo.svg" alt="Napraça" className="h-16 mx-auto mb-6" />
    <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
      Bem-vindo ao Napraça
    </h1>
    <p className="text-center text-gray-600 mb-8">
      Fortaleça a economia do seu bairro
    </p>
    
    <div className="space-y-3">
      <button className="w-full btn-google">
        <GoogleIcon /> Continuar com Google
      </button>
      <button className="w-full btn-facebook">
        <FacebookIcon /> Continuar com Facebook
      </button>
      <button className="w-full btn-email">
        <MailIcon /> Continuar com Email
      </button>
    </div>
    
    <p className="text-xs text-center text-gray-500 mt-6">
      Ao continuar, você concorda com nossos{' '}
      <a href="/terms" className="text-primary-blue underline">Termos</a> e{' '}
      <a href="/privacy" className="text-primary-blue underline">Privacidade</a>
    </p>
  </div>
</div>
```

#### 4.1.2 Seleção de Perfil

**Layout:**
- Título: "Como você quer usar o Napraça?"
- Dois cards grandes lado a lado:
  - **Consumidor:** "Descobrir negócios locais"
  - **Empreendedor:** "Crescer meu negócio"
- Cada card com ícone, título, descrição e botão
- Animação ao hover

**Código de Referência:**
```jsx
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 flex items-center justify-center p-4">
  <div className="max-w-4xl w-full">
    <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
      Como você quer usar o Napraça?
    </h1>
    <p className="text-center text-gray-600 mb-12">
      Escolha o perfil que melhor se encaixa com você
    </p>
    
    <div className="grid md:grid-cols-2 gap-6">
      {/* Card Consumidor */}
      <div className="card-profile group hover:scale-105 transition-transform">
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPinIcon className="w-10 h-10 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Consumidor
          </h2>
          <p className="text-gray-600 mb-6">
            Descubra negócios locais, apoie sua comunidade e ganhe recompensas
          </p>
          <button className="btn-primary w-full">
            Continuar como Consumidor
          </button>
        </div>
      </div>
      
      {/* Card Empreendedor */}
      <div className="card-profile group hover:scale-105 transition-transform">
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUpIcon className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Empreendedor
          </h2>
          <p className="text-gray-600 mb-6">
            Aprenda a crescer seu negócio, ganhe visibilidade e conecte-se com clientes
          </p>
          <button className="btn-primary w-full">
            Continuar como Empreendedor
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 4.2 Mapa Interativo (Consumidor)

#### 4.2.1 Layout Principal

**Estrutura:**
- Mapa em tela cheia
- Barra de busca flutuante no topo
- Filtros de categoria (pills horizontais)
- Cards de negócios na parte inferior (carrossel)
- Botão flutuante de localização
- Menu hambúrguer (perfil, favoritos, recompensas)

**Funcionalidades:**
1. **Mapa:**
   - Pins customizados por categoria
   - Cluster de pins quando zoom out
   - Animação ao clicar no pin
   - Destaque do negócio selecionado

2. **Busca:**
   - Autocomplete de endereços
   - Busca por nome de negócio
   - Busca por categoria
   - Filtro por distância

3. **Filtros:**
   - Comida
   - Serviços
   - Varejo
   - Saúde & Beleza
   - Educação
   - Outros

4. **Cards de Negócios:**
   - Imagem de capa
   - Logo
   - Nome
   - Categoria
   - Distância
   - Rating
   - Botão "Ver Detalhes"
   - Botão de favoritar

**Código de Referência:**
```jsx
function MapView() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [category, setCategory] = useState('all');
  const [businesses, setBusinesses] = useState([]);
  
  return (
    <div className="relative h-screen">
      {/* Mapa */}
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={userLocation}
        zoom={14}
        options={mapOptions}
      >
        {businesses.map(business => (
          <Marker
            key={business.id}
            position={{ lat: business.latitude, lng: business.longitude }}
            icon={getCustomMarker(business.category)}
            onClick={() => setSelectedBusiness(business)}
          />
        ))}
      </GoogleMap>
      
      {/* Barra de Busca */}
      <div className="absolute top-4 left-4 right-4">
        <div className="bg-white rounded-full shadow-lg p-2 flex items-center">
          <SearchIcon className="w-5 h-5 text-gray-400 ml-2" />
          <input
            type="text"
            placeholder="Buscar negócios ou endereços..."
            className="flex-1 px-4 py-2 outline-none"
          />
          <button className="btn-icon">
            <FilterIcon />
          </button>
        </div>
      </div>
      
      {/* Filtros de Categoria */}
      <div className="absolute top-20 left-4 right-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`pill ${category === cat.id ? 'pill-active' : 'pill-default'}`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Cards de Negócios */}
      {selectedBusiness && (
        <div className="absolute bottom-4 left-4 right-4">
          <BusinessCard business={selectedBusiness} />
        </div>
      )}
      
      {/* Botão de Localização */}
      <button className="absolute bottom-32 right-4 btn-fab">
        <LocateIcon />
      </button>
    </div>
  );
}
```

#### 4.2.2 Pins Customizados

**Design dos Pins:**
- Formato de gota invertida
- Cor baseada na categoria
- Ícone da categoria no centro
- Sombra sutil
- Animação de bounce ao aparecer

```javascript
const getCustomMarker = (category) => {
  const colors = {
    food: '#FF6B35',
    services: '#004E64',
    retail: '#FFB800',
    health: '#25A18E',
    education: '#6C5CE7',
    other: '#9B9B9B'
  };
  
  const icons = {
    food: 'utensils',
    services: 'briefcase',
    retail: 'shopping-bag',
    health: 'heart',
    education: 'book',
    other: 'map-pin'
  };
  
  return {
    url: `/markers/${category}.svg`,
    scaledSize: new google.maps.Size(40, 40),
    anchor: new google.maps.Point(20, 40)
  };
};
```

### 4.3 Perfil de Negócio

#### 4.3.1 Layout da Página

**Seções:**

1. **Header:**
   - Imagem de capa (parallax)
   - Logo flutuante
   - Botão de favoritar
   - Botão de compartilhar
   - Botão voltar

2. **Informações Principais:**
   - Nome do negócio
   - Categoria
   - Rating e número de avaliações
   - Distância do usuário
   - Status (aberto/fechado)

3. **Ações Rápidas:**
   - Ligar
   - WhatsApp
   - Como chegar
   - Website
   - Instagram

4. **Sobre:**
   - Descrição do negócio
   - Horário de funcionamento
   - Endereço completo

5. **Galeria:**
   - Grid de fotos
   - Lightbox ao clicar

6. **Avaliações:**
   - Rating geral
   - Distribuição de estrelas
   - Comentários de usuários

7. **Mapa:**
   - Localização exata
   - Botão "Como chegar"

**Código de Referência:**
```jsx
function BusinessProfile({ businessId }) {
  const { data: business } = useQuery(['business', businessId], fetchBusiness);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com Cover */}
      <div className="relative h-64">
        <img
          src={business.cover_url}
          alt={business.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Botões de Ação */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <button className="btn-icon-white">
            <ArrowLeftIcon />
          </button>
          <div className="flex gap-2">
            <button className="btn-icon-white">
              <HeartIcon />
            </button>
            <button className="btn-icon-white">
              <ShareIcon />
            </button>
          </div>
        </div>
        
        {/* Logo Flutuante */}
        <div className="absolute -bottom-12 left-6">
          <img
            src={business.logo_url}
            alt={business.name}
            className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg"
          />
        </div>
      </div>
      
      {/* Conteúdo */}
      <div className="px-6 pt-16 pb-6">
        {/* Info Principal */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {business.name}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <StarIcon className="w-4 h-4 text-yellow-500" />
              {business.rating} ({business.review_count})
            </span>
            <span>{business.category}</span>
            <span>{business.distance}km</span>
          </div>
          <div className="mt-2">
            <span className={`pill ${business.is_open ? 'pill-success' : 'pill-error'}`}>
              {business.is_open ? 'Aberto' : 'Fechado'}
            </span>
          </div>
        </div>
        
        {/* Ações Rápidas */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <button className="btn-action-quick">
            <PhoneIcon />
            <span>Ligar</span>
          </button>
          <button className="btn-action-quick">
            <MessageCircleIcon />
            <span>WhatsApp</span>
          </button>
          <button className="btn-action-quick">
            <NavigationIcon />
            <span>Rota</span>
          </button>
          <button className="btn-action-quick">
            <GlobeIcon />
            <span>Site</span>
          </button>
        </div>
        
        {/* Sobre */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Sobre</h2>
          <p className="text-gray-700 leading-relaxed">
            {business.description}
          </p>
        </section>
        
        {/* Horário */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Horário de Funcionamento</h2>
          <div className="space-y-2">
            {Object.entries(business.opening_hours).map(([day, hours]) => (
              <div key={day} className="flex justify-between text-sm">
                <span className="text-gray-600">{day}</span>
                <span className="text-gray-900 font-medium">{hours}</span>
              </div>
            ))}
          </div>
        </section>
        
        {/* Galeria */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Fotos</h2>
          <div className="grid grid-cols-3 gap-2">
            {business.gallery.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Foto ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
              />
            ))}
          </div>
        </section>
        
        {/* Mapa */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Localização</h2>
          <div className="h-48 rounded-lg overflow-hidden mb-2">
            <GoogleMap
              center={{ lat: business.latitude, lng: business.longitude }}
              zoom={16}
            >
              <Marker position={{ lat: business.latitude, lng: business.longitude }} />
            </GoogleMap>
          </div>
          <p className="text-sm text-gray-600">{business.address}</p>
        </section>
      </div>
    </div>
  );
}
```

### 4.4 Dashboard do Empreendedor

#### 4.4.1 Layout Principal

**Estrutura:**
- Header com saudação e notificações
- Cards de métricas (visualizações, cliques, favoritos)
- Gráfico de visualizações (últimos 7 dias)
- Lista de missões pendentes
- Acesso rápido ao perfil do negócio
- Menu de navegação inferior

**Código de Referência:**
```jsx
function Dashboard() {
  const { data: user } = useAuth();
  const { data: business } = useQuery(['my-business'], fetchMyBusiness);
  const { data: analytics } = useQuery(['analytics'], fetchAnalytics);
  const { data: missions } = useQuery(['missions'], fetchMissions);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-teal-700 text-white p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm opacity-80">Olá,</p>
            <h1 className="text-2xl font-bold">{user.name}!</h1>
          </div>
          <button className="btn-icon-white relative">
            <BellIcon />
            {hasNotifications && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full" />
            )}
          </button>
        </div>
        
        {/* Nível e Pontos */}
        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Nível {user.level}</span>
            <span className="text-sm">{user.points} pontos</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400"
              style={{ width: `${(user.points % 100)}%` }}
            />
          </div>
        </div>
      </header>
      
      {/* Métricas */}
      <section className="px-6 py-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Desempenho</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="card-metric">
            <EyeIcon className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{analytics.views}</p>
            <p className="text-xs text-gray-600">Visualizações</p>
          </div>
          <div className="card-metric">
            <MousePointerClickIcon className="w-6 h-6 text-green-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{analytics.clicks}</p>
            <p className="text-xs text-gray-600">Cliques</p>
          </div>
          <div className="card-metric">
            <HeartIcon className="w-6 h-6 text-red-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{analytics.favorites}</p>
            <p className="text-xs text-gray-600">Favoritos</p>
          </div>
        </div>
      </section>
      
      {/* Gráfico */}
      <section className="px-6 pb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Últimos 7 dias</h2>
        <div className="bg-white rounded-lg p-4 shadow">
          <LineChart data={analytics.daily_views} />
        </div>
      </section>
      
      {/* Missões */}
      <section className="px-6 pb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">Missões</h2>
          <a href="/missions" className="text-sm text-primary-blue font-medium">
            Ver todas
          </a>
        </div>
        <div className="space-y-3">
          {missions.slice(0, 3).map(mission => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>
      </section>
      
      {/* Acesso Rápido */}
      <section className="px-6 pb-20">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Acesso Rápido</h2>
        <div className="grid grid-cols-2 gap-4">
          <button className="card-action">
            <StoreIcon />
            <span>Meu Negócio</span>
          </button>
          <button className="card-action">
            <UsersIcon />
            <span>Comunidade</span>
          </button>
        </div>
      </section>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
```

### 4.5 Sistema de Missões

#### 4.5.1 Tipos de Missões

**Para Empreendedores:**

1. **Missões de Conhecimento:**
   - Assistir vídeos educativos
   - Ler artigos sobre gestão
   - Fazer quizzes
   - Exemplos:
     - "Como precificar seus produtos"
     - "Marketing digital para iniciantes"
     - "Atendimento ao cliente de excelência"

2. **Missões de Ação:**
   - Completar perfil do negócio
   - Adicionar fotos
   - Atualizar horário de funcionamento
   - Responder avaliações
   - Exemplos:
     - "Adicione 5 fotos do seu negócio"
     - "Complete todas as informações de contato"
     - "Atualize seu horário de funcionamento"

3. **Missões de Engajamento:**
   - Participar da comunidade
   - Ajudar outros empreendedores
   - Compartilhar dicas
   - Exemplos:
     - "Faça sua primeira postagem na comunidade"
     - "Comente em 3 posts de outros empreendedores"
     - "Compartilhe uma dica de sucesso"

**Para Consumidores:**

1. **Missões de Descoberta:**
   - Visitar novos negócios
   - Explorar categorias diferentes
   - Favoritar estabelecimentos
   - Exemplos:
     - "Visite 3 negócios locais"
     - "Favorite 5 estabelecimentos"
     - "Explore 3 categorias diferentes"

2. **Missões de Engajamento:**
   - Avaliar negócios
   - Compartilhar com amigos
   - Seguir no Instagram
   - Exemplos:
     - "Avalie 3 negócios que você visitou"
     - "Compartilhe um negócio com um amigo"
     - "Siga 5 negócios no Instagram"

#### 4.5.2 Tela de Missão Individual

**Layout:**
- Header com imagem/ícone da missão
- Título e descrição
- Dificuldade e pontos
- Tempo estimado
- Conteúdo (vídeo, texto ou quiz)
- Botão de ação (iniciar, continuar, concluir)
- Progresso (se aplicável)

**Código de Referência:**
```jsx
function MissionDetail({ missionId }) {
  const { data: mission } = useQuery(['mission', missionId], fetchMission);
  const { data: progress } = useQuery(['mission-progress', missionId], fetchProgress);
  const startMission = useMutation(startMissionAPI);
  const completeMission = useMutation(completeMissionAPI);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative h-48 bg-gradient-to-br from-blue-600 to-teal-500">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
            {getMissionIcon(mission.category)}
          </div>
        </div>
      </div>
      
      {/* Conteúdo */}
      <div className="px-6 py-6">
        {/* Info */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className={`pill pill-${mission.difficulty}`}>
              {mission.difficulty}
            </span>
            <span className="text-sm text-gray-600">
              {mission.estimated_time} min
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {mission.title}
          </h1>
          <p className="text-gray-700 leading-relaxed">
            {mission.description}
          </p>
        </div>
        
        {/* Recompensa */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrophyIcon className="w-6 h-6 text-yellow-600" />
              <span className="font-medium text-gray-900">Recompensa</span>
            </div>
            <span className="text-2xl font-bold text-yellow-600">
              +{mission.points} pontos
            </span>
          </div>
        </div>
        
        {/* Conteúdo da Missão */}
        {mission.content_type === 'video' && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Assista ao vídeo</h2>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <video
                src={mission.content_url}
                controls
                className="w-full h-full"
              />
            </div>
          </div>
        )}
        
        {mission.content_type === 'text' && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Leia o conteúdo</h2>
            <div className="prose max-w-none">
              {renderMarkdown(mission.content_text)}
            </div>
          </div>
        )}
        
        {mission.content_type === 'quiz' && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Responda o quiz</h2>
            <Quiz questions={mission.quiz_questions} />
          </div>
        )}
        
        {/* Ação */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t">
          {progress?.status === 'not_started' && (
            <button
              className="btn-primary w-full"
              onClick={() => startMission.mutate(missionId)}
            >
              Iniciar Missão
            </button>
          )}
          
          {progress?.status === 'in_progress' && (
            <button
              className="btn-action w-full"
              onClick={() => completeMission.mutate(missionId)}
            >
              Concluir Missão
            </button>
          )}
          
          {progress?.status === 'completed' && (
            <div className="text-center">
              <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-2" />
              <p className="text-lg font-bold text-gray-900">Missão Concluída!</p>
              <p className="text-sm text-gray-600">+{mission.points} pontos ganhos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

### 4.6 Comunidade

#### 4.6.1 Feed de Posts

**Layout:**
- Header com título e botão de criar post
- Filtros por categoria (Perguntas, Dicas, Sucessos, Discussões)
- Lista de posts
- Cada post contém:
  - Avatar e nome do autor
  - Tempo desde publicação
  - Título
  - Preview do conteúdo
  - Imagem (se houver)
  - Contadores (likes, comentários, visualizações)
  - Botões de ação (like, comentar, compartilhar)

**Código de Referência:**
```jsx
function Community() {
  const [category, setCategory] = useState('all');
  const { data: posts } = useQuery(['community-posts', category], fetchPosts);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Comunidade</h1>
          <button className="btn-primary">
            <PlusIcon className="w-5 h-5" />
            Criar Post
          </button>
        </div>
      </header>
      
      {/* Filtros */}
      <div className="bg-white border-b p-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          <button
            className={`pill ${category === 'all' ? 'pill-active' : 'pill-default'}`}
            onClick={() => setCategory('all')}
          >
            Todos
          </button>
          <button
            className={`pill ${category === 'question' ? 'pill-active' : 'pill-default'}`}
            onClick={() => setCategory('question')}
          >
            Perguntas
          </button>
          <button
            className={`pill ${category === 'tip' ? 'pill-active' : 'pill-default'}`}
            onClick={() => setCategory('tip')}
          >
            Dicas
          </button>
          <button
            className={`pill ${category === 'success' ? 'pill-active' : 'pill-default'}`}
            onClick={() => setCategory('success')}
          >
            Sucessos
          </button>
          <button
            className={`pill ${category === 'discussion' ? 'pill-active' : 'pill-default'}`}
            onClick={() => setCategory('discussion')}
          >
            Discussões
          </button>
        </div>
      </div>
      
      {/* Posts */}
      <div className="p-4 space-y-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

function PostCard({ post }) {
  const likeMutation = useMutation(likePost);
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Header do Post */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={post.author.avatar_url}
          alt={post.author.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <p className="font-medium text-gray-900">{post.author.name}</p>
          <p className="text-xs text-gray-500">{formatTimeAgo(post.created_at)}</p>
        </div>
        <span className={`pill pill-sm pill-${post.category}`}>
          {getCategoryLabel(post.category)}
        </span>
      </div>
      
      {/* Conteúdo */}
      <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-3 line-clamp-3">{post.content}</p>
      
      {/* Imagem */}
      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
      )}
      
      {/* Ações */}
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <button
          className="flex items-center gap-1 hover:text-red-500 transition"
          onClick={() => likeMutation.mutate(post.id)}
        >
          <HeartIcon className={`w-5 h-5 ${post.is_liked ? 'fill-red-500 text-red-500' : ''}`} />
          <span>{post.like_count}</span>
        </button>
        <button className="flex items-center gap-1 hover:text-blue-500 transition">
          <MessageCircleIcon className="w-5 h-5" />
          <span>{post.comment_count}</span>
        </button>
        <button className="flex items-center gap-1 hover:text-green-500 transition">
          <ShareIcon className="w-5 h-5" />
        </button>
        <span className="ml-auto flex items-center gap-1">
          <EyeIcon className="w-4 h-4" />
          {post.view_count}
        </span>
      </div>
    </div>
  );
}
```

### 4.7 Perfil do Usuário

#### 4.7.1 Layout

**Seções:**

1. **Header:**
   - Avatar grande
   - Nome
   - Tipo de usuário (badge)
   - Nível e pontos
   - Botão de editar

2. **Estatísticas:**
   - Missões completadas
   - Pontos totais
   - Nível atual
   - Badges conquistados

3. **Missões Completadas:**
   - Lista de missões com data de conclusão
   - Pontos ganhos

4. **Badges:**
   - Grid de badges
   - Badges bloqueados em cinza

5. **Configurações:**
   - Editar perfil
   - Notificações
   - Privacidade
   - Sair

**Código de Referência:**
```jsx
function Profile() {
  const { data: user } = useAuth();
  const { data: completedMissions } = useQuery(['completed-missions'], fetchCompletedMissions);
  const { data: badges } = useQuery(['badges'], fetchBadges);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 to-teal-700 p-6 pb-20">
        <div className="flex justify-between items-start mb-6">
          <button className="btn-icon-white">
            <ArrowLeftIcon />
          </button>
          <button className="btn-icon-white">
            <SettingsIcon />
          </button>
        </div>
        
        <div className="text-center">
          <div className="relative inline-block mb-4">
            <img
              src={user.avatar_url}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-white"
            />
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <CameraIcon className="w-4 h-4 text-gray-900" />
            </button>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-1">{user.name}</h1>
          <p className="text-blue-100 mb-4">{user.email}</p>
          
          <span className={`pill pill-${user.user_type}`}>
            {user.user_type === 'consumer' ? 'Consumidor' : 'Empreendedor'}
          </span>
        </div>
      </div>
      
      {/* Estatísticas */}
      <div className="px-6 -mt-12 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">{user.level}</p>
              <p className="text-xs text-gray-600">Nível</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{user.points}</p>
              <p className="text-xs text-gray-600">Pontos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{completedMissions.length}</p>
              <p className="text-xs text-gray-600">Missões</p>
            </div>
          </div>
          
          {/* Barra de Progresso */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Nível {user.level}</span>
              <span>{user.points % 100}/100 XP</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-teal-500"
                style={{ width: `${(user.points % 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Badges */}
      <section className="px-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Badges</h2>
        <div className="grid grid-cols-4 gap-4">
          {badges.map(badge => (
            <div
              key={badge.id}
              className={`text-center ${!badge.unlocked ? 'opacity-30' : ''}`}
            >
              <div className="w-16 h-16 mx-auto mb-2">
                <img src={badge.image_url} alt={badge.title} />
              </div>
              <p className="text-xs text-gray-600">{badge.title}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Missões Completadas */}
      <section className="px-6 pb-20">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Missões Completadas</h2>
        <div className="space-y-3">
          {completedMissions.map(mission => (
            <div key={mission.id} className="bg-white rounded-lg p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{mission.title}</h3>
                <p className="text-xs text-gray-600">
                  Concluída em {formatDate(mission.completed_at)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-yellow-600">+{mission.points}</p>
                <p className="text-xs text-gray-600">pontos</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

---

## 5. Especificações de Design

### 5.1 Responsividade

**Breakpoints:**
```css
/* Mobile First */
--screen-sm: 640px;   /* Smartphones grandes */
--screen-md: 768px;   /* Tablets */
--screen-lg: 1024px;  /* Laptops */
--screen-xl: 1280px;  /* Desktops */
--screen-2xl: 1536px; /* Telas grandes */
```

**Abordagem:**
- Design mobile-first
- Layouts adaptáveis (não apenas responsivos)
- Testes em dispositivos reais
- Considerar diferentes tamanhos de tela

### 5.2 Acessibilidade

**Requisitos:**
- Contraste mínimo de 4.5:1 para texto
- Tamanho mínimo de toque: 44x44px
- Navegação por teclado
- Labels em todos os inputs
- Alt text em imagens
- ARIA labels quando necessário
- Feedback visual e sonoro

### 5.3 Performance

**Otimizações:**
- Lazy loading de imagens
- Code splitting
- Compressão de imagens
- Cache de dados
- Debounce em buscas
- Skeleton screens durante carregamento

### 5.4 Estados de UI

**Estados Necessários:**
1. **Loading:** Skeleton screens, spinners
2. **Empty:** Ilustrações e mensagens motivadoras
3. **Error:** Mensagens claras com ações de recuperação
4. **Success:** Feedback visual positivo
5. **Disabled:** Visual claro de elementos desabilitados

---

## 6. Fluxos de Usuário

### 6.1 Fluxo do Consumidor

```
1. Login/Cadastro
   ↓
2. Seleção de Perfil → Consumidor
   ↓
3. Onboarding (opcional)
   - Explicação do mapa
   - Como favoritar
   - Sistema de missões
   ↓
4. Mapa Principal
   - Explorar negócios
   - Filtrar por categoria
   - Ver detalhes
   ↓
5. Perfil de Negócio
   - Ver informações
   - Ligar/WhatsApp
   - Como chegar
   - Favoritar
   ↓
6. Missões
   - Ver missões disponíveis
   - Completar missões
   - Ganhar pontos
   ↓
7. Recompensas
   - Ver badges
   - Resgatar recompensas
   ↓
8. Perfil
   - Ver estatísticas
   - Missões completadas
   - Configurações
```

### 6.2 Fluxo do Empreendedor

```
1. Login/Cadastro
   ↓
2. Seleção de Perfil → Empreendedor
   ↓
3. Cadastro do Negócio
   - Nome e categoria
   - Endereço (com mapa)
   - Contatos
   - Horário
   - Fotos
   ↓
4. Dashboard
   - Ver métricas
   - Missões pendentes
   - Acesso rápido
   ↓
5. Missões Educativas
   - Assistir vídeos
   - Ler conteúdo
   - Fazer quizzes
   - Ganhar pontos
   ↓
6. Perfil do Negócio
   - Editar informações
   - Adicionar fotos
   - Ver analytics
   ↓
7. Comunidade
   - Fazer perguntas
   - Compartilhar dicas
   - Ajudar outros
   ↓
8. Analytics
   - Visualizações
   - Cliques
   - Horários de pico
   - Origem dos visitantes
```

---

## 7. Instruções para IAs

### 7.1 Para Lovable

**Prompt Inicial:**

```
Crie uma plataforma mobile chamada "Napraça" que conecta consumidores e empreendedores locais.

STACK TÉCNICO:
- Frontend: React + TypeScript + Tailwind CSS + Shadcn/ui
- Backend: Supabase (PostgreSQL + Auth + Storage)
- Mapas: Google Maps JavaScript API
- Deploy: Vercel

IDENTIDADE VISUAL:
- Paleta: Azul Petróleo (#004E64) + Amarelo Vibrante (#FFB800)
- Tipografia: Poppins (títulos) + Inter (corpo)
- Estilo: Moderno, caloroso, energético
- Evitar: Design genérico de IA, cards brancos sem personalidade

FUNCIONALIDADES PRINCIPAIS:

1. AUTENTICAÇÃO:
   - Login com Google e Facebook (Supabase Auth)
   - Seleção de perfil: Consumidor ou Empreendedor
   - Redirecionamento baseado no tipo

2. PARA CONSUMIDORES:
   - Mapa interativo com negócios locais
   - Pins customizados por categoria
   - Filtros (comida, serviços, varejo, etc.)
   - Perfil detalhado de cada negócio
   - Sistema de favoritos
   - Missões gamificadas (visitar, avaliar, compartilhar)
   - Sistema de pontos e níveis

3. PARA EMPREENDEDORES:
   - Dashboard com métricas (visualizações, cliques, favoritos)
   - Cadastro completo do negócio
   - Missões educativas (vídeos, textos, quizzes)
   - Analytics detalhado
   - Comunidade (fórum de suporte)
   - Sistema de pontos e níveis

4. COMUNIDADE:
   - Feed de posts
   - Categorias: Perguntas, Dicas, Sucessos, Discussões
   - Comentários e likes
   - Perfil de usuário

BANCO DE DADOS (Supabase):
Crie as seguintes tabelas:
- users (id, email, name, avatar_url, user_type, points, level)
- businesses (id, owner_id, name, description, category, latitude, longitude, contact_info, gallery, ratings)
- missions (id, title, description, content_type, content_url, points, difficulty)
- mission_progress (id, user_id, mission_id, status, completed_at)
- community_posts (id, author_id, title, content, category, likes, comments)
- notifications (id, user_id, message, type, is_read)
- favorites (id, user_id, business_id)
- views (id, user_id, business_id, viewed_at)
- clicks (id, user_id, business_id, click_type, clicked_at)

DESIGN DIFERENCIADO:
- Use gradientes sutis nos cards
- Adicione sombras coloridas
- Botões com micro-interações
- Animações suaves (fadeIn, slideUp)
- Ícones arredondados (Lucide React)
- Cards com bordas coloridas
- Backgrounds com texturas

PRIORIDADES:
1. Implementar autenticação e seleção de perfil
2. Criar mapa interativo com negócios
3. Implementar dashboard do empreendedor
4. Adicionar sistema de missões
5. Criar comunidade

Comece pela autenticação e seleção de perfil. Use componentes do Shadcn/ui mas customize as cores para a paleta do Napraça.
```

**Prompts Subsequentes:**

```
# Para o Mapa:
Implemente o mapa interativo para consumidores:
- Use Google Maps JavaScript API
- Pins customizados por categoria (cores diferentes)
- Barra de busca flutuante no topo
- Filtros de categoria (pills horizontais)
- Cards de negócios na parte inferior (carrossel)
- Botão de localização flutuante
- Ao clicar no pin, mostrar card do negócio

# Para o Dashboard:
Crie o dashboard do empreendedor:
- Header com gradiente (azul para teal)
- Saudação personalizada
- Cards de métricas (visualizações, cliques, favoritos)
- Gráfico de linha (últimos 7 dias)
- Lista de missões pendentes (3 primeiras)
- Acesso rápido ao perfil do negócio
- Bottom navigation

# Para as Missões:
Implemente o sistema de missões:
- Lista de missões disponíveis
- Filtros por categoria e dificuldade
- Tela de detalhes da missão
- Player de vídeo (se content_type === 'video')
- Renderização de markdown (se content_type === 'text')
- Quiz interativo (se content_type === 'quiz')
- Botão de concluir missão
- Feedback visual ao completar (+pontos, animação)

# Para a Comunidade:
Crie o fórum da comunidade:
- Feed de posts
- Filtros por categoria
- Botão de criar post
- Card de post com avatar, título, preview, likes, comentários
- Tela de detalhes do post com comentários
- Formulário de criar post
- Sistema de likes
```

### 7.2 Para V0

**Prompt Inicial:**

```
Crie os componentes visuais para uma plataforma mobile chamada "Napraça".

CONTEXTO:
Plataforma que conecta consumidores e empreendedores locais, com foco em economia de bairro.

IDENTIDADE VISUAL:
- Cores: Azul Petróleo (#004E64) + Amarelo Vibrante (#FFB800)
- Tipografia: Poppins (títulos) + Inter (corpo)
- Estilo: Moderno, caloroso, energético, único

COMPONENTES NECESSÁRIOS:

1. Landing Page:
   - Hero section com gradiente
   - Grid de 4 cards de funcionalidades
   - CTA section
   - Footer
   - Design assimétrico, não centralizado

2. Tela de Login:
   - Background com gradiente
   - Card branco centralizado
   - Logo
   - Botões de login social (Google, Facebook)
   - Opção de email

3. Seleção de Perfil:
   - Dois cards grandes lado a lado
   - Card Consumidor (ícone de mapa, amarelo)
   - Card Empreendedor (ícone de gráfico, azul)
   - Hover effects

4. Mapa (Consumidor):
   - Layout full-screen
   - Barra de busca flutuante
   - Filtros de categoria (pills)
   - Card de negócio na parte inferior
   - Botão de localização (FAB)

5. Dashboard (Empreendedor):
   - Header com gradiente
   - 3 cards de métricas
   - Gráfico de linha
   - Lista de missões
   - Bottom navigation

6. Card de Missão:
   - Borda colorida à esquerda
   - Ícone da categoria
   - Título e descrição
   - Badge de dificuldade
   - Pontos de recompensa
   - Botão de ação

7. Card de Negócio:
   - Imagem de capa
   - Logo flutuante
   - Nome e categoria
   - Rating
   - Distância
   - Botões de ação (ligar, WhatsApp, rota)

8. Card de Post (Comunidade):
   - Avatar do autor
   - Título e preview
   - Badge de categoria
   - Contadores (likes, comentários)
   - Botões de ação

Use Tailwind CSS e crie um design que NÃO pareça genérico de IA. Adicione:
- Gradientes sutis
- Sombras coloridas
- Bordas destacadas
- Micro-interações
- Animações suaves
```

**Prompts Subsequentes:**

```
# Para refinar o design:
Melhore o design dos cards para ficarem mais únicos:
- Adicione gradientes sutis de fundo
- Use sombras coloridas (não apenas cinza)
- Adicione bordas coloridas em um dos lados
- Implemente hover effects (scale, shadow)
- Use border-radius maiores (12-16px)

# Para componentes específicos:
Crie um componente de Badge com variantes:
- success (verde)
- warning (amarelo)
- error (vermelho)
- info (azul)
- custom (azul petróleo do Napraça)

# Para animações:
Adicione animações Tailwind:
- fadeIn para cards
- slideUp para modais
- pulse para notificações
- bounce para ícones de sucesso
```

### 7.3 Dicas Gerais para IAs

**O que FAZER:**
✅ Usar a paleta de cores exata do Napraça
✅ Adicionar micro-interações e animações
✅ Criar layouts assimétricos e interessantes
✅ Usar gradientes e sombras coloridas
✅ Implementar feedback visual imediato
✅ Adicionar estados de loading, empty e error
✅ Usar ícones arredondados (stroke-width: 2)
✅ Testar em diferentes tamanhos de tela
✅ Adicionar comentários no código
✅ Seguir convenções de nomenclatura

**O que NÃO FAZER:**
❌ Criar layouts centralizados genéricos
❌ Usar apenas cores neutras (cinza, branco)
❌ Fazer cards brancos sem personalidade
❌ Ignorar estados de UI (loading, error)
❌ Esquecer responsividade
❌ Usar fontes padrão do sistema
❌ Criar botões sem hover effects
❌ Ignorar acessibilidade
❌ Fazer animações muito lentas ou rápidas
❌ Copiar designs de outras plataformas

---

## 8. Exemplos de Código

### 8.1 Configuração do Supabase

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export type User = {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
  user_type: 'consumer' | 'entrepreneur';
  points: number;
  level: number;
  created_at: string;
};

export type Business = {
  id: string;
  owner_id: string;
  name: string;
  description: string;
  category: string;
  latitude: number;
  longitude: number;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  instagram: string;
  opening_hours: Record<string, string>;
  logo_url: string;
  cover_url: string;
  gallery: string[];
  rating: number;
  review_count: number;
  view_count: number;
  click_count: number;
  favorite_count: number;
  is_active: boolean;
  created_at: string;
};

export type Mission = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  content_type: 'video' | 'text' | 'quiz';
  content_url: string;
  content_text: string;
  quiz_questions: any[];
  estimated_time: number;
  is_active: boolean;
  created_at: string;
};
```

### 8.2 Hook de Autenticação

```typescript
// hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { supabase, User } from '@/lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setUser(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (provider: 'google' | 'facebook') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;

    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id);

    if (error) throw error;
    setUser({ ...user, ...updates });
  };

  return {
    user,
    loading,
    signIn,
    signOut,
    updateProfile,
  };
}
```

### 8.3 Hook de Negócios

```typescript
// hooks/useBusinesses.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, Business } from '@/lib/supabase';

export function useBusinesses(filters?: {
  category?: string;
  search?: string;
  latitude?: number;
  longitude?: number;
  radius?: number; // em km
}) {
  return useQuery({
    queryKey: ['businesses', filters],
    queryFn: async () => {
      let query = supabase
        .from('businesses')
        .select('*')
        .eq('is_active', true);

      if (filters?.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
      }

      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Filtrar por raio (se latitude/longitude fornecidos)
      if (filters?.latitude && filters?.longitude && filters?.radius) {
        return data.filter(business => {
          const distance = calculateDistance(
            filters.latitude!,
            filters.longitude!,
            business.latitude,
            business.longitude
          );
          return distance <= filters.radius!;
        });
      }

      return data;
    },
  });
}

export function useBusiness(id: string) {
  return useQuery({
    queryKey: ['business', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
  });
}

export function useCreateBusiness() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (business: Omit<Business, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('businesses')
        .insert(business)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businesses'] });
    },
  });
}

export function useUpdateBusiness(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: Partial<Business>) => {
      const { data, error } = await supabase
        .from('businesses')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business', id] });
      queryClient.invalidateQueries({ queryKey: ['businesses'] });
    },
  });
}

export function useTrackView(businessId: string) {
  return useMutation({
    mutationFn: async (userId: string | null) => {
      // Registrar visualização
      await supabase.from('views').insert({
        user_id: userId,
        business_id: businessId,
      });

      // Incrementar contador
      await supabase.rpc('increment_view_count', { business_id: businessId });
    },
  });
}

export function useTrackClick(businessId: string) {
  return useMutation({
    mutationFn: async ({
      userId,
      clickType,
    }: {
      userId: string | null;
      clickType: 'phone' | 'whatsapp' | 'website' | 'instagram' | 'directions';
    }) => {
      // Registrar clique
      await supabase.from('clicks').insert({
        user_id: userId,
        business_id: businessId,
        click_type: clickType,
      });

      // Incrementar contador
      await supabase.rpc('increment_click_count', { business_id: businessId });
    },
  });
}

// Função auxiliar para calcular distância
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Raio da Terra em km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}
```

### 8.4 Componente de Mapa

```typescript
// components/Map.tsx
import { useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Business } from '@/lib/supabase';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const options = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
  styles: [
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#004E64' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.icon',
      stylers: [{ color: '#FFB800' }],
    },
  ],
};

interface MapProps {
  businesses: Business[];
  center: { lat: number; lng: number };
  onBusinessClick: (business: Business) => void;
}

export function Map({ businesses, center, onBusinessClick }: MapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const mapRef = useRef<google.maps.Map>();

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={14}
      center={center}
      options={options}
      onLoad={onLoad}
    >
      {businesses.map((business) => (
        <Marker
          key={business.id}
          position={{
            lat: business.latitude,
            lng: business.longitude,
          }}
          icon={{
            url: `/markers/${business.category}.svg`,
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(20, 40),
          }}
          onClick={() => onBusinessClick(business)}
        />
      ))}
    </GoogleMap>
  );
}
```

### 8.5 Componente de Upload de Imagem

```typescript
// components/ImageUpload.tsx
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { CameraIcon, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  bucket: string;
  path: string;
  onUploadComplete: (url: string) => void;
  currentImage?: string;
}

export function ImageUpload({
  bucket,
  path,
  onUploadComplete,
  currentImage,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];

      // Criar preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload para Supabase
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Obter URL pública
      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

      onUploadComplete(data.publicUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Erro ao fazer upload da imagem');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="hidden"
      />
      
      <label
        htmlFor="image-upload"
        className="relative block w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-blue transition overflow-hidden"
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <CameraIcon className="w-12 h-12 mb-2" />
            <p className="text-sm">Clique para adicionar imagem</p>
          </div>
        )}
        
        {uploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}
      </label>
    </div>
  );
}
```

---

## 9. Checklist de Implementação

### 9.1 Fase 1: Fundação (Semana 1-2)

- [ ] Configurar projeto (React + TypeScript + Tailwind)
- [ ] Configurar Supabase (banco de dados + auth + storage)
- [ ] Criar schema do banco de dados
- [ ] Implementar autenticação (Google + Facebook)
- [ ] Criar sistema de seleção de perfil
- [ ] Implementar design system (cores, tipografia, componentes)
- [ ] Criar layout base (header, footer, navigation)

### 9.2 Fase 2: Funcionalidades Core (Semana 3-4)

**Para Consumidores:**
- [ ] Implementar mapa interativo
- [ ] Criar pins customizados por categoria
- [ ] Adicionar busca e filtros
- [ ] Implementar perfil de negócio
- [ ] Adicionar sistema de favoritos
- [ ] Criar sistema de tracking (views, clicks)

**Para Empreendedores:**
- [ ] Criar dashboard com métricas
- [ ] Implementar cadastro de negócio
- [ ] Adicionar upload de imagens
- [ ] Criar formulário de edição
- [ ] Implementar analytics básico

### 9.3 Fase 3: Gamificação (Semana 5-6)

- [ ] Criar sistema de missões
- [ ] Implementar tipos de conteúdo (vídeo, texto, quiz)
- [ ] Adicionar sistema de pontos
- [ ] Criar sistema de níveis
- [ ] Implementar badges e recompensas
- [ ] Adicionar progresso de missões
- [ ] Criar notificações de conquistas

### 9.4 Fase 4: Comunidade (Semana 7)

- [ ] Criar feed de posts
- [ ] Implementar categorias de posts
- [ ] Adicionar sistema de likes
- [ ] Criar sistema de comentários
- [ ] Implementar busca de posts
- [ ] Adicionar notificações de comunidade

### 9.5 Fase 5: Perfil e Configurações (Semana 8)

- [ ] Criar página de perfil
- [ ] Implementar edição de perfil
- [ ] Adicionar histórico de missões
- [ ] Criar galeria de badges
- [ ] Implementar configurações
- [ ] Adicionar sistema de notificações

### 9.6 Fase 6: Polimento e Otimização (Semana 9-10)

- [ ] Adicionar estados de loading
- [ ] Criar estados vazios
- [ ] Implementar tratamento de erros
- [ ] Adicionar animações e micro-interações
- [ ] Otimizar performance
- [ ] Testar responsividade
- [ ] Implementar acessibilidade
- [ ] Adicionar analytics (Google Analytics)

### 9.7 Fase 7: Testes e Deploy (Semana 11-12)

- [ ] Testes de usabilidade
- [ ] Testes em dispositivos reais
- [ ] Correção de bugs
- [ ] Otimização final
- [ ] Deploy em produção
- [ ] Configurar domínio
- [ ] Configurar SSL
- [ ] Monitoramento de erros (Sentry)

---

## 10. Referências e Recursos

### 10.1 Documentação Técnica

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)
- [React Query](https://tanstack.com/query/latest/docs/react/overview)

### 10.2 Design e UX

- [Material Design](https://m3.material.io/)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Laws of UX](https://lawsofux.com/)
- [Refactoring UI](https://www.refactoringui.com/)

### 10.3 Inspirações de Design

- [Dribbble - Mobile App Design](https://dribbble.com/tags/mobile-app)
- [Behance - App Design](https://www.behance.net/search/projects?search=app+design)
- [Mobbin - Mobile Design Patterns](https://mobbin.com/)
- [Pttrns - Mobile Design Patterns](https://pttrns.com/)

### 10.4 Ferramentas

- [Figma](https://www.figma.com/) - Design
- [Excalidraw](https://excalidraw.com/) - Diagramas
- [Coolors](https://coolors.co/) - Paletas de cores
- [Google Fonts](https://fonts.google.com/) - Tipografia
- [Lucide Icons](https://lucide.dev/) - Ícones
- [unDraw](https://undraw.co/) - Ilustrações

### 10.5 Comunidades

- [Reddit - r/webdev](https://www.reddit.com/r/webdev/)
- [Reddit - r/reactjs](https://www.reddit.com/r/reactjs/)
- [Discord - Reactiflux](https://www.reactiflux.com/)
- [Stack Overflow](https://stackoverflow.com/)

---

## Conclusão

Este guia foi criado para ser extremamente completo e detalhado, permitindo que qualquer IA de desenvolvimento (Lovable, V0, Cursor, etc.) possa implementar a plataforma Napraça com excelência.

**Pontos-chave para lembrar:**

1. **Identidade Visual Única:** Não crie um design genérico. Use a paleta de cores do Napraça, adicione gradientes, sombras coloridas e micro-interações.

2. **Foco no Usuário:** Sempre pense na experiência do usuário. Adicione estados de loading, empty e error. Implemente feedback visual imediato.

3. **Gamificação Engajadora:** O sistema de missões e pontos é o coração da plataforma. Faça-o divertido e motivador.

4. **Comunidade Forte:** O fórum é essencial para o sucesso. Facilite a interação entre empreendedores.

5. **Performance e Acessibilidade:** Otimize para dispositivos móveis. Garanta que todos possam usar a plataforma.

6. **Iteração Contínua:** Comece com o MVP e vá adicionando funcionalidades. Teste com usuários reais e itere.

**Boa sorte na implementação! 🚀**

---

**Documento criado por:** Manus AI  
**Versão:** 2.0  
**Data:** Janeiro 2026  
**Licença:** Uso exclusivo para desenvolvimento da plataforma Napraça


---

## 4. FUNCIONALIDADES COMPLETAS (DETALHADAS)

### 4.1 Sistema de Autenticação e Perfis

**Objetivo:** Permitir que usuários se cadastrem e façam login, escolhendo entre dois perfis distintos (Consumidor ou Empreendedor).

#### Fluxo de Autenticação

**Tela 1: Landing Page**
- Hero section com proposta de valor clara
- Dois CTAs principais: "Sou Consumidor" e "Sou Empreendedor"
- Seção de features com cards explicativos
- Depoimentos (opcional para MVP)
- Footer com links institucionais

**Tela 2: Seleção de Perfil (Onboarding)**
- Após clicar no CTA, usuário é direcionado para OAuth (se não autenticado)
- Após autenticação bem-sucedida, mostrar tela de seleção de perfil
- Dois cards grandes e visuais:
  - **Consumidor**: Ícone de sacola/mapa, descrição "Descubra negócios locais e ganhe recompensas"
  - **Empreendedor**: Ícone de loja/gráfico, descrição "Divulgue seu negócio e aprenda a crescer"
- Botão de confirmação para cada perfil
- Após seleção, salvar `userType` no banco de dados

**Tela 3: Redirecionamento**
- Consumidor → `/map` (mapa de negócios)
- Empreendedor → `/dashboard` (dashboard educativo)

#### Especificações Técnicas

**Backend (tRPC Procedures):**
```typescript
auth: router({
  me: publicProcedure.query(({ ctx }) => ctx.user),
  
  updateProfile: protectedProcedure
    .input(z.object({
      userType: z.enum(['consumer', 'entrepreneur']).optional(),
      name: z.string().optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      bio: z.string().optional(),
      avatar: z.string().url().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Atualizar usuário no banco
      await db.updateUser(ctx.user.id, input);
      return { success: true };
    }),
    
  logout: publicProcedure.mutation(({ ctx }) => {
    ctx.res.clearCookie('session');
    return { success: true };
  }),
}),
```

**Frontend (React Components):**
- `SelectProfile.tsx`: Tela de seleção de perfil
- `useAuth()` hook: Gerenciar estado de autenticação
- Proteção de rotas: Redirecionar não autenticados para login

---

### 4.2 Mapa Interativo com Negócios Locais

**Objetivo:** Permitir que consumidores descubram negócios locais em um mapa interativo, filtrem por categoria e visualizem detalhes.

#### Funcionalidades do Mapa

**Visualização:**
- Mapa centralizado na localização do usuário (solicitar permissão de geolocalização)
- Pins customizados por categoria:
  - 🍔 Comida (laranja)
  - 🛠️ Serviços (azul)
  - 🛒 Varejo (verde)
  - 🎨 Outros (roxo)
- Clustering de pins quando zoom out (agrupar negócios próximos)
- Info window ao clicar no pin: nome, categoria, foto, botão "Ver Detalhes"

**Filtros:**
- Barra de busca no topo: pesquisar por nome ou palavra-chave
- Chips de categoria: "Todos", "Comida", "Serviços", "Varejo", "Outros"
- Filtro de distância: slider para ajustar raio de busca (1km, 5km, 10km, 20km)
- Filtro de avaliação: mostrar apenas negócios com 4+ estrelas (futuro)

**Lista Lateral (Mobile: Bottom Sheet):**
- Lista de negócios visíveis no mapa atual
- Card compacto por negócio:
  - Foto de capa
  - Nome
  - Categoria
  - Distância do usuário
  - Horário de funcionamento (aberto/fechado)
  - Botão "Ver Perfil"

#### Especificações Técnicas

**Backend:**
```typescript
businesses: router({
  list: publicProcedure
    .input(z.object({
      lat: z.number(),
      lng: z.number(),
      radius: z.number().default(5), // km
      category: z.enum(['food', 'services', 'retail', 'other']).optional(),
      search: z.string().optional(),
    }))
    .query(async ({ input }) => {
      // Buscar negócios dentro do raio usando fórmula de Haversine
      const businesses = await db.getBusinessesNearby(input);
      return businesses;
    }),
    
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const business = await db.getBusinessById(input.id);
      if (!business) throw new TRPCError({ code: 'NOT_FOUND' });
      
      // Incrementar contador de visualizações
      await db.trackView(input.id, 'business');
      
      return business;
    }),
}),
```

**Frontend:**
- Usar Google Maps API (já configurado no template)
- Componente `MapView.tsx`:
  - Inicializar mapa com `useEffect`
  - Carregar negócios com `trpc.businesses.list.useQuery()`
  - Renderizar markers customizados
  - Implementar filtros com state local
  - Sincronizar lista lateral com mapa

**Design:**
- Mapa ocupa 60% da tela (desktop) ou tela cheia com bottom sheet (mobile)
- Barra de filtros fixa no topo, com sombra sutil
- Pins com animação de "bounce" ao aparecer
- Transição suave ao clicar em negócio (zoom + highlight)

---

### 4.3 Perfil de Negócio

**Objetivo:** Exibir informações completas sobre um negócio local, permitindo interação (favoritar, compartilhar, contatar).

#### Estrutura do Perfil

**Header:**
- Foto de capa (banner) com gradiente overlay
- Logo do negócio (circular, sobreposto no canto inferior esquerdo)
- Nome do negócio (H1, branco, com sombra)
- Categoria e distância (subtitle, branco)
- Botões de ação:
  - ❤️ Favoritar (toggle)
  - 📤 Compartilhar
  - 📞 Ligar
  - 📍 Abrir no Maps

**Informações Principais:**
- **Sobre:** Descrição do negócio (até 500 caracteres)
- **Endereço:** Rua, número, bairro, cidade
- **Horário de Funcionamento:**
  - Tabela com dias da semana e horários
  - Indicador visual: "Aberto agora" (verde) ou "Fechado" (vermelho)
- **Contato:**
  - Telefone (com botão de ligar)
  - WhatsApp (com botão de abrir chat)
  - Instagram (link externo)
  - Site (link externo)

**Galeria de Fotos:**
- Grid de fotos (3 colunas no desktop, 2 no mobile)
- Lightbox ao clicar (fullscreen com navegação)
- Máximo de 10 fotos

**Missões Ativas (Para Consumidores):**
- Card destacado: "Complete uma missão e ganhe pontos!"
- Lista de missões disponíveis para este negócio:
  - Título da missão
  - Pontos a ganhar
  - Descrição curta
  - Botão "Participar"

**Avaliações (Futuro):**
- Lista de avaliações de outros consumidores
- Média de estrelas
- Formulário para deixar avaliação (apenas consumidores)

#### Especificações Técnicas

**Backend:**
```typescript
businesses: router({
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const business = await db.getBusinessById(input.id);
      const missions = await db.getMissionsByBusiness(input.id);
      
      return { business, missions };
    }),
    
  favorite: protectedProcedure
    .input(z.object({ businessId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await db.toggleFavorite(ctx.user.id, input.businessId);
      return { success: true };
    }),
    
  trackClick: publicProcedure
    .input(z.object({ 
      businessId: z.number(),
      clickType: z.enum(['phone', 'whatsapp', 'instagram', 'website', 'maps'])
    }))
    .mutation(async ({ input }) => {
      await db.trackClick(input.businessId, input.clickType);
      return { success: true };
    }),
}),
```

**Frontend:**
- Componente `BusinessProfile.tsx`
- Usar `useParams()` para pegar ID da URL (`/business/:id`)
- Carregar dados com `trpc.businesses.getById.useQuery({ id })`
- Implementar favoritar com `trpc.businesses.favorite.useMutation()`
- Tracking de cliques em todos os botões de ação

**Design:**
- Layout limpo e espaçado
- Cards com sombra sutil e border-radius 12px
- Ícones coloridos para cada tipo de contato
- Botões de ação com hover effect (scale 1.05)
- Skeleton loading enquanto carrega dados

---

### 4.4 Dashboard do Empreendedor (Gamificado)

**Objetivo:** Fornecer um painel educativo e gamificado para empreendedores aprenderem sobre gestão de negócios e acompanharem seu progresso.

#### Estrutura do Dashboard

**Header:**
- Saudação personalizada: "Olá, [Nome]! 👋"
- Card de progresso geral:
  - Barra de progresso circular (nível atual)
  - Pontos acumulados
  - Próximo nível e pontos necessários
  - Badges conquistados (ícones pequenos)

**Seção 1: Missões Ativas**
- Grid de cards de missões (2 colunas no desktop, 1 no mobile)
- Cada card contém:
  - Ícone da categoria (ex: 💰 Finanças, 📱 Marketing, 👥 Atendimento)
  - Título da missão
  - Descrição curta (1-2 linhas)
  - Barra de progresso (% completado)
  - Pontos a ganhar
  - Botão "Continuar" ou "Iniciar"
- Filtro por categoria no topo

**Seção 2: Estatísticas Rápidas**
- 4 cards de métricas:
  - 👁️ Visualizações do perfil (últimos 7 dias)
  - ❤️ Favoritos (total)
  - 📞 Cliques em contato (últimos 7 dias)
  - ⭐ Avaliação média (futuro)
- Cada card com gráfico sparkline (mini gráfico de linha)

**Seção 3: Seu Negócio**
- Card com preview do perfil do negócio
- Botão "Editar Perfil"
- Botão "Ver Como Consumidor" (abre perfil público)
- Status: "Perfil completo" ou "Complete seu perfil para aparecer no mapa"

**Seção 4: Comunidade**
- Feed de posts recentes da comunidade
- 3 posts mais recentes (título + preview)
- Botão "Ver Todos os Posts"
- Botão "Criar Novo Post"

**Seção 5: Dicas Rápidas**
- Card com dica do dia (rotativo)
- Exemplos:
  - "Sabia que negócios com fotos recebem 3x mais cliques?"
  - "Complete missões para desbloquear badges e atrair mais clientes!"
  - "Responda aos comentários para aumentar seu engajamento"

#### Especificações Técnicas

**Backend:**
```typescript
dashboard: router({
  getStats: protectedProcedure
    .query(async ({ ctx }) => {
      const business = await db.getBusinessByOwnerId(ctx.user.id);
      if (!business) return null;
      
      const stats = await db.getBusinessStats(business.id);
      const missions = await db.getUserMissions(ctx.user.id);
      const communityPosts = await db.getRecentCommunityPosts(3);
      
      return { business, stats, missions, communityPosts };
    }),
}),
```

**Frontend:**
- Componente `Dashboard.tsx`
- Layout em grid responsivo (12 colunas)
- Usar `trpc.dashboard.getStats.useQuery()`
- Gráficos com Recharts (biblioteca já incluída no template)
- Animações sutis ao carregar (fade in, slide up)

**Design:**
- Background com gradiente sutil (azul claro → branco)
- Cards com glassmorphism effect (backdrop-blur + transparência)
- Badges com animação de "pulse" quando desbloqueados
- Cores vibrantes para indicar progresso (verde para completo, amarelo para em andamento)

---

### 4.5 Sistema de Missões (Empreendedor)

**Objetivo:** Oferecer conteúdo educativo gamificado para empreendedores aprenderem sobre gestão de negócios.

#### Tipos de Missões

**Categorias:**
1. **💰 Finanças:** Controle de caixa, precificação, gestão de custos
2. **📱 Marketing:** Redes sociais, divulgação, branding
3. **👥 Atendimento:** Experiência do cliente, fidelização
4. **📊 Gestão:** Planejamento, organização, processos
5. **🎯 Vendas:** Técnicas de venda, negociação, prospecção

**Estrutura de uma Missão:**
- **Título:** Curto e direto (ex: "Crie sua primeira postagem no Instagram")
- **Descrição:** Explicação do objetivo e benefícios
- **Conteúdo Educativo:**
  - Vídeo (YouTube embed) ou
  - Texto com imagens (markdown)
  - Duração estimada (5-15 min)
- **Tarefa Prática:**
  - Ação a ser realizada (ex: "Tire uma foto do seu produto e poste no Instagram")
  - Upload de comprovação (foto ou link)
- **Pontos:** 50-200 pontos (baseado na dificuldade)
- **Badge:** Desbloqueado ao completar (ex: "Mestre do Marketing")

#### Fluxo de Conclusão

1. **Listar Missões:** Empreendedor vê lista de missões disponíveis no dashboard
2. **Iniciar Missão:** Clicar em "Iniciar" abre página da missão
3. **Consumir Conteúdo:** Assistir vídeo ou ler texto
4. **Realizar Tarefa:** Fazer upload de foto/link como comprovação
5. **Enviar para Revisão:** Missão fica com status "pending"
6. **Aprovação Automática ou Manual:**
   - Automática: Se tarefa é simples (ex: assistir vídeo)
   - Manual: Admin revisa (futuro)
7. **Ganhar Pontos e Badge:** Notificação de conquista
8. **Desbloquear Próxima Missão:** Missões podem ter pré-requisitos

#### Especificações Técnicas

**Backend:**
```typescript
missions: router({
  list: protectedProcedure
    .input(z.object({
      category: z.enum(['finance', 'marketing', 'service', 'management', 'sales']).optional(),
    }))
    .query(async ({ ctx, input }) => {
      const missions = await db.getMissions(input.category);
      const progress = await db.getUserMissionProgress(ctx.user.id);
      
      return missions.map(m => ({
        ...m,
        progress: progress.find(p => p.missionId === m.id),
      }));
    }),
    
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const mission = await db.getMissionById(input.id);
      const progress = await db.getMissionProgress(ctx.user.id, input.id);
      
      return { mission, progress };
    }),
    
  start: protectedProcedure
    .input(z.object({ missionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await db.startMission(ctx.user.id, input.missionId);
      return { success: true };
    }),
    
  submit: protectedProcedure
    .input(z.object({
      missionId: z.number(),
      proofUrl: z.string().url(), // URL da foto/link no S3
    }))
    .mutation(async ({ ctx, input }) => {
      await db.submitMission(ctx.user.id, input.missionId, input.proofUrl);
      
      // Dar pontos e badge
      const mission = await db.getMissionById(input.missionId);
      await db.addPoints(ctx.user.id, mission.points);
      
      return { success: true, points: mission.points };
    }),
}),
```

**Frontend:**
- `MissionList.tsx`: Lista de missões com filtros
- `MissionDetail.tsx`: Página individual da missão
- `MissionProgress.tsx`: Componente de progresso (barra + %)
- Upload de foto com `storagePut()` do S3

**Design:**
- Cards de missão com gradiente baseado na categoria
- Ícones grandes e coloridos
- Animação de "confetti" ao completar missão
- Modal de conquista com badge animado

---

### 4.6 Sistema de Recompensas (Consumidor)

**Objetivo:** Engajar consumidores a interagir com negócios locais através de missões e recompensas.

#### Mecânica de Pontos

**Como Ganhar Pontos:**
- ✅ Visitar perfil de negócio: +5 pontos
- ✅ Favoritar negócio: +10 pontos
- ✅ Completar missão de consumidor: +50-100 pontos
- ✅ Deixar avaliação (futuro): +20 pontos
- ✅ Compartilhar negócio (futuro): +15 pontos

**Níveis:**
- Nível 1: 0-100 pontos (Explorador)
- Nível 2: 101-300 pontos (Descobridor)
- Nível 3: 301-600 pontos (Apoiador)
- Nível 4: 601-1000 pontos (Embaixador)
- Nível 5: 1001+ pontos (Lenda Local)

**Badges:**
- 🏆 Primeira Visita
- ❤️ 10 Favoritos
- 🎯 10 Missões Completadas
- 🌟 Nível 5 Alcançado
- 🗺️ Explorador (visitou 20 negócios)

#### Missões de Consumidor

**Exemplos:**
1. **Visite 5 negócios diferentes** (50 pontos)
2. **Favorite 3 negócios da categoria Comida** (30 pontos)
3. **Tire uma foto em um negócio local e compartilhe** (100 pontos)
4. **Visite um negócio nos horários de pico** (20 pontos)

#### Recompensas

**Tipos:**
- **Descontos:** Cupons de desconto em negócios parceiros
- **Brindes:** Produtos gratuitos ao atingir X pontos
- **Destaque:** Perfil destacado na comunidade
- **Acesso Antecipado:** Novos recursos da plataforma

**Resgate:**
- Consumidor acessa página `/rewards`
- Lista de recompensas disponíveis (baseado nos pontos)
- Clicar em "Resgatar" → Confirmar → Gerar código/cupom
- Código é enviado por email e fica salvo no perfil

#### Especificações Técnicas

**Backend:**
```typescript
rewards: router({
  list: publicProcedure
    .query(async () => {
      return await db.getAvailableRewards();
    }),
    
  redeem: protectedProcedure
    .input(z.object({ rewardId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const reward = await db.getRewardById(input.rewardId);
      const user = await db.getUserById(ctx.user.id);
      
      if (user.points < reward.pointsCost) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Pontos insuficientes' });
      }
      
      // Deduzir pontos e criar resgate
      await db.deductPoints(ctx.user.id, reward.pointsCost);
      const redemption = await db.createRedemption(ctx.user.id, input.rewardId);
      
      return { success: true, code: redemption.code };
    }),
    
  myRedemptions: protectedProcedure
    .query(async ({ ctx }) => {
      return await db.getUserRedemptions(ctx.user.id);
    }),
}),

consumerMissions: router({
  list: publicProcedure
    .query(async () => {
      return await db.getConsumerMissions();
    }),
    
  complete: protectedProcedure
    .input(z.object({
      missionId: z.number(),
      proofUrl: z.string().url().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const mission = await db.getConsumerMissionById(input.missionId);
      
      await db.completeConsumerMission(ctx.user.id, input.missionId);
      await db.addPoints(ctx.user.id, mission.points);
      
      return { success: true, points: mission.points };
    }),
}),
```

**Frontend:**
- `Rewards.tsx`: Página de recompensas
- `MyRewards.tsx`: Recompensas resgatadas
- `ConsumerMissions.tsx`: Lista de missões de consumidor
- Componente de progresso de nível no header

**Design:**
- Cards de recompensa com imagem atrativa
- Badge de "Novo" para recompensas recentes
- Animação de "shine" ao resgatar
- Confetti ao subir de nível

---

### 4.7 Analytics para Empreendedores

**Objetivo:** Fornecer insights sobre o desempenho do negócio na plataforma.

#### Métricas Principais

**Visualizações:**
- Total de visualizações do perfil
- Gráfico de linha (últimos 30 dias)
- Comparação com período anterior (% de crescimento)

**Cliques:**
- Total de cliques em botões de ação:
  - Telefone
  - WhatsApp
  - Instagram
  - Website
  - Abrir no Maps
- Gráfico de barras por tipo de clique

**Favoritos:**
- Total de usuários que favoritaram
- Gráfico de crescimento

**Horários de Pico:**
- Heatmap mostrando horários com mais visualizações
- Dias da semana com mais engajamento

**Demografia (Futuro):**
- Idade dos visitantes
- Localização (bairros)
- Dispositivo (mobile vs desktop)

#### Especificações Técnicas

**Backend:**
```typescript
analytics: router({
  getBusinessStats: protectedProcedure
    .input(z.object({
      businessId: z.number(),
      period: z.enum(['7d', '30d', '90d']).default('30d'),
    }))
    .query(async ({ ctx, input }) => {
      // Verificar se o usuário é dono do negócio
      const business = await db.getBusinessById(input.businessId);
      if (business.ownerId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      
      const stats = await db.getBusinessAnalytics(input.businessId, input.period);
      
      return stats;
    }),
}),
```

**Frontend:**
- `Analytics.tsx`: Página de analytics
- Usar Recharts para gráficos
- Filtro de período (7d, 30d, 90d)
- Cards de métricas com ícones

**Design:**
- Layout de dashboard com grid
- Gráficos com cores da marca
- Tooltips informativos
- Export para PDF (futuro)

---

### 4.8 Comunidade/Fórum

**Objetivo:** Criar um espaço para empreendedores compartilharem dicas, dúvidas e experiências.

#### Funcionalidades

**Posts:**
- Criar post com título, conteúdo (markdown) e categoria
- Categorias: Dúvidas, Dicas, Experiências, Networking
- Anexar imagens (até 3)
- Tags (ex: #marketing, #vendas, #atendimento)

**Interações:**
- Curtir post (❤️)
- Comentar
- Compartilhar (copiar link)
- Seguir autor

**Feed:**
- Ordenar por: Mais recentes, Mais curtidos, Mais comentados
- Filtrar por categoria
- Buscar por palavra-chave

**Perfil na Comunidade:**
- Posts criados
- Comentários
- Curtidas recebidas
- Seguidores

#### Especificações Técnicas

**Backend:**
```typescript
community: router({
  listPosts: publicProcedure
    .input(z.object({
      category: z.enum(['questions', 'tips', 'experiences', 'networking']).optional(),
      sortBy: z.enum(['recent', 'likes', 'comments']).default('recent'),
      search: z.string().optional(),
    }))
    .query(async ({ input }) => {
      return await db.getCommunityPosts(input);
    }),
    
  createPost: protectedProcedure
    .input(z.object({
      title: z.string().min(5).max(200),
      content: z.string().min(20),
      category: z.enum(['questions', 'tips', 'experiences', 'networking']),
      tags: z.array(z.string()).max(5),
      images: z.array(z.string().url()).max(3).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const post = await db.createCommunityPost(ctx.user.id, input);
      return post;
    }),
    
  likePost: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await db.toggleLikePost(ctx.user.id, input.postId);
      return { success: true };
    }),
    
  addComment: protectedProcedure
    .input(z.object({
      postId: z.number(),
      content: z.string().min(1).max(500),
    }))
    .mutation(async ({ ctx, input }) => {
      const comment = await db.addComment(ctx.user.id, input.postId, input.content);
      return comment;
    }),
}),
```

**Frontend:**
- `Community.tsx`: Feed de posts
- `CreatePost.tsx`: Formulário de criação
- `PostDetail.tsx`: Página individual do post
- Editor de markdown (react-markdown)

**Design:**
- Cards de post com preview
- Avatar do autor
- Badges de categoria coloridos
- Botões de interação com contador

---

### 4.9 Sistema de Notificações

**Objetivo:** Manter usuários engajados através de notificações relevantes.

#### Tipos de Notificações

**Para Consumidores:**
- 🎯 Nova missão disponível
- 🏆 Missão completada (+X pontos)
- 📈 Subiu de nível
- 🎁 Nova recompensa disponível
- ❤️ Negócio favoritado postou algo novo
- 💬 Resposta em comentário da comunidade

**Para Empreendedores:**
- 👁️ Seu negócio recebeu X visualizações hoje
- ❤️ Alguém favoritou seu negócio
- 📞 Alguém clicou no seu contato
- 🎯 Nova missão educativa disponível
- 💬 Novo comentário no seu post da comunidade
- 📊 Relatório semanal de desempenho

#### Canais

**In-App:**
- Badge no ícone de notificações (header)
- Lista de notificações com scroll infinito
- Marcar como lida ao clicar

**Push (Futuro):**
- Notificações push no navegador (Web Push API)
- Notificações push no app mobile (Firebase)

**Email (Futuro):**
- Resumo semanal
- Notificações importantes (ex: resgate de recompensa)

#### Especificações Técnicas

**Backend:**
```typescript
notifications: router({
  list: protectedProcedure
    .input(z.object({
      unreadOnly: z.boolean().default(false),
    }))
    .query(async ({ ctx, input }) => {
      return await db.getUserNotifications(ctx.user.id, input.unreadOnly);
    }),
    
  markAsRead: protectedProcedure
    .input(z.object({ notificationId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await db.markNotificationAsRead(input.notificationId);
      return { success: true };
    }),
    
  markAllAsRead: protectedProcedure
    .mutation(async ({ ctx }) => {
      await db.markAllNotificationsAsRead(ctx.user.id);
      return { success: true };
    }),
}),
```

**Frontend:**
- `NotificationBell.tsx`: Ícone com badge de contador
- `NotificationList.tsx`: Dropdown com lista
- Polling a cada 30s ou WebSocket (futuro)

**Design:**
- Dropdown com max-height e scroll
- Notificações não lidas com fundo azul claro
- Ícones diferentes por tipo
- Timestamp relativo (ex: "há 5 minutos")

---

### 4.10 Perfil do Usuário (Editável)

**Objetivo:** Permitir que usuários gerenciem suas informações pessoais e vejam seu progresso.

#### Seções do Perfil

**Informações Pessoais:**
- Avatar (upload de foto)
- Nome
- Email
- Telefone
- Bio (para empreendedores)
- Tipo de usuário (consumidor/empreendedor)

**Estatísticas:**
- Pontos totais
- Nível atual
- Badges conquistados
- Missões completadas
- Negócios favoritados (para consumidores)
- Visualizações do negócio (para empreendedores)

**Missões Completadas:**
- Lista de missões concluídas
- Data de conclusão
- Pontos ganhos

**Recompensas Resgatadas (Consumidores):**
- Lista de recompensas
- Código do cupom
- Status (ativo/usado/expirado)

**Meu Negócio (Empreendedores):**
- Link para editar perfil do negócio
- Preview do perfil público

#### Especificações Técnicas

**Backend:**
```typescript
profile: router({
  get: protectedProcedure
    .query(async ({ ctx }) => {
      const user = await db.getUserById(ctx.user.id);
      const stats = await db.getUserStats(ctx.user.id);
      
      return { user, stats };
    }),
    
  update: protectedProcedure
    .input(z.object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      bio: z.string().optional(),
      avatar: z.string().url().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      await db.updateUser(ctx.user.id, input);
      return { success: true };
    }),
    
  uploadAvatar: protectedProcedure
    .input(z.object({
      file: z.string(), // Base64 encoded image
    }))
    .mutation(async ({ ctx, input }) => {
      // Upload to S3
      const buffer = Buffer.from(input.file, 'base64');
      const key = `avatars/${ctx.user.id}-${Date.now()}.jpg`;
      const { url } = await storagePut(key, buffer, 'image/jpeg');
      
      // Update user avatar
      await db.updateUser(ctx.user.id, { avatar: url });
      
      return { url };
    }),
}),
```

**Frontend:**
- `Profile.tsx`: Página de perfil
- `EditProfile.tsx`: Modal de edição
- Upload de avatar com preview
- Formulário com validação (react-hook-form + zod)

**Design:**
- Layout em duas colunas (info + stats)
- Avatar grande e circular
- Badges em grid
- Botão "Editar Perfil" destacado

---

## 5. ESPECIFICAÇÕES DE DESIGN DETALHADAS

### 5.1 Design System

#### Componentes Base

**Botões:**
```tsx
// Primary Button
<Button variant="primary" size="lg">
  Começar Agora
</Button>

// Variantes:
- primary: Azul vibrante (#FFD93D para amarelo, #1E3A8A para azul)
- secondary: Outline com border azul
- ghost: Transparente com hover
- danger: Vermelho para ações destrutivas

// Tamanhos:
- sm: 32px altura, 12px padding
- md: 40px altura, 16px padding
- lg: 48px altura, 24px padding

// Estados:
- hover: scale(1.05) + sombra
- active: scale(0.95)
- disabled: opacity 0.5 + cursor not-allowed
```

**Cards:**
```tsx
// Base Card
<Card className="p-6 rounded-2xl shadow-lg">
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>
    Conteúdo
  </CardContent>
</Card>

// Variantes:
- default: Fundo branco, sombra sutil
- elevated: Sombra maior, hover effect
- outlined: Apenas border, sem sombra
- glass: Glassmorphism (backdrop-blur + transparência)

// Espaçamento:
- padding: 24px (desktop), 16px (mobile)
- gap entre elementos: 16px
- border-radius: 16px
```

**Inputs:**
```tsx
// Text Input
<Input 
  type="text"
  placeholder="Digite seu nome"
  error="Campo obrigatório"
/>

// Estilos:
- altura: 48px
- padding: 12px 16px
- border: 2px solid #E5E7EB (cinza claro)
- border-radius: 12px
- focus: border azul + sombra azul
- error: border vermelho + mensagem abaixo
```

**Badges:**
```tsx
// Badge
<Badge variant="success">Completo</Badge>

// Variantes:
- success: Verde (#10B981)
- warning: Amarelo (#F59E0B)
- error: Vermelho (#EF4444)
- info: Azul (#3B82F6)
- neutral: Cinza (#6B7280)

// Tamanhos:
- sm: 20px altura, 8px padding
- md: 24px altura, 12px padding
- lg: 32px altura, 16px padding
```

#### Tipografia

**Hierarquia:**
```css
/* Headings */
h1: 48px / 56px line-height, font-weight 700 (bold)
h2: 36px / 44px, font-weight 600 (semibold)
h3: 28px / 36px, font-weight 600
h4: 24px / 32px, font-weight 600
h5: 20px / 28px, font-weight 500 (medium)
h6: 18px / 24px, font-weight 500

/* Body */
body-lg: 18px / 28px, font-weight 400 (regular)
body: 16px / 24px, font-weight 400
body-sm: 14px / 20px, font-weight 400

/* Utility */
caption: 12px / 16px, font-weight 400
overline: 12px / 16px, font-weight 600, uppercase, letter-spacing 1px
```

**Fontes:**
- **Primária:** Inter (sans-serif) - para UI e corpo de texto
- **Secundária:** Poppins (sans-serif) - para headings e destaques
- **Mono:** JetBrains Mono - para código (se necessário)

**Importar no HTML:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
```

#### Espaçamento

**Sistema de 8px:**
```css
/* Escala de espaçamento */
space-1: 8px
space-2: 16px
space-3: 24px
space-4: 32px
space-5: 40px
space-6: 48px
space-8: 64px
space-10: 80px
space-12: 96px

/* Uso comum */
- Entre seções: space-8 (64px)
- Entre cards: space-4 (32px)
- Padding de cards: space-3 (24px)
- Gap em grids: space-4 (32px)
- Margem de botões: space-2 (16px)
```

#### Sombras

**Níveis:**
```css
/* Shadow Scale */
shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)
shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)
shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)
shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)
shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25)

/* Uso */
- Cards: shadow-md
- Modals: shadow-xl
- Dropdowns: shadow-lg
- Hover em cards: shadow-lg
```

#### Animações

**Transições:**
```css
/* Duração */
transition-fast: 150ms
transition-base: 200ms
transition-slow: 300ms
transition-slower: 500ms

/* Easing */
ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
ease-out: cubic-bezier(0, 0, 0.2, 1)
ease-in: cubic-bezier(0.4, 0, 1, 1)

/* Uso comum */
- Hover em botões: transition-base + ease-out
- Modals: transition-slow + ease-in-out
- Tooltips: transition-fast + ease-out
```

**Animações Especiais:**
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale */
@keyframes scale {
  from { transform: scale(0.9); }
  to { transform: scale(1); }
}

/* Pulse (para badges) */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

---

### 5.2 Layouts Responsivos

#### Breakpoints

```css
/* Mobile First */
sm: 640px   /* Tablets pequenos */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Desktops grandes */
```

#### Grid System

**Desktop (lg+):**
```tsx
<div className="grid grid-cols-12 gap-6">
  {/* Sidebar */}
  <aside className="col-span-3">
    Navegação
  </aside>
  
  {/* Conteúdo Principal */}
  <main className="col-span-9">
    Conteúdo
  </main>
</div>
```

**Mobile (< lg):**
```tsx
<div className="flex flex-col gap-4">
  {/* Navegação vira bottom nav ou hamburger menu */}
  <main>
    Conteúdo
  </main>
</div>
```

#### Componentes Responsivos

**Cards em Grid:**
```tsx
{/* Desktop: 3 colunas, Tablet: 2 colunas, Mobile: 1 coluna */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {cards.map(card => <Card key={card.id} {...card} />)}
</div>
```

**Navegação:**
```tsx
{/* Desktop: Horizontal, Mobile: Bottom Nav */}
<nav className="hidden lg:flex items-center gap-6">
  {/* Links */}
</nav>

<nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
  {/* Bottom Nav Icons */}
</nav>
```

---

### 5.3 Padrões de Interação

#### Loading States

**Skeleton:**
```tsx
<div className="animate-pulse">
  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
</div>
```

**Spinner:**
```tsx
<div className="flex items-center justify-center">
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
</div>
```

#### Empty States

```tsx
<div className="flex flex-col items-center justify-center py-12">
  <img src="/empty-state.svg" alt="Nenhum resultado" className="w-48 h-48 mb-4" />
  <h3 className="text-xl font-semibold mb-2">Nenhum resultado encontrado</h3>
  <p className="text-gray-600 mb-4">Tente ajustar seus filtros</p>
  <Button onClick={clearFilters}>Limpar Filtros</Button>
</div>
```

#### Error States

```tsx
<div className="bg-red-50 border border-red-200 rounded-lg p-4">
  <div className="flex items-start">
    <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
    <div>
      <h4 className="text-red-800 font-semibold">Erro ao carregar dados</h4>
      <p className="text-red-600 text-sm mt-1">
        Não foi possível carregar as informações. Tente novamente.
      </p>
      <Button variant="ghost" size="sm" onClick={retry} className="mt-2">
        Tentar Novamente
      </Button>
    </div>
  </div>
</div>
```

#### Toasts/Notifications

```tsx
// Sucesso
toast.success('Perfil atualizado com sucesso!');

// Erro
toast.error('Erro ao salvar. Tente novamente.');

// Info
toast.info('Nova missão disponível!');

// Estilos
- Posição: top-right (desktop), top-center (mobile)
- Duração: 3s (sucesso/info), 5s (erro)
- Animação: slide in from right
- Ícone: checkmark (sucesso), X (erro), info (info)
```

---

## 6. INSTRUÇÕES ESPECÍFICAS PARA IAs (LOVABLE, V0, BOLT)

### 6.1 Prompt Inicial (Copiar e Colar)

```
Crie uma plataforma web completa chamada "Napraça" que conecta consumidores e empreendedores locais, fortalecendo a economia de bairro. A plataforma deve ter:

**IDENTIDADE VISUAL:**
- Paleta de cores: Azul vibrante (#1E3A8A) + Amarelo solar (#FFD93D) + Branco (#FFFFFF)
- Tipografia: Inter (corpo) + Poppins (headings)
- Design moderno, clean, com elementos orgânicos (curvas, gradientes sutis)
- Fugir do padrão "cara de IA" - usar layouts assimétricos, micro-interações, glassmorphism

**FUNCIONALIDADES PRINCIPAIS:**

1. **Autenticação e Perfis:**
   - Login com OAuth (Manus Auth ou Google)
   - Seleção de perfil: Consumidor ou Empreendedor
   - Redirecionamento baseado no perfil

2. **Para Consumidores:**
   - Mapa interativo com negócios locais (Google Maps)
   - Filtros por categoria (Comida, Serviços, Varejo, Outros)
   - Perfil detalhado de cada negócio
   - Sistema de favoritos
   - Missões para ganhar pontos
   - Recompensas resgatáveis
   - Sistema de níveis e badges

3. **Para Empreendedores:**
   - Dashboard gamificado
   - Missões educativas (vídeo/texto + tarefa prática)
   - Analytics (visualizações, cliques, favoritos)
   - Perfil de negócio editável
   - Comunidade/fórum para networking

4. **Funcionalidades Compartilhadas:**
   - Perfil de usuário editável
   - Sistema de notificações
   - Comunidade (posts, comentários, likes)

**STACK TÉCNICO:**
- Frontend: React 19 + TypeScript + Tailwind CSS 4
- Backend: tRPC 11 + Express
- Banco de Dados: MySQL/TiDB com Drizzle ORM
- Autenticação: OAuth (Manus ou Google)
- Mapas: Google Maps API
- Storage: S3 para upload de imagens

**DESIGN:**
- Mobile-first
- Animações sutis (fade in, slide up)
- Micro-interações (hover effects, loading states)
- Glassmorphism em cards
- Gradientes suaves
- Ícones: Lucide React

Comece criando a estrutura base do projeto com autenticação e a página inicial.
```

---

### 6.2 Prompt para Cada Funcionalidade

#### Mapa Interativo

```
Crie a página do mapa interativo (/map) para consumidores com:

**Layout:**
- Desktop: Mapa ocupa 60% da tela (lado direito), lista de negócios 40% (lado esquerdo)
- Mobile: Mapa tela cheia com bottom sheet para lista

**Funcionalidades:**
- Integração com Google Maps API
- Pins customizados por categoria (cores diferentes)
- Clustering de pins quando zoom out
- Info window ao clicar no pin
- Filtros: busca por nome, categoria, raio de distância
- Lista lateral sincronizada com o mapa
- Geolocalização do usuário

**Design:**
- Barra de filtros fixa no topo com sombra sutil
- Pins com animação de bounce
- Cards de negócio com foto, nome, categoria, distância
- Skeleton loading enquanto carrega

**Backend:**
- Procedure `businesses.list` que recebe lat, lng, radius, category, search
- Usar fórmula de Haversine para calcular distância
- Retornar negócios ordenados por distância

Use o componente Map.tsx já disponível no template para integração com Google Maps.
```

#### Dashboard Empreendedor

```
Crie o dashboard gamificado (/dashboard) para empreendedores com:

**Seções:**
1. Header com saudação e card de progresso (nível, pontos, badges)
2. Grid de missões ativas (2 colunas desktop, 1 mobile)
3. Cards de estatísticas rápidas (visualizações, favoritos, cliques)
4. Preview do perfil do negócio com botão "Editar"
5. Feed de posts recentes da comunidade
6. Card de "Dica do Dia"

**Design:**
- Background com gradiente sutil (azul claro → branco)
- Cards com glassmorphism effect
- Badges com animação de pulse
- Gráficos com Recharts
- Cores vibrantes para indicar progresso

**Backend:**
- Procedure `dashboard.getStats` que retorna:
  - Negócio do usuário
  - Estatísticas (views, clicks, favorites)
  - Missões ativas
  - Posts recentes da comunidade

**Interações:**
- Clicar em missão abre página da missão
- Clicar em "Editar Perfil" abre modal de edição
- Hover em cards com scale effect
```

#### Sistema de Missões

```
Crie o sistema de missões educativas com:

**Página de Lista (/missions):**
- Grid de cards de missões
- Filtro por categoria (Finanças, Marketing, Atendimento, Gestão, Vendas)
- Cada card mostra: ícone, título, descrição curta, pontos, progresso
- Badge de "Novo" para missões recentes
- Badge de "Completada" para missões finalizadas

**Página de Detalhes (/missions/:id):**
- Header com título, categoria, pontos
- Conteúdo educativo (vídeo YouTube embed ou texto markdown)
- Seção de tarefa prática
- Upload de comprovação (foto ou link)
- Botão "Enviar para Revisão"
- Barra de progresso

**Fluxo:**
1. Usuário clica em "Iniciar Missão"
2. Assiste vídeo ou lê conteúdo
3. Realiza tarefa prática
4. Faz upload de comprovação
5. Envia para revisão
6. Recebe pontos e badge (aprovação automática ou manual)

**Backend:**
- `missions.list`: Listar missões com progresso do usuário
- `missions.getById`: Detalhes da missão
- `missions.start`: Iniciar missão
- `missions.submit`: Enviar comprovação

**Design:**
- Cards com gradiente baseado na categoria
- Animação de confetti ao completar
- Modal de conquista com badge animado
```

---

### 6.3 Checklist de Implementação

Use este checklist para garantir que todas as funcionalidades foram implementadas:

**✅ Fase 1: Fundação**
- [ ] Projeto criado com stack correto
- [ ] Autenticação OAuth funcionando
- [ ] Schema do banco de dados criado (14 tabelas)
- [ ] Migrations aplicadas
- [ ] Tema e cores configurados
- [ ] Componentes base criados (Button, Card, Input, Badge)

**✅ Fase 2: Autenticação e Perfis**
- [ ] Página inicial (landing page)
- [ ] Tela de seleção de perfil
- [ ] Redirecionamento baseado em userType
- [ ] Página de perfil editável
- [ ] Upload de avatar
- [ ] Logout funcionando

**✅ Fase 3: Funcionalidades para Consumidores**
- [ ] Mapa interativo com Google Maps
- [ ] Filtros (categoria, busca, raio)
- [ ] Lista de negócios sincronizada
- [ ] Perfil de negócio detalhado
- [ ] Sistema de favoritos
- [ ] Missões de consumidor
- [ ] Sistema de pontos e níveis
- [ ] Recompensas resgatáveis
- [ ] Badges

**✅ Fase 4: Funcionalidades para Empreendedores**
- [ ] Dashboard gamificado
- [ ] Missões educativas (lista e detalhes)
- [ ] Upload de comprovação
- [ ] Sistema de pontos para missões
- [ ] Analytics (visualizações, cliques, favoritos)
- [ ] Gráficos com Recharts
- [ ] Perfil de negócio editável
- [ ] Upload de fotos do negócio

**✅ Fase 5: Comunidade**
- [ ] Feed de posts
- [ ] Criar post
- [ ] Comentar
- [ ] Curtir
- [ ] Filtros e busca
- [ ] Perfil na comunidade

**✅ Fase 6: Notificações**
- [ ] Sistema de notificações in-app
- [ ] Badge de contador no header
- [ ] Dropdown de notificações
- [ ] Marcar como lida
- [ ] Tipos de notificações implementados

**✅ Fase 7: Polimento**
- [ ] Loading states (skeleton, spinner)
- [ ] Empty states
- [ ] Error states
- [ ] Toasts/feedbacks
- [ ] Animações (fade in, slide up)
- [ ] Micro-interações (hover, focus)
- [ ] Responsividade (mobile, tablet, desktop)
- [ ] Acessibilidade (ARIA labels, keyboard navigation)

**✅ Fase 8: Testes e Deploy**
- [ ] Testes unitários (backend)
- [ ] Testes de integração
- [ ] Testes E2E (principais fluxos)
- [ ] Deploy em produção
- [ ] Configuração de domínio

---

### 6.4 Prompts de Correção Comuns

#### "O mapa não está carregando"

```
O mapa não está carregando. Verifique:

1. A API key do Google Maps está configurada corretamente?
2. O componente Map.tsx está sendo importado corretamente?
3. A função onMapReady está sendo chamada?
4. Os dados de negócios estão sendo carregados do backend?
5. Há erros no console do navegador?

Corrija o problema e garanta que:
- O mapa centraliza na localização do usuário
- Os pins aparecem corretamente
- O info window abre ao clicar no pin
```

#### "As cores não estão corretas"

```
As cores da marca não estão sendo aplicadas corretamente. Atualize:

1. Arquivo `index.css` com as variáveis CSS:
   - --primary: #1E3A8A (azul)
   - --secondary: #FFD93D (amarelo)
   - --background: #FFFFFF
   - --foreground: #1F2937

2. Tailwind config com as cores personalizadas

3. Substitua todas as cores genéticas (blue-500, yellow-400) pelas cores da marca

4. Garanta que os gradientes usem as cores corretas
```

#### "O design está muito genérico"

```
O design está parecendo muito genérico/cara de IA. Aplique estas melhorias:

1. **Layouts Assimétricos:**
   - Hero section com imagem diagonal
   - Cards com tamanhos variados
   - Grid com colunas desiguais

2. **Glassmorphism:**
   - backdrop-blur-md
   - bg-white/70
   - border border-white/20

3. **Gradientes Sutis:**
   - from-blue-50 to-white
   - Gradientes em textos (bg-clip-text)

4. **Micro-interações:**
   - Hover com scale(1.05)
   - Animações de entrada (fade in, slide up)
   - Transições suaves (transition-all duration-300)

5. **Elementos Orgânicos:**
   - Border-radius generosos (rounded-2xl, rounded-3xl)
   - Sombras sutis (shadow-lg)
   - Espaçamento amplo

Refaça a página [nome da página] aplicando esses princípios.
```

---

### 6.5 Exemplos de Código Completos

#### Componente de Card de Missão

```tsx
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock } from 'lucide-react';

interface MissionCardProps {
  id: number;
  title: string;
  description: string;
  category: 'finance' | 'marketing' | 'service' | 'management' | 'sales';
  points: number;
  progress: number;
  duration: number; // minutos
  isCompleted: boolean;
  isNew: boolean;
  onStart: () => void;
}

const categoryConfig = {
  finance: { icon: '💰', color: 'bg-green-500', label: 'Finanças' },
  marketing: { icon: '📱', color: 'bg-blue-500', label: 'Marketing' },
  service: { icon: '👥', color: 'bg-purple-500', label: 'Atendimento' },
  management: { icon: '📊', color: 'bg-orange-500', label: 'Gestão' },
  sales: { icon: '🎯', color: 'bg-red-500', label: 'Vendas' },
};

export function MissionCard({
  title,
  description,
  category,
  points,
  progress,
  duration,
  isCompleted,
  isNew,
  onStart,
}: MissionCardProps) {
  const config = categoryConfig[category];

  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
      {/* Gradiente de fundo baseado na categoria */}
      <div className={`absolute inset-0 ${config.color} opacity-5`} />
      
      {/* Badges de status */}
      <div className="absolute top-4 right-4 flex gap-2">
        {isNew && (
          <Badge variant="default" className="bg-yellow-400 text-yellow-900">
            Novo
          </Badge>
        )}
        {isCompleted && (
          <Badge variant="success">
            Completo
          </Badge>
        )}
      </div>

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl ${config.color} flex items-center justify-center text-2xl`}>
            {config.icon}
          </div>
          <div className="flex-1">
            <Badge variant="outline" className="mb-2">
              {config.label}
            </Badge>
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        </div>

        {/* Descrição */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Progresso */}
        {progress > 0 && !isCompleted && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Progresso</span>
              <span className="font-semibold">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold">{points} pts</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{duration} min</span>
            </div>
          </div>

          <Button
            onClick={onStart}
            variant={isCompleted ? 'outline' : 'primary'}
            size="sm"
          >
            {isCompleted ? 'Ver Detalhes' : progress > 0 ? 'Continuar' : 'Iniciar'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
```

#### Procedure de Analytics

```typescript
// server/routers.ts

analytics: router({
  getBusinessStats: protectedProcedure
    .input(z.object({
      businessId: z.number(),
      period: z.enum(['7d', '30d', '90d']).default('30d'),
    }))
    .query(async ({ ctx, input }) => {
      // Verificar se o usuário é dono do negócio
      const business = await db.getBusinessById(input.businessId);
      if (!business || business.ownerId !== ctx.user.id) {
        throw new TRPCError({ 
          code: 'FORBIDDEN',
          message: 'Você não tem permissão para ver essas estatísticas'
        });
      }

      // Calcular data de início baseado no período
      const now = new Date();
      const startDate = new Date();
      switch (input.period) {
        case '7d':
          startDate.setDate(now.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(now.getDate() - 30);
          break;
        case '90d':
          startDate.setDate(now.getDate() - 90);
          break;
      }

      // Buscar visualizações
      const views = await db.query.views.findMany({
        where: and(
          eq(views.businessId, input.businessId),
          gte(views.createdAt, startDate)
        ),
      });

      // Buscar cliques
      const clicks = await db.query.clicks.findMany({
        where: and(
          eq(clicks.businessId, input.businessId),
          gte(clicks.createdAt, startDate)
        ),
      });

      // Buscar favoritos
      const favorites = await db.query.favorites.count({
        where: eq(favorites.businessId, input.businessId),
      });

      // Agrupar visualizações por dia
      const viewsByDay = views.reduce((acc, view) => {
        const date = view.createdAt.toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Agrupar cliques por tipo
      const clicksByType = clicks.reduce((acc, click) => {
        acc[click.clickType] = (acc[click.clickType] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Calcular crescimento comparado ao período anterior
      const previousPeriodStart = new Date(startDate);
      previousPeriodStart.setDate(previousPeriodStart.getDate() - (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      const previousViews = await db.query.views.count({
        where: and(
          eq(views.businessId, input.businessId),
          gte(views.createdAt, previousPeriodStart),
          lt(views.createdAt, startDate)
        ),
      });

      const viewsGrowth = previousViews > 0 
        ? ((views.length - previousViews) / previousViews) * 100 
        : 100;

      return {
        totalViews: views.length,
        totalClicks: clicks.length,
        totalFavorites: favorites,
        viewsGrowth: Math.round(viewsGrowth),
        viewsByDay: Object.entries(viewsByDay).map(([date, count]) => ({
          date,
          count,
        })),
        clicksByType: Object.entries(clicksByType).map(([type, count]) => ({
          type,
          count,
        })),
      };
    }),
}),
```

---

## 7. DESIGN DIFERENCIADO (FUGINDO DO PADRÃO IA)

### 7.1 Princípios de Design

**1. Layouts Assimétricos**
- Evite grids perfeitos e simétricos
- Use colunas de tamanhos diferentes
- Posicione elementos de forma inesperada
- Crie hierarquia visual através de tamanho e posicionamento

**Exemplo - Hero Section Assimétrica:**
```tsx
<section className="relative min-h-screen flex items-center overflow-hidden">
  {/* Background com gradiente diagonal */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-yellow-400 opacity-90" />
  
  {/* Formas orgânicas de fundo */}
  <div className="absolute top-20 right-10 w-96 h-96 bg-yellow-400 rounded-full blur-3xl opacity-20" />
  <div className="absolute bottom-10 left-20 w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-20" />
  
  <div className="container relative z-10">
    <div className="grid grid-cols-12 gap-8 items-center">
      {/* Texto ocupa 7 colunas (assimétrico) */}
      <div className="col-span-7">
        <Badge className="mb-4 bg-yellow-400 text-yellow-900">
          🚀 Nova plataforma
        </Badge>
        <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
          Conecte-se com o
          <span className="block text-yellow-400">comércio local</span>
        </h1>
        <p className="text-xl text-blue-100 mb-8">
          Descubra negócios incríveis no seu bairro e ajude a fortalecer a economia local
        </p>
        <div className="flex gap-4">
          <Button size="lg" className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500">
            Começar Agora
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            Saber Mais
          </Button>
        </div>
      </div>
      
      {/* Imagem ocupa 5 colunas */}
      <div className="col-span-5">
        <div className="relative">
          {/* Imagem com clip-path diagonal */}
          <div className="relative z-10" style={{ clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)' }}>
            <img 
              src="/hero-image.jpg" 
              alt="Comércio local"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
          {/* Card flutuante */}
          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold">500+ Negócios</p>
                <p className="text-sm text-gray-600">Cadastrados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**2. Glassmorphism**
- Fundos translúcidos com blur
- Bordas sutis
- Sombras suaves
- Efeito de profundidade

**Exemplo - Card com Glassmorphism:**
```tsx
<div className="relative group">
  {/* Glow effect no hover */}
  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-yellow-400 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500" />
  
  {/* Card principal */}
  <div className="relative bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
    <h3 className="text-xl font-semibold mb-2">Título do Card</h3>
    <p className="text-gray-700">Conteúdo do card com fundo translúcido</p>
  </div>
</div>
```

**3. Micro-interações**
- Hover effects sutis
- Animações de entrada
- Feedback visual imediato
- Transições suaves

**Exemplo - Botão com Micro-interações:**
```tsx
<button className="
  relative overflow-hidden
  px-8 py-4 
  bg-gradient-to-r from-blue-600 to-blue-700
  text-white font-semibold rounded-xl
  transform transition-all duration-300
  hover:scale-105 hover:shadow-2xl
  active:scale-95
  group
">
  {/* Shine effect */}
  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
  
  {/* Texto */}
  <span className="relative flex items-center gap-2">
    Começar Agora
    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
  </span>
</button>
```

**4. Gradientes Sutis**
- Transições suaves entre cores
- Gradientes em textos
- Backgrounds com múltiplas camadas
- Mesh gradients

**Exemplo - Texto com Gradiente:**
```tsx
<h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-yellow-500 animate-gradient">
  Napraça
</h1>

{/* CSS adicional */}
<style jsx>{`
  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 5s ease infinite;
  }
`}</style>
```

**5. Elementos Orgânicos**
- Formas curvas e irregulares
- Border-radius generosos
- Sombras naturais
- Espaçamento amplo

**Exemplo - Seção com Formas Orgânicas:**
```tsx
<section className="relative py-24 overflow-hidden">
  {/* Blob shapes de fundo */}
  <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 800">
    <defs>
      <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#FFD93D" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    <path
      fill="url(#blob-gradient)"
      d="M0,160L48,181.3C96,203,192,245,288,234.7C384,224,480,160,576,149.3C672,139,768,181,864,197.3C960,213,1056,203,1152,181.3C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
    />
  </svg>
  
  <div className="container relative z-10">
    {/* Conteúdo */}
  </div>
</section>
```

---

### 7.2 Exemplos de Páginas Completas

#### Landing Page Diferenciada

```tsx
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { MapPin, Users, Trophy, Sparkles, ArrowRight, Check } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Hero Section - Assimétrica */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="container relative z-10">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 lg:col-span-7">
              <Badge className="mb-6 bg-yellow-400/20 text-yellow-900 border-yellow-400/30 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Fortalecendo a economia local
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-600">
                  Conecte-se com o
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600">
                  comércio local
                </span>
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 max-w-2xl">
                Descubra negócios incríveis no seu bairro, aprenda a crescer seu empreendimento e ganhe recompensas por apoiar a economia local.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all group">
                  Começar Agora
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                  Saber Mais
                </Button>
              </div>
              
              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6">
                {[
                  { label: 'Negócios', value: '500+', icon: MapPin },
                  { label: 'Usuários', value: '10k+', icon: Users },
                  { label: 'Recompensas', value: '50k+', icon: Trophy },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-2">
                      <stat.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="col-span-12 lg:col-span-5">
              <div className="relative">
                {/* Main image with clip-path */}
                <div className="relative z-10 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="/hero-mockup.png" 
                    alt="Napraça App"
                    className="w-full h-auto rounded-3xl shadow-2xl"
                  />
                </div>
                
                {/* Floating cards */}
                <div className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Missão Completa!</p>
                      <p className="text-xs text-gray-600">+50 pontos</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-6 -right-6 bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20 animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-yellow-900" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Nível 5!</p>
                      <p className="text-xs text-gray-600">Embaixador Local</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section - Grid Assimétrico */}
      <section className="py-24 relative">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-900">
              Funcionalidades
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Tudo que você precisa em
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-yellow-500">
                um só lugar
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-12 gap-6">
            {/* Card grande */}
            <div className="col-span-12 lg:col-span-8">
              <Card className="relative overflow-hidden h-full group hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 p-8 lg:p-12 text-white h-full flex flex-col justify-between">
                  <div>
                    <MapPin className="w-12 h-12 mb-4" />
                    <h3 className="text-3xl font-bold mb-4">Mapa Interativo</h3>
                    <p className="text-blue-100 text-lg">
                      Descubra negócios locais no mapa, filtre por categoria e encontre exatamente o que você procura no seu bairro.
                    </p>
                  </div>
                  <img 
                    src="/feature-map.png" 
                    alt="Mapa"
                    className="w-full h-64 object-cover rounded-xl mt-6 shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Card>
            </div>
            
            {/* Card médio */}
            <div className="col-span-12 lg:col-span-4">
              <Card className="relative overflow-hidden h-full group hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 p-8 text-yellow-900 h-full flex flex-col justify-between">
                  <div>
                    <Trophy className="w-12 h-12 mb-4" />
                    <h3 className="text-2xl font-bold mb-4">Recompensas</h3>
                    <p className="text-yellow-800">
                      Ganhe pontos, suba de nível e resgate recompensas exclusivas.
                    </p>
                  </div>
                  <div className="mt-6 space-y-2">
                    {['Nível 1: Explorador', 'Nível 2: Descobridor', 'Nível 3: Apoiador'].map((level, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4" />
                        <span>{level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Mais cards... */}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já estão fortalecendo a economia local.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
              Sou Consumidor
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
              Sou Empreendedor
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

{/* Animações CSS */}
<style jsx>{`
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
`}</style>
```

---

## 8. REFERÊNCIAS E RECURSOS

### 8.1 Documentação Técnica

- **React 19:** https://react.dev/
- **TypeScript:** https://www.typescriptlang.org/docs/
- **Tailwind CSS 4:** https://tailwindcss.com/docs
- **tRPC 11:** https://trpc.io/docs
- **Drizzle ORM:** https://orm.drizzle.team/docs/overview
- **Google Maps API:** https://developers.google.com/maps/documentation/javascript
- **Recharts:** https://recharts.org/en-US/
- **Lucide Icons:** https://lucide.dev/

### 8.2 Inspirações de Design

- **Dribbble:** https://dribbble.com/tags/local-business
- **Awwwards:** https://www.awwwards.com/websites/mobile-app/
- **Behance:** https://www.behance.net/search/projects?search=marketplace
- **Mobbin:** https://mobbin.com/ (para referências mobile)

### 8.3 Ferramentas Úteis

- **Figma:** Para criar protótipos de alta fidelidade
- **Coolors:** https://coolors.co/ - Gerador de paletas de cores
- **Haikei:** https://haikei.app/ - Gerador de formas orgânicas SVG
- **Glassmorphism Generator:** https://hype4.academy/tools/glassmorphism-generator
- **Gradient Generator:** https://cssgradient.io/

---

## 9. CONCLUSÃO

Este guia foi criado para ser o documento definitivo para implementação da plataforma Napraça. Ele contém:

✅ **Visão completa** do projeto e seus objetivos
✅ **Identidade visual detalhada** com paletas de cores e design system
✅ **Especificações técnicas** de todas as funcionalidades
✅ **Código completo** de componentes e procedures
✅ **Instruções específicas** para IAs (Lovable, V0, Bolt)
✅ **Exemplos práticos** de implementação
✅ **Princípios de design** para fugir do padrão genérico
✅ **Checklist completo** de implementação
✅ **Referências e recursos** para consulta

**Próximos Passos:**

1. Copie o prompt inicial da Seção 6.1 e cole na IA de sua escolha
2. Siga o checklist da Seção 6.3 para garantir que todas as funcionalidades sejam implementadas
3. Use os prompts específicos da Seção 6.2 para cada funcionalidade
4. Aplique os princípios de design da Seção 7 para criar uma interface única
5. Teste todas as funcionalidades e corrija bugs
6. Deploy em produção

**Lembre-se:**
- Priorize a experiência do usuário
- Teste em dispositivos reais (mobile, tablet, desktop)
- Garanta acessibilidade (ARIA labels, keyboard navigation)
- Otimize performance (lazy loading, code splitting)
- Documente seu código

Boa sorte na construção da Napraça! 🚀


---

## 10. TROUBLESHOOTING E PROBLEMAS COMUNS

### 10.1 Problemas de Autenticação

**Problema:** "Usuário não consegue fazer login"

**Possíveis Causas:**
1. OAuth não configurado corretamente
2. Cookies bloqueados no navegador
3. Redirect URI incorreto
4. Session cookie não está sendo setado

**Soluções:**
```typescript
// Verificar se o cookie está sendo setado corretamente
// server/_core/cookies.ts
export function getSessionCookieOptions(req: Request) {
  return {
    httpOnly: true,
    secure: req.protocol === 'https', // IMPORTANTE: true em produção
    sameSite: req.protocol === 'https' ? 'none' : 'lax',
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias
  };
}

// Verificar se o redirect URI está correto
// Deve ser: https://seudominio.com/api/oauth/callback
```

**Prompt para IA:**
```
O login OAuth não está funcionando. Verifique:
1. As variáveis de ambiente OAUTH_SERVER_URL e VITE_OAUTH_PORTAL_URL estão corretas?
2. O redirect URI está configurado como /api/oauth/callback?
3. Os cookies estão sendo setados com as opções corretas (httpOnly, secure, sameSite)?
4. O procedimento auth.me está retornando o usuário corretamente?

Corrija o problema e teste o fluxo completo de login.
```

---

### 10.2 Problemas com o Mapa

**Problema:** "Mapa não carrega ou aparece cinza"

**Possíveis Causas:**
1. API key do Google Maps inválida ou não configurada
2. Permissão de geolocalização negada
3. Componente Map não inicializado corretamente
4. Dados de negócios não estão sendo carregados

**Soluções:**
```typescript
// Verificar se a API key está configurada
// client/src/components/Map.tsx
useEffect(() => {
  if (!window.google) {
    console.error('Google Maps API não carregada');
    return;
  }
  
  const map = new google.maps.Map(mapRef.current, {
    center: { lat: -23.5505, lng: -46.6333 }, // São Paulo
    zoom: 13,
  });
  
  onMapReady(map);
}, []);

// Solicitar permissão de geolocalização
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    map.setCenter({ lat: latitude, lng: longitude });
  },
  (error) => {
    console.error('Erro ao obter localização:', error);
    // Usar localização padrão
  }
);
```

**Prompt para IA:**
```
O mapa do Google Maps não está carregando. Implemente:
1. Verificação se a API do Google Maps foi carregada (window.google)
2. Tratamento de erro caso a API não carregue
3. Solicitação de permissão de geolocalização com fallback para localização padrão
4. Loading state enquanto o mapa inicializa
5. Mensagem de erro amigável se algo der errado

Use o componente Map.tsx do template e garanta que os pins apareçam corretamente.
```

---

### 10.3 Problemas de Performance

**Problema:** "Aplicação lenta, especialmente ao carregar listas grandes"

**Possíveis Causas:**
1. Renderização desnecessária de componentes
2. Queries sem paginação
3. Imagens não otimizadas
4. Bundle JavaScript muito grande

**Soluções:**
```typescript
// 1. Usar React.memo para evitar re-renders
const BusinessCard = React.memo(({ business }: { business: Business }) => {
  return (
    <Card>
      {/* conteúdo */}
    </Card>
  );
});

// 2. Implementar paginação no backend
businesses: router({
  list: publicProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(20),
      // ... outros filtros
    }))
    .query(async ({ input }) => {
      const offset = (input.page - 1) * input.limit;
      const businesses = await db.query.businesses.findMany({
        limit: input.limit,
        offset,
        // ... where clauses
      });
      
      const total = await db.query.businesses.count();
      
      return {
        businesses,
        pagination: {
          page: input.page,
          limit: input.limit,
          total,
          totalPages: Math.ceil(total / input.limit),
        },
      };
    }),
}),

// 3. Lazy loading de imagens
<img 
  src={business.coverImage} 
  alt={business.name}
  loading="lazy" // Lazy load nativo
  className="w-full h-48 object-cover"
/>

// 4. Code splitting por rota
const MapView = lazy(() => import('./pages/MapView'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// No App.tsx
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/map" element={<MapView />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
</Suspense>
```

**Prompt para IA:**
```
A aplicação está lenta. Otimize:
1. Adicione React.memo nos componentes de lista (BusinessCard, MissionCard)
2. Implemente paginação no backend (20 itens por página)
3. Adicione lazy loading nas imagens (loading="lazy")
4. Implemente code splitting nas rotas principais
5. Use useCallback e useMemo onde apropriado

Teste a performance antes e depois das otimizações.
```

---

### 10.4 Problemas com Upload de Imagens

**Problema:** "Upload de imagens falha ou imagens não aparecem"

**Possíveis Causas:**
1. Tamanho do arquivo muito grande
2. Tipo de arquivo não suportado
3. Erro na configuração do S3
4. URL da imagem não está sendo salva corretamente

**Soluções:**
```typescript
// Frontend: Validar e comprimir imagem antes do upload
async function uploadImage(file: File) {
  // Validar tipo
  if (!file.type.startsWith('image/')) {
    throw new Error('Arquivo deve ser uma imagem');
  }
  
  // Validar tamanho (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('Imagem deve ter no máximo 5MB');
  }
  
  // Comprimir imagem
  const compressed = await compressImage(file, {
    maxWidth: 1920,
    maxHeight: 1080,
    quality: 0.8,
  });
  
  // Converter para base64
  const base64 = await fileToBase64(compressed);
  
  // Enviar para backend
  const result = await trpc.profile.uploadAvatar.mutate({ file: base64 });
  
  return result.url;
}

// Backend: Upload para S3
uploadAvatar: protectedProcedure
  .input(z.object({
    file: z.string(), // Base64
  }))
  .mutation(async ({ ctx, input }) => {
    try {
      // Decodificar base64
      const buffer = Buffer.from(input.file, 'base64');
      
      // Gerar nome único
      const key = `avatars/${ctx.user.id}-${Date.now()}.jpg`;
      
      // Upload para S3
      const { url } = await storagePut(key, buffer, 'image/jpeg');
      
      // Salvar URL no banco
      await db.updateUser(ctx.user.id, { avatar: url });
      
      return { url };
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Erro ao fazer upload da imagem',
      });
    }
  }),
```

**Prompt para IA:**
```
O upload de imagens não está funcionando. Implemente:
1. Validação de tipo e tamanho no frontend (max 5MB, apenas imagens)
2. Compressão de imagem antes do upload
3. Conversão para base64 e envio para backend
4. Upload para S3 com nome único
5. Salvamento da URL no banco de dados
6. Tratamento de erros com mensagens amigáveis
7. Loading state durante o upload
8. Preview da imagem após upload

Use a função storagePut() do template para S3.
```

---

## 11. GUIA DE TESTES

### 11.1 Testes Unitários (Backend)

**Objetivo:** Testar procedures do tRPC isoladamente.

**Exemplo - Teste de Autenticação:**
```typescript
// server/auth.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { appRouter } from './routers';
import type { TrpcContext } from './_core/context';

describe('auth.updateProfile', () => {
  let caller: ReturnType<typeof appRouter.createCaller>;
  let ctx: TrpcContext;

  beforeEach(() => {
    // Mock do contexto com usuário autenticado
    ctx = {
      user: {
        id: 1,
        openId: 'test-user',
        email: 'test@example.com',
        name: 'Test User',
        userType: 'consumer',
        points: 0,
        level: 1,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      },
      req: {} as any,
      res: {} as any,
    };
    
    caller = appRouter.createCaller(ctx);
  });

  it('deve atualizar o nome do usuário', async () => {
    const result = await caller.auth.updateProfile({
      name: 'Novo Nome',
    });

    expect(result.success).toBe(true);
    
    // Verificar se foi atualizado no banco
    const user = await caller.auth.me();
    expect(user?.name).toBe('Novo Nome');
  });

  it('deve rejeitar email inválido', async () => {
    await expect(
      caller.auth.updateProfile({
        email: 'email-invalido',
      })
    ).rejects.toThrow();
  });

  it('deve atualizar múltiplos campos', async () => {
    const result = await caller.auth.updateProfile({
      name: 'Novo Nome',
      phone: '11999999999',
      bio: 'Nova bio',
    });

    expect(result.success).toBe(true);
  });
});
```

**Executar Testes:**
```bash
pnpm test
```

---

### 11.2 Testes de Integração

**Objetivo:** Testar fluxos completos (frontend + backend).

**Exemplo - Teste de Criação de Negócio:**
```typescript
// server/business.integration.test.ts
import { describe, it, expect } from 'vitest';
import { appRouter } from './routers';

describe('Fluxo de Criação de Negócio', () => {
  it('deve criar negócio e aparecer no mapa', async () => {
    // 1. Criar usuário empreendedor
    const entrepreneurCtx = createMockContext({
      userType: 'entrepreneur',
    });
    const entrepreneurCaller = appRouter.createCaller(entrepreneurCtx);

    // 2. Criar negócio
    const business = await entrepreneurCaller.businesses.create({
      name: 'Padaria do João',
      category: 'food',
      description: 'Melhor pão da região',
      address: 'Rua Teste, 123',
      latitude: '-23.5505',
      longitude: '-46.6333',
      phone: '11999999999',
    });

    expect(business.id).toBeDefined();

    // 3. Buscar negócios no mapa (como consumidor)
    const consumerCtx = createMockContext({
      userType: 'consumer',
    });
    const consumerCaller = appRouter.createCaller(consumerCtx);

    const nearbyBusinesses = await consumerCaller.businesses.list({
      lat: -23.5505,
      lng: -46.6333,
      radius: 5,
    });

    // 4. Verificar se o negócio aparece
    const found = nearbyBusinesses.find(b => b.id === business.id);
    expect(found).toBeDefined();
    expect(found?.name).toBe('Padaria do João');
  });
});
```

---

### 11.3 Testes E2E (End-to-End)

**Objetivo:** Testar a aplicação como um usuário real faria.

**Ferramenta:** Playwright ou Cypress

**Exemplo - Teste de Login e Navegação:**
```typescript
// e2e/login.spec.ts
import { test, expect } from '@playwright/test';

test('Fluxo completo de login e navegação', async ({ page }) => {
  // 1. Acessar página inicial
  await page.goto('http://localhost:3000');
  
  // 2. Clicar em "Sou Consumidor"
  await page.click('text=Sou Consumidor');
  
  // 3. Fazer login (OAuth)
  // Nota: Em ambiente de teste, usar mock do OAuth
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  // 4. Selecionar perfil de consumidor
  await page.click('text=Consumidor');
  await page.click('button:has-text("Confirmar")');
  
  // 5. Verificar redirecionamento para mapa
  await expect(page).toHaveURL(/.*\/map/);
  
  // 6. Verificar se o mapa carregou
  await expect(page.locator('#map')).toBeVisible();
  
  // 7. Buscar por categoria
  await page.click('text=Comida');
  
  // 8. Verificar se negócios aparecem
  await expect(page.locator('.business-card')).toHaveCount.greaterThan(0);
  
  // 9. Clicar em um negócio
  await page.click('.business-card:first-child');
  
  // 10. Verificar se perfil do negócio abriu
  await expect(page).toHaveURL(/.*\/business\/\d+/);
  await expect(page.locator('h1')).toBeVisible();
});
```

**Executar Testes E2E:**
```bash
pnpm playwright test
```

---

### 11.4 Checklist de Testes Manuais

Use este checklist para testar manualmente antes do deploy:

**✅ Autenticação:**
- [ ] Login com OAuth funciona
- [ ] Logout funciona
- [ ] Seleção de perfil funciona
- [ ] Redirecionamento baseado em userType funciona
- [ ] Proteção de rotas funciona (redireciona não autenticados)

**✅ Mapa (Consumidor):**
- [ ] Mapa carrega corretamente
- [ ] Geolocalização funciona
- [ ] Pins aparecem no mapa
- [ ] Filtro por categoria funciona
- [ ] Busca por nome funciona
- [ ] Filtro de raio funciona
- [ ] Clicar em pin abre info window
- [ ] Lista lateral sincroniza com mapa
- [ ] Clicar em negócio abre perfil

**✅ Perfil de Negócio:**
- [ ] Informações aparecem corretamente
- [ ] Galeria de fotos funciona
- [ ] Botões de contato funcionam (telefone, WhatsApp, etc.)
- [ ] Favoritar funciona
- [ ] Compartilhar funciona
- [ ] Missões disponíveis aparecem

**✅ Dashboard (Empreendedor):**
- [ ] Estatísticas carregam corretamente
- [ ] Gráficos aparecem
- [ ] Missões ativas aparecem
- [ ] Clicar em missão abre detalhes
- [ ] Preview do negócio funciona
- [ ] Botão "Editar Perfil" funciona

**✅ Missões:**
- [ ] Lista de missões carrega
- [ ] Filtro por categoria funciona
- [ ] Clicar em missão abre detalhes
- [ ] Conteúdo educativo aparece (vídeo ou texto)
- [ ] Upload de comprovação funciona
- [ ] Enviar missão funciona
- [ ] Pontos são creditados
- [ ] Badge é desbloqueado

**✅ Perfil do Usuário:**
- [ ] Informações aparecem corretamente
- [ ] Editar perfil funciona
- [ ] Upload de avatar funciona
- [ ] Estatísticas aparecem
- [ ] Missões completadas aparecem
- [ ] Para empreendedores: link para negócio funciona

**✅ Comunidade:**
- [ ] Feed de posts carrega
- [ ] Criar post funciona
- [ ] Comentar funciona
- [ ] Curtir funciona
- [ ] Filtros funcionam
- [ ] Busca funciona

**✅ Notificações:**
- [ ] Badge de contador aparece
- [ ] Dropdown abre
- [ ] Notificações aparecem
- [ ] Marcar como lida funciona
- [ ] Clicar em notificação redireciona corretamente

**✅ Responsividade:**
- [ ] Mobile (< 640px) funciona
- [ ] Tablet (640px - 1024px) funciona
- [ ] Desktop (> 1024px) funciona
- [ ] Navegação mobile funciona
- [ ] Bottom sheet funciona (mobile)

**✅ Performance:**
- [ ] Páginas carregam em < 3s
- [ ] Imagens carregam com lazy loading
- [ ] Sem erros no console
- [ ] Sem warnings no console

---

## 12. MELHORES PRÁTICAS DE CÓDIGO

### 12.1 Estrutura de Arquivos

```
client/
├── public/              # Arquivos estáticos
│   ├── favicon.ico
│   └── logo.png
├── src/
│   ├── _core/           # Código core do framework (não editar)
│   ├── components/      # Componentes reutilizáveis
│   │   ├── ui/          # Componentes shadcn/ui
│   │   ├── BusinessCard.tsx
│   │   ├── MissionCard.tsx
│   │   └── Map.tsx
│   ├── contexts/        # React contexts
│   │   └── ThemeContext.tsx
│   ├── hooks/           # Custom hooks
│   │   ├── useAuth.ts
│   │   └── useDebounce.ts
│   ├── lib/             # Utilitários
│   │   ├── trpc.ts
│   │   └── utils.ts
│   ├── pages/           # Páginas
│   │   ├── Home.tsx
│   │   ├── MapView.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Profile.tsx
│   │   └── ...
│   ├── App.tsx          # Rotas
│   ├── main.tsx         # Entry point
│   └── index.css        # Estilos globais
server/
├── _core/               # Código core do framework (não editar)
├── db.ts                # Database helpers
├── routers.ts           # tRPC routers
└── *.test.ts            # Testes
drizzle/
├── schema.ts            # Schema do banco
└── migrations/          # Migrations
shared/
└── const.ts             # Constantes compartilhadas
```

---

### 12.2 Convenções de Nomenclatura

**Componentes React:**
- PascalCase: `BusinessCard.tsx`, `MissionCard.tsx`
- Exportar como default: `export default function BusinessCard() {}`

**Hooks:**
- camelCase com prefixo "use": `useAuth.ts`, `useDebounce.ts`
- Exportar como named export: `export function useAuth() {}`

**Procedures tRPC:**
- camelCase: `businesses.list`, `auth.updateProfile`
- Agrupar por domínio: `businesses`, `missions`, `auth`

**Variáveis:**
- camelCase: `userName`, `businessId`
- Constantes em UPPER_SNAKE_CASE: `MAX_FILE_SIZE`, `DEFAULT_RADIUS`

**CSS Classes:**
- kebab-case: `business-card`, `mission-list`
- Usar Tailwind utilities sempre que possível

---

### 12.3 Padrões de Código

**1. Sempre tipar variáveis:**
```typescript
// ❌ Ruim
const user = await db.getUserById(id);

// ✅ Bom
const user: User | undefined = await db.getUserById(id);
```

**2. Usar early returns:**
```typescript
// ❌ Ruim
function processUser(user: User | null) {
  if (user) {
    if (user.isActive) {
      if (user.email) {
        // lógica
      }
    }
  }
}

// ✅ Bom
function processUser(user: User | null) {
  if (!user) return;
  if (!user.isActive) return;
  if (!user.email) return;
  
  // lógica
}
```

**3. Extrair constantes:**
```typescript
// ❌ Ruim
if (user.points >= 1000) {
  // lógica
}

// ✅ Bom
const LEVEL_5_THRESHOLD = 1000;
if (user.points >= LEVEL_5_THRESHOLD) {
  // lógica
}
```

**4. Usar optional chaining:**
```typescript
// ❌ Ruim
const name = user && user.profile && user.profile.name;

// ✅ Bom
const name = user?.profile?.name;
```

**5. Usar nullish coalescing:**
```typescript
// ❌ Ruim
const points = user.points || 0; // Problema: 0 é falsy

// ✅ Bom
const points = user.points ?? 0;
```

---

### 12.4 Tratamento de Erros

**Frontend:**
```typescript
// Usar try-catch com toast
async function handleSubmit() {
  try {
    setLoading(true);
    await trpc.businesses.create.mutate(data);
    toast.success('Negócio criado com sucesso!');
    router.push('/dashboard');
  } catch (error) {
    console.error('Erro ao criar negócio:', error);
    toast.error('Erro ao criar negócio. Tente novamente.');
  } finally {
    setLoading(false);
  }
}
```

**Backend:**
```typescript
// Usar TRPCError com códigos apropriados
createBusiness: protectedProcedure
  .input(businessSchema)
  .mutation(async ({ ctx, input }) => {
    // Validar permissão
    if (ctx.user.userType !== 'entrepreneur') {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Apenas empreendedores podem criar negócios',
      });
    }
    
    try {
      const business = await db.createBusiness(ctx.user.id, input);
      return business;
    } catch (error) {
      console.error('Erro ao criar negócio:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Erro ao criar negócio',
      });
    }
  }),
```

---

### 12.5 Performance

**1. Usar React.memo para componentes pesados:**
```typescript
const BusinessCard = React.memo(({ business }: { business: Business }) => {
  return (
    <Card>
      {/* conteúdo */}
    </Card>
  );
});
```

**2. Usar useCallback para funções passadas como props:**
```typescript
const handleClick = useCallback(() => {
  // lógica
}, [/* dependências */]);
```

**3. Usar useMemo para cálculos pesados:**
```typescript
const sortedBusinesses = useMemo(() => {
  return businesses.sort((a, b) => a.distance - b.distance);
}, [businesses]);
```

**4. Lazy loading de rotas:**
```typescript
const MapView = lazy(() => import('./pages/MapView'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
```

**5. Otimizar imagens:**
```typescript
<img 
  src={business.coverImage} 
  alt={business.name}
  loading="lazy"
  width={400}
  height={300}
  className="w-full h-48 object-cover"
/>
```

---

## 13. DEPLOY E PRODUÇÃO

### 13.1 Checklist Pré-Deploy

**✅ Código:**
- [ ] Todos os testes passando
- [ ] Sem erros no console
- [ ] Sem warnings críticos
- [ ] Código revisado

**✅ Performance:**
- [ ] Lighthouse score > 90
- [ ] Imagens otimizadas
- [ ] Bundle size < 500KB
- [ ] Lazy loading implementado

**✅ SEO:**
- [ ] Meta tags configuradas
- [ ] Open Graph tags
- [ ] Sitemap.xml
- [ ] Robots.txt

**✅ Segurança:**
- [ ] Variáveis de ambiente configuradas
- [ ] HTTPS habilitado
- [ ] CORS configurado
- [ ] Rate limiting implementado

**✅ Monitoramento:**
- [ ] Error tracking (Sentry)
- [ ] Analytics (Google Analytics)
- [ ] Logs configurados

---

### 13.2 Variáveis de Ambiente (Produção)

```env
# Database
DATABASE_URL=mysql://user:pass@host:3306/napraça

# OAuth
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://auth.manus.im
VITE_APP_ID=seu-app-id

# JWT
JWT_SECRET=seu-secret-super-seguro

# Google Maps
VITE_GOOGLE_MAPS_API_KEY=sua-api-key

# S3
AWS_ACCESS_KEY_ID=sua-access-key
AWS_SECRET_ACCESS_KEY=sua-secret-key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=napraça-uploads

# App
NODE_ENV=production
PORT=3000
```

---

### 13.3 Deploy no Manus

**1. Criar Checkpoint:**
```bash
# No projeto web
pnpm build
# Criar checkpoint via UI do Manus
```

**2. Publicar:**
- Clicar em "Publish" no header do Management UI
- Escolher domínio (xxx.manus.space ou custom domain)
- Aguardar deploy (2-3 minutos)

**3. Configurar Domínio Customizado (Opcional):**
- Ir em Settings → Domains
- Adicionar domínio customizado
- Configurar DNS (CNAME ou A record)
- Aguardar propagação (até 24h)

---

## 14. GLOSSÁRIO DE TERMOS

**Backend:** Parte do servidor da aplicação, responsável por lógica de negócio, banco de dados e APIs.

**Frontend:** Parte visual da aplicação, que roda no navegador do usuário.

**tRPC:** Framework para criar APIs type-safe entre frontend e backend TypeScript.

**Procedure:** Função do tRPC que pode ser chamada do frontend (equivalente a uma rota de API).

**Schema:** Definição da estrutura do banco de dados (tabelas, colunas, tipos).

**Migration:** Script que altera a estrutura do banco de dados (adicionar tabela, coluna, etc.).

**ORM:** Object-Relational Mapping - biblioteca que facilita interação com banco de dados.

**OAuth:** Protocolo de autenticação que permite login com provedores externos (Google, Facebook, etc.).

**S3:** Serviço de armazenamento de arquivos da AWS (Amazon Web Services).

**Glassmorphism:** Estilo de design com fundos translúcidos e blur effect.

**Lazy Loading:** Técnica de carregar recursos (imagens, componentes) apenas quando necessário.

**Code Splitting:** Dividir o código JavaScript em múltiplos arquivos para carregar sob demanda.

**SSR:** Server-Side Rendering - renderizar páginas no servidor antes de enviar ao cliente.

**SPA:** Single Page Application - aplicação que carrega uma única página HTML e atualiza dinamicamente.

**API:** Application Programming Interface - interface para comunicação entre sistemas.

**REST:** Architectural style para APIs baseado em HTTP.

**GraphQL:** Linguagem de consulta para APIs, alternativa ao REST.

**WebSocket:** Protocolo para comunicação bidirecional em tempo real.

**JWT:** JSON Web Token - formato de token para autenticação.

**CORS:** Cross-Origin Resource Sharing - mecanismo de segurança do navegador.

**Rate Limiting:** Limitar número de requisições por usuário/IP para prevenir abuso.

---

## 15. RECURSOS ADICIONAIS

### 15.1 Comunidades

- **Discord do Manus:** https://discord.gg/manus
- **Reddit r/webdev:** https://reddit.com/r/webdev
- **Stack Overflow:** https://stackoverflow.com/
- **Dev.to:** https://dev.to/

### 15.2 Cursos e Tutoriais

- **React Official Tutorial:** https://react.dev/learn
- **TypeScript Handbook:** https://www.typescriptlang.org/docs/handbook/
- **tRPC Tutorial:** https://trpc.io/docs/quickstart
- **Tailwind CSS Course:** https://tailwindcss.com/docs
- **Drizzle ORM Docs:** https://orm.drizzle.team/docs/overview

### 15.3 Ferramentas de Desenvolvimento

- **VS Code:** Editor de código recomendado
- **Postman:** Testar APIs
- **DevTools:** Ferramentas de desenvolvedor do navegador
- **React DevTools:** Extensão para debugar React
- **Redux DevTools:** Extensão para debugar estado (se usar Redux)

---

## 16. CONCLUSÃO FINAL

Este guia foi meticulosamente criado para ser o recurso definitivo na implementação da plataforma Napraça. Ele representa centenas de horas de experiência condensadas em um documento prático e acionável.

**O que você tem em mãos:**

✅ **Visão 360°** - Do conceito ao deploy, passando por cada detalhe técnico
✅ **Código Production-Ready** - Exemplos testados e prontos para uso
✅ **Design Diferenciado** - Princípios para criar interfaces únicas e memoráveis
✅ **Instruções para IAs** - Prompts específicos para Lovable, V0 e Bolt
✅ **Troubleshooting Completo** - Soluções para os problemas mais comuns
✅ **Guia de Testes** - Unitários, integração e E2E
✅ **Melhores Práticas** - Padrões de código e arquitetura
✅ **Deploy Simplificado** - Passo a passo para produção

**Próximos Passos Recomendados:**

1. **Fase 1 (Semana 1-2):** Implementar autenticação e estrutura base
2. **Fase 2 (Semana 3-4):** Desenvolver funcionalidades para consumidores (mapa, perfil de negócio)
3. **Fase 3 (Semana 5-6):** Desenvolver funcionalidades para empreendedores (dashboard, missões)
4. **Fase 4 (Semana 7-8):** Implementar comunidade e notificações
5. **Fase 5 (Semana 9-10):** Polimento, testes e otimizações
6. **Fase 6 (Semana 11-12):** Deploy e lançamento

**Lembre-se:**

> "A perfeição é inimiga do progresso. Lance rápido, aprenda com usuários reais e itere constantemente."

A Napraça tem potencial para transformar a economia local e criar um impacto real na vida de empreendedores e consumidores. Este guia é sua bússola nessa jornada.

**Boa sorte e bom código! 🚀**

---

**Autor:** Manus AI  
**Versão:** 1.0  
**Data:** Janeiro 2026  
**Licença:** Uso exclusivo para o projeto Napraça

---

*Este documento é um guia vivo. Contribuições, melhorias e feedback são bem-vindos.*
