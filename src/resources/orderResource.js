import beforeStatusForOrder from "../actions/beforeStatusForOrder.js";
import OrderModel from "../models/orderModel.js";

export default {
  resource: OrderModel,
  options: {
    properties: {
      _id: {
        isVisible: {
          list: false,
        },
      },
      code: {
        isVisible: {
          show: true,
          edit: false,
          filter: true,
          list: true,
        },
      },
      cartItems: {
        isVisible: {
          list: false,
          edit: true,
          filter: false,
          show: true,
        },
      },
      subTotal: {
        isVisible: {
          list: false,
          edit: false,
          new: false,
          filter: false,
          show: true,
        },
      },
      total: {
        isVisible: {
          list: true,
          edit: false,
          new: false,
          filter: false,
          show: true,
        },
      },
      "address.type": {
        isVisible: {
          show: false,
          edit: false,
          filter: false,
          list: false,
        },
      },
      "address.governorate": {
        isVisible: {
          show: true,
          edit: true,
          filter: true,
          list: false,
        },
      },
      "address.building": {
        isVisible: {
          show: true,
          edit: true,
          filter: false,
          list: false,
        },
      },
      "address.street": {
        isVisible: {
          show: true,
          edit: true,
          filter: false,
          list: false,
        },
      },
      "address.floor": {
        isVisible: {
          show: true,
          edit: true,
          filter: false,
          list: false,
        },
      },
      "address.apartment": {
        isVisible: {
          show: true,
          edit: true,
          filter: false,
          list: false,
        },
      },
      "address.directionsNotes": {
        isVisible: {
          show: true,
          edit: true,
          filter: false,
          list: false,
        },
      },
      "address.phoneNumber": {
        isVisible: {
          show: true,
          edit: true,
          filter: false,
          list: false,
        },
      },
      createdAt: {
        isVisible: {
          show: true,
          edit: false,
          filter: true,
          list: true,
        },
      },
      deliveryFee: {
        isVisible: {
          show: true,
          edit: true,
          filter: true,
          list: false,
        },
      },
    },
    actions: {
      new: {
        isVisible: false,
        before: [beforeStatusForOrder],
      },
      edit: {
        layout: ["status", "paymentMethod", "deliveryFee", "cartItems"],
        before: [beforeStatusForOrder],
      },
      delete: {
        isVisible: false,
      },
    },
  },
};
