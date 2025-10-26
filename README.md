# JM Products API

Uma API RESTful robusta para gerenciamento de produtos, desenvolvida com Node.js, Express, TypeScript e Prisma ORM. Projeto de estudo focado em boas práticas de desenvolvimento backend.

## 📋 Sobre o Projeto

A JM Products API é uma solução completa para gerenciamento de catálogo de produtos, permitindo operações CRUD (Create, Read, Update, Delete) com suporte a categorias, marcas e múltiplas imagens por produto. O projeto segue uma arquitetura em camadas (Controller → Service → Repository) e implementa tratamento de erros centralizado com respostas padronizadas.

## 🚀 Tecnologias Utilizadas

- **NodeJS** - Ambiente de execução JavaScript
- **Express** - Framework web minimalista e flexível
- **TypeScript** - Superset JavaScript com tipagem estática
- **Prisma** - ORM moderno para Node.js e TypeScript
- **PostgreSQL** - Banco de dados relacional robusto
- **Docker & Docker Compose** - Containerização da aplicação
- **pgAdmin** - Interface gráfica para gerenciamento do PostgreSQL

## ✨ Funcionalidades

- ✅ Listagem de todos os produtos com relacionamentos
- ✅ Busca de produto por ID
- ✅ Busca de produtos por categoria (case-insensitive)
- ✅ Criação de novos produtos
- ✅ Atualização de produtos existentes
- ✅ Exclusão de produtos
- ✅ Validação automática de SKU único
- ✅ Suporte a múltiplas imagens por produto com ordenação
- ✅ Relacionamento com marcas e categorias
- ✅ Tratamento de erros centralizado
- ✅ Respostas padronizadas da API
- ✅ Timestamps automáticos (created_at, updated_at)

## 🗄️ Modelo de Dados

O projeto utiliza as seguintes entidades:

### Products

- `id` - Identificador único
- `name` - Nome do produto
- `description` - Descrição detalhada
- `price` - Preço (decimal 10,2)
- `category_id` - Relacionamento com categoria
- `brand_id` - Relacionamento com marca
- `stock` - Quantidade em estoque
- `active` - Status do produto
- `sku` - Código único do produto
- `created_at` / `updated_at` - Timestamps

### Categories

- `id` - Identificador único
- `name` - Nome da categoria

### Brands

- `id` - Identificador único
- `name` - Nome da marca

### Product_images

- `id` - Identificador único
- `product_id` - Relacionamento com produto
- `image_url` - URL da imagem
- `alt_text` - Texto alternativo
- `is_primary` - Indica imagem principal
- `display_order` - Ordem de exibição

## 📋 Pré-requisitos

