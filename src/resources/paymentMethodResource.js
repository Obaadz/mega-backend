import beforeNewOrEditPaymentMethod from "../actions/beforeNewOrEditPaymentMethod.js";
import PaymentMethodModel from "../models/paymentMethodModel.js";

export default {
  resource: PaymentMethodModel,
  options: {
    properties: {
      _id: {
        isVisible: {
          list: false,
        },
      },
      hide: {
        isVisible: {
          list: false,
          filter: false,
          edit: false,
          show: false,
        },
      },
    },
    actions: {
      new: {
        isVisible: false,
        before: [beforeNewOrEditPaymentMethod],
      },
      edit: {
        before: [beforeNewOrEditPaymentMethod],
      },
      delete: {
        isVisible: false,
      },
    },
  },
};
