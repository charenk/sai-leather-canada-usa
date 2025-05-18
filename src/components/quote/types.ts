
import { z } from 'zod';

// Zod form schema with file validation
export const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  companyName: z.string().min(1, { message: "Company name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  country: z.string().min(1, { message: "Please select your country." }),
  productType: z.string().min(1, { message: "Please select a product type." }),
  leatherType: z.string().min(1, { message: "Please select a leather type." }),
  finishType: z.string().min(1, { message: "Please select a finish type." }),
  quantity: z.string().min(1, { message: "Quantity is required." }),
  targetPrice: z.string().optional(),
  timeline: z.string().min(1, { message: "Please select a timeline." }),
  additionalInfo: z.string().max(1000, { message: "Please limit additional information to 1000 characters." }).optional(),
  requestSample: z.boolean().default(false),
  shippingAddress: z.string().optional(),
  requestNDA: z.boolean().default(false),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and privacy policy.",
  }),
});

export type FormData = z.infer<typeof formSchema>;
