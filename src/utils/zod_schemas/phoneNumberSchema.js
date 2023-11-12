import { z } from "zod";

export default z
  .string({
    required_error: "Phone Number is required",
    invalid_type_error: "Please enter phone number field correctly",
  })
  .min(7, "Please enter phone number field correctly")
  .regex(/01(0|1|2|5)[0-9]{8}/, "Phone Number should be in this form: 01xxxxxxxxx");
