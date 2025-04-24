import { Request, Response } from "express";

let totalPrice = 0;

export const setTotalPrice = (req: Request, res: Response) => {
    const { totalPrice: newTotalPrice }: { totalPrice: number } = req.body;
    totalPrice = newTotalPrice;
    res.json({ message: "Total price updated", totalPrice });
};

export const getTotalPrice = (req: Request, res: Response) => {
    res.json(totalPrice);
};
