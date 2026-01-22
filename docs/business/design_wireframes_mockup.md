# NAPRÇA: Guia Completo de Designs e Wireframes

**Projeto:** NAPRÇA - Plataforma Mobile para Empreendedores e Consumidores Locais  
**Versão:** 1.0  
**Data:** Janeiro de 2026  
**Tipo de Entrega:** Wireframes de Baixa Fidelidade + Designs de Alta Fidelidade

---

## 1. Visão Geral do Projeto

Este documento apresenta o conjunto completo de **16 wireframes de baixa fidelidade** e **16 designs de alta fidelidade** criados para o MVP da NAPRÇA. O material cobre todas as funcionalidades essenciais do aplicativo mobile, divididas em três categorias:

- **Telas do Consumidor:** 6 telas
- **Telas do Empreendedor:** 7 telas
- **Telas Compartilhadas:** 3 telas

---

## 2. Paleta de Cores e Identidade Visual

### 2.1 Cores Principais

| Cor | Código Hex | Uso |
| :--- | :--- | :--- |
| **Laranja Quente** | #FF6B35 | Cor primária, botões de ação, elementos ativos |
| **Azul Petróleo** | #004E64 | Cor secundária, textos, ícones, elementos de suporte |
| **Branco** | #FFFFFF | Fundo principal, cards |
| **Cinza Claro** | #F5F5F5 | Fundo secundário, áreas de separação |
| **Verde** | #28A745 | Status positivo (aberto, ativo) |
| **Vermelho** | #DC3545 | Ações destrutivas (sair, deletar) |

### 2.2 Tipografia

- **Fonte Principal:** Sans-serif moderna (sugestão: Inter, Poppins, ou SF Pro)
- **Títulos:** Bold, 24-28px
- **Subtítulos:** Semibold, 18-20px
- **Corpo de Texto:** Regular, 14-16px
- **Textos Secundários:** Regular, 12-14px

### 2.3 Elementos Visuais

- **Bordas:** Arredondadas (border-radius: 12-16px para cards, 24px para botões)
- **Sombras:** Sutis (box-shadow: 0 2px 8px rgba(0,0,0,0.1))
- **Ícones:** Linha ou preenchidos, consistentes em todo o app
- **Espaçamento:** Padding e margin consistentes (8px, 16px, 24px)

---

## 3. Estrutura de Arquivos

```
napraça_designs/
├── wireframes_baixa_fidelidade/
│   ├── consumidor/
│   │   ├── 01_login_onboarding.png
│   │   ├── 02_home_mapa.png
│   │   ├── 03_perfil_negocio.png
│   │   ├── 04_missoes_consumidor.png
│   │   ├── 05_perfil_consumidor.png
│   │   └── 06_recompensas.png
│   ├── empreendedor/
│   │   ├── 01_dashboard_empreendedor.png
│   │   ├── 02_tela_missao.png
│   │   ├── 03_perfil_negocio_edicao.png
│   │   ├── 04_analytics.png
│   │   ├── 05_comunidade.png
│   │   ├── 06_lista_missoes.png
│   │   └── 07_perfil_empreendedor.png
│   └── compartilhado/
│       ├── 01_notificacoes.png
│       ├── 02_configuracoes.png
│       └── 03_cadastro.png
├── designs_alta_fidelidade/
│   ├── consumidor/
│   │   ├── 01_login_onboarding.png
│   │   ├── 02_home_mapa.png
│   │   ├── 03_perfil_negocio.png
│   │   ├── 04_missoes_consumidor.png
│   │   ├── 05_perfil_consumidor.png
│   │   └── 06_recompensas.png
│   ├── empreendedor/
│   │   ├── 01_dashboard_empreendedor.png
│   │   ├── 02_tela_missao.png
│   │   ├── 03_perfil_negocio_edicao.png
│   │   ├── 04_analytics.png
│   │   ├── 05_comunidade.png
│   │   ├── 06_lista_missoes.png
│   │   └── 07_perfil_empreendedor.png
│   └── compartilhado/
│       ├── 01_notificacoes.png
│       ├── 02_configuracoes.png
│       └── 03_cadastro.png
└── GUIA_DE_DESIGNS_NAPRÇA.md (este arquivo)
```

