import mongoose from "mongoose";
import lodash from "lodash";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    mainImage: {
      type: String,
      required: [true, "Product main image is required"],
    },
    otherImages: {
      type: [String],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    priceBeforeDiscount: {
      type: Number,
    },
    inStock: {
      type: Boolean,
    },
    description: {
      type: String,
    },
    __v: {
      type: Number,
      select: false,
    },
  },
  {
    id: false,
  }
);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
