import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProducts = async () => {
  return await prisma.product.findMany({
    orderBy: { id: "asc" },
    include: {
      categories: true,
      brands: true,
      products_images: {
        orderBy: { display_order: "asc" },
      },
    },
  });
};

export const getProductById = async (id) => {
  return await prisma.product.findUnique({
    where: { id: Number(id) },
    include: {
      categories: true,
      brands: true,
      products_images: {
        orderBy: { display_order: "asc" },
      },
    },
  });
};

export const getProductsByCategory = async (categoryName) => {
  return await prisma.product.findMany({
    where: {
      categories: {
        name: {
          equals: categoryName,
          mode: "insensitive",
        },
      },
    },
    orderBy: { id: "asc" },
    include: {
      categories: true,
      brands: true,
      products_images: {
        orderBy: { display_order: "asc" },
      },
    },
  });
};

export const checkProductBySku = async (sku) => {
  return await prisma.product.findUnique({
    where: { sku: sku.toUpperCase() },
  });
};

export const createProduct = async (productData) => {
  const { name, description, price, category_id, brand_id, stock, sku } =
    productData;

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

  return await prisma.product.findUnique({
    where: { sku: sku.toUpperCase() },
    include: {
      categories: true,
      brands: true,
      products_images: {
        orderBy: { display_order: "asc" },
      },
    },
  });
};

export const updateProduct = async (id, productData) => {
  const { name, description, price, category_id, brand_id, stock, sku } =
    productData;

  await prisma.product.update({
    where: { id: Number(id) },
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

  return await prisma.product.findUnique({
    where: { id: Number(id) },
    include: {
      categories: true,
      brands: true,
      products_images: {
        orderBy: { display_order: "asc" },
      },
    },
  });
};

export const deleteProduct = async (id) => {
  return await prisma.product.delete({
    where: { id: Number(id) },
  });
};