---

## 4. Descrição Detalhada das Telas

### 4.1 Telas do Consumidor

#### Tela 01: Login/Onboarding
**Objetivo:** Apresentar o app e permitir que o usuário entre ou se cadastre.

**Wireframe de Baixa Fidelidade:**
- Layout simples em escala de cinza
- Logo e slogan centralizados
- Campos de email e senha
- Botão primário "ENTRAR"
- Link para cadastro

**Design de Alta Fidelidade:**
- Logo moderno com tema de comunidade/bairro
- Paleta de cores aplicada (laranja e azul petróleo)
- Campos com ícones e bordas arredondadas
- Botão com gradiente laranja
- Sombras sutis para profundidade

**Elementos-Chave:**
- Logo NAPRÇA
- Tagline: "Conectando o bairro, fortalecendo o comércio"
- Campos: Email, Senha
- Botões: ENTRAR, QUERO ME CADASTRAR
- Link: Esqueci minha senha

---

#### Tela 02: Home (Mapa)
**Objetivo:** Permitir a descoberta de negócios locais de forma visual e intuitiva.

**Wireframe de Baixa Fidelidade:**
- Mapa ocupando a maior parte da tela
- Pins simples para negócios
- Barra de busca no topo
- Navegação inferior

**Design de Alta Fidelidade:**
- Mapa colorido com pins customizados por categoria
- Pins em laranja (comida), azul petróleo (serviços), verde (varejo)
- Barra de busca com sombra flutuante
- Botão de filtro em laranja
- Localização do usuário com ponto azul pulsante

**Elementos-Chave:**
- Barra de busca: "O que você procura?"
- Ícone de filtro
- Mapa interativo com pins
- Navegação: Mapa (ativo), Missões, Perfil

---

#### Tela 03: Perfil do Negócio
**Objetivo:** Fornecer informações detalhadas sobre um negócio específico.

**Wireframe de Baixa Fidelidade:**
- Imagem de capa
- Foto de perfil circular
- Informações básicas
- Botões de ação

**Design de Alta Fidelidade:**
- Imagem hero do estabelecimento
- Foto de perfil com borda branca
- Badge de categoria em laranja
- Status "Aberto agora" com indicador verde
- Botões: "Ligar" (azul petróleo), "Como Chegar" (laranja)

**Elementos-Chave:**
- Botão voltar e favorito
- Nome do negócio
- Categoria
- Status de funcionamento
- Endereço
- Descrição
- Botões de ação

---

#### Tela 04: Missões do Consumidor
**Objetivo:** Engajar o consumidor com desafios gamificados.

**Wireframe de Baixa Fidelidade:**
- Lista de cards de missões
- Informações básicas por card
- Botões de ação

**Design de Alta Fidelidade:**
- Cards com gradientes vibrantes (laranja-coral, azul-teal, roxo-rosa)
- Ícones de missão em destaque
- Barras de progresso horizontais
- Primeiro card com efeito de brilho

**Elementos-Chave:**
- Título: "Suas Missões"
- Cards de missão com:
  - Ícone
  - Título
  - Descrição
  - Barra de progresso
  - Botão "INICIAR"

---

#### Tela 05: Perfil do Consumidor
**Objetivo:** Exibir informações do usuário e dar acesso a funcionalidades secundárias.

**Wireframe de Baixa Fidelidade:**
- Foto de perfil
- Stats em boxes
- Menu de opções

**Design de Alta Fidelidade:**
- Foto de perfil grande com ícone de edição
- Cards de stats com gradientes (laranja, azul, verde)
- Menu com ícones e setas
- Design limpo e organizado

**Elementos-Chave:**
- Nome do usuário
- Stats: Pontos, Missões, Impacto
- Menu: Meus Favoritos, Histórico, Recompensas, Configurações

---

#### Tela 06: Recompensas
**Objetivo:** Exibir recompensas disponíveis e bloqueadas.

**Wireframe de Baixa Fidelidade:**
- Saldo de pontos
- Grid de recompensas
- Cards com status

