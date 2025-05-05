import { Request, Response } from "express";
import { Cart } from "../models/cart.model";
import { Product } from "../models/product.model";

let cart: Cart[] = []

export const getCart = (req: Request, res: Response) => {
    res.json(cart);
};

export const addToCart = (req: Request, res: Response) => {
    const { product, quantity }: { product: Product; quantity: number } = req.body;
    const existingProduct = cart.find(p => p.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    res.status(201).json({ message: "Product added to cart", cart });
};

export const updateCartQuantity = (req: Request, res: Response) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    const product = cart.find(p => p.id === parseInt(productId));

    if (!product) {
        return res.status(404).json({ message: "Product not found in cart" });
    }

    product.quantity += quantity;
    if (product.quantity <= 0) {
        cart = cart.filter(p => p.id !== product.id);
    }

    res.json({ message: "Cart updated", cart });
};

export const removeFromCart = (req: Request, res: Response) => {
    const { productId } = req.params;
    cart = cart.filter(item => item.id !== parseInt(productId));
    res.json({ message: "Product removed from cart", cart });
};

export const clearCart = (req: Request, res: Response) => {
    cart = [];
    res.json({ success: true, message: "Cart has been reset", cart });
};