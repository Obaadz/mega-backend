import asyncHandler from "express-async-handler";
import ProductModel from "../models/productModel.js";
import CategoryModel from "../models/categoryModel.js";
import ApiError from "../utils/classes/apiError.js";

export const getProductsForShopPage = asyncHandler(async (req, res) => {
  const page = Number(req.query.page || "1");
  const search = req.query.search || "";
  const searchRegex = new RegExp(`^${search}`, "i");
  const category = req.query.category_id
    ? await CategoryModel.findOne({ _id: req.query.category_id })
    : undefined;

  const query = {
    ...(search && { name: searchRegex }),
    ...(category && { category }),
  };

  const options = {
    limit: Number(process.env.PAGE_LIMIT),
    skip: Number(process.env.PAGE_LIMIT) * (page - 1),
  };

  const [products, totalCount] = await Promise.all([
    ProductModel.find(
      query,
      { name: 1, price: 1, mainImage: 1, otherImages: 1, inStock: 1 },
      options
    ).lean(),
    ProductModel.countDocuments(query),
  ]);

  products.forEach((product) => {
    product.price = product.price.toFixed(2) + " EGP";
  });

  res.status(200).json({
    isSuccess: true,
    products,
    totalPages: Math.ceil(totalCount / Number(process.env.PAGE_LIMIT)),
  });
});

export const getProductsForCart = asyncHandler(async (req, res) => {
  let subTotal = 0,
    total = 0;
  const cartItems = [];
  const productIds = req.body.cartItems?.map((item) => item.product._id) || [];

  const products = await ProductModel.find(
    {
      _id: { $in: productIds },
    },
    {
      name: 1,
      price: 1,
      mainImage: 1,
      inStock: 1,
    }
  ).lean();

  products.forEach((product) => {
    const item = {
      totalPrice: 0,
      quantity: 0,
      product: {},
    };
    const cartItem = req.body.cartItems.find((item) => item.product._id == product._id);

    item.quantity = cartItem.quantity;

    item.totalPrice = item.quantity * product.price;
    product.price = product.price.toFixed(2) + " EGP";

    subTotal += item.totalPrice;
    total += item.totalPrice;
    item.totalPrice = item.totalPrice.toFixed(2) + " EGP";

    item.product = product;

    cartItems.push(item);
  });

  subTotal = subTotal.toFixed(2) + " EGP";
  total = total.toFixed(2) + " EGP";

  res.status(200).json({
    isSuccess: true,
    cartItems,
    subTotal,
    total,
  });
});

export const getProductsForCheckout = asyncHandler(async (req, res) => {
  let subTotal = 0,
    total = 0;
  const cartItems = [];
  const productIds = req.body.cartItems?.map((item) => item.product._id) || [];

  const products = await ProductModel.find(
    {
      _id: { $in: productIds },
    },
    {
      name: 1,
      price: 1,
      mainImage: 1,
      inStock: 1,
    }
  ).lean();

  products.forEach((product) => {
    const item = {
      totalPrice: 0,
      quantity: 0,
      product: {},
    };
    const cartItem = req.body.cartItems.find((item) => item.product._id == product._id);

    item.quantity = cartItem.quantity;

    item.totalPrice = item.quantity * product.price;
    product.price = product.price.toFixed(2) + " EGP";

    subTotal += item.totalPrice;
    total += item.totalPrice;
    item.totalPrice = item.totalPrice.toFixed(2) + " EGP";

    item.product = product;

    cartItems.push(item);
  });

  let deliveryFee = Number(process.env.DELIVERY_FEE);

  total = subTotal + deliveryFee;

  subTotal = subTotal.toFixed(2) + " EGP";
  deliveryFee = deliveryFee.toFixed(2) + " EGP";
  total = total.toFixed(2) + " EGP";

  res.status(200).json({
    isSuccess: true,
    cartItems,
    subTotal,
    deliveryFee,
    total,
  });
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await ProductModel.findOne(
    {
      _id: req.params.id,
    },
    {
      name: 1,
      price: 1,
      mainImage: 1,
      otherImages: 1,
      inStock: 1,
      description: 1,
    }
  ).lean();

  if (!product) throw new ApiError("Product not found", 400);

  product.price = product.price.toFixed(2) + " EGP";

  res.status(200).json({
    isSuccess: true,
    product,
  });
});
