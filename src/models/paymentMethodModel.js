import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ["Cash on delivery", "Vodafone cash"],
      required: [true, "Name is required"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    hide: {
      type: Boolean,
      default: false,
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

const PaymentMethodModel = mongoose.model("PaymentMethod", paymentMethodSchema);

export default PaymentMethodModel;
