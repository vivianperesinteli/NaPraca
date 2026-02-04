# Documentação Técnica - Napraça

Esta seção contém toda a documentação técnica do Napraça, incluindo arquitetura, banco de dados, APIs e práticas de segurança.

## 📋 Índice

1. [Arquitetura](#arquitetura)
2. [Database Schema](#database-schema)
3. [API Design](#api-design)
4. [Security](#security)

## 🏗️ Arquitetura

O documento [Architecture](architecture.md) descreve a arquitetura completa do sistema Napraça.

**Conteúdo:**
- Visão geral da arquitetura
- Diagramas de componentes
- Fluxo de dados
- Decisões arquiteturais
- Stack tecnológico
- Integrações externas

**Arquitetura:**
```
Cliente (Web/Mobile)
    ↓
tRPC Client
    ↓
Express Server + tRPC
    ↓
Drizzle ORM
    ↓
MySQL/TiDB
```

**Stack:**
- **Frontend:** React 19, React Native, Tailwind CSS 4, Vite
- **Backend:** Express 4, tRPC 11, Node.js 22
- **Database:** MySQL 8 / TiDB
- **ORM:** Drizzle ORM
- **Auth:** Manus OAuth
- **Storage:** AWS S3
- **Maps:** Google Maps API

**Quando consultar:** Para entender a arquitetura geral, decisões técnicas ou stack tecnológico.

## 🗄️ Database Schema

O documento [Database Schema](database-schema.md) descreve o esquema completo do banco de dados.

**Conteúdo:**
- Diagrama ER (Entity-Relationship)
- Descrição de todas as tabelas
- Relacionamentos entre tabelas
- Índices e constraints
- Migrations
- Seeds

**Tabelas Principais:**
1. `users` - Usuários do sistema
2. `businesses` - Negócios locais
3. `missions` - Missões educativas para empreendedores
4. `mission_progress` - Progresso nas missões
5. `consumer_missions` - Missões para consumidores
6. `consumer_mission_progress` - Progresso dos consumidores
7. `rewards` - Recompensas disponíveis
8. `reward_redemptions` - Resgates de recompensas
9. `community_posts` - Posts da comunidade
10. `comments` - Comentários em posts
11. `notifications` - Notificações
12. `favorites` - Negócios favorit ados
13. `views` - Visualizações de negócios
14. `clicks` - Cliques em negócios

**Quando consultar:** Para entender o modelo de dados, criar queries ou planejar migrações.

## 🔌 API Design

O documento [API Design](api-design.md) descreve o design da API tRPC.

**Conteúdo:**
- Visão geral da API
- Routers e procedures
- Schemas de validação (Zod)
- Exemplos de uso
- Error handling
- Rate limiting

**Routers Principais:**
- `auth` - Autenticação e perfil
- `businesses` - CRUD de negócios
- `missions` - Missões e progresso
- `community` - Posts e comentários
- `notifications` - Sistema de notificações
- `analytics` - Analytics e métricas

**Exemplo de Procedure:**
```typescript
businesses: router({
  list: publicProcedure
    .input(z.object({
      category: z.string().optional(),
      lat: z.number(),
      lng: z.number(),
      radius: z.number().default(5000),
    }))
    .query(async ({ input }) => {
      // Implementation
    }),
})
```

**Quando consultar:** Para entender endpoints disponíveis, payloads esperados ou implementar novos procedures.

## 🔒 Security

O documento [Security](security.md) descreve as práticas de segurança implementadas.

**Conteúdo:**
- Autenticação e autorização
- Proteção de dados sensíveis
- HTTPS e TLS
- Rate limiting
- Input validation
- SQL injection prevention
- XSS prevention
- CSRF protection
- Secrets management

**Práticas Implementadas:**
- OAuth 2.0 com Manus
- JWT para sessões
- Bcrypt para senhas (se aplicável)
- Validação com Zod em todos os inputs
- Prepared statements (Drizzle ORM)
- Content Security Policy
- CORS configurado
- Variáveis de ambiente para secrets

**Quando consultar:** Para entender práticas de segurança, implementar autenticação ou revisar vulnerabilidades.

## 🎓 Como Usar Esta Documentação

### Para Novos Desenvolvedores
1. Comece pela [Arquitetura](architecture.md) para visão geral
2. Entenda o [Database Schema](database-schema.md)
3. Explore o [API Design](api-design.md)
4. Revise práticas de [Security](security.md)

### Para Implementar Novas Funcionalidades
1. Consulte o [Database Schema](database-schema.md) para entender dados
2. Use o [API Design](api-design.md) como referência para novos procedures
3. Siga práticas de [Security](security.md)
4. Atualize a [Arquitetura](architecture.md) se necessário

### Para Troubleshooting
1. Verifique o [Database Schema](database-schema.md) para queries
2. Consulte o [API Design](api-design.md) para endpoints
3. Revise [Security](security.md) para problemas de autenticação

## 📝 Manutenção

Esta documentação deve ser atualizada sempre que houver mudanças técnicas significativas:

- **Migrations:** Atualizar database-schema.md
- **Novos Endpoints:** Atualizar api-design.md
- **Mudanças de Arquitetura:** Atualizar architecture.md
- **Novas Práticas de Segurança:** Atualizar security.md

**Responsável:** Tech Lead

## 🤝 Contribuindo

Ao adicionar novas funcionalidades, certifique-se de:
1. Atualizar a documentação correspondente
2. Adicionar exemplos de uso
3. Documentar decisões técnicas importantes

---

**Última atualização:** Janeiro 2026  
**Versão:** 1.0.0
