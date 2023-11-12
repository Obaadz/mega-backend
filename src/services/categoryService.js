import asyncHandler from "express-async-handler";
import CategoryModel from "../models/categoryModel.js";

export const getCategoriesForShopPage = asyncHandler(async (req, res) => {
  const dbCategories = await CategoryModel.find(
    {
      hideFromShopPage: false,
      products: {
        $not: { $size: 0 },
      },
    },
    { name: 1 },
    { sort: { order: 1 } }
  );

  res.status(200).json({
    isSuccess: true,
    categories: dbCategories,
  });
});
