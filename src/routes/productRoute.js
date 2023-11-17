import { Router } from "express";
import {
  getProductsForShopPage,
  getProductById,
  getProductsForCheckout,
} from "../services/productService.js";
import setUserIfFoundMW from "../middlewares/setUserIfFoundMW.js";

const productRoute = Router();

productRoute.get("/products", getProductsForShopPage);
productRoute.get("/products/:id", getProductById);
productRoute.put("/products/checkout", setUserIfFoundMW, getProductsForCheckout);

export { productRoute };
