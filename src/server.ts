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
        categories: {
          select: {
            name: true
          }
        },
        brands: {
          select: {
            name: true
          }
        },
        products_images: {
          orderBy: {
            display_order: "asc"
          }
        }
      }
    })
    res.status(200).json({
      "success": true,
      "message": "Produtos obtidos com sucesso.",
      "total": products.length,
      "data": products
    });
  } catch (err) {
    res.status(500).json({
      error: "INTERNAL_SERVER_ERROR",
      message: "Não foi possivel obter os produtos.",
      timestamp: new Date().toLocaleString()
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor em execução em http://localhost:${port}`);
});
