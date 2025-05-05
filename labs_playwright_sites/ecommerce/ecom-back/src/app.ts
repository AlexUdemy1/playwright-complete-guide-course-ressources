import express from "express";
import cors from "./config/cors.config";
import errorHandler from "./middleware/errorHandler";
import authRoutes from "./routes/auth.routes";
import cartRoutes from "./routes/cart.routes";
import productRoutes from "./routes/products.routes";
import sumRoutes from "./routes/sum.routes";
import userRoutes from "./routes/user.routes";
import cookieParser from "cookie-parser";

const app = express();
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

