# Design - Napraça

Esta seção contém todo o design system, wireframes, mockups e assets visuais do Napraça.

## 📋 Índice

1. [Design System](#design-system)
2. [Brand Guidelines](#brand-guidelines)
3. [Wireframes](#wireframes)
4. [Mockups](#mockups)
5. [Assets](#assets)

## 🎨 Design System

O [Design System](design-system.md) define todos os elementos visuais e padrões de interface do Napraça.

**Conteúdo:**
- Paleta de cores
- Tipografia
- Espaçamentos
- Componentes UI
- Ícones
- Ilustrações
- Animações e transições
- Responsividade

### Paleta de Cores (Proposta 1)

**Cores Principais:**
- **Azul Vibrante:** `#2563EB` - Confiança, profissionalismo
- **Amarelo Solar:** `#FBBF24` - Energia, otimismo, comunidade

**Cores Secundárias:**
- **Azul Escuro:** `#1E3A8A` - Textos, elementos de destaque
- **Amarelo Claro:** `#FEF3C7` - Backgrounds, highlights

**Cores Neutras:**
- **Cinza Escuro:** `#1F2937` - Textos principais
- **Cinza Médio:** `#6B7280` - Textos secundários
- **Cinza Claro:** `#F3F4F6` - Backgrounds
- **Branco:** `#FFFFFF` - Backgrounds, cards

**Cores de Feedback:**
- **Sucesso:** `#10B981` (Verde)
- **Erro:** `#EF4444` (Vermelho)
- **Aviso:** `#F59E0B` (Laranja)
- **Info:** `#3B82F6` (Azul)

### Tipografia

**Fonte Principal:** Inter
- Usada para textos gerais, parágrafos, labels

**Fonte de Destaque:** Poppins
- Usada para títulos, headings, CTAs

**Escalas:**
- Display: 48px / 3rem (font-bold)
- H1: 36px / 2.25rem (font-bold)
- H2: 30px / 1.875rem (font-semibold)
- H3: 24px / 1.5rem (font-semibold)
- H4: 20px / 1.25rem (font-medium)
- Body: 16px / 1rem (font-normal)
- Small: 14px / 0.875rem (font-normal)
- Tiny: 12px / 0.75rem (font-normal)

### Espaçamentos

Sistema baseado em múltiplos de 4px:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

**Quando consultar:** Para manter consistência visual ao criar novos componentes ou telas.

## 🏷️ Brand Guidelines

O documento [Brand Guidelines](brand-guidelines.md) define a identidade visual da marca Napraça.

**Conteúdo:**
- Logo (versões e variações)
- Uso correto do logo
- Paleta de cores da marca
- Tipografia da marca
- Tom de voz
- Personalidade da marca
- Aplicações (cartões, banners, social media)

**Personalidade da Marca:**
- **Acolhedora:** Linguagem simples e amigável
- **Empoderadora:** Foco em crescimento e aprendizado
- **Comunitária:** Valoriza conexões locais
- **Moderna:** Design limpo e contemporâneo

**Tom de Voz:**
- Informal mas respeitoso
- Encorajador e positivo
- Claro e direto
- Inclusivo

**Quando consultar:** Para criar materiais de marketing, posts em redes sociais ou qualquer comunicação da marca.

## 📐 Wireframes

Wireframes de todas as telas principais do aplicativo.

### [Baixa Fidelidade](wireframes/baixa-fidelidade/)
Wireframes estruturais em escala de cinza, focados em layout e hierarquia.

**Telas Incluídas:**
- Login/Onboarding
- Home Consumidor (Mapa)
- Perfil do Negócio
- Missões Consumidor
- Perfil Consumidor
- Recompensas
- Dashboard Empreendedor
- Tela de Missão
- Edição de Perfil do Negócio
- Analytics
- Comunidade
- Notificações
- Configurações

### [Alta Fidelidade](wireframes/alta-fidelidade/)
Wireframes com design aplicado, cores, tipografia e componentes finais.

**Mesmas telas da baixa fidelidade, mas com:**
- Paleta de cores aplicada
- Tipografia definida
- Ícones e imagens
- Sombras e efeitos
- Interações definidas

**Quando consultar:** Para entender o layout e fluxo das telas antes de implementar.

## 🖼️ Mockups

Mockups finais das interfaces com design completo aplicado.

**Conteúdo:**
- Mockups de todas as telas principais
- Estados diferentes (vazio, carregando, erro, sucesso)
- Variações (dia/noite, diferentes perfis)
- Protótipos interativos (Figma)

**Quando consultar:** Para referência visual durante implementação ou para apresentações.

## 📦 Assets

Todos os assets visuais do projeto organizados por categoria.

### [Logos](assets/logos/)
- Logo principal (SVG, PNG em várias resoluções)
- Logo icon only
- Logo horizontal
- Logo vertical
- Versões em branco/preto

### [Ícones](assets/icons/)
- Ícones de navegação
- Ícones de categorias de negócios
- Ícones de ações
- Ícones de status

### [Imagens](assets/images/)
- Ilustrações
- Fotos de stock
- Backgrounds
- Placeholders

**Quando consultar:** Para usar assets visuais no desenvolvimento.

## 🎓 Como Usar Esta Documentação

### Para Designers
1. Consulte o [Design System](design-system.md) para manter consistência
2. Use as [Brand Guidelines](brand-guidelines.md) para materiais de marketing
3. Crie novos wireframes seguindo os padrões existentes
4. Adicione novos assets na pasta correspondente

### Para Desenvolvedores
1. Implemente componentes seguindo o [Design System](design-system.md)
2. Use [Wireframes](wireframes/) como referência de layout
3. Consulte [Mockups](mockups/) para detalhes visuais
4. Use [Assets](assets/) para imagens e ícones

### Para Product Managers
1. Use [Wireframes](wireframes/) para discussões de UX
2. Consulte [Mockups](mockups/) para apresentações
3. Referencie [Brand Guidelines](brand-guidelines.md) para comunicação

## 🛠️ Ferramentas

**Design:**
- Figma (wireframes, mockups, protótipos)
- Adobe Illustrator (logos, ícones)
- Adobe Photoshop (tratamento de imagens)

**Implementação:**
- Tailwind CSS (estilização)
- Lucide React (ícones)
- Framer Motion (animações)

## 📝 Manutenção

O design deve evoluir com o produto:

- **Novos Componentes:** Adicionar ao design system
- **Novas Telas:** Criar wireframes e mockups
- **Novos Assets:** Adicionar na pasta correspondente
- **Mudanças na Marca:** Atualizar brand guidelines

**Responsável:** Design Lead

## 🤝 Contribuindo

Ao propor mudanças no design:
1. Siga o design system existente
2. Crie wireframes antes de mockups finais
3. Documente decisões de design
4. Teste com usuários quando possível

---

**Última atualização:** Janeiro 2026  
**Versão:** 1.0.0
