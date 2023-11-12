import UserModel from "../models/userModel.js";

export default {
  resource: UserModel,
  options: {
    properties: {
      _id: {
        isVisible: {
          list: false,
        },
      },
      password: {
        isVisible: {
          list: false,
          edit: false,
          show: false,
          filter: false,
        },
      },
      "address.type": {
        isVisible: {
          show: true,
          edit: true,
          filter: false,
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
      orders: {
        isVisible: {
          show: false,
          edit: false,
          filter: false,
          list: false,
        },
      },
    },
    actions: {
      new: {
        isVisible: false,
      },
    },
  },
};
