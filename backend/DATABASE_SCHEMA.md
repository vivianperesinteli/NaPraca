# Schema do Banco de Dados - NaPraça

Este documento descreve a estrutura do banco de dados PostgreSQL utilizado no Supabase para a plataforma NaPraça.

## Tabelas

### 1. profiles

Armazena os perfis dos usuários (consumidores e empreendedores), vinculados à tabela `auth.users` do Supabase.

### 2. businesses

Armazena informações dos negócios cadastrados pelos empreendedores.

### 3. missions

Armazena as missões gamificadas para os empreendedores.

Consulte o arquivo na raiz do repositório `DATABASE_SCHEMA.md` para o script SQL completo e políticas RLS.
