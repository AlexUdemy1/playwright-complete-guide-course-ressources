import cookieParser from "cookie-parser";
import express from "express";
import path from "path";
import cors from "./config/cors.config";
import errorHandler from "./middleware/errorHandler";
import authRoutes from "./routes/auth.routes";
import cartRoutes from "./routes/cart.routes";
import productRoutes from "./routes/products.routes";
import sumRoutes from "./routes/sum.routes";
import userRoutes from "./routes/user.routes";

const app = express();
app.use("/assets", express.static(path.join(__dirname, "..", "assets")));
app.use(express.json());
app.use(cookieParser());
app.use(cors);

app.use("/items", productRoutes);
app.use("/cart", cartRoutes);
app.use("/sum", sumRoutes);
app.use('/users', userRoutes);
app.use('/login', authRoutes);

app.use(errorHandler);

export default app;

