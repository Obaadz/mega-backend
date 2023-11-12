import { ZodError } from "zod";

export default (err) => {
  if (err instanceof ZodError) {
    const errorsAfterParse = JSON.parse(err.message);

    const message = errorsAfterParse[0]?.message || "Error Occured";

    return {
      statusCode: 400,
      message,
    };
  } else if (err.message.includes("duplicate key")) {
    err.message = err.message.includes("email: ") ? "Email already used" : err.message;
  } else if (err.message.includes("Please enter the full address")) {
    err.message = "Please enter the full address";
  } else if (err.statusCode === 413) {
    err.message = "Sorry, Image uploaded size is too large";
  }

  return {
    statusCode: err.statusCode || 401,
    message: err.message || "Error Occured",
  };
};
