import express from "express";
import { PrismaClient } from "@prisma/client";
import { responseMessages } from "./utils/responseMessages";

const port = 3000;
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (_, res) => {
  res.json(responseMessages("/", "GET", 200));
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
    res.status(200).json(responseMessages("/products", "GET", 200, products));
  } catch (err) {
    res.status(500).json(responseMessages("/products", "GET", 500));
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
      return res.status(404).json(responseMessages("/products/:id", "GET", 404));
    }
    res.status(200).json(responseMessages("/products/:id", "GET", 200, product));
  } catch (error) {
    res.status(500).json(responseMessages("/products/:id", "GET", 500));
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
      return res.status(409).json(responseMessages("/products", "POST", 409));
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

    res.status(201).json(responseMessages("/products", "POST", 201, await prisma.product.findUnique({
      where: {
        sku: sku.toUpperCase(),
      },
      include: {
        categories: true,
        brands: true,
        products_images: {
          orderBy: {
            display_order: "asc",
          },
        },
      }
    })));
  } catch (error) {
    res.status(500).json(responseMessages("/products", "POST", 500));
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
      return res.status(404).json(responseMessages("/products/:id", "PUT", 404));
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

    res.status(200).json(responseMessages("/products/:id", "PUT", 200, await prisma.product.findUnique({
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
      )
    );
  } catch (error) {
    res.status(500).json(responseMessages("/products/:id", "PUT", 500));
  }
});

app.delete("/products/:id", async (req, res) => {
  const searchID = Number(req.params.id);
  try {
    const productExists = await prisma.product.findUnique({
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
      }
    });

    if (!productExists) {
      return res.status(404).json(responseMessages("/products/:id", "DELETE", 404));
    }

    await prisma.product.delete({
      where: {
        id: searchID,
      },
    });

    res.status(200).json(responseMessages("/products/:id", "DELETE", 200, productExists));
  } catch (error) {
    res.status(500).json(responseMessages("/products/:id", "DELETE", 500));
  }
})

app.listen(port, () => {
  console.log(`Servidor em execução em http://localhost:${port}`);
});
