import UserModel from "../models/userModel.js";
import getDataFromToken from "./getDataFromToken.js";

/**
 * @function getUserByToken
 * @description Get user by jwt token and return it, if the user is not found, an error will be thrown
 */
export default async (token) => {
  const verifiedTokenData = getDataFromToken(token);

  const dbUser = await UserModel.findOne({ _id: verifiedTokenData.userId });

  if (!dbUser) throw new Error("User not found");

  return dbUser;
};
