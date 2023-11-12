import mongoose from "mongoose";
import generateUniqueString from "../utils/generateUniqueString.js";

const orderSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      default: generateUniqueString,
    },
    cartItems: {
      _id: false,
      type: [
        {
          quantity: Number,
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          priceWhenOrdered: {
            type: Number,
            required: [true, "Price is required"],
          },
        },
      ],
      required: [true, "Cart items is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deliveryFee: {
      type: Number,
      required: [true, "Delivery Fee is required"],
    },
    status: {
      type: String,
      enum: {
        values: [
          "Order canceled",
          // "Order declined",
          "Order in progress",
          "Preparing order",
          "Delivery in progress",
          "Order received",
        ],
        message: "Order canceled status available only for customers",
      },
      default: "Order in progress",
      required: [true, "Order status is required"],
    },
    address: {
      _id: false,
      type: {
        type: String,
        enum: ["House", "Apartment"],
        required: [true, "Please enter the full address"],
      },
      governorate: {
        type: String,
        trim: true,
        required: [true, "Please enter the full address"],
      },
      city: {
        type: String,
        trim: true,
        required: [true, "Please enter the full address"],
      },
      district: {
        type: String,
        required: [true, "Please enter the full address"],
        trim: true,
      },
      street: {
        type: String,
        required: [true, "Please enter the full address"],
        trim: true,
      },
      building: {
        type: String,
        required: [true, "Please enter the full address"],
        trim: true,
      },
      floor: {
        type: String,
        trim: true,
      },
      apartment: {
        type: String,
        trim: true,
      },
      directionsNotes: {
        type: String,
        trim: true,
      },
    },
    paymentMethod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentMethod",
      required: [true, "Payment method is required to complete order"],
    },
    __v: {
      type: Number,
      select: false,
    },
  },
  {
    id: false,
    toJSON: {
      virtuals: true,
    },
    timestamps: { updatedAt: false, createdAt: true },
  }
);

orderSchema.virtual("subTotal").get(function () {
  if (!this.cartItems) return;

  let subTotal = 0;

  this.cartItems.forEach((item) => {
    subTotal += item.priceWhenOrdered * item.quantity;
  });

  return subTotal;
});

orderSchema.virtual("total").get(function () {
  if (!this.cartItems || !this.deliveryFee) return;

  return this.subTotal + this.deliveryFee;
});

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
