import express from "express";
import { PrismaClient } from "@prisma/client";

const port = 3000;
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    api: "JM-PRODUCTS-API",
    message: "Bem-vindo à JM-PRODUCTS-API.",
    version: "1.0.0",
    timestamp: new Date().toLocaleString(),
  });
});

app.get("/products", async (_, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        categories: true,
        brands: true,
        products_images: {
          orderBy: {
            display_order: "asc",
          },
        },
      },
    });
    res.status(200).json({
      success: true,
      message: "Produtos obtidos com sucesso.",
      total: products.length,
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      error: "INTERNAL_SERVER_ERROR",
      message: "Não foi possivel obter os produtos.",
      timestamp: new Date().toLocaleString(),
    });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const searchID = Number(req.params.id);
    const product = await prisma.product.findUnique({
      where: {
        id: searchID,
      },
      include: {
        categories: true,
        brands: true,
        products_images: {
          orderBy: {
            display_order: "asc",
          },
        },
      },
    });
    if (!product) {
      return res.status(404).json({
        error: "NOT_FOUND",
        message: "Não foi encontrado produto com o ID informado.",
        timestamp: new Date().toLocaleString(),
      });
    }
    res.status(200).json({
      success: true,
      message: "Produto obtido com sucesso.",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      error: "INTERNAL_SERVER_ERROR",
      message: "Não foi possivel obter o produto.",
      timestamp: new Date().toLocaleString(),
    });
  }
});

app.get("/category/:name", async (req, res) => {
  try {
    const categoryName = req.params.name;
    const products = await prisma.product.findMany({
      where: {
        categories: {
          name: {
            equals: categoryName,
            mode: "insensitive",
          },
        },
      },
      orderBy: {
        id: "asc",
      },
      include: {
        categories: true,
        brands: true,
        products_images: {
          orderBy: {
            display_order: "asc",
          },
        },
      },
    });
    if (!products) {
      return res.status(404).json({
        error: "NOT_FOUND",
        message: "Não foi encontrado produto com a categoria informada.",
        timestamp: new Date().toLocaleString(),
      });
    }
    res.status(200).send({
      success: true,
      message: "Produtos obtidos com sucesso.",
      total: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      error: "INTERNAL_SERVER_ERROR",
      message: "Não foi possivel obter os produtos.",
      timestamp: new Date().toLocaleString(),
    });
  }
});

app.post("/products", async (req, res) => {
  const { name, description, price, category_id, brand_id, stock, sku } =
    req.body;
  try {
    const productExists = await prisma.product.findUnique({
      where: {
        sku: sku.toUpperCase(),
      },
    });

    if (productExists) {
      return res.status(409).json({
        error: "CONFLICT",
        message: "Ja existe um produto com o código informado.",
        timestamp: new Date().toLocaleString(),
      });
    }

    await prisma.product.create({
      data: {
        name,
        description,
        price,
        category_id,
        brand_id,
        stock,
        sku: sku.toUpperCase(),
      },
    });

    res.status(201).json({
      success: true,
      message: "Produto criado com sucesso.",
    });
  } catch (error) {
    res.status(500).json({
      error: "INTERNAL_SERVER_ERROR",
      message: "Não foi possivel criar o produto.",
      timestamp: new Date().toLocaleString(),
    });
  }
});

app.put("/products/:id", async (req, res) => {
  const searchID = Number(req.params.id);
  const { name, description, price, category_id, brand_id, stock, sku } =
    req.body;
  try {
    const productExists = await prisma.product.findUnique({
      where: {
        id: searchID,
      },
    });

    if (!productExists) {
      return res.status(404).json({
        error: "NOT_FOUND",
        message: "Não foi encontrado produto com o ID informado.",
        timestamp: new Date().toLocaleString(),
      });
    }

    await prisma.product.update({
      where: {
        id: searchID,
      },
      data: {
        name,
        description,
        price,
        category_id,
        brand_id,
        stock,
        sku: sku.toUpperCase(),
      },
    });

    res.status(200).json({
      success: true,
      message: "Produto atualizado com sucesso.",
      product: await prisma.product.findUnique({
        where: {
          id: searchID,
        },
        include: {
          categories: true,
          brands: true,
          products_images: {
            orderBy: {
              display_order: "asc",
            },
          },
        },
      })
    });
  } catch (error) {
    res.status(500).json({
      error: "INTERNAL_SERVER_ERROR",
      message: "Não foi possivel atualizar o produto.",
      timestamp: new Date().toLocaleString(),
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor em execução em http://localhost:${port}`);
});