**Design de Alta Fidelidade:**
- Card de saldo com gradiente
- Grid 2x2 de recompensas
- Recompensas bloqueadas em escala de cinza com ícone de cadeado
- Botões "RESGATAR" em laranja

**Elementos-Chave:**
- Saldo: "150 Pontos"
- Cards de recompensa com:
  - Imagem do produto
  - Título
  - Custo em pontos
  - Botão "RESGATAR" ou status "Bloqueado"

---

### 4.2 Telas do Empreendedor

#### Tela 01: Dashboard Empreendedor
**Objetivo:** Dar ao empreendedor uma visão geral do seu progresso e a próxima ação a ser tomada.

**Wireframe de Baixa Fidelidade:**
- Saudação
- Card de status
- Card de missão principal
- Navegação

**Design de Alta Fidelidade:**
- Saudação amigável: "Olá, Carlos!"
- Card de status com fundo azul claro
- Card de missão com gradiente laranja e ícone de lâmpada
- Barra de progresso visual
- Botão "COMEÇAR MISSÃO" em destaque

**Elementos-Chave:**
- Saudação personalizada
- Status: "Seu perfil foi visto 5 vezes hoje!"
- Missão: Título, descrição, progresso, botão
- Navegação: Home (ativo), Missões, Perfil

---

#### Tela 02: Tela de Missão
**Objetivo:** Ensinar um conceito de negócio de forma prática e guiada.

**Wireframe de Baixa Fidelidade:**
- Título da missão
- Área de vídeo
- Seção educativa
- Componente de ação
- Botão de conclusão

**Design de Alta Fidelidade:**
- Header laranja com título
- Player de vídeo com thumbnail e botão play
- Seções "Passo 1: A Lição" e "Passo 2: Sua Vez!"
- Área de upload com borda tracejada
- Botão "CONCLUIR MISSÃO" em laranja

**Elementos-Chave:**
- Título: "Missão 1: Foto da Fachada"
- Vídeo educativo
- Texto explicativo
- Componente de upload de foto
- Botão de conclusão

---

#### Tela 03: Perfil do Negócio (Edição)
**Objetivo:** Permitir ao empreendedor editar as informações do seu negócio.

**Wireframe de Baixa Fidelidade:**
- Imagens editáveis
- Formulário de campos
- Botão de salvar

**Design de Alta Fidelidade:**
- Imagem de capa com botão "Alterar Foto"
- Foto de perfil com ícone de câmera
- Campos com ícones (loja, categoria, localização, telefone, relógio, descrição)
- Botão "SALVAR ALTERAÇÕES" em laranja

**Elementos-Chave:**
- Campos: Nome do Negócio, Categoria, Endereço, Telefone, Horário, Descrição
- Botões de edição de imagem
- Botão de salvar

---

#### Tela 04: Analytics
**Objetivo:** Fornecer insights sobre o desempenho do negócio.

**Wireframe de Baixa Fidelidade:**
- Cards de métricas
- Gráfico simples
- Listas de dados

**Design de Alta Fidelidade:**
- Seletor de período (Last 30 Days)
- Cards de stats coloridos (laranja, azul, vermelho)
- Gráfico de linha com gradiente preenchido
- Gráficos de barras para dias e horários
- Design profissional e limpo

**Elementos-Chave:**
- Stats: Visualizações, Cliques, Favoritos
- Gráfico de tendência
- Dias mais visitados
- Horários de pico

---

#### Tela 05: Comunidade
**Objetivo:** Conectar empreendedores em um fórum de suporte.

**Wireframe de Baixa Fidelidade:**
- Tabs de navegação
- Lista de posts
- Botão de nova postagem

**Design de Alta Fidelidade:**
- Tabs: Fórum (ativo), Dicas, Suporte
- Cards de post com avatar, nome, título, preview, comentários, timestamp
- Botão flutuante "+" em laranja
- Design social e engajador

**Elementos-Chave:**
- Barra de busca
- Tabs de navegação
- Posts do fórum
- Botão de nova postagem

---

#### Tela 06: Lista de Missões
**Objetivo:** Exibir todas as missões disponíveis e concluídas.

