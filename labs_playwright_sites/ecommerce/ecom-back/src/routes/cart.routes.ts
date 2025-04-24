import express from "express";
import { getCart, addToCart, updateCartQuantity, removeFromCart, clearCart } from "../controllers/cart.controller";

const router = express.Router();

router.get("/", getCart);
router.post("/add", addToCart);
router.put("/:productId", updateCartQuantity);
router.delete("/:productId", removeFromCart);
router.post("/clear", clearCart);

export default router;