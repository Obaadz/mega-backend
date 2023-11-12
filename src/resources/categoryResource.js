import CategoryModel from "../models/categoryModel.js";

export default {
  resource: CategoryModel,
  options: {
    properties: {
      _id: {
        isVisible: {
          list: false,
        },
      },
      products: {
        isVisible: {
          list: false,
          edit: false,
          show: false,
          filter: false,
        },
      },
    },
    actions: {
      new: {
        layout: ["name", "hide"],
      },
    },
  },
};
