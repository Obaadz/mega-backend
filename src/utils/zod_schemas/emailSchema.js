import { z } from "zod";

export default z
  .string({
    required_error: "Email address is required",
    invalid_type_error: "Please enter Email field correctly",
  })
  .email("The entered Email is incorrect")
  .max(100, "Email field has reached the maximum amount of characters");
