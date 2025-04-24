import express from "express";
import cors from "./config/cors.config";
import errorHandler from "./middleware/errorHandler";
import productRoutes from "./routes/products.routes";
import cartRoutes from "./routes/cart.routes";
import sumRoutes from "./routes/sum.routes";

const app = express();
app.use(express.json());
app.use(cors);

app.use("/items", productRoutes);
app.use("/cart", cartRoutes);
app.use("/sum", sumRoutes);

app.use(errorHandler);

export default app;
