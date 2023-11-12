import { z } from "zod";

export default z.string({
  required_error: "Full Name is required",
  invalid_type_error: "Please enter Full Name field correctly",
});
