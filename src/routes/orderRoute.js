import { Router } from "express";
import { createOrder, getOrderById, getOrders } from "../services/orderService.js";
import protectMW from "../middlewares/protectMW.js";

const orderRoute = Router();

orderRoute.post("/orders", protectMW, createOrder);
orderRoute.get("/orders", protectMW, getOrders);
orderRoute.get("/orders/:id", protectMW, getOrderById);

export { orderRoute };
