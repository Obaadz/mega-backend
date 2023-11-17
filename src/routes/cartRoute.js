import { Router } from "express";
import { updateCart } from "../services/cartService.js";
import protectMW from "../middlewares/protectMW.js";

const cartRoute = Router();

cartRoute.put("/cart", protectMW, updateCart);

export { cartRoute };
