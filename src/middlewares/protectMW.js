import asyncHandler from "express-async-handler";
import extractTokenFromHeader from "../utils/extractTokenFromHeader.js";
import getUserByToken from "../utils/getUserByToken.js";
import tokenSchema from "../utils/zod_schemas/tokenSchema.js";

export default asyncHandler(async (req, res, next) => {
  const token = extractTokenFromHeader(req.headers.authorization);

  tokenSchema.parse(token);

  const dbUser = await getUserByToken(token);

  req.dbUser = dbUser;
  req.token = token;

  next();
});
