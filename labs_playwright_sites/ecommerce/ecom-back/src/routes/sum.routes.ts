import express from "express";
import { getTotalPrice, setTotalPrice } from "../controllers/sum.controller";

const router = express.Router();

router.post("/", setTotalPrice);
router.get("/", getTotalPrice);

export default router;
