import OrderModel from "../models/orderModel.js";

export default async (req, ctx) => {
  if (req.method === "post") {
    const dbOrderOld = await OrderModel.findOne({ _id: req.payload._id });

    if (dbOrderOld.status === "Order canceled" || req.payload.status !== "Order canceled")
      return req;

    // req.payload.status = "NOT SUPPORTED VALUE";

    return req;
  }

  return req;
};
