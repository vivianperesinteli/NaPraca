# Guia de Contribuição

Obrigado por considerar contribuir com o Napraça! 🎉

## 📋 Código de Conduta

Este projeto segue o [Código de Conduta](CODE_OF_CONDUCT.md). Ao participar, você concorda em seguir suas diretrizes.

## 🚀 Como Contribuir

### Reportando Bugs

Antes de reportar um bug, verifique se ele já foi reportado nas [Issues](https://github.com/napraca/napraca/issues). Se não encontrar nada relacionado, abra uma nova issue usando o template de Bug Report e inclua o máximo de detalhes possível para ajudar na reprodução e correção do problema.

### Sugerindo Funcionalidades

Se você tem uma ideia para melhorar o Napraça, primeiro verifique se a funcionalidade já foi sugerida. Caso não tenha sido, abra uma nova issue usando o template de Feature Request e descreva claramente o problema que a funcionalidade resolve e como ela funcionaria.

### Contribuindo com Código

Para contribuir com código, siga este fluxo de trabalho:

**1. Fork o projeto** - Crie uma cópia do repositório na sua conta do GitHub.

**2. Clone seu fork** - Baixe o repositório para sua máquina local:
```bash
git clone https://github.com/seu-usuario/napraca.git
cd napraca
```

**3. Crie uma branch** - Crie uma nova branch para sua funcionalidade ou correção:
```bash
git checkout -b feature/MinhaFeature
```

**4. Faça suas mudanças** - Implemente sua funcionalidade ou correção seguindo nosso style guide.

**5. Commit suas mudanças** - Use mensagens de commit descritivas seguindo o padrão Conventional Commits:
```bash
git commit -m 'feat: Add MinhaFeature'
```

**6. Push para a branch** - Envie suas mudanças para o GitHub:
```bash
git push origin feature/MinhaFeature
```

**7. Abra um Pull Request** - No GitHub, abra um PR da sua branch para a branch `develop` do repositório original.

## 💻 Configuração do Ambiente

Para configurar o ambiente de desenvolvimento, consulte nosso guia detalhado em [Getting Started](docs/getting-started.md). Você precisará ter Node.js 22+, pnpm 10+ e MySQL 8+ instalados.

## 📝 Style Guide

### JavaScript/TypeScript

Nosso código segue padrões rigorosos de qualidade. Use TypeScript sempre que possível para garantir type safety. O projeto utiliza ESLint para linting e Prettier para formatação automática. Nomeie variáveis de forma descritiva e evite abreviações obscuras.

### React

Prefira functional components com hooks em vez de class components. Sempre defina tipos TypeScript para props e extraia lógica complexa para hooks customizados quando apropriado.

### Commits

Seguimos a convenção [Conventional Commits](https://www.conventionalcommits.org/) para mensagens de commit. O formato básico é:

```
<type>(<scope>): <subject>
```

Onde `type` pode ser: `feat` (nova funcionalidade), `fix` (correção de bug), `docs` (documentação), `style` (formatação), `refactor` (refatoração), `test` (testes), ou `chore` (manutenção).

## 🧪 Testes

Testes são essenciais para manter a qualidade do código. Escreva testes para todas as novas funcionalidades e garanta que todos os testes existentes continuem passando. Execute os testes localmente com `pnpm test` antes de abrir um Pull Request.

## 📚 Documentação

Mudanças significativas devem ser acompanhadas de atualizações na documentação. Adicione comentários em código complexo para facilitar o entendimento e atualize o README se necessário.

## ❓ Dúvidas?

Se você tiver dúvidas, pode abrir uma issue com a label `question`, entrar no nosso [Discord](https://discord.gg/napraca), ou enviar um email para dev@napraca.com.

## 🙏 Obrigado!

Sua contribuição é muito valiosa para nós e ajuda a tornar o Napraça melhor para todos! ❤️
