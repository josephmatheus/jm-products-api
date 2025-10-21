import { responseMessages } from "../utils/responseMessages";
import * as productService from "../services/productService";

export const getRoot = (req, res) => {
  const response = responseMessages("/", "GET", 200);
  res.status(200).json(response);
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    const response = responseMessages("/products", "GET", 200, products);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    if (!product) {
      const response = responseMessages("/products/:id", "GET", 404);
      return res.status(404).json(response);
    }

    const response = responseMessages("/products/:id", "GET", 200, product);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getProductsByCategory = async (req, res, next) => {
  try {
    const { name } = req.params;
    const products = await productService.getProductsByCategory(name);

    if (!products || products.length === 0) {
      const response = responseMessages("/category/:name", "GET", 404);
      return res.status(404).json(response);
    }

    const response = responseMessages("/category/:name", "GET", 200, products);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { sku } = req.body;

    const productExists = await productService.checkProductBySku(sku);
    if (productExists) {
      const response = responseMessages("/products", "POST", 409);
      return res.status(409).json(response);
    }

    const newProduct = await productService.createProduct(req.body);
    const response = responseMessages("/products", "POST", 201, newProduct);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const productExists = await productService.getProductById(id);
    if (!productExists) {
      const response = responseMessages("/products/:id", "PUT", 404);
      return res.status(404).json(response);
    }

    const updatedProduct = await productService.updateProduct(id, req.body);
    const response = responseMessages(
      "/products/:id",
      "PUT",
      200,
      updatedProduct
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const productExists = await productService.getProductById(id);
    if (!productExists) {
      const response = responseMessages("/products/:id", "DELETE", 404);
      return res.status(404).json(response);
    }

    const deletedProduct = await productService.deleteProduct(id);
    const response = responseMessages(
      "/products/:id",
      "DELETE",
      200,
      deletedProduct
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
