import CategoryModel from "../models/categoryModel.js";
import ProductModel from "../models/productModel.js";

export default async (res, req, ctx) => {
  if (req.method === "post") {
    await CategoryModel.updateMany(
      {},
      {
        $unset: {
          products: 1,
        },
      }
    );
  }

  const dbCategories = await CategoryModel.find({});

  const products = await ProductModel.find({});

  dbCategories.forEach(async (category) => {
    const categoryProducts = products.filter((product) => {
      return product.category?._id.toJSON() == category._id.toJSON();
    });

    await category.updateOne({
      $addToSet: {
        products: categoryProducts,
      },
    });
  });

  return res;
};
