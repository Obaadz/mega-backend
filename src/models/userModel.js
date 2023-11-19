import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    address: {
      _id: false,
      type: {
        type: String,
        enum: ["House", "Apartment"],
      },
      governorate: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      district: {
        type: String,
        trim: true,
      },
      street: {
        type: String,
        trim: true,
      },
      building: {
        type: String,
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
      phoneNumber: {
        type: String,
        trim: true,
      },
    },
    cartItems: {
      type: [
        {
          quantity: Number,
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
        },
      ],
      default: [],
      _id: false,
    },
    orders: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Order",
      default: [],
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
  }
);

userSchema.virtual("comparePassword").get(function () {
  return async (password) => {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw new Error("Email or passowrd is incorrect");
    }
  };
});

userSchema.virtual("hasFullAddress").get(function () {
  if (
    !this.address ||
    !(
      // this.address.type &&
      // this.address.district &&
      (
        this.address.governorate &&
        this.address.city &&
        this.address.building &&
        this.address.apartment &&
        this.address.floor &&
        this.address.street &&
        this.address.phoneNumber
      )
    )
  )
    return false;

  if (this.address?.type === "Apartment" && !(this.address.floor && this.address.apartment))
    return false;

  return true;
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
