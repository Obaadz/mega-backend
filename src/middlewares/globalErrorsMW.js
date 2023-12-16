import getError from "../utils/getError.js";

export default (err, req, res, next) => {
  console.log("ERROR FROM GLOBAL ERROR MIDDLEWARE:", err);
  const errObj = getError(err);
  errObj.statusCode = errObj.statusCode || 500;

  console.log(errObj);

  res.status(errObj.statusCode).json({ isSuccess: false, error: errObj.message });
};