### Opção 1: Instalação Local

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [PostgreSQL](https://www.postgresql.org/) (versão 12 ou superior)
- [Git](https://git-scm.com/)

### Opção 2: Com Docker (Recomendado)

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## 🔧 Instalação

### Opção 1 - Instalação Local

1. Clone o repositório:

   ```bash
   git clone https://github.com/josephmatheus/jm-products-api.git
   cd jm-products-api
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
   DATABASE_URL="postgresql://SEU_USUARIO:SUA_SENHA@localhost:5432/NOME_DO_BANCO?schema=public"
   NODE_ENV="development"
   PORT=3000
   ```

   **⚠️ Importante:** Substitua os valores conforme sua configuração do PostgreSQL local.

4. Execute as migrations do Prisma:

   ```bash
   npx prisma migrate dev
   ```

5. Gere o Prisma Client:

   ```bash
   npx prisma generate
   ```

### Opção 2 - Com Docker (Recomendado)

1. Clone o repositório:

   ```bash
   git clone https://github.com/josephmatheus/jm-products-api.git
   cd jm-products-api
   ```

2. Inicie os containers:

   ```bash
   docker-compose up -d
   ```

   Isso irá iniciar:

   - **API** na porta `3000`
   - **PostgreSQL** na porta `5432`
   - **pgAdmin** na porta `5050`

3. Acesse o pgAdmin:

- URL: `http://localhost:5050`
- Email: `admin@email.com`
- Senha: `admin`

## ▶️ Executando o Projeto

### Modo Desenvolvimento (Local)

```bash
npm run dev
```

### Modo Produção (Local)

```bash
npm run build
npm start
```

### Com Docker

```bash
# Iniciar containers
docker-compose up -d

# Ver logs
docker-compose logs -f jm-products-api

# Parar containers
docker-compose down
```

O servidor estará rodando em `http://localhost:3000`

## 📚 Endpoints da API

### 🏠 Raiz

```http
GET /
```

**Resposta (200):**

```json
{
  "api": "JM-PRODUCTS-API",
  "message": "Bem-vindo à JM-PRODUCTS-API.",
  "version": "1.0.0",
  "timestamp": "25/10/2025 10:30:00"
}
```

---

### 📦 Produtos

#### Listar todos os produtos

```http
GET /products
```

**Resposta (200):**

```json
{
  "success": true,
  "message": "Produtos obtidos com sucesso.",
  "total": 21,
  "products": [
    {
      "id": 1,
      "name": "Nike Air Max 270",
      "description": "Tênis casual com amortecimento Air Max, ideal para o dia a dia.",
      "price": "799.9",
      "category_id": 1,
      "brand_id": 1,
      "stock": 25,
      "active": true,
      "sku": "NIKE-AM270-001",
      "created_at": "2025-09-10T19:23:38.098Z",
      "updated_at": "2025-09-10T20:14:29.745Z",
      "categories": {
        "id": 1,
        "name": "Tênis"
      },
      "brands": {
        "id": 1,
        "name": "Nike"
      },
      "products_images": [
        {
          "id": 1,
          "product_id": 1,
          "image_url": "https://placedog.net/500x500",
          "alt_text": "Imagem de teste",
          "is_primary": true,
          "display_order": 1
        }
      ]
    }
  ]
}
```

---

#### Buscar produto por ID

```http
GET /products/:id
```

**Parâmetros:**

- `id` (number) - ID do produto

**Resposta (200):**

```json
{
  "success": true,
  "message": "Produto obtido com sucesso.",
  "product": { ... }
}
```

**Resposta (404):**

```json
{
  "error": "NOT_FOUND",
  "message": "Não foi encontrado produto com o ID informado.",
  "timestamp": "25/10/2025 10:30:00"
}
```

---

#### Buscar produtos por categoria

```http
GET /category/:name
```

**Parâmetros:**

- `name` (string) - Nome da categoria (case-insensitive)

**Exemplo:**

```http
GET /category/eletrônicos
```

**Resposta (200):**

```json
{
  "success": true,
  "message": "Produtos obtidos com sucesso.",
  "product": [ ... ]
}
```

**Resposta (404):**

```json
{
  "error": "NOT_FOUND",
  "message": "Não foram encontrados produtos com a categoria informada.",
  "timestamp": "25/10/2025 10:30:00"
}
```

---

#### Criar novo produto

```http
POST /products
Content-Type: application/json
```

**Body:**

```json
{
  "name": "Tênis Running Ultraboost",
  "description": "Tênis de corrida com tecnologia Boost para máximo retorno de energia e conforto",
  "price": 749.99,
  "category_id": 1,
  "brand_id": 2,
  "stock": 50,
  "sku": "adi-ub-blk"
}
```

**Resposta (201):**

```json
{
  "success": true,
  "message": "Produto criado com sucesso.",
  "product": { ... }
}
```

**Resposta (409):**

```json
{
  "error": "CONFLICT",
  "message": "Já existe um produto com o código informado.",
  "timestamp": "25/10/2025 10:30:00"
}
```

**Observações:**

- O SKU é automaticamente convertido para UPPERCASE
- Todos os campos são obrigatórios exceto `description`

---

#### Atualizar produto

```http
PUT /products/:id
Content-Type: application/json
```

**Body:**

```json
{
  "name": "Tênis Running Ultraboost",
  "description": "Tênis de corrida com tecnologia Boost para máximo retorno de energia e conforto",
  "price": 749.99,
  "category_id": 1,
  "brand_id": 2,
  "stock": 50,
  "sku": "adi-ub-blk"
}
```

**Resposta (200):**

```json
{
  "success": true,
  "message": "Produto atualizado com sucesso.",
  "product": { ... }
}
```

---

#### Excluir produto

```http
DELETE /products/:id
```

**Resposta (200):**

```json
{
  "success": true,
  "message": "Produto deletado com sucesso.",
  "product": { ... }
}
```

## 📁 Estrutura do Projeto

```txt
jm-products-api/
├── data/                          # Volumes do Docker (gerado)
│   ├── pgadmin/
│   └── postgres/
├── dist/                          # Arquivos compilados (gerado)
├── prisma/
│   └── schema.prisma              # Schema do banco de dados
├── src/
│   ├── controllers/
│   │   └── productController.ts   # Controladores das rotas
│   ├── middleware/
│   │   └── errorHandler.ts        # Tratamento de erros
│   ├── routes/
│   │   └── productRoutes.ts       # Definição das rotas
│   ├── services/
│   │   └── productService.ts      # Lógica de negócio
│   ├── utils/
│   │   └── responseMessages.ts    # Respostas padronizadas
│   └── server.ts                  # Arquivo principal
├── docker-compose.yml             # Configuração Docker
├── Dockerfile                     # Imagem Docker da API
├── package.json
├── tsconfig.json
└── .env                           # Variáveis de ambiente
```

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor em modo desenvolvimento com hot-reload

# Produção
npm run build           # Compila TypeScript para JavaScript
npm start               # Inicia servidor em modo produção

# Prisma
npx prisma studio       # Interface visual do banco de dados
npx prisma migrate dev  # Cria e aplica migrations
npx prisma generate     # Gera Prisma Client
npx prisma db push      # Sincroniza schema com banco

# Docker
docker-compose up -d    # Inicia containers em background
docker-compose down     # Para e remove containers
docker-compose logs -f  # Visualiza logs em tempo real
```

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas:

```txt
Request → Routes → Controllers → Services → Prisma → Database
                        ↓
                  Error Handler
                        ↓
                 Response Messages
```

### Camadas

1. **Routes** - Define as rotas HTTP e associa aos controllers
2. **Controllers** - Valida requisições e coordena a resposta
3. **Services** - Implementa a lógica de negócio e acessa o banco
4. **Middleware** - Trata erros de forma centralizada
5. **Utils** - Funções auxiliares (respostas padronizadas)

## 🔒 Tratamento de Erros

A API possui um sistema robusto de tratamento de erros:

### Status Codes

- ✅ **200** - Sucesso (GET, PUT, DELETE)
- ✅ **201** - Criado com sucesso (POST)
- ⚠️ **400** - Requisição inválida
- ⚠️ **404** - Recurso não encontrado
- ⚠️ **409** - Conflito (SKU duplicado)
- ❌ **500** - Erro interno do servidor

### Formato de Resposta de Erro

```json
{
  "error": "NOT_FOUND",
  "message": "Não foi encontrado produto com o ID informado.",
  "timestamp": "25/10/2025 10:30:00"
}
```

## 🐳 Docker

O projeto inclui configuração completa para Docker:

### Serviços

- **jm-products-api** - API em Node.js (porta 3000)
- **jm-products-db** - PostgreSQL 15 (porta 5432)
- **jm-products-pgadmin** - pgAdmin 4 (porta 5050)

### Volumes

- `./data/postgres` - Dados persistentes do PostgreSQL
- `./data/pgadmin` - Configurações do pgAdmin

### Network

- `jm-products-network` - Rede bridge para comunicação entre containers

## 📝 Boas Práticas Implementadas

- ✅ Tipagem forte com TypeScript
- ✅ Separação de responsabilidades (MVC)
- ✅ Tratamento de erros centralizado
- ✅ Respostas padronizadas da API
- ✅ Validações de dados
- ✅ Uso de ORM (Prisma)
- ✅ Containerização com Docker
- ✅ Migrations para controle de versão do banco
- ✅ Relacionamentos entre entidades
- ✅ Ordenação automática de resultados

## 🤝 Como Contribuir

Contribuições são sempre bem-vindas! Este projeto segue o padrão de **Commits Semânticos** com emojis.

**Exemplo de commit:**

```bash
✨ feat: Adiciona endpoint de busca por SKU
```

Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feat/MinhaFeature`)
3. Commit suas mudanças seguindo o padrão
4. Push para a branch (`git push origin feat/MinhaFeature`)
5. Abra um Pull Request

📖 **Leia o guia completo de contribuição:** [CONTRIBUTING.md](CONTRIBUTING.md)

O guia inclui:

- Padrões de commits detalhados
- Setup do ambiente de desenvolvimento
- Processo de Pull Request
- Guia de estilo de código
- Como reportar bugs e sugerir melhorias

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

### Joseph Matheus

- GitHub: [@josephmatheus](https://github.com/josephmatheus)
- Repositório: [jm-products-api](https://github.com/josephmatheus/jm-products-api)

---

## ⚠️ Aviso

Este é um **projeto de estudo e portfólio**. Não há suporte ativo ou garantia de manutenção contínua.

Se você encontrar algum problema ou tiver sugestões, sinta-se à vontade para:

- Abrir uma [issue](https://github.com/josephmatheus/jm-products-api/issues)
- Fazer um fork e adaptar para suas necessidades

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela no repositório!**
