import { Router } from "express";
import { getCategoriesForShopPage } from "../services/categoryService.js";

const categoryRoute = Router();

categoryRoute.get("/categories", getCategoriesForShopPage);

export { categoryRoute };