**Wireframe de Baixa Fidelidade:**
- Tabs: Disponíveis, Concluídas
- Lista de missões
- Badges de dificuldade

**Design de Alta Fidelidade:**
- Cards com gradientes
- Badges de dificuldade coloridos (verde, amarelo, vermelho)
- Ícones de missão em destaque
- Tempo estimado com ícone de relógio
- Botões "INICIAR" ou badge "CONCLUÍDA"

**Elementos-Chave:**
- Tabs de navegação
- Cards de missão com:
  - Ícone
  - Título
  - Descrição
  - Dificuldade
  - Tempo estimado
  - Botão de ação

---

#### Tela 07: Perfil do Empreendedor
**Objetivo:** Exibir informações do empreendedor e dar acesso a funcionalidades.

**Wireframe de Baixa Fidelidade:**
- Foto de perfil
- Card de negócio
- Stats
- Menu de opções

**Design de Alta Fidelidade:**
- Foto de perfil com borda laranja
- Card de negócio com gradiente
- Stats com ícones e barra de progresso
- Menu com ícones coloridos
- Botão "Sair" em vermelho

**Elementos-Chave:**
- Nome do empreendedor
- Card do negócio
- Stats: Missões Concluídas, Nível
- Menu: Meu Negócio, Estatísticas, Comunidade, Ajuda, Configurações, Sair

---

### 4.3 Telas Compartilhadas

#### Tela 01: Notificações
**Objetivo:** Exibir notificações do sistema e de outros usuários.

**Wireframe de Baixa Fidelidade:**
- Tabs: Todas, Não Lidas
- Lista de notificações
- Indicadores de não lidas

**Design de Alta Fidelidade:**
- Tabs com underline laranja
- Cards de notificação com ícones coloridos
- Ponto azul para não lidas
- Thumbnails para algumas notificações
- Design limpo e organizado

**Elementos-Chave:**
- Tabs de navegação
- Notificações com:
  - Ícone
  - Título
  - Preview
  - Timestamp
  - Indicador de não lida

---

#### Tela 02: Configurações
**Objetivo:** Permitir ao usuário ajustar preferências do app.

**Wireframe de Baixa Fidelidade:**
- Seções agrupadas
- Toggles para notificações
- Links para outras páginas

**Design de Alta Fidelidade:**
- Seções bem definidas com headers
- Toggles em laranja/azul
- Setas para navegação
- Botão "Sair" em vermelho com borda
- Design profissional e claro

**Elementos-Chave:**
- Seções: Conta, Notificações, Preferências, Sobre
- Toggles: Push, Email, SMS
- Links: Editar Perfil, Alterar Senha, Privacidade, Idioma, Tema, Versão, Termos, Política
- Botão "Sair"

---

#### Tela 03: Cadastro
**Objetivo:** Permitir ao usuário criar uma nova conta.

**Wireframe de Baixa Fidelidade:**
- Seleção de tipo de usuário
- Formulário de cadastro
- Checkbox de termos
- Botão de criar conta

**Design de Alta Fidelidade:**
- Cards de seleção lado a lado (Empreendedor/Consumidor)
- Ícones em laranja e azul petróleo
- Campos com ícones e bordas arredondadas
- Checkbox estilizado
- Botão "CRIAR CONTA" com gradiente laranja
- Link para login

**Elementos-Chave:**
- Seleção: Sou Empreendedor / Sou Consumidor
- Campos: Nome, Email, Senha, Confirmar Senha
- Checkbox: Aceito os Termos de Uso
- Botão: CRIAR CONTA
- Link: Já tem conta? Entrar

---

## 5. Componentes Reutilizáveis

### 5.1 Botões

