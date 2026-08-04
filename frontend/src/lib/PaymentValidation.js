import { z } from "zod";

export const paymentFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters long" })
    .max(100),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),
  paymentMethod: z.enum(["bank", "card"], {
    required_error: "Please select a payment method",
  }),
});
