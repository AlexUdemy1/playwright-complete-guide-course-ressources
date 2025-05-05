// import cors from "cors";
// import type { Request, Response } from "express";
// import express from "express";
// import { Product, products } from "./models/product.model";


// const app = express();
// app.use(express.json());

// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true
// }));

// let totalPrice = 0;
// let cart: { id: number; name: string; price: number; quantity: number; image: string }[] = [];

// // 🛒 GET all products
// app.get("/items", (req: Request, res: Response) => {
//     res.json(products);
// });

// // 🔍 GET product by ID
// app.get("/items/:itemId", (req: Request, res: Response) => {
//     const { itemId } = req.params;
//     const product = products.find(p => p.id === parseInt(itemId));

//     if (!product) {
//         return res.status(404).json({ message: "Product not found" });
//     }
//     res.json(product);
// });

// // 🛍️ GET cart
// app.get("/cart", (req: Request, res: Response) => {
//     res.json(cart);
// });

// // ➕ ADD to cart
// app.post("/addToCart", (req: Request, res: Response) => {
//     const { product, quantity }: { product: Product; quantity: number } = req.body;
//     const existingProduct = cart.find(p => p.id === product.id);

//     if (existingProduct) {
//         existingProduct.quantity += quantity;
//     } else {
//         cart.push({ ...product, quantity });
//     }
//     res.status(201).json({ message: "Product added to cart", cart });
// });

// // 🔄 UPDATE cart quantity
// app.put("/cart/:productId", (req: Request, res: Response) => {
//     const { productId } = req.params;
//     const { quantity } = req.body;
//     const product = cart.find(p => p.id === parseInt(productId));

//     if (!product) {
//         return res.status(404).json({ message: "Product not found in cart" });
//     }

//     product.quantity += quantity;
//     if (product.quantity <= 0) {
//         cart = cart.filter(p => p.id !== product.id);
//     }

//     res.json({ message: "Cart updated", cart });
// });

// // ❌ REMOVE item from cart
// app.delete("/cart/:productId", (req: Request, res: Response) => {
//     const { productId } = req.params;
//     cart = cart.filter(item => item.id !== parseInt(productId));
//     res.json({ message: "Product removed from cart", cart });
// });

// // 💰 SET total price
// app.post("/sum", (req: Request, res: Response) => {
//     const { totalPrice: newTotalPrice }: { totalPrice: number } = req.body;
//     totalPrice = newTotalPrice;
//     res.json({ message: "Total price updated", totalPrice });
// });

// // 💰 GET total price
// app.get("/sum", (req: Request, res: Response) => {
//     res.json(totalPrice);
// });

// // 🔍 SEARCH for products
// app.get("/search", (req: Request, res: Response) => {
//     const query = req.query.q as string;
//     if (!query) return res.json(products);

//     const filteredProducts = products.filter(product =>
//         product.name.toLowerCase().includes(query.toLowerCase()) ||
//         product.description.toLowerCase().includes(query.toLowerCase())
//     );

//     res.json(filteredProducts);
// });

// // 🗑️ CLEAR cart
// app.post("/cart/clear", (req: Request, res: Response) => {
//     cart = [];
//     res.json({ success: true, message: "Cart has been reset", cart });
// });

// // 🚀 Start server
// app.listen(3001, () => console.log("✅ Fake Server running on port 3001"));

import app from "./app";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});