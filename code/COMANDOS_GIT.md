# 📦 Comandos para Git - NaPraça

## Para VOCÊ (subir código para o GitHub)

### 1. Verificar o que será commitado
```bash
cd code
git status
```

### 2. Adicionar todos os arquivos necessários
```bash
cd code
git add .
```

### 3. Fazer commit
```bash
cd code
git commit -m "feat: padronização para npm e setup inicial"
```

### 4. Subir para o GitHub
```bash
cd code
git push origin master
```

**OU se for a primeira vez:**
```bash
cd code
git remote add origin <URL_DO_SEU_REPOSITORIO>
git branch -M master
git push -u origin master
```

---

## Para SUA AMIGA (clonar e rodar o projeto)

### 1. Clonar o repositório
```bash
git clone <URL_DO_REPOSITORIO>
cd NaPraca/code
```

### 2. Instalar dependências (use APENAS npm)
```bash
cd code
npm run install:all
```

**IMPORTANTE:** 
- ✅ Use `npm` (não pnpm, yarn ou bun)
- ✅ O comando `install:all` instala tudo automaticamente

### 3. Criar arquivo .env no frontend
```bash
cd code/frontend
```

Crie um arquivo `.env` com:
```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
VITE_GOOGLE_MAPS_API_KEY=sua_chave_do_google_maps_aqui
```

### 4. Rodar o projeto
```bash
cd code
npm run dev
```

O projeto estará disponível em `http://localhost:5173` (ou a porta que o Vite indicar)

---

## ✅ Checklist antes de commitar

- [ ] Removidos `pnpm-lock.yaml` e `bun.lockb`
- [ ] `.gitignore` atualizado para ignorar outros gerenciadores
- [ ] `package-lock.json` presente em:
  - [ ] `code/package-lock.json`
  - [ ] `code/backend/package-lock.json`
  - [ ] `code/frontend/package-lock.json`
- [ ] Todos os scripts usam `npm` (não pnpm)
- [ ] Arquivo `.env` NÃO está commitado (já está no .gitignore)

---

## 🐛 Se der erro

### Erro: "package-lock.json não encontrado"
```bash
cd code
npm install
cd backend
npm install
cd ../frontend
npm install
```

### Erro: "comando não encontrado"
Certifique-se de estar na pasta `code/`:
```bash
cd code
```

### Erro: "dependências não instaladas"
```bash
cd code
npm run install:all
```
