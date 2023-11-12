import asyncHandler from "express-async-handler";
import PaymentMethodModel from "../models/paymentMethodModel.js";

export const getPaymentMethods = asyncHandler(async (req, res) => {
  const dbPaymentMethods = await PaymentMethodModel.find(
    { hide: false },
    { name: 1, description: 1 }
  ).lean();

  res.status(200).json({ isSuccess: true, paymentMethods: dbPaymentMethods });
});
