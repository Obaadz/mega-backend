import { Router } from "express";
import { updateCart, getCart } from "../services/cartService.js";
import protectMW from "../middlewares/protectMW.js";

const cartRoute = Router();

cartRoute.put("/cart", protectMW, updateCart);
cartRoute.get("/cart", protectMW, getCart);

export { cartRoute };
