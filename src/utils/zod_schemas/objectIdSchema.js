import { isValidObjectId } from "mongoose";
import { z } from "zod";

export default z.any({ required_error: "Please enter the ID correctly" }).refine((val) => {
  return isValidObjectId(val);
}, "The entered ID is incorrect");
