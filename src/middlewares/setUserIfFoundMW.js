import asyncHandler from "express-async-handler";
import extractTokenFromHeader from "../utils/extractTokenFromHeader.js";
import getUserByToken from "../utils/getUserByToken.js";
import tokenSchema from "../utils/zod_schemas/tokenSchema.js";

export default asyncHandler(async (req, res, next) => {
  const token = extractTokenFromHeader(req.headers.authorization);

  tokenSchema.optional().parse(token || undefined);

  const dbUser = token ? await getUserByToken(token) : undefined;

  req.dbUser = dbUser;
  req.token = token;

  next();
});
