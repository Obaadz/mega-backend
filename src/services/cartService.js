import asyncHandler from "express-async-handler";
import ApiError from "../utils/classes/apiError.js";
import objectIdSchema from "../utils/zod_schemas/objectIdSchema.js";

export const updateCart = asyncHandler(async (req, res) => {
  objectIdSchema.parse(req.body.productId);

  if (Number(req.body.quantity) === 0) throw new ApiError("Please enter quantity correctly", 400);

  const itemInCartIndex = req.dbUser.cartItems?.findIndex(
    (item) => item.product._id.toJSON() == req.body.productId
  );

  if (Number(req.body.quantity) > 0 && itemInCartIndex !== -1) {
    const newQuantity =
      req.dbUser.cartItems[itemInCartIndex].quantity + parseInt(req.body.quantity);

    req.dbUser.cartItems[itemInCartIndex].quantity = newQuantity;

    await req.dbUser.save();
  } else if (Number(req.body.quantity) > 0)
    await req.dbUser.updateOne({
      $push: {
        cartItems: { product: req.body.productId, quantity: req.body.quantity },
      },
    });
  else if (itemInCartIndex !== -1 && Number(req.body.quantity) < 0) {
    if (
      Math.abs(Number(req.body.quantity)) >= Number(req.dbUser.cartItems[itemInCartIndex].quantity)
    )
      await req.dbUser.updateOne({
        $pull: {
          cartItems: { product: req.body.productId },
        },
      });
    else {
      const newQuantity =
        req.dbUser.cartItems[itemInCartIndex].quantity + Number(req.body.quantity);

      req.dbUser.cartItems[itemInCartIndex].quantity = newQuantity;

      await req.dbUser.save();
    }
  }

  res.status(200).json({ isSuccess: true });
});

export const getCart = asyncHandler(async (req, res) => {
  await req.dbUser.populate([
    {
      path: "cartItems.product",
      select: {
        mainImage: 1,
        otherImages: 1,
        price: 1,
        name: 1,
        description: 1,
        inStock: 1,
      },
    },
  ]);

  const subTotal = req.dbUser.cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.product.price) * parseInt(item.quantity);

    return total + itemPrice;
  }, 0);

  const total = subTotal + parseFloat(process.env.DELIVERY_FEE);

  const items = req.dbUser.toJSON().cartItems.map((item) => {
    item.product.price = item.product.price.toFixed(2) + " EGP";

    return item;
  });

  const cart = {
    deliveryPrice: parseFloat(process.env.DELIVERY_FEE).toFixed(2) + " EGP",
    subTotal: subTotal.toFixed(2) + " EGP",
    total: total.toFixed(2) + " EGP",
    items,
    isUserHasFullAddress: req.dbUser.hasFullAddress,
  };

  res.status(200).json({
    isSuccess: true,
    cart,
  });
});
