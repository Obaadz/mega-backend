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
          show: true,
          edit: true,
          filter: false,
          list: false,
          show: true,
        },
      },
      "address.governorate": {
        isVisible: {
          show: true,
          edit: true,
          filter: true,
          list: false,
          show: true,
        },
      },
      "address.building": {
        isVisible: {
          show: true,
          edit: true,
          filter: false,
          list: false,
          show: true,
        },
      },
      "address.street": {
        isVisible: {
          show: true,
          edit: true,
          filter: false,
          list: false,
          show: true,
        },
      },
      "address.floor": {
        isVisible: {
          show: true,
          edit: true,
          filter: false,
          list: false,
          show: true,
        },
      },
      "address.apartment": {
        isVisible: {
          show: true,
          edit: true,
          filter: false,
          list: false,
          show: true,
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
