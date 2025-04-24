import { Request, Response } from "express";
import { products } from "../models/product.model";

export const getAllProducts = (req: Request, res: Response) => {
    res.json(products);
};

export const getProductById = (req: Request, res: Response) => {
    const { itemId } = req.params;
    const product = products.find(p => p.id === parseInt(itemId));

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
};

export const searchProducts = (req: Request, res: Response) => {
    const query = req.query.q as string;
    if (!query) return res.json(products);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );

    res.json(filteredProducts);
};
