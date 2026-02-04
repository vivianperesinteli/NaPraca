# Schema do Banco de Dados - NaPraça

Este documento descreve a estrutura do banco de dados PostgreSQL utilizado no Supabase para a plataforma NaPraça.

## Tabelas

### 1. profiles

Armazena os perfis dos usuários (consumidores e empreendedores), vinculados à tabela `auth.users` do Supabase.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  profile_type TEXT NOT NULL CHECK (profile_type IN ('consumer', 'entrepreneur')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_profile_type ON profiles(profile_type);
```

### 2. businesses

Armazena informações dos negócios cadastrados pelos empreendedores.

```sql
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entrepreneur_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  website TEXT,
  logo_url TEXT,
  cover_image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_businesses_entrepreneur_id ON businesses(entrepreneur_id);
CREATE INDEX idx_businesses_category ON businesses(category);
CREATE INDEX idx_businesses_is_active ON businesses(is_active);
CREATE INDEX idx_businesses_location ON businesses(latitude, longitude);
```

### 3. missions

Armazena as missões gamificadas para os empreendedores.

```sql
CREATE TABLE missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entrepreneur_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  mission_type TEXT NOT NULL CHECK (mission_type IN ('learning', 'marketing', 'sales', 'management')),
  points INTEGER NOT NULL DEFAULT 0,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_missions_entrepreneur_id ON missions(entrepreneur_id);
CREATE INDEX idx_missions_business_id ON missions(business_id);
CREATE INDEX idx_missions_is_completed ON missions(is_completed);
CREATE INDEX idx_missions_mission_type ON missions(mission_type);
```

## Relacionamentos

1. **profiles ↔ auth.users**: Relacionamento 1:1 através de `user_id`
2. **businesses ↔ profiles**: Relacionamento N:1 (muitos negócios para um empreendedor)
3. **missions ↔ profiles**: Relacionamento N:1 (muitas missões para um empreendedor)
4. **missions ↔ businesses**: Relacionamento N:1 opcional (missões podem estar vinculadas a um negócio específico)

## Triggers

### Atualização automática de updated_at

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON businesses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_missions_updated_at BEFORE UPDATE ON missions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Políticas de Segurança (RLS)

O Row Level Security (RLS) está habilitado em todas as tabelas para garantir segurança dos dados. As políticas implementadas são:

### 1. **profiles**
- **SELECT**: Usuários autenticados podem ler apenas seu próprio perfil
- **INSERT**: Usuários autenticados podem criar apenas seu próprio perfil (vinculado ao seu user_id)
- **UPDATE**: Usuários autenticados podem atualizar apenas seu próprio perfil
- **DELETE**: Usuários autenticados podem deletar apenas seu próprio perfil

### 2. **businesses**
- **SELECT**: Todos podem ler negócios ativos (is_active = true). Empreendedores podem ler todos os seus negócios (mesmo inativos)
- **INSERT**: Apenas empreendedores autenticados podem criar negócios (vinculados ao seu profile_id)
- **UPDATE**: Apenas o dono do negócio pode atualizar
- **DELETE**: Apenas o dono do negócio pode deletar

### 3. **missions**
- **SELECT**: Empreendedores podem ler apenas suas próprias missões
- **INSERT**: Apenas empreendedores autenticados podem criar missões (vinculadas ao seu profile_id)
- **UPDATE**: Apenas o dono da missão pode atualizar
- **DELETE**: Apenas o dono da missão pode deletar

## Script SQL Completo

```sql
-- Criar extensão UUID se necessário
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  profile_type TEXT NOT NULL CHECK (profile_type IN ('consumer', 'entrepreneur')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_profile_type ON profiles(profile_type);

-- Tabela businesses
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entrepreneur_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  website TEXT,
  logo_url TEXT,
  cover_image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_businesses_entrepreneur_id ON businesses(entrepreneur_id);
CREATE INDEX idx_businesses_category ON businesses(category);
CREATE INDEX idx_businesses_is_active ON businesses(is_active);
CREATE INDEX idx_businesses_location ON businesses(latitude, longitude);

-- Tabela missions
CREATE TABLE missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entrepreneur_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  mission_type TEXT NOT NULL CHECK (mission_type IN ('learning', 'marketing', 'sales', 'management')),
  points INTEGER NOT NULL DEFAULT 0,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_missions_entrepreneur_id ON missions(entrepreneur_id);
CREATE INDEX idx_missions_business_id ON missions(business_id);
CREATE INDEX idx_missions_is_completed ON missions(is_completed);
CREATE INDEX idx_missions_mission_type ON missions(mission_type);

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON businesses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_missions_updated_at BEFORE UPDATE ON missions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;

-- Função helper para obter profile_id do usuário atual
CREATE OR REPLACE FUNCTION get_user_profile_id()
RETURNS UUID AS $$
  SELECT id FROM profiles WHERE user_id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- ============================================
-- POLÍTICAS PARA profiles
-- ============================================

-- Política: Usuários podem ler apenas seu próprio perfil
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Política: Usuários podem inserir apenas seu próprio perfil
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política: Usuários podem atualizar apenas seu próprio perfil
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Política: Usuários podem deletar apenas seu próprio perfil
CREATE POLICY "Users can delete own profile"
  ON profiles FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- POLÍTICAS PARA businesses
-- ============================================

-- Política: Todos podem ler negócios ativos
CREATE POLICY "Anyone can read active businesses"
  ON businesses FOR SELECT
  USING (is_active = true);

-- Política: Empreendedores podem ler todos os seus negócios (mesmo inativos)
CREATE POLICY "Entrepreneurs can read own businesses"
  ON businesses FOR SELECT
  USING (
    entrepreneur_id = get_user_profile_id()
  );

-- Política: Apenas empreendedores podem criar negócios
CREATE POLICY "Entrepreneurs can insert own businesses"
  ON businesses FOR INSERT
  WITH CHECK (
    entrepreneur_id = get_user_profile_id()
  );

-- Política: Apenas o dono pode atualizar seu negócio
CREATE POLICY "Owners can update own businesses"
  ON businesses FOR UPDATE
  USING (entrepreneur_id = get_user_profile_id())
  WITH CHECK (entrepreneur_id = get_user_profile_id());

-- Política: Apenas o dono pode deletar seu negócio
CREATE POLICY "Owners can delete own businesses"
  ON businesses FOR DELETE
  USING (entrepreneur_id = get_user_profile_id());

-- ============================================
-- POLÍTICAS PARA missions
-- ============================================

-- Política: Empreendedores podem ler apenas suas próprias missões
CREATE POLICY "Entrepreneurs can read own missions"
  ON missions FOR SELECT
  USING (
    entrepreneur_id = get_user_profile_id()
  );

-- Política: Apenas empreendedores podem criar missões
CREATE POLICY "Entrepreneurs can insert own missions"
  ON missions FOR INSERT
  WITH CHECK (
    entrepreneur_id = get_user_profile_id()
  );

-- Política: Apenas o dono pode atualizar sua missão
CREATE POLICY "Owners can update own missions"
  ON missions FOR UPDATE
  USING (entrepreneur_id = get_user_profile_id())
  WITH CHECK (entrepreneur_id = get_user_profile_id());

-- Política: Apenas o dono pode deletar sua missão
CREATE POLICY "Owners can delete own missions"
  ON missions FOR DELETE
  USING (entrepreneur_id = get_user_profile_id());
```

## Dados de Exemplo (Opcional)

```sql
-- Inserir missões de exemplo (após criar um perfil de empreendedor)
-- Substitua 'entrepreneur_profile_id' pelo ID real do perfil

INSERT INTO missions (entrepreneur_id, title, description, mission_type, points) VALUES
  ('entrepreneur_profile_id', 'Criar Perfil do Negócio', 'Complete o cadastro do seu negócio na plataforma', 'learning', 50),
  ('entrepreneur_profile_id', 'Primeira Venda', 'Realize sua primeira venda através da plataforma', 'sales', 100),
  ('entrepreneur_profile_id', 'Compartilhar nas Redes', 'Compartilhe seu negócio nas redes sociais', 'marketing', 75),
  ('entrepreneur_profile_id', 'Organizar Estoque', 'Faça um inventário completo do seu estoque', 'management', 60);
```

