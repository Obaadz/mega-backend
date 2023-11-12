import { z } from "zod";

export default z
  .string({
    required_error: "Something wrong",
    invalid_type_error: "Something wrong",
  })
  .min(5, "Something wrong")
  .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/, "Something wrong");
