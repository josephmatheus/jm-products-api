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
        brands: true
      }
    })
    res.status(200).json(products);
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
