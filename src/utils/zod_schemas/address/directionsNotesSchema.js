import { z } from "zod";

export default z.string({
  required_error: "Please enter the required directions notes",
  invalid_type_error: "Invalid type for directions notes",
});
