import { z } from "zod";

export default z.enum(["Apartment", "House"], {
  errorMap: (i) => {
    return { message: "Address type should be one of those: Apartment - House" };
  },
});
