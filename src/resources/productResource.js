import { Components } from "../components/components.js";
import ProductModel from "../models/productModel.js";
import beforeNewOrEditForMainImage from "../actions/beforeNewOrEditForMainImage.js";
import beforeNewOrEditForOtherImages from "../actions/beforeNewOrEditForOtherImages.js";
import afterNewOrEditOrDeleteProduct from "../actions/afterNewOrEditOrDeleteProduct.js";

export default {
  resource: ProductModel,
  options: {
    properties: {
      _id: {
        isVisible: {
          list: false,
        },
      },
      description: {
        isVisible: {
          list: false,
          edit: true,
          show: true,
          filter: true,
        },
      },
      mainImage: {
        components: {
          list: Components.MainImagePreview,
          show: Components.MainImagePreview,
          edit: Components.MainImageEdit,
        },
      },
      otherImages: {
        components: {
          list: Components.OtherImagesPreview,
          show: Components.OtherImagesPreview,
          edit: Components.OtherImagesEdit,
        },
      },
    },
    actions: {
      new: {
        before: [beforeNewOrEditForMainImage, beforeNewOrEditForOtherImages],
        after: [afterNewOrEditOrDeleteProduct],
      },
      edit: {
        before: [
          beforeNewOrEditForMainImage,
          beforeNewOrEditForOtherImages,
        ],
        after: [afterNewOrEditOrDeleteProduct],
      },
      delete: {
        after: [afterNewOrEditOrDeleteProduct],
      },
    },
  },
};