| Tipo | Estilo | Uso |
| :--- | :--- | :--- |
| **Primário** | Fundo laranja (#FF6B35), texto branco, arredondado | Ações principais (Entrar, Salvar, Iniciar) |
| **Secundário** | Borda azul petróleo (#004E64), texto azul, arredondado | Ações secundárias (Cadastrar, Voltar) |
| **Destrutivo** | Borda vermelha, texto vermelho | Ações destrutivas (Sair, Deletar) |
| **Flutuante** | Circular, laranja, ícone "+" | Nova postagem, nova ação |

### 5.2 Cards

| Tipo | Estilo | Uso |
| :--- | :--- | :--- |
| **Card Simples** | Fundo branco, sombra sutil, bordas arredondadas | Informações gerais |
| **Card com Gradiente** | Gradiente colorido, texto branco | Missões, stats, destaque |
| **Card de Lista** | Fundo branco, separadores, ícone à esquerda | Menu, configurações |

### 5.3 Navegação

| Tipo | Estilo | Uso |
| :--- | :--- | :--- |
| **Bottom Navigation** | 3-4 ícones, item ativo em laranja | Navegação principal |
| **Tabs** | Underline laranja no item ativo | Alternância de conteúdo |
| **Back Button** | Seta à esquerda, azul petróleo | Voltar à tela anterior |

### 5.4 Inputs

| Tipo | Estilo | Uso |
| :--- | :--- | :--- |
| **Text Field** | Borda arredondada, ícone à esquerda, placeholder cinza | Entrada de texto |
| **Dropdown** | Borda arredondada, ícone de seta à direita | Seleção de opções |
| **Toggle Switch** | Laranja quando ativo, cinza quando inativo | Ativar/desativar opções |
| **Checkbox** | Borda arredondada, checkmark laranja | Aceitar termos, seleção múltipla |

---

## 6. Fluxos de Navegação

### 6.1 Fluxo do Consumidor

```
Login → Home (Mapa) → Perfil do Negócio → Ação (Ligar/Navegar)
                    ↓
                Missões → Detalhes da Missão
                    ↓
                Perfil → Recompensas
                       → Favoritos
                       → Configurações
```

### 6.2 Fluxo do Empreendedor

```
Login → Dashboard → Missão → Conclusão
                  ↓
              Lista de Missões
                  ↓
              Perfil → Meu Negócio (Edição)
                     → Estatísticas
                     → Comunidade
                     → Configurações
```

---

## 7. Especificações Técnicas para Desenvolvimento

### 7.1 Dimensões e Resolução

- **Tamanho Base:** 375x812px (iPhone X/11/12/13 Pro)
- **Resolução:** @2x ou @3x para assets
- **Safe Area:** Considerar notch e bottom bar

### 7.2 Componentes de UI Recomendados

**Para React Native:**
- `react-native-maps` para o mapa
- `react-navigation` para navegação
- `react-native-vector-icons` para ícones
- UI Kitten ou React Native Paper para componentes base

### 7.3 Assets Necessários

- Logo NAPRÇA em SVG e PNG (@2x, @3x)
- Ícones de categoria (comida, serviços, varejo) em SVG
- Ícones de missão em SVG
- Imagens placeholder para negócios e produtos

### 7.4 Animações e Transições

- **Transições de Tela:** Slide (300ms)
- **Botões:** Scale on press (150ms)
- **Cards:** Fade in on load (200ms)
- **Mapa:** Smooth zoom e pan

---

## 8. Próximos Passos

### 8.1 Para o Design

1. **Criar Protótipo Interativo:** Usar Figma ou Adobe XD para criar um protótipo clicável
2. **Testes de Usabilidade:** Realizar testes com 5-7 usuários de cada persona
3. **Iteração:** Ajustar designs com base no feedback

### 8.2 Para o Desenvolvimento

1. **Setup do Projeto:** Configurar React Native com as bibliotecas necessárias
2. **Componentização:** Criar componentes reutilizáveis (botões, cards, inputs)
3. **Implementação por Tela:** Começar pelas telas de login e home
4. **Integração com Backend:** Conectar com Firebase/Firestore

### 8.3 Para Validação

1. **Testes Alfa:** Lançar para 20-30 usuários iniciais
2. **Coleta de Feedback:** Usar analytics e entrevistas
3. **Ajustes:** Iterar com base nos dados

---

## 9. Contato e Suporte

Para dúvidas sobre os designs ou sugestões de melhorias, entre em contato com a equipe NAPRÇA.

---

**Fim do Guia de Designs**
