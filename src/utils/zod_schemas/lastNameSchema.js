import { z } from "zod";

export default z.string({
  required_error: "Last Name is required",
  invalid_type_error: "Please enter this field correctly",
});
