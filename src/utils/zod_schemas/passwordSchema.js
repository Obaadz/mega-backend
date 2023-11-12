import { z } from "zod";

export default z
  .string({
    required_error: "Password is required",
    invalid_type_error: "Please enter password field correctly",
  })
  .min(8, "Password should be more then 8 characters")
  .max(20, "Password should be less then 20 characters");
