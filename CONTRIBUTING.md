# Guia de Contribuição

Obrigado por considerar contribuir com o **JM Products API**! 🎉

> ⚠️ **Nota:** Este é um projeto de estudo e portfólio. Não há suporte ativo ou garantia de que Pull Requests serão revisados ou mergeados. Sinta-se livre para fazer um fork e adaptar o projeto para suas necessidades.

Este documento fornece diretrizes para contribuir com o projeto. Seguir essas diretrizes ajuda a manter um padrão de qualidade e organização no código.

## 📋 Índice

- [Código de Conduta](#-código-de-conduta)
- [Como Posso Contribuir?](#-como-posso-contribuir)
- [Configurando o Ambiente](#-configurando-o-ambiente)
- [Padrão de Commits](#-padrão-de-commits)
- [Processo de Pull Request](#-processo-de-pull-request)
- [Guia de Estilo](#-guia-de-estilo)
- [Reportando Bugs](#-reportando-bugs)
- [Sugerindo Melhorias](#-sugerindo-melhorias)

## 📜 Código de Conduta

Este projeto segue um código de conduta. Ao participar, espera-se que você mantenha um ambiente respeitoso e acolhedor para todos.

### Comportamentos esperados

- ✅ Use linguagem acolhedora e inclusiva
- ✅ Respeite diferentes pontos de vista e experiências
- ✅ Aceite críticas construtivas com elegância
- ✅ Foque no que é melhor para a comunidade
- ✅ Mostre empatia com outros membros da comunidade

### Comportamentos inaceitáveis

- ❌ Uso de linguagem ou imagens sexualizadas
- ❌ Comentários insultuosos ou depreciativos (trolling)
- ❌ Assédio público ou privado
- ❌ Publicar informações privadas de outros sem permissão
- ❌ Outras condutas consideradas inapropriadas

## 🤝 Como Posso Contribuir?

Existem várias formas de contribuir com o projeto:

### 1. Reportando Bugs

Encontrou um bug? Ajude-nos a melhorar! Veja [Reportando Bugs](#-reportando-bugs).

### 2. Sugerindo Melhorias

Tem ideias para novos recursos? Veja [Sugerindo Melhorias](#-sugerindo-melhorias).

### 3. Contribuindo com Código

Quer implementar algo novo ou corrigir um bug? Siga o [Processo de Pull Request](#-processo-de-pull-request).

### 4. Melhorando a Documentação

Documentação clara é essencial! Correções de typos, exemplos adicionais e melhorias na clareza são sempre bem-vindas.

## 🔧 Configurando o Ambiente

### Pré-requisitos

- Node.js 18+
- PostgreSQL 12+
- Docker e Docker Compose (opcional)
- Git

### Setup Local

1. **Fork o repositório**
   - Clique em "Fork" no canto superior direito da página do repositório

2. **Clone seu fork**

   ```bash
   git clone https://github.com/SEU_USUARIO/jm-products-api.git
   cd jm-products-api
   ```

3. **Adicione o repositório original como upstream**

   ```bash
   git remote add upstream https://github.com/josephmatheus/jm-products-api.git
   ```

4. **Instale as dependências**

   ```bash
   npm install
   ```

5. **Configure as variáveis de ambiente**

   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

6. **Configure o banco de dados**

   **Opção 1: Com Docker (Recomendado)**

   ```bash
   docker-compose up -d jm-products-db
   ```

   **Opção 2: PostgreSQL Local**

   ```bash
   # Crie o banco de dados
   createdb jm_products_db
   ```

7. **Execute as migrations**

   ```bash
   npx prisma migrate dev
   ```

8. **Inicie o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

9. **Verifique se está funcionando**

   ```bash
   curl http://localhost:3000
   ```

### Setup com Docker (Alternativa)

```bash
docker-compose up -d
```

## 📝 Padrão de Commits

Este projeto segue o padrão de **Commits Semânticos** com emojis para facilitar a leitura do histórico.

### Formato

```txt
<emoji> <tipo>: <descrição curta>

[corpo opcional]

[rodapé opcional]
```

### Tipos de Commit

| Tipo | Emoji | Quando usar | Exemplo |
|------|-------|-------------|---------|
| **feat** | ✨ `:sparkles:` | Nova funcionalidade | `✨ feat: Adiciona endpoint de busca por marca` |
| **fix** | 🐛 `:bug:` | Correção de bug | `🐛 fix: Corrige validação de preço negativo` |
| **docs** | 📚 `:books:` | Documentação | `📚 docs: Atualiza exemplos de uso da API` |
| **style** | 💄 `:lipstick:` | Formatação, estilo | `💄 style: Formata código com Prettier` |
| **refactor** | ♻️ `:recycle:` | Refatoração | `♻️ refactor: Simplifica lógica do productService` |
| **test** | 🧪 `:test_tube:` | Testes | `🧪 test: Adiciona testes para createProduct` |
| **chore** | 🔧 `:wrench:` | Configurações | `🔧 chore: Atualiza dependências do projeto` |
| **perf** | ⚡ `:zap:` | Performance | `⚡ perf: Otimiza query de listagem de produtos` |
| **build** | 📦 `:package:` | Build, dependências | `📦 build: Adiciona dotenv ao projeto` |
| **ci** | 🧱 `:bricks:` | CI/CD | `🧱 ci: Configura GitHub Actions` |
| **revert** | 💥 `:boom:` | Reverter mudanças | `💥 revert: Reverte commit abc123` |
| **cleanup** | 🧹 `:broom:` | Limpeza de código | `🧹 cleanup: Remove código comentado` |
| **remove** | 🗑️ `:wastebasket:` | Remoção de arquivos | `🗑️ remove: Remove endpoint obsoleto` |

### Regras

1. **Use o tipo apropriado** para cada commit
2. **Primeira linha**: máximo de 72 caracteres
3. **Descrição**: use verbos no imperativo ("Adiciona", não "Adicionado")
4. **Corpo** (opcional): explique o "porquê" das mudanças
5. **Rodapé** (opcional): referências a issues (`Refs #123`, `Closes #456`)

### Exemplos Bons ✅

```bash
✨ feat: Adiciona endpoint de filtro por faixa de preço

Permite filtrar produtos por preço mínimo e máximo.
Adiciona validação para garantir que min < max.

Closes #42
```

```bash
🐛 fix: Corrige erro ao deletar produto com imagens

O endpoint DELETE estava falhando quando o produto
tinha imagens associadas. Agora remove as imagens
primeiro antes de deletar o produto.

Fixes #78
```

```bash
📚 docs: Adiciona exemplos de request/response no README
```

### Exemplos Ruins ❌

```bash
fix bug
```

```bash
Atualizado o código
```

```bash
feat: adiciona funcionalidade X, corrige bug Y, atualiza dependências
```

### Referência Completa

Para ver todos os tipos e emojis disponíveis, consulte: [Padrões de Commits](https://github.com/iuricode/padroes-de-commits)

## 🔄 Processo de Pull Request

### Antes de Começar

1. **Verifique se já existe uma issue** relacionada ao que você quer fazer
2. **Se não existir**, crie uma issue primeiro para discussão
3. **Aguarde aprovação** antes de começar a trabalhar (para features grandes)

### Criando um Pull Request

1. **Crie uma branch a partir da `main`**

   ```bash
   git checkout main
   git pull upstream main
   git checkout -b feat/minha-feature
   ```

2. **Faça suas alterações**
   - Escreva código limpo e bem documentado
   - Siga o [Guia de Estilo](#-guia-de-estilo)
   - Teste suas alterações

3. **Commit suas mudanças**

   ```bash
   git add .
   git commit -m "✨ feat: Adiciona minha feature"
   ```

4. **Mantenha sua branch atualizada**

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

5. **Push para seu fork**

   ```bash
   git push origin feat/minha-feature
   ```

6. **Abra um Pull Request**
   - Vá até o repositório original no GitHub
   - Clique em "New Pull Request"
   - Selecione sua branch
   - Preencha o template de PR

### Template de Pull Request

```markdown
## Descrição
Descreva suas mudanças aqui.

## Tipo de mudança
- [ ] 🐛 Bug fix (correção de problema)
- [ ] ✨ Nova feature (funcionalidade)
- [ ] 💥 Breaking change (mudança que quebra compatibilidade)
- [ ] 📚 Documentação
- [ ] ♻️ Refatoração

## Checklist
- [ ] Meu código segue o guia de estilo do projeto
- [ ] Realizei uma auto-revisão do meu código
- [ ] Comentei partes complexas do código
- [ ] Atualizei a documentação
- [ ] Minhas mudanças não geram novos warnings
- [ ] Testei localmente

## Issues Relacionadas
Closes #123
Refs #456
```

### Revisão de Código

- ✅ Seja receptivo ao feedback
- ✅ Responda aos comentários de forma construtiva
- ✅ Faça as alterações solicitadas
- ✅ Resolva conversas quando aplicável
- ✅ Seja paciente durante o processo de revisão

## 🎨 Guia de Estilo

### TypeScript

- Use **TypeScript** sempre que possível
- Evite usar `any`, prefira tipos específicos
- Use **interfaces** para estruturas de dados
- Documente funções complexas com JSDoc

### Nomenclatura

```typescript
// ✅ Bom
const getUserById = async (id: number) => { ... }
const productService = new ProductService();
const MAX_RETRY_COUNT = 3;

// ❌ Ruim
const getuser = async (id: number) => { ... }
const ps = new ProductService();
const max = 3;
```

### Estrutura de Arquivos

```txt
src/
├── controllers/     # Controladores de rota
├── middleware/      # Middlewares
├── routes/          # Definição de rotas
├── services/        # Lógica de negócio
├── utils/           # Funções utilitárias
```

### Funções

- Use **async/await** em vez de Promises
- Prefira **arrow functions** para funções simples
- Use **try-catch** para tratamento de erros

```typescript
// ✅ Bom
export const getProductById = async (id: number) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    return product;
  } catch (error) {
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
};
```

### Comentários

```typescript
// ✅ Comente o "porquê", não o "o quê"

// Convertemos SKU para uppercase para garantir unicidade
// independente de como o usuário envia
const normalizedSku = sku.toUpperCase();

// ❌ Não faça isso
// Converte para uppercase
const normalizedSku = sku.toUpperCase();
```

## 🐛 Reportando Bugs

### Antes de Reportar

1. **Verifique se o bug já foi reportado** nas [Issues](https://github.com/josephmatheus/jm-products-api/issues)
2. **Certifique-se de estar usando a versão mais recente**
3. **Colete informações** sobre o bug

### Como Reportar

Crie uma issue com as seguintes informações:

```markdown
**Descrição do Bug**
Descrição clara e concisa do que está acontecendo.

**Como Reproduzir**
1. Vá para '...'
2. Execute '...'
3. Veja o erro

**Comportamento Esperado**
O que deveria acontecer.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente:**
 - OS: [ex: Ubuntu 22.04]
 - Node: [ex: 18.17.0]
 - Versão da API: [ex: 1.0.0]

**Logs de Erro**
```

Cole os logs aqui

```markdown

**Contexto Adicional**
Qualquer outra informação relevante.
```

## 💡 Sugerindo Melhorias

### Antes de Sugerir

1. **Verifique se já foi sugerido** nas [Issues](https://github.com/josephmatheus/jm-products-api/issues)
2. **Considere se a sugestão se alinha** com os objetivos do projeto

### Como Sugerir

Crie uma issue com:

```markdown
**Descrição da Feature**
Descrição clara do que você gostaria de ver implementado.

**Problema que Resolve**
Que problema esta feature resolveria?

**Solução Proposta**
Como você imagina que isso funcionaria?

**Alternativas Consideradas**
Quais outras soluções você considerou?

**Contexto Adicional**
Screenshots, mockups, exemplos de outras APIs, etc.
```

## ❓ Problemas ou Dúvidas?

**Este é um projeto educacional e não possui suporte ativo.**

Se você encontrar algum problema ou tiver sugestões:

- Abra uma [issue](https://github.com/josephmatheus/jm-products-api/issues) descrevendo o problema ou sugestão
- Considere fazer um fork e implementar suas próprias melhorias
- Use o projeto como referência para seus próprios estudos

**Nota:** Não há garantia de resposta ou implementação de sugestões, mas feedback e contribuições são sempre bem-vindos!

## 📚 Recursos Úteis

- [Conventional Commits](https://www.conventionalcommits.org/pt-br/)
- [Padrões de Commits](https://github.com/iuricode/padroes-de-commits)
- [Documentação do Prisma](https://www.prisma.io/docs)
- [Documentação do Express](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## Obrigado por contribuir! 🎉

[Voltar ao topo ⬆️](#guia-de-contribuição)
