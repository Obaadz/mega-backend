import { Router } from "express";
import {
  getUserInfo,
  updateUser,
  updateUserCart,
  userLogin,
  userRegister,
} from "../services/userService.js";
import protectMW from "../middlewares/protectMW.js";

const userRoute = Router();

userRoute.post("/users/register", userRegister);
userRoute.post("/users/login", userLogin);
userRoute.get("/users", protectMW, getUserInfo);
userRoute.put("/users", protectMW, updateUser);
userRoute.put("/users/cart", protectMW, updateUserCart);

export { userRoute };
