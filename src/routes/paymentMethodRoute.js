import { Router } from "express";
import { getPaymentMethods } from "../services/paymentMethodService.js";

const paymentMethodRoute = Router();

paymentMethodRoute.get("/payment-methods", getPaymentMethods);

export { paymentMethodRoute };
