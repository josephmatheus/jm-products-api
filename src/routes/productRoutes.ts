import express from "express";
import * as productController from "../controllers/productController";

const router = express.Router();

router.get("/", productController.getRoot);
router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProductById);
router.get("/category/:name", productController.getProductsByCategory);
router.post("/products", productController.createProduct);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

export default router;
