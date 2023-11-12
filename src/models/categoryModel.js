import mongoose from "mongoose";
import lodash from "lodash";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
    },
    products: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
      default: [],
    },
    hide: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 1,
      unique: true,
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

categorySchema.pre("save", async function (next) {
  if (this.isNew) {
    // Calculate the order based on the count of existing documents
    const count = await CategoryModel.countDocuments({});
    this.order = count + 1;
  }

  next();
});

const CategoryModel = mongoose.model("Category", categorySchema);

export default CategoryModel;
