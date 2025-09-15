import express from "express";
import { PrismaClient } from "@prisma/client";

const port = 3000;
const app = express();
const prisma = new PrismaClient();

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
          }
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

app.listen(port, () => {
  console.log(`Servidor em execução em http://localhost:${port}`);
});
