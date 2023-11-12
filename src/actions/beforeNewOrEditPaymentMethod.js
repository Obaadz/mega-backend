import { ValidationError } from "adminjs";
import PaymentMethodModel from "../models/paymentMethodModel.js";

export default async (req, ctx) => {
  if (req.method === "post") {
    if (!req.payload.hide) return req;

    const dbShownPaymentMethods = await PaymentMethodModel.find({ hide: false }).lean();

    if (dbShownPaymentMethods.length < 2)
      throw new ValidationError({
        hide: {
          type: "validation",
          message: "At least one payment method should be displayed",
        },
      });
  }

  return req;
};
