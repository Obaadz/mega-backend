import asyncHandler from "express-async-handler";
import OrderModel from "../models/orderModel.js";
import ApiError from "../utils/classes/apiError.js";

export const createOrder = asyncHandler(async (req, res) => {
  if (req.dbUser.cartItems?.length < 1) throw new ApiError("There is no items in your cart", 400);

  const cartItems = [];

  await req.dbUser.populate({ path: "cartItems.product" });

  req.dbUser.cartItems.forEach((cartItem) => {
    const item = {
      quantity: 0,
      product: {},
      priceWhenOrdered: 0,
    };

    item.quantity = cartItem.quantity;
    item.priceWhenOrdered = cartItem.product.price;

    item.product = cartItem.product;

    cartItems.push(item);
  });

  const dbOrder = await OrderModel.create({
    cartItems,
    user: req.dbUser._id,
    deliveryFee: Number(process.env.DELIVERY_FEE),
    address: req.dbUser.address,
    paymentMethod: req.body.paymentMethod,
  });

  await req.dbUser.updateOne({
    $addToSet: {
      orders: dbOrder._id,
    },
    $unset: {
      cartItems: 1,
    },
  });

  res.status(201).json({
    isSuccess: true,
    orderId: dbOrder._id,
  });
});

export const getOrders = asyncHandler(async (req, res) => {
  await req.dbUser.populate({
    path: "orders",
    select: {
      code: 1,
      createdAt: 1,
      deliveryFee: 1,
      status: 1,
      "orders.address": 1,
      address: 1,
      cartItems: 1,
      paymentMethod: 1,
    },
    options: {
      sort: { createdAt: -1 },
    },
    populate: [{ path: "cartItems.product", select: { name: 1 } }],
  });

  const orders = req.dbUser.toJSON().orders;

  orders.forEach((order) => {
    order.subTotal = order.subTotal.toFixed(2) + " EGP";
    order.deliveryFee = order.deliveryFee.toFixed(2) + " EGP";
    order.total = order.total.toFixed(2) + " EGP";

    order.cartItems.forEach((item) => {
      item.priceWithQuantityWhenOrdered = item.priceWhenOrdered * item.quantity;
      item.priceWhenOrdered = item.priceWhenOrdered.toFixed(2) + " EGP";
      item.priceWithQuantityWhenOrdered = item.priceWithQuantityWhenOrdered.toFixed(2) + " EGP";
    });

    order.createdAt = new Date(order.createdAt)
      .toLocaleDateString("en-EG", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(/at/, "-");
  });

  res.status(200).json({
    isSuccess: true,
    orders,
  });
});
