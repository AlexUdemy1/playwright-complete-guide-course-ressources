import express from "express";
import { getAllProducts, getProductById, searchProducts } from "../controllers/products.controller";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:itemId", getProductById);
router.get("/search", searchProducts);

export default router;
