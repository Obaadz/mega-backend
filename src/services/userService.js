import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";
import fullNameSchema from "../utils/zod_schemas/fullNameSchema.js";
import emailSchema from "../utils/zod_schemas/emailSchema.js";
import passwordSchema from "../utils/zod_schemas/passwordSchema.js";
import phoneNumberSchema from "../utils/zod_schemas/phoneNumberSchema.js";
import ApiError from "../utils/classes/apiError.js";
import generateHashedString from "../utils/generateHashedString.js";
import generateToken from "../utils/generateToken.js";
import { z } from "zod";
import typeSchema from "../utils/zod_schemas/address/typeSchema.js";
import governorateSchema from "../utils/zod_schemas/address/governorateSchema.js";
import citySchema from "../utils/zod_schemas/address/citySchema.js";
import districtSchema from "../utils/zod_schemas/address/districtSchema.js";
import streetSchema from "../utils/zod_schemas/address/streetSchema.js";
import buildingSchema from "../utils/zod_schemas/address/buildingSchema.js";
import floorSchema from "../utils/zod_schemas/address/floorSchema.js";
import apartmentSchema from "../utils/zod_schemas/address/apartmentSchema.js";
import directionsNotesSchema from "../utils/zod_schemas/address/directionsNotesSchema.js";

export const userRegister = asyncHandler(async (req, res) => {
  fullNameSchema.parse(req.body.fullName);
  emailSchema.parse(req.body.email);
  phoneNumberSchema.parse(req.body.phoneNumber);
  passwordSchema.parse(req.body.password);

  const dbUserIsExist = await UserModel.findOne({ email: req.body.email });

  if (dbUserIsExist) throw new ApiError("Email already registered", 400);

  req.body.password = await generateHashedString(req.body.password);

  const dbUser = await UserModel.create({
    fullName: req.body.fullName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
  });

  const token = generateToken({ userId: dbUser._id });

  res.status(201).json({ isSuccess: true, token });
});

export const userLogin = asyncHandler(async (req, res) => {
  emailSchema.parse(req.body.email);
  passwordSchema.parse(req.body.password);

  const dbUser = await UserModel.findOne({ email: req.body.email });

  if (!dbUser || !(await dbUser.comparePassword(req.body.password)))
    throw new ApiError("Email or passowrd is incorrect", 400);

  const token = generateToken({ userId: dbUser._id });

  res.status(201).json({ isSuccess: true, token });
});

export const getUserInfo = asyncHandler(async (req, res) => {
  res.status(200).json({
    isSuccess: true,
    user: {
      _id: req.dbUser._id,
      fullName: req.dbUser.fullName,
      email: req.dbUser.email,
      phoneNumber: req.dbUser.phoneNumber,
      hasFullAddress: req.dbUser.hasFullAddress,
      address: req.dbUser.address,
    },
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  z.object({
    fullName: fullNameSchema.optional(),
    email: emailSchema.optional(),
    phoneNumber: phoneNumberSchema.optional(),
    password: passwordSchema.optional(),
    address: z
      .object({
        type: typeSchema.optional(),
        governorate: governorateSchema.optional(),
        city: citySchema.optional(),
        district: districtSchema.optional(),
        street: streetSchema.optional(),
        building: buildingSchema.optional(),
        floor: floorSchema.optional(),
        apartment: apartmentSchema.optional(),
        directionsNotes: directionsNotesSchema.optional(),
        phoneNumber: phoneNumberSchema.optional(),
      })
      .optional(),
  })
    .strict("Please enter the corresponding data only")
    .parse(req.body);

  if (req.body.password) req.body.password = await generateHashedString(req.body.password);

  await req.dbUser.updateOne({
    ...req.body,
  });

  const token = generateToken({ userId: req.dbUser._id });

  res.status(201).json({ isSuccess: true, token });
});
